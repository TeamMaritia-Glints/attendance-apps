import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Sidebar = () => {
  const router = useRouter();

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
      router.push("/");
    });
  };

  return (
    <div className="min-h-screen flex flex-row float-left">
      <div className="flex flex-col w-60 bg-white overflow-hidden bg-green-50">
        <div className="flex items-center justify-center my-12">
        <Image
                src="/logo.png"
                alt="Glints Logo"
                width={100}
                height={100}
              ></Image>
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <Link href="../../admin">
              <a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-glintsBlack hover:text-glintsRed">
                <span className="inline-flex items-center justify-center h-12 w-12"></span>
                <p className="text-sm font-bold">Home</p>
              </a>
            </Link>
          </li>
          <li>
            <Link href="../../admin/userManajemen">
            <a
              href="#"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-glintsBlack hover:text-glintsRed"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"></span>
              <p className="text-sm font-bold">Worker</p>
            </a>
            </Link>
          </li>
          <li>
            <Link href="../../admin/office">
            <a
              href="#"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-glintsBlack hover:text-glintsRed"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"></span>
              <p className="text-sm font-bold">Office</p>
            </a>
            </Link>
          </li>
          <li onClick={logout}>
            <a className="flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200">
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"></span>
              <p className="text-xl cursor-pointer">Logout</p>
            </a>
          </li>
          
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;