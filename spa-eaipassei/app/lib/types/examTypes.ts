import { Examination } from "./examinationTypes";
import { Subject } from "./subjectTypes";

export type Exam = {
  id: number;
  examination_id: number | null;
  title: string;
  description?: string | null;
  date?: string | null;
  examination?: string | null;
  questions_count?: number | null;
  subjects?: Subject[];
}

export type ExamQueryParams = {
  examination_id?: number;
  title?: string;
  page?: number;
  order?: string;
  search?: string;
}

export type ExamQuestion = {
  id: number;
  exam_id: number;
  subject_id: number;
  topic_id: number;
  alternatives: string[];
  question_number: number;
}