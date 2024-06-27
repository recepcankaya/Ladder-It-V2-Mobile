export type BrandBranchDetails = {
  id: SupabaseBrandBranch["id"];
  branchName: SupabaseBrandBranch["branch_name"];
  coords: { lat: string; long: string } | null;
  campaigns: SupabaseBrandBranch["campaigns"];
  videoUrl: SupabaseBrandBranch["video_url"];
  brandId: SupabaseBrandBranch["brand_id"];
  brandName: SupabaseBrand["brand_name"];
  brandLogoUrl: SupabaseBrand["brand_logo_url"];
  ticketUrl: SupabaseBrand["ticket_url"];
  requiredNumberForFreeRight: SupabaseBrand["required_number_for_free_right"];
  freeRightImageUrl: SupabaseBrand["free_right_image_url"];
};

export type BrandBranchesDetails = {
  totalOrders: SupabaseBrandBranch["total_orders"];
  totalUsedFreeRights: SupabaseBrandBranch["total_used_free_rights"];
  totalUnusedFreeRights: SupabaseBrandBranch["total_unused_free_rights"];
  dailyTotalOrders: SupabaseBrandBranch["daily_total_orders"];
  dailyTotalUsedFreeRights: SupabaseBrandBranch["daily_total_used_free_rights"];
  weeklyTotalOrders: SupabaseBrandBranch["weekly_total_orders"];
  monthlyTotalOrders: SupabaseBrandBranch["monthly_total_orders"];
};
