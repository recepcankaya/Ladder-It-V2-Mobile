import type { Database } from "../types/database.types";

declare global {
  type DB = Database;
  type SupabaseBrand = Database["public"]["Tables"]["brand"]["Row"];
  type SupabaseBrandBranch =
    Database["public"]["Tables"]["brand_branch"]["Row"];
  type SupabaseUser = Database["public"]["Tables"]["users"]["Row"];
  type SupabaseUserOrders = Database["public"]["Tables"]["user_orders"]["Row"];
}
