import type { FC } from "react";
import { Outlet } from "react-router-dom";

import "./layout.styles.scss";

const Layout: FC = () => {
  return (
    <div className="wrapper">
      <Outlet />
    </div>
  );
};

export default Layout;
