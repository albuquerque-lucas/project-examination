'use client';

import withAuth from "@/app/lib/components/withAuth/withAuth";

function ExaminationsDashboard() {
  return (
    <div className="examinations_content">
      <h1>Concursos</h1>
    </div>
  );
}

export default withAuth(ExaminationsDashboard);