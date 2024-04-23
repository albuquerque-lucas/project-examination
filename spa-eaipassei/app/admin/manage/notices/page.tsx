'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetchNotices } from "@/app/lib/hooks/useFetchNotices";
import { useNavigations } from "@/app/lib/hooks/useNavigations";
import { useCreateNotices } from "@/app/lib/hooks/useCreateNotices";
import { useDeleteNotices } from "@/app/lib/hooks/useDeleteNotices";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import DashboardNotices from "./dashboardNotices";
import { SpinnerLoader } from "@/app/lib/components/Loaders/Loader";
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/pages/notices/notices.module.css';
import NoticeNavigationButtons from "./NoticeNavigationButton";
import DeleteNoticePopUp from "@/app/lib/components/ConfirmationPopUp/DeleteNoticePopUp";

function NoticesPage() {
  const { noticeDeletionMode } = useDeleteNotices();
  const { notices, noticesList, isLoading, noticesLoaded, currentPage } = useFetchNotices();
  const { updateNavigationLinks } = useNavigations();
  const {
    submitNotices,
    fileRef,
    idExaminationRef,
    creationMode,
    setCreationMode,
    addToSubmitList,
  } = useCreateNotices();
  const router = useRouter();

  useEffect(() => {
    if (noticesList.links) {
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
            className={ style.new_examination__button }
            onClick={() => setCreationMode(!creationMode)}
          >
            Adicionar Edital
          </motion.button>
          {
            creationMode &&
            <div className={ style.notice_creation__form }>
              <input type="file" ref={ fileRef }/>
              <label htmlFor="examination_id">Id</label>
              <input type="number" name='examination_id' ref={ idExaminationRef }/>
              <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{color: '#fff', backgroundColor: '#3393FF'}}
              onClick={() => addToSubmitList()}
              className={ style.submit_notice__button }
              >
                Adicionar
              </motion.button>
              <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{color: '#fff', backgroundColor: '#3393FF'}}
              onClick={() => submitNotices()}
              className={ style.submit_notice__button }
            >
              Submit
            </motion.button>
            </div>
          }

        </div>
      </div>
      {isLoading && currentPage === 1 ? (
          <SpinnerLoader />
        ) : (
          <>
            <NoticeNavigationButtons />
            <div className={ style.selected_filters }>
            </div>
            <DashboardNotices
              data={ notices }
            />
            {
              noticeDeletionMode &&
              <DeleteNoticePopUp />
            }
          </>
        )}

    </div>
  );
}

export default withAuth(NoticesPage);