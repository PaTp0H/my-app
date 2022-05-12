import type { FC } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../layout/layout.component";

import { Main, Profile } from "../../pages";

const Routing: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="*" element={<>Page not found</>} />
      </Route>
    </Routes>
  );
};

export default Routing;
