'use client';

import { useContext } from 'react';
import style from '@/app/ui/admin/home/home.module.css';
import layout from '@/app/ui/admin/layout.module.css';
import withAuth from '@/app/lib/components/withAuth/withAuth';
import { AuthContext } from '../../lib/context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className={ style.home_content }>
      <h1 className={ layout.admin_content__title }>
        Welcome { user?.full_name }! You are now logged in.
      </h1>
    </div>
  )
}

export default withAuth(Home);