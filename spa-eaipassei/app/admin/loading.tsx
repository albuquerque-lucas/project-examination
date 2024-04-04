'use client';

import React, { useEffect } from 'react';
import { SpinnerLoader } from '@/app/lib/components/Loaders/Loader';
import style from '@/app/ui/admin/loading/loading.module.css'

const Loading: React.FC = () => {

  useEffect(() => {
    console.log('CARREGOU O LOADING');
  }, []);

  return (
      <div className={ style.loading_screen }>
          <span>Carregando dados...</span>
          <div className="spinner">
          <SpinnerLoader />
          </div>
      </div>
  );
};

export default Loading;