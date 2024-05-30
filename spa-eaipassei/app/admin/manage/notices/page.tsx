'use client';

import { useRouter } from "next/navigation";
import { useFetchNotices } from "@/app/lib/hooks/useFetchNotices";
import { useCreateNotices } from "@/app/lib/hooks/useCreateNotices";
import { useDeleteNotices } from "@/app/lib/hooks/useDeleteNotices";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import DashboardNotices from "./noticesDashboard";
import { SpinnerLoader } from "@/app/lib/components/Loaders/Loader";
import NoticeNavigationButtons from "./NoticeNavigationButton";
import DeleteNoticePopUp from "@/app/lib/components/ConfirmationPopUp/DeleteNoticePopUp";
import { motion, AnimatePresence } from 'framer-motion';
import MessageBox from "@/app/lib/components/Message/MessageBox";
import layout from '@/app/ui/admin/layout.module.css';
import style from '@/app/ui/admin/pages/notices/notices.module.css';

function NoticesPage() {
  const router = useRouter();
  const { noticeDeletionMode } = useDeleteNotices();
  const {
    notices,
    isLoading,
    currentPage,
  } = useFetchNotices();
  const {
    fileRef,
    idExaminationRef,
    creationMode,
    setCreationMode,
    submitNotice,
    noticeMessage,
    setNoticeMessage,
  } = useCreateNotices();

  return (
    <div className="notices_content">
      <h1 className={ layout.admin_content__title }>
        Dashboard Editais
      </h1>
      <div className={ style.messages_messagebox}>
        <AnimatePresence>
          {
            noticeMessage &&
            <MessageBox
              message={ noticeMessage.message }
              type={ noticeMessage.type }
              setMessage={ setNoticeMessage }
            />
          }
        </AnimatePresence>
      </div>
      <div className={ style.notices_utilitiesbox }>
        <div className={ style.utilities_buttons }>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={ style.go_back__button }
            onClick={() => router.push('/admin/home')}
          >
            Voltar
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={ style.new_examination__button }
            onClick={() => router.push('/admin/manage/examinations')}
          >
            Concursos
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={ style.new_examination__button }
            onClick={() => setCreationMode(!creationMode)}
          >
            Cadastrar
          </motion.button>
          {
            creationMode &&
            <div className={ style.notice_creation__form }>
              <input type="file" ref={ fileRef }/>
              <label htmlFor="examination_id">Concurso nº :</label>
              <input type="number" name='examination_id' ref={ idExaminationRef }/>
              <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{color: '#fff', backgroundColor: '#3393FF'}}
              onClick={() => submitNotice()}
              className={ style.submit_notice__button }
              >
                Adicionar
              </motion.button>
            </div>
          }

        </div>
      </div>
      {isLoading && currentPage === 1 ? (
          <SpinnerLoader />
        ) : (
          <>
            <NoticeNavigationButtons
              links={ notices && notices.links }
            />
            <div className={ style.selected_filters }>
            </div>
            <DashboardNotices
              data={ notices && notices.data }
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