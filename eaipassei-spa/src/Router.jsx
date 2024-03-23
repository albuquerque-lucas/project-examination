import { useRoutes } from "react-router-dom";
import AdminLayout from "./layouts/admin.layout";
import Login from "./pages/admin/Login";
import AdminHome from "./pages/admin/Home";
import Examinations from "./pages/admin/Examinations";
import Notices from "./pages/admin/Notices";

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
      ]
    },
  ]);

  return routing;
}