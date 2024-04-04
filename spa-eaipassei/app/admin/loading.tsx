'use client';

import React, { useEffect } from 'react';
import style from '@/app/ui/admin/loading/loading.module.css'

const Loading: React.FC = () => {

  useEffect(() => {
    console.log('CARREGOU O LOADING');
  }, []);

  return (
      <div className={ style.loading_title }>
          <p>Carregando dados...</p>
          <div className="spinner"></div>
      </div>
  );
};

export default Loading;