'use client';

import React, { useRef, useEffect } from 'react';
import { User } from '@/app/lib/types/userTypes';
import style from '@/app/ui/admin/home/profileBoard.module.css';
import EditProfileField from './EditProfileField';
import ImageUploadField from './ImageUploadField';
import ShowcaseProfileField from './ShowcaseProfileField';
import useUpdateUser from '@/app/lib/hooks/useUpdateUser';

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
    <div className={`${style.panel_case} ${style.panel_case__edit_profile}`}>
      <h3>Alterar Informações de Perfil</h3>
      <div>
        <ImageUploadField label="Imagem" ref={ imageRef } />
        <div className={style.panel_case__edit_profile__data}>
          <EditProfileField
            label="Nome"
            type="text"
            ref={firstNameRef}
            defaultValue={user?.first_name || ''}
            userId={ user.id }
            field="first_name"
          />
          <EditProfileField
            label="Sobrenome"
            type="text"
            ref={lastNameRef}
            defaultValue={user?.last_name || ''}
            userId={ user.id }
            field="last_name"
          />
          <EditProfileField
            label="Email"
            type="email"
            ref={emailRef}
            defaultValue={user?.email || ''}
            userId={ user.id }
            field="email"
          />
          <EditProfileField
            label="Telefone"
            type="text"
            ref={phoneNumberRef}
            defaultValue={user?.phone_number || ''}
            userId={ user.id }
            field="phone_number"
          />
          <EditProfileField
            label="Nome de Usuário"
            type="text"
            ref={usernameRef}
            defaultValue={user?.username || ''}
            userId={ user.id }
            field="username"
          />
          {/* <ShowcaseProfileField
            label="Nível de Acesso"
            type="text"
            defaultValue={user?.account_plan || ''}
          />
          <ShowcaseProfileField
            label="Data de Assinatura"
            type="text"
            defaultValue={user?.subscription_date || ''}
          />
          <ShowcaseProfileField
            label="Duração da Assinatura"
            type="text"
            defaultValue={user?.subscription_duration_days || ''}
          />
          <ShowcaseProfileField
            label="Taxa de Assinatura"
            type="text"
            defaultValue={user?.subscription_fee || ''}
          />
          <ShowcaseProfileField
            label="Dias Restantes"
            type="text"
            defaultValue={user?.subscription_missing_days || ''}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default ProfileBoard;