import { useContext, useEffect } from "react";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import ExaminationsLink from "./examinationsLink";
import SubjectsLink from "./subjectsLink";
import NoticesLink from "./noticesLink";
import UsersLink from "./userLink";
import LogoutLink from "./logoutLink";
import StudyAreasLink from "./StudyAreasLink";
import { AuthContext } from "@/app/lib/context/AuthContext";
import { makeLogout } from "@/app/lib/api/authenticationAPI";
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
  return (
    user !== null ? (
      <div>
        <UsersLink />
        <ExaminationsLink />
        <NoticesLink />
        <SubjectsLink />
        <StudyAreasLink />
        <LogoutLink logout={ handleLogout } />
      </div>
    ) : (
      <div></div>
    )
  )
}

export default withAuth(AuthenticatedOnlyLinksBundle);