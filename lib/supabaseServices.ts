import supabase from "./supabase";

//Auth
export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  return { data, error };
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  return { data, error };
};

//Users
export const getUserById = async (id: SupabaseUser["id"]) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
};

export const getUsernameById = async (id: SupabaseUser["id"]) => {
  const { data, error } = await supabase
    .from("users")
    .select("username")
    .eq("id", id)
    .single();

  return { data: data?.username, error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
};

export const updateLastLogin = async (userId: SupabaseUser["id"]) => {
  await supabase
    .from("users")
    .update({
      last_login: String(new Date().toISOString()),
    })
    .eq("id", userId);
};

export const updateUserById = async (
  updates: any,
  userId: SupabaseUser["id"]
) => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId);

  return { data, error };
};

//Brands
export const getBrandWithBranchesById = async (id: SupabaseUser["id"]) => {
  const { data, error } = await supabase
    .from("brand")
    .select(
      `id,brand_name, 
        brand_logo_url, 
        required_number_for_free_right,
        brand_branch(
          total_orders, 
          total_used_free_rights, 
          total_unused_free_rights, 
          daily_total_orders, 
          daily_total_used_free_rights, 
          monthly_total_orders,
          weekly_total_orders
        )`
    )
    .eq("id", id)
    .single();

  return { data, error };
};

export const getBrandById = async (id: SupabaseBrand["id"]) => {
  const { data, error } = await supabase
    .from("brand")
    .select(
      `id,
      brand_name, 
      brand_logo_url, 
      required_number_for_free_right`
    )
    .eq("id", id)
    .single();
  return { data, error };
};

export const getRequiredNumberForFreeRight = async (
  id: SupabaseBrand["id"]
) => {
  const { data, error } = await supabase
    .from("brand")
    .select("required_number_for_free_right")
    .eq("id", id)
    .single();

  return { data: data?.required_number_for_free_right, error };
};

//BrandBranch
export const getAllBrandBranchWithBrand = async () => {
  const { data, error } = await supabase
    .from("brand_branch")
    .select(
      "id, branch_name, coords, campaigns, video_url, brand( id, brand_name, brand_logo_url, ticket_url, required_number_for_free_right, free_right_image_url )"
    );
  return { data, error };
};

export const getBrandBranchById = async (id: SupabaseBrandBranch["id"]) => {
  const { data, error } = await supabase
    .from("brand_branch")
    .select(
      `id, 
        brand_id, 
        branch_name, 
        total_orders, 
        coords, 
        video_url, 
        campaigns, 
        total_used_free_rights, 
        daily_total_orders, 
        email, 
        daily_total_used_free_rights, 
        monthly_total_orders, 
        weekly_total_orders, 
        total_unused_free_rights, 
        monthly_total_orders_with_years, 
        city`
    )
    .eq("id", id)
    .single();

  return { data, error };
};

export const getBrandBranchInfoByBrandId = async (
  branchId: SupabaseBrandBranch["id"],
  brandId: SupabaseBrand["id"]
) => {
  const { data, error } = await supabase
    .from("brand_branch")
    .select(
      "brand_id, total_used_free_rights, daily_total_used_free_rights, total_orders, daily_total_orders, weekly_total_orders, monthly_total_orders, total_unused_free_rights, monthly_total_orders_with_years"
    )
    .eq("id", branchId)
    .eq("brand_id", brandId);

  return { data, error };
};

export const getBrandIdByBranchId = async (
  brandBranchId: SupabaseBrandBranch["id"]
) => {
  const { data, error } = await supabase
    .from("brand_branch")
    .select("brand_id")
    .eq("id", brandBranchId)
    .single();

  return { data: data?.brand_id, error };
};

export const updateBrandBranch = async (
  updates: {},
  brandBranchId: SupabaseBrandBranch["id"]
) => {
  const { data, error } = await supabase
    .from("brand_branch")
    .update(updates)
    .eq("id", brandBranchId);

  return { data, error };
};

//UserOrders
export const getUserOrderByBrandIdAndBranchId = async (
  userId: SupabaseUser["id"],
  brandId: SupabaseBrand["id"],
  branchId: SupabaseBrandBranch["id"]
) => {
  const { data, error } = await supabase
    .from("user_orders")
    .select(
      "last_order_date,user_total_used_free_rights,total_user_orders,user_total_free_rights,total_ticket_orders"
    )
    .eq("user_id", userId)
    .eq("brand_id", brandId)
    .eq("branch_id", branchId);

  return { data, error };
};

export const getUserOrdersByBrandId = async (
  userId: SupabaseUser["id"],
  brandId: SupabaseBrand["id"]
) => {
  const { data, error } = await supabase
    .from("user_orders")
    .select(
      "last_order_date,user_total_used_free_rights,total_user_orders,user_total_free_rights,total_ticket_orders"
    )
    .eq("user_id", userId)
    .eq("brand_id", brandId);

  return { data, error };
};

export const getBrandBranchMenuUrl = (
  convertedBrandName: string,
  convertedBrandBranchName: string
) => {
  const { data } = supabase.storage
    .from("menus")
    .getPublicUrl(
      `${convertedBrandName.toLowerCase()}-${convertedBrandBranchName.toLowerCase()}-menu.pdf`
    );

  return { data: data.publicUrl };
};

export const getUserOrderInfoByBranchId = async (
  userId: SupabaseUser["id"],
  brandBranchID: SupabaseBrandBranch["id"]
) => {
  const { data, error } = await supabase
    .from("user_orders")
    .select(
      "id, total_user_orders, total_ticket_orders, user_total_used_free_rights"
    )
    .eq("user_id", userId)
    .eq("branch_id", brandBranchID)
    .single();

  return { data, error };
};

export const getUserTotalFreeRights = async (
  userId: SupabaseUser["id"],
  brandId: SupabaseBrand["id"]
) => {
  const { data, error } = await supabase
    .from("user_orders")
    .select("user_total_free_rights")
    .eq("user_id", userId)
    .eq("brand_id", brandId);

  return { data, error };
};

export const addUserOrder = async (userOrder: SupabaseUserOrders) => {
  const { data, error } = await supabase.from("user_orders").insert(userOrder);

  return { data, error };
};

export const updateUserOrders = async (
  updates: {},
  userOrderId: SupabaseUserOrders["id"]
) => {
  const { data, error } = await supabase
    .from("user_orders")
    .update(updates)
    .eq("id", userOrderId);

  return { data, error };
};
