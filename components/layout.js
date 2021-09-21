import Navbar from './navbar'
import Footer from './footer'
import React from "react";

import { NavSidebar } from "./NavSidebar";
import BodyWrapper from "./BodyWrapper";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}