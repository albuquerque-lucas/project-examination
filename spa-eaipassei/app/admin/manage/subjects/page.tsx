'use client';

import withAuth from "@/app/lib/components/withAuth/withAuth";

function SubjectsDashboard
() {
  return (
    <div className="subjects_content">
      <h1>Matérias</h1>
    </div>
  );
}

export default withAuth(SubjectsDashboard);