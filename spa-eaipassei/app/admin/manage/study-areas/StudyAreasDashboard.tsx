import { useRouter } from "next/navigation";
import { StudyArea } from "@/app/lib/types/studyAreasTypes";
import { MdDelete } from "react-icons/md";
import style from '@/app/ui/admin/tables/dashboardData.module.css';

interface StudyAreasDashboardProps {
  data: StudyArea[] | {};
}

export default function StudyAreasDashboard({ data }: StudyAreasDashboardProps) {
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
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {(data as StudyArea[]).map((item, index) => (
              <tr key={index}>
                  <td className={ style.id_column }>{item.id}</td>
                  <td className={ style.title_column }>{ item.area ? item.area : 'Nome indisponivel'}</td>
                  <td className={ style.dashboard_delete__buttons }>
                    <button
                    className={ style.dashboard_table__delete }
                      onClick={(event) => {
                        event.stopPropagation();
                        // setSubjectDeletionList([item.id]);
                        // setSubjectDeletionMode(true);
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