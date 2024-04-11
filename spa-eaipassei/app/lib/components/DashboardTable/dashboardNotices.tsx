import { useRouter } from "next/navigation";
import { Notice } from "../../types/noticeTypes";
import { MdDelete } from "react-icons/md";
import style from '@/app/ui/admin/tables/dashboardData.module.css';

interface DashboardExaminationsProps {
  data: Notice[] | {};
}

export default function DashboardNotices({ data }: DashboardExaminationsProps) {
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
              <th>Concurso</th>
              <th className={ style.file_name_column }>Arquivo</th>
              <th className={ style.publication_date_column }>Data de Publicação</th>
            </tr>
          </thead>
          <tbody>
            {(data as Notice[]).map((item, index) => (
              <tr key={index} onClick={ () => navigateToPage(item.id) }>
                  <td>{item.id}</td>
                  <td>{ item.examination ? item.examination.title : 'Nenhum concurso associado'}</td>
                  <td className={ style.file_name_column }>{item.file_name}</td>
                  <td className={ style.publication_date_column }>{item.publication_date }</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}