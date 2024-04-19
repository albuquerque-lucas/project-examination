import { Subject } from "@/app/lib/types/subjectTypes";
import { useDeleteSubjects } from "@/app/lib/hooks/useDeleteSubjects";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import style from '@/app/ui/admin/tables/dashboardData.module.css';

interface SubjectsDashboardProps {
  data: Subject[] | {};
}

export default function SubjectsDashboard({ data }: SubjectsDashboardProps) {
  const { setSubjectDeletionMode, setSubjectDeletionList } = useDeleteSubjects();
  const router = useRouter();

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
              <th className={ style.title_column }>Nome</th>
              <th>Área</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {(data as Subject[]).map((item, index) => (
              <tr key={index}>
                  <td className={ style.id_column }>{item.id}</td>
                  <td className={ style.title_column }>{ item.title ? item.title : 'Nome indisponivel'}</td>
                  <td className={ style.title_column }>{ item.study_area ? item.study_area : 'Area indisponivel'}</td>
                  <td className={ style.dashboard_delete__buttons }>
                    <button
                    className={ style.dashboard_table__delete }
                      onClick={(event) => {
                        event.stopPropagation();
                        setSubjectDeletionList([item.id]);
                        setSubjectDeletionMode(true);
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
  )
}