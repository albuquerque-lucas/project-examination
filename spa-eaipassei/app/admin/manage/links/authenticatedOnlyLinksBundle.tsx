import { useContext, useEffect } from "react";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import ExaminationsLink from "./examinationsLink";
import SubjectsLink from "./subjectsLink";
import NoticesLink from "./noticesLink";
import UsersLink from "./userLink";
import LogoutLink from "./logoutLink";
import { AuthContext } from "@/app/lib/context/AuthContext";
import { makeLogout } from "@/app/lib/axios/axios";
import { useRouter } from "next/navigation";


function AuthenticatedOnlyLinksBundle() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
  }, [user]);
  const handleLogout = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const resp = await makeLogout();
      console.log('Logout efetuado com sucesso.');
      console.log(resp);
      setUser(null);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  console.log('Esta sendo renderizado.');
  return (
    user !== null ? (
      <div>
        <UsersLink />
        <ExaminationsLink />
        <NoticesLink />
        <SubjectsLink />
        <LogoutLink logout={ handleLogout } />
      </div>
    ) : (
      <div></div>
    )
  )
}
export default withAuth(AuthenticatedOnlyLinksBundle);