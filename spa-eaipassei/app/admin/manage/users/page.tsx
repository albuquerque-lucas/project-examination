'use client';

import withAuth from "@/app/lib/components/withAuth/withAuth";

function UsersDashboard() {
  return (
    <div className="users_content">
      <h1>Usuários</h1>
    </div>
  );
}
export default withAuth(UsersDashboard);