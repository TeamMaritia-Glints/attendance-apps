import { useState } from "react";
import Router from "next/router";
import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";

const Layout = ({ children }) => {
  const [showMe, setShowMe] = useState(false);

  const menu = () => {
    setShowMe(!showMe);
  };

  const logout = (e) => {
    e.preventDefault();

    fetch("https://attendance-employee.herokuapp.com/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
    }).then(() => {
      Cookies.remove("token");
      Cookies.remove("refreshToken");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      swal({
        text: "Logout Successful!",
        icon: "success",
      });
      Router.push("/");
    });
  };

  return (
    <>
      <Head>
        <title>Attendance App - Admin</title>
        <meta name="keywords" content="admin" />
      </Head>

      <div className="flex">
        <aside className="relative bg-primary-blue h-screen w-64 hidden sm:block shadow-xl">
          <nav className="text-white text-base font-normal pt-3">
            <Link href="/admin">
              <a className="flex items-center mt-8 py-4 pl-6 hover:bg-primary-green">
                <span className="mr-3" />
                <p className="text-lg">Home</p>
              </a>
            </Link>
            <Link href="/admin/worker">
              <a className="flex items-center py-4 pl-6 hover:bg-primary-green">
                <span className="mr-3" />
                <p className="text-lg">Worker</p>
              </a>
            </Link>
            <Link href="/admin/office">
              <a className="flex items-center py-4 pl-6 hover:bg-primary-green">
                <span className="mr-3" />
                <p className="text-lg">Office</p>
              </a>
            </Link>
            <a
              onClick={logout}
              className="flex items-center py-4 pl-6 hover:bg-primary-green cursor-pointer"
            >
              <span className="mr-3" />
              <p className="text-lg">Logout</p>
            </a>
          </nav>
        </aside>

        <div className="w-full flex flex-col h-screen overflow-y-hidden">
          {/* Desktop */}
          <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
            <div className="w-1/2"></div>
            <div className="relative w-1/2 flex justify-end">
              <button className="realtive w-12 h-12 rounded-full overflow-hidden border-2 border-black">
                <img src="/default-picture.png" />
              </button>
              <p className="py-4 pl-4 pr-8">Admin</p>
            </div>
          </header>

          {/* Mobile */}
          <header className="w-full bg-sidebar py-5 px-6 sm:hidden">
            <div className="flex items-center justify-between">
              <div className="flex">
                <button className="realtive w-12 h-12 rounded-full overflow-hidden border-2 border-black">
                  <img src="/default-picture.png" />
                </button>
                <p className="py-4 pl-4 pr-8">Admin</p>
              </div>
              <svg
                onClick={menu}
                className="cursor-pointer"
                viewBox="0 0 100 80"
                width="30"
                height="30"
              >
                <rect width="100" height="20"></rect>
                <rect y="30" width="100" height="20"></rect>
                <rect y="60" width="100" height="20"></rect>
              </svg>
            </div>

            <nav
              className={
                showMe === false
                  ? "hidden"
                  : "flex flex-col mt-4 py-4 rounded bg-primary-blue visible"
              }
            >
              <Link href="/admin">
                <a className="flex items-center active-nav-link text-white py-2 pl-4 nav-item">
                  <span className="mr-3"></span>
                  <p>Home</p>
                </a>
              </Link>
              <Link href="/admin/worker">
                <a className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                  <span className="mr-3"></span>
                  <p>Worker</p>
                </a>
              </Link>
              <Link href="/admin/office">
                <a className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item">
                  <span className="mr-3"></span>
                  <p>Office</p>
                </a>
              </Link>
              <a
                onClick={logout}
                className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item cursor-pointer"
              >
                <span className="mr-3"></span>
                <p>Logout</p>
              </a>
            </nav>
          </header>

          <div className="w-full overflow-x-hidden border-t flex flex-col">
            <main className="w-full flex-grow p-6"></main>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
