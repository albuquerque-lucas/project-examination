'use client';

import withAuth from "@/app/lib/components/withAuth/withAuth"

const CreateExaminationsPage = () => {
  return (
    <div className="examination_creation__content">
      <h1>Adicionar Concurso</h1>
    </div>
  )
}

export default withAuth(CreateExaminationsPage);