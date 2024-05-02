'use client';

import { useContext, useState } from 'react';
import withAuth from '@/app/lib/components/withAuth/withAuth';
import { AuthContext } from '../../lib/context/AuthContext';
import profileImage from './no-image.jpg';
import Image from 'next/image';
import MessageBox from '../login/messageBox';
import { motion } from 'framer-motion';
import { authCodeMapper } from '@/app/lib/utils/authCodeMapper';
import { BiSolidDownArrowSquare } from "react-icons/bi";
import style from '@/app/ui/admin/home/home.module.css';

const Home = () => {
  const { user, authMessage, setAuthMessage } = useContext(AuthContext);
  const [buttonListMode, setButtonListMode] = useState(false);

  const toggleOpen = () => setButtonListMode(!buttonListMode);

  const buttonBoxVariants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        height: { duration: 0.2 },
        opacity: { delay: 0.3, duration: 0.1 },
      }
    },
    closed: {
      opacity: 0,
      scale: 0,
      transition: {
        opacity: { duration: 0.1 },
        height: { delay: 0.4, duration: 0.2 },
        scale: { delay: 0.6 }
      }
    },
  };

  const buttonPanelVariants = {
    open: {
      height: "40rem",
      transition: {
        height: { duration: 0.2 }
      }
    },
    closed: {
      height: "2rem",
      transition: {
        height: { duration: 0.2 }
      }
    }
  }
  
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
        </div>
        <div className={ style.profile_content__info }>

          <div className={ style.profile_content__sideinfo }>
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
              <p>
                { user?.email }
              </p>
              <p>
                { user?.account_plan }
              </p>
            </div>
          </div>

          <motion.div
            className={ style.profile_buttons__panel }
            variants={ buttonPanelVariants }
            initial="closed"
            animate={ buttonListMode ? "open" : "closed" }
            >
            <button
              className={ style.options_btn }
              onClick={ toggleOpen }
              >
              Opções
              <motion.div
              className={ style.arrow_button }
              animate={{ rotate: buttonListMode ? -180 : 0 }}
              >
                <BiSolidDownArrowSquare />
              </motion.div>
            </button>
            <motion.div
            className={ style.hidden_buttons }
            initial="closed"
            animate={ buttonListMode ? "open" : "closed" }
            variants={ buttonBoxVariants }
            >
              <button>
                Editar perfil
              </button>
              <button>
                Gerenciar Usuarios
              </button>
            </motion.div>
          </motion.div>

          <div className={ style.profile_content__panel }>
            Content
          </div>

        </div>
    </motion.div>
  )
}

export default withAuth(Home);