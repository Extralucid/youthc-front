import { Sidebar, Home, LayoutDashboard, StickyNote, Calendar, Layers, Flag, Settings, LifeBuoy } from "lucide-react";
import { ReactNode, ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux-hooks";

interface LayoutProps {
  children: ReactNode;
}

// Check out the documentation for Configuring your Layout for more information:
// - https://react-md.dev/guides/configuring-your-layout
export default function AuthLayout(): ReactElement {
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  if (basicUserInfo) {
    return <Navigate replace to={"/"} />;
  }

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
    
  );
}