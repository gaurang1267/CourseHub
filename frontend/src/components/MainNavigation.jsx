import React, { useState } from "react";
import { Form, NavLink, Link, useRouteLoaderData } from "react-router-dom";
import { getUserFromLocalStorage } from "../Utils/Auth";
import { FaUserCircle, FaBars } from "react-icons/fa";
import "./MainNavigation.css";

const MainNavigation = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const token = useRouteLoaderData("root");
  const {
    role = " ",
    isApproved = " ",
    username = " ",
  } = getUserFromLocalStorage();
  return (
    <>
      <nav className="main-nav sticky">
        <Link to="/">
          <div className="main-nav__logo"></div>
        </Link>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>
            <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active" : "")}
                end
              >
                Home
              </NavLink>
            </li>
            <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <NavLink
                to="/courses"
                className={({ isActive }) => (isActive ? "active" : "")}
                end
              >
                Courses
              </NavLink>
            </li>
            {token && role === "admin" && (
              <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
                <NavLink
                  to="/admin-approval"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Approvals
                </NavLink>
              </li>
            )}
            {token && (role === "admin" || role === "artist") && (
              <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
                <NavLink
                  to="/courses/new"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  New Course
                </NavLink>
              </li>
            )}
            {!token && (
              <>
                <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Login
                  </NavLink>
                </li>
                <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
                  <NavLink
                    to="/signup"
                    className={({ isActive }) => (isActive ? "active" : "")}
                    end
                  >
                    Signup
                  </NavLink>
                </li>
              </>
            )}
            {token && role === "user" && (
              <>
                <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
                  <NavLink
                    to={`/my-courses`}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    My Courses
                  </NavLink>
                </li>
              </>
            )}
            {token && role === "user" && (
              <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
                <NavLink
                  to={`/user-transactions`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Transactions
                </NavLink>
              </li>
            )}
            {token && role === "artist" && (
              <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
                <NavLink
                  to={`/artist-transactions`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Transactions
                </NavLink>
              </li>
            )}
            {token && role === "admin" && (
              <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
                <NavLink
                  to={`/admin-transactions`}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Transactions
                </NavLink>
              </li>
            )}
            {token && (
              <>
                <li onClick={() => setShowMediaIcons(!showMediaIcons)}>
                  <Form action="/logout" method="post">
                    <button>Logout</button>
                  </Form>
                </li>
              </>
            )}
          </ul>
        </div>
        {username && (
          <div className="end--nav">
            <ul>
              <li>
                <div className="user">
                  <span className="icon">
                    <FaUserCircle />
                  </span>
                  <a className={({ isActive }) => (isActive ? "active" : "")}>
                    {username}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        )}

        <div className="responsive__nav">
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <FaBars color="#00b4d8" />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNavigation;
