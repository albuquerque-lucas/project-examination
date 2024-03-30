'use client';

import style from '@/app/ui/admin/home/home.module.css';
import layout from '@/app/ui/admin/layout.module.css';
import withAuth from '@/app/lib/components/withAuth/withAuth';

const Home = () => {
  return (
    <div className={ style.home_content }>
      <h1 className={ layout.admin_content__title }>Bem vindo!</h1>
    </div>
  )
}

export default withAuth(Home);