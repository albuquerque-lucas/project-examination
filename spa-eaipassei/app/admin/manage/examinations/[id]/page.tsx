'use client';

import { useState, useEffect } from "react";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import { getExaminationById } from "@/app/lib/api/examinationsAPI";

type Examination = {
  id: number;
  title: string;
  institution: string;
  educational_level: string;
  active: boolean;
  exams_count: number;
  exams_start_date: string;
  exams_end_date: string;
  registration_start_date: string;
  registration_end_date: string;
  study_areas: Array<{ id: number; area: string }>;
  exam_list: Array<any>; 
}

function ExaminationDisplay() {
  const [id, setId] = useState<string | null>(null);
  const [examination, setExamination] = useState<Examination | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathSegments = window.location.pathname.split('/');
      const id = pathSegments[pathSegments.length - 1];
      setId(id);

      const fetchExamination = async () => {
        try {
          const result = await getExaminationById(id);
          setExamination(result);
          console.log('RESULTADO', result);
        } catch (err: any) {
          setError(err);
        }
      }

      fetchExamination();
    }
  }, []);

  console.log(id);
  return (
    <>
    { examination ? 
      <div>
        <h1>{ examination.title }</h1>
      </div>
    :
    <h1>Loading</h1>
    }
    </>
  )
}

export default withAuth(ExaminationDisplay);