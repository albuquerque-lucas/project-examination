import { useDeleteStudyAreas } from "@/app/lib/hooks/useDeleteStudyAreas";
import { StudyArea } from "@/app/lib/types/studyAreasTypes";
import { MdDelete } from "react-icons/md";
import { SpinnerLoader } from "@/app/lib/components/Loaders/Loader";
import style from '@/app/ui/admin/tables/dashboardData.module.css';

interface StudyAreasDashboardProps {
  data: StudyArea[] | null;
}

export default function StudyAreasDashboard({ data }: StudyAreasDashboardProps) {
  const {
    setStudyAreaDeletionMode,
    setStudyAreaDeletionList,
  } = useDeleteStudyAreas();

  if (!Array.isArray(data)) return <SpinnerLoader />;

  return (
    <div className={ style.data_table__container }>
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
                      setStudyAreaDeletionMode(true);
                      setStudyAreaDeletionList([item.id]);
                      }}
                    >
                      <MdDelete />
                    </button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}