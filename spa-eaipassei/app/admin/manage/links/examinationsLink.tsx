'use client';

import Link from 'next/link';
import { PiExamFill } from "react-icons/pi";

const ExaminationsLink = () => {
  return (
    <Link href="/admin/manage/examinations" className="nav-link">
    <li className="nav-item">
      <PiExamFill />
        Concursos
    </li>
  </Link>
  )
}

export default ExaminationsLink;