import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  /**const logout = (e) => {
    e.preventDefault();

    if (typeof Storage !== "undefined") {
      const token = localStorage.getItem("token");

      fetch("https://todolist-api-glints.herokuapp.com/users/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
      }).then(() => {
        localStorage.removeItem("logged");
        localStorage.removeItem("token");
        localStorage.removeItem("rememberToken");
        router.push("/");
      });
    }
  };*/

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
            <Link href="../../admin/user">
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
          
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;