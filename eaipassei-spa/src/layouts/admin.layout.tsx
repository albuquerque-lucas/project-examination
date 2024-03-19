import ScrollToTop from "react-scroll-to-top";
import { ReactNode } from "react";
import './styles/admin.layout.css';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="admin-layout">
    <div className="admin-layout__content">{children}</div>
    <ScrollToTop
        smooth
        color='#fff'
        className='scroll-to-top'
      />
    </div>
  );
}