import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../style/layout.css";

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.users);
  const userMenu = [
    {
      name: "Home",
      icon: "ri-home-line",
      path: "/",
    },
    {
      name: "Bookings",
      icon: "ri-file-list-line",
      path: "/bookings",
    },
    {
      name: "Logout",
      icon: "ri-logout-box-line",
      path: "/logout",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
  let activeRoute = window.location.pathname;
  if (window.location.pathname.includes("book-now")) {
    activeRoute = "/";
  }

  return (
    <>
      <div className="layout-parent">
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-title">
              <img
                src="https://purepng.com/public/uploads/large/purepng.com-red-busbusvehiclecarrying-passengerslarge-motor-vehiclecoachminibus-1701528460580qhzm6.png"
                alt="busLogo"
                className="sidebar-buslogo"
              />
              <h1 className="logo">BB</h1>
            </div>
            <h1 className="role">
              {user?.fullName} <br />
              Role : {user?.isAdmin ? "Admin" : "User"}
            </h1>
          </div>
          <div className="d-flex flex-column gap-3 justify-content-start menu">
            {menuToBeRendered.map((item, index) => {
              return (
                <div
                  className={`${
                    activeRoute === item.path && "active-menu-item"
                  } menu-item`}
                >
                  <i className={item.icon}></i>
                  {!collapsed && (
                    <span
                      onClick={() => {
                        if (item.path === "/logout") {
                          localStorage.removeItem("token");
                          navigate("/login");
                        } else {
                          navigate(item.path);
                        }
                      }}
                    >
                      {item.name}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="body">
          <div className="header">
            <div className="d-flex justify-content-between p-3">
              <div className="d-flex align-content-center header-title">
                <i className="ri-bus-line header-busIcon"></i>
                <h3 className="text-white">BusBuddy</h3>
              </div>
              <div className="header-user">
                <div>{user?.fullName}</div>
                <i
                  className="ri-logout-box-r-line header-logout"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                ></i>
              </div>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
