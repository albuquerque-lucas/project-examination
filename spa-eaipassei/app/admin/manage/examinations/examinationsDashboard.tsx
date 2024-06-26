'use client';

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { Examination } from "@/app/lib/types/examinationTypes";
import { ExaminationsContext } from "../../../lib/context/ExaminationsContext";
import style from '@/app/ui/admin/tables/dashboardData.module.css';

interface DashboardExaminationsProps {
  data: Examination[] | null;
}

export default function ExaminationsDashboard({ data }: DashboardExaminationsProps) {

  const { setDashboardDeletionMode, setExaminationToDelete } = useContext(ExaminationsContext);
  const router = useRouter();

  const navigateToExamPage = (id: number | string | undefined) => {
    if (!id) return;
    const numberId = Number(id);
    router.push(`/admin/manage/examinations/${numberId}`)
  }

  const handleDeleteClick = (id: number | string | undefined) => {
    if (!id) return;
    const numberId = Number(id);
    setExaminationToDelete(numberId);
    setDashboardDeletionMode(true);
  }

  return (
    <div className={ style.data_table__container }>
      {!Array.isArray(data) ? (
        <h1>Não há dados disponíveis</h1>
      ) : (
        <table
          className={ style.data_table }>
          <thead>
            <tr>
              <th>#</th>
              <th className={ style.title_column }>Título</th>
              <th className={ style.institution_column }>Instituição</th>
              <th className={ style.educational_level_column }>Nível de Escolaridade</th>
              <th>Ativo</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {(data as Examination[]).map((item, index) => (
              <tr key={index} onClick={ () => navigateToExamPage(item.id) }>
                  <td className={ style.id_column }>{item.id}</td>
                  <td className={ style.title_column }>{item.title}</td>
                  <td className={ style.institution_column }>{item.institution}</td>
                  <td className={ style.educational_level_column }>{item.educational_level}</td>
                  <td>{item.active ? 'Ativo' : 'Inativo'}</td>
                  <td className={ style.dashboard_delete__buttons }>
                    <button
                      className={ style.dashboard_table__delete }
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteClick(item.id);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}