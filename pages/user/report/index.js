import { Component } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import Cookies from "js-cookie";
import swal from "sweetalert";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportData: [],
      authToken: Cookies.get("token")
        ? Cookies.get("token")
        : Cookies.get("refreshToken")
        ? Cookies.get("refreshToken")
        : undefined,
    };
    this.logOut = this.logOut.bind(this);
  }

  async componentDidMount() {
    const role = localStorage.getItem("role");

    if (this.state.authToken === undefined) {
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      Router.push("/login");
    } else {
      if (role === "admin") {
        Router.push("/admin");
      } else if (role === undefined) {
        Router.push("/login");
      }
    }

    if (this.state.authToken === undefined) {
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      Router.push("/login");
    }

    const res = await fetch(
      "http://localhost:3307/attendance/user-attendance-report?year=2021&month=10",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.state.authToken,
        },
      }
    );
    const data = await res.json();
    this.setState({ reportData: data.data });
  }

  logOut(e) {
    e.preventDefault();

    fetch("http://localhost:3307/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.authToken,
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
  }

  render() {
    const { reportData } = this.state;
    return (
      <>
        <Head>
          <title>Report</title>
          <meta name="keywords" content="report" />
        </Head>

        <div className="flex flex-col h-screen">
          <header className="h-[100px] md:h-[160px] bg-light-green text-dark-green p-3 ">
            <div className="flex justify-between items-center">
              <div className="hidden md:contents">
                <Image
                  src="/logo.png"
                  alt="Glints Logo"
                  width={140}
                  className="w-[146px]"
                  height={140}
                ></Image>
              </div>
              <div className="md:hidden contents">
                <Image
                  src="/logo.png"
                  alt="Glints Logo"
                  width={90}
                  className="w-[146px]"
                  height={90}
                ></Image>
              </div>
              <div className="flex flex-row text-center ">
                <h1 className="text-3xl md:text-6xl">
                  {new Date()
                    .toLocaleDateString("en-GB", {
                      weekday: "short",
                    })
                    .replace(/ /g, " ")}
                </h1>
                <div className="flex flex-col text-center">
                  <h1 className="text-xs md:text-lg">
                    {new Date()
                      .toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })
                      .replace(/ /g, " ")}
                  </h1>
                  <h1 className="text-xs md:text-lg">
                    {new Date()
                      .toLocaleDateString("en-GB", {
                        year: "numeric",
                      })
                      .replace(/ /g, " ")}
                  </h1>
                </div>
                <h1 className="text-3xl md:text-6xl">
                  {new Date().toLocaleTimeString("en-GB", {
                    hourCycle: "h23",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </h1>
              </div>
              <div className="pr-3 flex flex-col">
                <button
                  onClick={this.logOut}
                  className="w-35 md:w-44 md:h-[40px] h-[25px] rounded-md shadow-md bg-dark-green text-primary-green cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            </div>
          </header>
          <main className="p-4 bg-white overflow-auto md:overscroll-contain lg:overscroll-none ">
            <div className="p-1 md:p-3 flex flex-col text-dark-green text-base md:text-xl">
              <table className="items-center w-full bg-transparent border-collapse text-center flex-grow">
                <thead>
                  <tr>
                    <th
                      className={
                        "px-3 md:px-6 align-middle border border-solid py-3 text-sm md:text-xl border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"
                      }
                    >
                      Name
                    </th>
                    <th
                      className={
                        "px-3 md:px-6 align-middle border border-solid py-3 text-sm md:text-xl border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"
                      }
                    >
                      Working Date
                    </th>
                    <th
                      className={
                        "px-3 md:px-6 align-middle border border-solid py-3 text-sm md:text-xl border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"
                      }
                    >
                      Check In{" "}
                    </th>
                    <th
                      className={
                        "px-3 md:px-6 align-middle border border-solid py-3 text-sm md:text-xl border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"
                      }
                    >
                      Check Out
                    </th>
                    <th
                      className={
                        "px-3 md:px-6 align-middle border border-solid py-3 text-sm md:text-xl border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"
                      }
                    >
                      Working Hours
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reportData &&
                    reportData.reverse().map((absence, index) => (
                      <tr key={index}>
                        <th className="font-normal text-xs md:text-lg px-3 md:px-6 py-2">
                          {" "}
                          {absence.User.name}
                        </th>
                        <th className="font-normal text-xs md:text-lg px-3 md:px-6 py-2">
                          {absence.date}
                        </th>
                        <th className="font-normal text-xs md:text-lg px-3 md:px-6 py-2">
                          {" "}
                          {absence.checkInTime}
                        </th>
                        <th className="font-normal text-xs md:text-lg px-3 md:px-6 py-2">
                          {absence.checkOutTime}
                        </th>
                        <th className="font-normal text-xs md:text-lg px-3 md:px-6 py-2">
                          {absence.workingHourView}
                        </th>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </main>
          <footer className="md:h-[80px] h-[100px] p-2 bg-dark-green place-content-center">
            <div className="align-middle place-content-center md:flex grid">
              <button className="m-2 w-40 md:w-44 md:h-[40px] h-[25px] rounded-md shadow-md bg-light-green text-dark-green cursor-pointer">
                <Link href="/user">Maps</Link>
              </button>
            </div>
          </footer>
        </div>
      </>
    );
  }
}
export default Report;
