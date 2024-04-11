'use client';

import { useEffect } from "react";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import DashboardNotices from "@/app/lib/components/DashboardTable/dashboardNotices";
import style from '@/app/ui/admin/pages/notices/notices.module.css';

function NoticesDashboard() {
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

export default withAuth(NoticesDashboard);