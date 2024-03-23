import { useRoutes } from "react-router-dom";
import AdminLayout from "./layouts/admin.layout";
import Login from "./pages/admin/Login";
import AdminHome from "./pages/admin/Home";
import Examinations from "./pages/admin/Examinations";
import Notices from "./pages/admin/Notices";
import Users from "./pages/admin/Users";
import Subjects from "./pages/admin/Subjects";

export default function Router() {
  const routing = useRoutes([
    {
      path: "/admin/*",
      element: <AdminLayout />,
      children: [
        { path: 'login', element: <Login />},
        { path: 'home', element: <AdminHome />},
        { path: 'manage/api/examinations', element: <Examinations />},
        { path: 'manage/api/notices', element: <Notices />},
        { path: 'manage/api/users', element: <Users />},
        { path: 'manage/api/subjects', element: <Subjects />},
      ]
    },
  ]);

  return routing;
}