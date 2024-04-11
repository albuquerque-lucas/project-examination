'use client';

import { useEffect } from "react";
import { useFetchNotices } from "@/app/lib/hooks/useFetchNotices";
import { useNavigations } from "@/app/lib/hooks/useNavigations";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import DashboardNotices from "@/app/lib/components/DashboardTable/dashboardNotices";
import style from '@/app/ui/admin/pages/notices/notices.module.css';

function NoticesPage() {
  const { noticesList, isLoading, loaded } = useFetchNotices();
  const { navigationLinks, updateNavigationLinks } = useNavigations();

  useEffect(() => {
    console.log('NoticesList', noticesList);
    if (noticesList.links) {
      console.log('noticesList', noticesList);
      console.log('noticesList.links', noticesList.links);
      updateNavigationLinks(noticesList.links);
    }
  }, [loaded]);

  return (
    <div className="notices_content">
      <h1>Editais</h1>
      <div className={ style.messages_messagebox}>

      </div>
      <div className={ style.notices_utilitiesbox }>

      </div>
      <DashboardNotices />
    </div>
  );
}

export default withAuth(NoticesPage);