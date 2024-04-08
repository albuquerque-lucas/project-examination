export type Examination = {
  educational_level_id: string;
  title: string;
  active?: boolean;
  institution: string;
  registration_start_date?: string;
  registration_end_date?: string;
  exams_start_date?: string;
  exams_end_date?: string;
};