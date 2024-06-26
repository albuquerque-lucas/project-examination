'use client';

import React, { useEffect } from 'react';
import { User } from '@/app/lib/types/userTypes';
import EditProfileField from './EditProfileField';
import ImageUploadField from './ImageUploadField';
import useUpdateUser from '@/app/lib/hooks/useUpdateUser';
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/home/profileBoard.module.css';

function ProfileBoard({ user }: { user: User}) {
  const {
    firstNameRef,
    lastNameRef,
    emailRef,
    phoneNumberRef,
    usernameRef,
    imageRef,
  } = useUpdateUser();

  useEffect(() => {
    console.log('Id do usuario', user.id);
  }, [user]);

  return (
    <motion.div
      className={`${style.panel_case} ${style.panel_case__edit_profile}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2>Perfil</h2>
      <div className={ style.panel_case__edit_profile__data }>
        <ImageUploadField
          label="Imagem:"
          ref={ imageRef }
          userId={ user.id }
        />
        <EditProfileField
          label="Nome:"
          type="text"
          ref={firstNameRef}
          defaultValue={user?.first_name || ''}
          userId={ user.id }
          field="first_name"
        />
        <EditProfileField
          label="Sobrenome:"
          type="text"
          ref={lastNameRef}
          defaultValue={user?.last_name || ''}
          userId={ user.id }
          field="last_name"
        />
        <EditProfileField
          label="Email:"
          type="email"
          ref={emailRef}
          defaultValue={user?.email || ''}
          userId={ user.id }
          field="email"
        />
        <EditProfileField
          label="Telefone:"
          type="text"
          ref={phoneNumberRef}
          defaultValue={user?.phone_number || ''}
          userId={ user.id }
          field="phone_number"
        />
        <EditProfileField
          label="Username:"
          type="text"
          ref={usernameRef}
          defaultValue={user?.username || ''}
          userId={ user.id }
          field="username"
        />
      </div>
    </motion.div>
  )
}

export default ProfileBoard;