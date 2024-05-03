import React, { useRef } from 'react';
import { User } from '@/app/lib/types/userTypes';
import style from '@/app/ui/admin/home/profileBoard.module.css';
import EditProfileField from './EditProfileField';
import ImageUploadField from './ImageUploadField';

function ProfileBoard({ user }: { user: User}) {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const usernameRef = useRef(null);
  const accountPlanRef = useRef(null);
  const subscriptionDateRef = useRef(null);
  const subscriptionDurationDaysRef = useRef(null);
  const subscriptionFeeRef = useRef(null);
  const subscriptionMissingDaysRef = useRef(null);
  const imageRef = useRef(null);

  return (
    <div className={`${style.panel_case} ${style.panel_case__edit_profile}`}>
      <h3>Editar Perfil</h3>
      <div>
        <ImageUploadField label="Imagem" ref={ imageRef } />
        <div className={style.panel_case__edit_profile__data}>
          <EditProfileField label="Nome" type="text" ref={firstNameRef} defaultValue={user?.first_name || ''} />
          <EditProfileField label="Sobrenome" type="text" ref={lastNameRef} defaultValue={user?.last_name || ''} />
          <EditProfileField label="Email" type="email" ref={emailRef} defaultValue={user?.email || ''} />
          <EditProfileField label="Telefone" type="text" ref={phoneNumberRef} defaultValue={user?.phone_number || ''} />
          <EditProfileField label="Nome de Usuário" type="text" ref={usernameRef} defaultValue={user?.username || ''} />
        </div>
      </div>
    </div>
  )
}

export default ProfileBoard;