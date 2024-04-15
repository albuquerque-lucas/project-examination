'use client';

import Link from 'next/link';
import { PiExamFill } from "react-icons/pi";
import NavbarItem from '@/app/lib/components/ListItems/navbarItem';

const ExaminationsLink = () => {
  return (
    <Link href="/admin/manage/examinations" className="nav-link">
      <NavbarItem>
        <PiExamFill />
          Concursos
      </NavbarItem>
    </Link>
  )
}

export default ExaminationsLink;