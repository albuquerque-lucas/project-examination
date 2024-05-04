export type User = {
  id: string | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  email: string | null;
  username: string | null;
  account_plan: string | null;
  phone_number: string | null;
  subscription_date: string | null;
  subscription_duration_days: number | null;
  subscription_fee: number | string | null;
  subscription_missing_days: number | null;
  created_at: string | null;
  updated_at: string | null;
};

export type UserUpdateRequest = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  username: string | null;
  phone_number: string | null;
  profile_img: File | null;
  [key: string]: number | string | null | File;
}