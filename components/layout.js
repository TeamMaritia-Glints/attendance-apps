import Head from "next/head";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Attendance App</title>
        <meta name="keywords" content="admin" />
      </Head>

      <div className="content">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default Layout;
