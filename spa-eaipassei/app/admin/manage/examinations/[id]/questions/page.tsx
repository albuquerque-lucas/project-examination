'use client';

import withAuth from "@/app/lib/components/withAuth/withAuth"
import style from '@/app/ui/admin/pages/examinations/questions.module.css';

function ExamDisplay() {
  return (
    <div className={ style.questions_page }>
      <section className={ style.page_header }>

      </section>
    </div>
  )
}

export default withAuth(ExamDisplay);