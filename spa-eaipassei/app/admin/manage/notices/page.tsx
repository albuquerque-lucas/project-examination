'use client';

import withAuth from "@/app/lib/components/withAuth/withAuth";

function NoticesDashboard() {
  return (
    <div className="notices_content">
      <h1>Editais</h1>
    </div>
  );
}

export default withAuth(NoticesDashboard);