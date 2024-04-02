'use client';

import { useContext } from 'react';
import style from '@/app/ui/admin/home/home.module.css';
import layout from '@/app/ui/admin/layout.module.css';
import withAuth from '@/app/lib/components/withAuth/withAuth';
import { AuthContext } from '../../lib/context/AuthContext';
import profileImage from './no-image.jpg';
import Image from 'next/image';

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className={ style.home_content }>
      <div className='profile_content'>
        <div className={ style.profile_content__imagebox }>
          <Image
            src={ profileImage }
            alt='Imagem de perfil do usuario autenticado'
            width={ 250 }
            height={ 250 }
            className={ style.profile_content__image }
            />
        </div>
        <div className={ style.profile_content__databox }>
          <h2>
            { user?.full_name }
          </h2>
        </div>
      </div>
    </div>
  )
}

export default withAuth(Home);