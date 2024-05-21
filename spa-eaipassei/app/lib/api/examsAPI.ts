import { fetchData } from "./apiManagement";
import { PaginatedAPIResponse } from "../types/entityContextTypes";
import { Exam } from "../types/examTypes";

export const getExams = async (url: string, params: Record<string, any> = {}): Promise<PaginatedAPIResponse<Exam> | null> => {
  return fetchData<PaginatedAPIResponse<Exam>>(url, params);
}