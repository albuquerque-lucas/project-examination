import { useRouter } from "next/navigation";
import { useDeleteNotices } from "@/app/lib/hooks/useDeleteNotices";
import { Notice } from "../../../lib/types/noticeTypes";
import { MdDelete } from "react-icons/md";
import style from '@/app/ui/admin/tables/dashboardData.module.css';

interface DashboardNoticesProps {
  data: Notice[] | {};
}

export default function DashboardNotices({ data }: DashboardNoticesProps) {
  const { setNoticeDeletionMode, setNoticeDeletionList } = useDeleteNotices();

  const router = useRouter();

  const navigateToPage = (id: number) => {
    router.push(`/admin/manage/examinations/${id}`)
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
              <th className={ style.title_column }>Concurso</th>
              <th className={ style.aux_id_column }>ID do Concurso</th>
              <th className={ style.file_name_column }>Arquivo</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>
            {(data as Notice[]).map((item, index) => (
              <tr key={index} onClick={ () => navigateToPage(item.id) }>
                  <td className={ style.id_column }>{item.id}</td>
                  <td className={ style.title_column }>{ item.examination ? item.examination.title : 'Nenhum concurso associado'}</td>
                  <td className={ style.file_name_column }>{ item.examination?.id ?? 'Não definido' }</td>
                  <td className={ style.file_name_column }>{item.file_name}</td>
                  <td className={ style.dashboard_delete__buttons }>
                    <button
                      className={ style.dashboard_table__delete }
                      onClick={(event) => {
                        event.stopPropagation();
                        setNoticeDeletionList([item.id]);
                        setNoticeDeletionMode(true);
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