import Navbar from './navbar'
//import Footer from './footer'
import React from "react";
import Sidebar from './sidebar';


export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      
      
      <div className="content">
        <Sidebar />
        {children}
      </div>

    </>
  )
}