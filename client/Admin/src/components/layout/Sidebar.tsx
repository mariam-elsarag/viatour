import React from "react";
import {
  BoxIcon,
  CallIcon,
  DesktopIcon,
  LoginIcon,
  StatIcon,
  UserAddIcon,
  UsersIcon,
} from "../../assets/icons/Icon";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "../../assets/images/images";
import Button from "../shared/button/Button";
import { useAuth } from "../../context/auth/Auth_Context";

type SidbarType = {
  isOpen: boolean;
  onClose: () => void;
};
const navList = [
  { link: "/", link_name: "Statistics", icon: StatIcon },
  { link: "users", link_name: "Users", icon: UsersIcon },
  { link: "applications", link_name: "Applications", icon: UserAddIcon },
  { link: "packages", link_name: "Packages", icon: BoxIcon },
  { link: "support", link_name: "Support", icon: CallIcon },
  { link: "website", link_name: "Website", icon: DesktopIcon },
];
const Sidebar: React.FC<SidbarType> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  return (
    <div
      className={`h-dvh md:h-[calc(100vh_-_48px)] fixed ${
        isOpen ? "  bg-black/10 md:bg-transparent inset-0 z-50" : ""
      } md:relative `}
    >
      <aside
        className={` fixed top-0 bottom-0 md:top-6 md:bottom-6 start-0 md:start-6 transition-all ease-in-out duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-[260px] bg-white rounded-tr-2xl rounded-br-2xl md:rounded-2xl h-[calc(100%_-_48px)] main_shadow px-6 py-6 flex flex-col gap-10 justify-between `}
      >
        <Link to="/" className="">
          <img src={Logo} alt="logo" className="h-[26px]" />
        </Link>
        <div className="flex-1 flex flex-col gap-3">
          {navList?.map((item) => {
            const Icon = item?.icon;
            return (
              <NavLink key={item?.link} to={item?.link} onClick={onClose}>
                {({ isActive }) => (
                  <div
                    className={`body_lg rounded-lg min-h-[40px] px-4 font-medium transition-colors ease-in-out duration-200  ${
                      isActive
                        ? "bg-primary-500 text-white "
                        : "text-neutral-500"
                    } flex items-center gap-2`}
                  >
                    {item?.icon && (
                      <Icon
                        fill={isActive ? "white" : "var(--color-neutral-500)"}
                      />
                    )}
                    {item?.link_name}
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>
        <Button
          size="md"
          round="lg"
          type="error_tertiery"
          onClick={() => {
            logout();
            onClose();
          }}
          iconRight={
            <span className="rotate-180">
              <LoginIcon fill="var(--color-error-700)" />
            </span>
          }
          className=" !justify-start !text-start"
        >
          Logout
        </Button>
      </aside>
    </div>
  );
};

export default Sidebar;
