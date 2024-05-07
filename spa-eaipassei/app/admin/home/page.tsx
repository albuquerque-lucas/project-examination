'use client';

import { useContext, useState, useEffect } from 'react';
import withAuth from '@/app/lib/components/withAuth/withAuth';
import { AuthContext } from '../../lib/context/AuthContext';
import noImage from './no-image.jpg';
import Image from 'next/image';
import MessageBox from '../login/messageBox';
import { motion } from 'framer-motion';
import { authCodeMapper } from '@/app/lib/utils/authCodeMapper';
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa6";
import ProfileBoard from './ProfileBoard';
import useUpdateUser from '@/app/lib/hooks/useUpdateUser';
import style from '@/app/ui/admin/home/home.module.css';

const Home = () => {
  const { user, authMessage, setAuthMessage } = useContext(AuthContext);
  const { updateMessage, setUpdateMessage } = useUpdateUser()
  const [panelShow, setPanelShow] = useState({
    edit_profile: false,
  });

  useEffect(() => {
  }, [updateMessage]);
  
  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={ style.home_content }>
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
          {
            updateMessage && (
              <MessageBox
                message={ updateMessage.message }
                setMessage={ setUpdateMessage }
                type={ updateMessage.type }
                />
            )
          }
        </div>
        <div className={ style.profile_content__info }>

          <div className={ style.profile_content__sideinfo }>
            <div className={ style.profile_content__imagebox }>
              <Image
                src={ user?.profile_img ? `http://localhost/storage/${user.profile_img}` : noImage }
                alt='Imagem de perfil do usuario autenticado'
                width={ 250 }
                height={ 250 }
                className={ style.profile_content__image }
                priority
                />
            </div>

            <div className={ style.profile_content__databox }>
              <h2>
                { user?.full_name }
              </h2>
              <p>
                { user?.email }
              </p>
              <p>
                { user?.account_plan }
              </p>
            </div>
          </div>

          <div className={ style.profile_buttons__panel } >
              <motion.button
              onClick={ () => setPanelShow({ edit_profile: !panelShow.edit_profile }) }
              >
                <CgProfile />
              </motion.button>
              <motion.button>
                <FaUsers />
              </motion.button>
          </div>

          <div className={ style.profile_content__panel }>
            {
              panelShow.edit_profile && user && (
                <ProfileBoard
                  user={ user }
                />
              )
            }
          </div>

        </div>
    </motion.div>
  )
}

export default withAuth(Home);