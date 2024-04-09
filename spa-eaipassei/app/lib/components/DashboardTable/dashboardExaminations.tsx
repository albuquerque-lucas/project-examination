'use client';

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import style from '@/app/ui/admin/tables/dashboardData.module.css';
import { ExaminationsContext } from "../../context/ExaminationsContext";
import { motion, useScroll } from "framer-motion";

interface Exam {
  id: number;
  title: string;
  institution: string;
  educational_level: string;
  active: boolean;
}

interface DashboardExaminationsProps {
  data: Exam[] | {};
}

export default function DashboardExaminations({ data }: DashboardExaminationsProps) {

  const { setDashboardDeletionMode, setExaminationToDelete } = useContext(ExaminationsContext);
  const router = useRouter();

  const navigateToExamPage = (id: number) => {
    router.push(`/admin/manage/examinations/${id}`)
  }

  return (
    <div className={ style.data_table__container }>
      {!Array.isArray(data) ? (
        <h1>Não há dados disponíveis</h1>
      ) : (
        <motion.table
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={ style.data_table }>
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Instituição</th>
              <th>Nível de Escolaridade</th>
              <th>Ativo</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {(data as Exam[]).map((item, index) => (
              <tr key={index} onClick={ () => navigateToExamPage(item.id) }>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.institution}</td>
                  <td>{item.educational_level}</td>
                  <td>{item.active ? 'Ativo' : 'Inativo'}</td>
                  <td className={ style.dashboard_delete__buttons }>
                    <button
                      className={ style.dashboard_table__delete }
                      onClick={(event) => {
                        event.stopPropagation();
                        setExaminationToDelete(item.id);
                        setDashboardDeletionMode(true);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </motion.table>
      )}
    </div>
  );
}