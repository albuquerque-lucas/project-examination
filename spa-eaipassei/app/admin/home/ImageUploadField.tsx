import React, { RefObject, forwardRef } from 'react';
import style from '@/app/ui/admin/home/EditProfileField.module.css';

interface ImageUploadFieldProps {
  label: string;
}

const ImageUploadField = forwardRef<HTMLInputElement, ImageUploadFieldProps>(function({ label }, ref) {
  return (
    <div className={`${style.panel_case__edit_profile_field} ${style.panel_case__edit_profile__image}`}>
      <label htmlFor="profile_img_input">{label}</label>
      <input ref={ref} type="file" />
    </div>
  );
});

ImageUploadField.displayName = 'ImageUploadField';

export default ImageUploadField;