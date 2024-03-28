import style from '@/app/ui/admin/home/home.module.css';
import layout from '@/app/ui/admin/layout.module.css';

export default function Page() {
  return (
    <div className={ style.home_content }>
      <h1 className={ layout.admin_content__title }>Bem vindo!</h1>
    </div>
  )
}