import React, { useRef } from 'react';
import { User } from '@/app/lib/types/userTypes';
import style from '@/app/ui/admin/home/profileBoard.module.css';
import EditProfileField from './EditProfileField';
import ImageUploadField from './ImageUploadField';
import ShowcaseProfileField from './ShowcaseProfileField';

function ProfileBoard({ user }: { user: User}) {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const usernameRef = useRef(null);
  const imageRef = useRef(null);

  return (
    <div className={`${style.panel_case} ${style.panel_case__edit_profile}`}>
      <h3>Editar Perfil</h3>
      <div>
        <ImageUploadField label="Imagem" ref={ imageRef } />
        <div className={style.panel_case__edit_profile__data}>
          <EditProfileField
            label="Nome"
            type="text" ref={firstNameRef}
            defaultValue={user?.first_name || ''}
          />
          <EditProfileField
            label="Sobrenome"
            type="text" ref={lastNameRef}
            defaultValue={user?.last_name || ''}
          />
          <EditProfileField
            label="Email"
            type="email" ref={emailRef}
            defaultValue={user?.email || ''}
          />
          <EditProfileField
            label="Telefone"
            type="text" ref={phoneNumberRef}
            defaultValue={user?.phone_number || ''}
          />
          <EditProfileField
            label="Nome de Usuário"
            type="text" ref={usernameRef}
            defaultValue={user?.username || ''}
          />
          <ShowcaseProfileField
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
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileBoard;