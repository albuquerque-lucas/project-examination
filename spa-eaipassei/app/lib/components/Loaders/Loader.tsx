import { SpinnerCircular } from 'spinners-react';
import style from '@/app/ui/admin/loading/loading.module.css'

export const SpinnerLoader = () => {
  return (
    <div className={ style.loading_screen }>
      <SpinnerCircular
        size={ 80 }
        color='#fff'
        />
    </div>
  );
}