import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { useState } from "react";

const App_Layout = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  return (
    <section className=" bg-[#fcfffe] overflow-x-hidden min-h-[100vh] flex  items-start md:gap-6 lg:gap-8 p-4 sm:p-6">
      <Sidebar
        isOpen={toggleSidebar}
        onClose={() => {
          setToggleSidebar(false);
        }}
      />
      <div
        className={`${
          toggleSidebar ? "w-full ms-0" : ""
        } md:ms-auto md:w-[calc(100%_-_260px_-_24px)]`}
      >
        <Outlet />
      </div>
    </section>
  );
};

export default App_Layout;
