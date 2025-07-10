import { ReactNode, ReactElement } from "react";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

// Check out the documentation for Configuring your Layout for more information:
// - https://react-md.dev/guides/configuring-your-layout
export default function ErrorLayout(): ReactElement {

  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}