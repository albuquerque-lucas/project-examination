'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetchNotices } from "@/app/lib/hooks/useFetchNotices";
import { useNavigations } from "@/app/lib/hooks/useNavigations";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import DashboardNotices from "./dashboardNotices";
import { SpinnerLoader } from "@/app/lib/components/Loaders/Loader";
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/pages/notices/notices.module.css';
import NoticeNavigationButtons from "./NoticeNavigationButton";

function NoticesPage() {
  const { notices, noticesList, isLoading, noticesLoaded } = useFetchNotices();
  const { navigationLinks, updateNavigationLinks } = useNavigations();
  const router = useRouter();

  useEffect(() => {
    console.log('NoticesList', noticesList);
    if (noticesList.links) {
      console.log('noticesList', noticesList);
      console.log('noticesList.links', noticesList.links);
      updateNavigationLinks(noticesList.links);
    }
  }, [noticesLoaded]);

  return (
    <div className="notices_content">
      <h1 className={ style.notices_headtitle }>
        Editais
      </h1>
      <div className={ style.messages_messagebox}>

      </div>
      <div className={ style.notices_utilitiesbox }>
        <div className={ style.utilities_buttons }>
        <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{color: '#fff', backgroundColor: '#4F525A'}}
              className={ style.go_back__button }
              onClick={() => router.back()}
            >
              Voltar
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{color: '#fff', backgroundColor: '#3393FF'}}
              onClick={() => router.push('/admin/manage/examinations/create')}
              className={ style.new_examination__button }
            >
              Adicionar Concurso
            </motion.button>
        </div>
      </div>
      {isLoading ? (
          <SpinnerLoader />
        ) : (
          <>
            <NoticeNavigationButtons />
            <div className={ style.selected_filters }>
            </div>
            <DashboardNotices
              data={ notices }
            />
          </>
        )}

    </div>
  );
}

export default withAuth(NoticesPage);