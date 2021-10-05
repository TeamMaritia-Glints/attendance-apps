import Router from "next/router";
import Cookies from "js-cookie";

export default function Home() {
  const token = Cookies.get("token");

  if (typeof Storage !== "undefined") {
    Router.push("/login");
  }
  return <></>;
}
