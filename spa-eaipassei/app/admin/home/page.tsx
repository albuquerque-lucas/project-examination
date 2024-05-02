'use client';

import { useContext } from 'react';
import withAuth from '@/app/lib/components/withAuth/withAuth';
import { AuthContext } from '../../lib/context/AuthContext';
import profileImage from './no-image.jpg';
import Image from 'next/image';
import MessageBox from '../login/messageBox';
import { motion } from 'framer-motion';
import { authCodeMapper } from '@/app/lib/utils/authCodeMapper';
import style from '@/app/ui/admin/home/home.module.css';

const Home = () => {
  const { user, authMessage, setAuthMessage } = useContext(AuthContext);
  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={ style.home_content }>
      <div className='profile_content'>
        <div className={  style.profile_content__messagebox}>
          {
            authMessage && authMessage.code !== authCodeMapper.logout && (
              <MessageBox
                message={ authMessage.message }
                setMessage={ setAuthMessage }
                type={ authMessage.type }
                />
            )
          }
        </div>
        <div
          className={ style.profile_content__imagebox }
          >
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
    </motion.div>
  )
}

export default withAuth(Home);