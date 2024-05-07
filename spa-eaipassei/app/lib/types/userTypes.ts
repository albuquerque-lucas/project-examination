export type User = {
  id: string | null;
  profile_img: string | null;
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
  first_name?: string;
  last_name?: string;
  email?: string;
  username?: string;
  phone_number?: string;
  profile_img?: File;
  [key: string]: number | string | File | undefined;
}

export type ProfileImageFormRequest = {
  profile_img: File;
}