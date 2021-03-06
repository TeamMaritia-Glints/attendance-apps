import { Component } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import Geo from "./location";
import Cookies from "js-cookie";
import swal from "sweetalert";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      checkInTime: "",
      checkInLocation: "",
      lat: "",
      lng: "",
      authToken: Cookies.get("token")
        ? Cookies.get("token")
        : Cookies.get("refreshToken")
        ? Cookies.get("refreshToken")
        : undefined,
    };
    this.handleCheckin = this.handleCheckin.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
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

    if (!!navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => err,
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
      );
    } else {
      alert("The browser does not support geolocation");
    }
  }

  handleCheckin() {
    const payload = {
      checkInTime: new Date(),
      checkInLocation: {
        longitude: this.state.lng,
        latitude: this.state.lat,
      },
    };

    fetch("http://localhost:3307/attendance/check-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.authToken,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === "error") {
          throw Error(data.message);
        } else {
          swal({
            text: data.message,
            icon: "success",
          });
        }
      })
      .catch((err) => {
        swal({
          text: err.message,
          icon: "warning",
        });
      });
  }

  handleCheckout() {
    const payload = {
      checkOutTime: new Date(),
      checkOutLocation: {
        longitude: this.state.lng,
        latitude: this.state.lat,
      },
    };

    fetch("http://localhost:3307/attendance/check-out", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.authToken,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === "error") {
          throw Error(data.message);
        } else {
          swal({
            text: data.message,
            icon: "success",
          });
        }
      })
      .catch((err) => {
        swal({
          text: err.message,
          icon: "warning",
        });
      });
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
    return (
      <>
        <Head>
          <title>Dashboard</title>
          <meta name="keywords" content="dashboard" />
        </Head>

        <div className="flex flex-col h-screen">
          <header className="h-[100px] md:h-[160px] bg-light-green text-dark-green">
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
                  className=" w-35 md:w-44 md:h-[40px] h-[25px] rounded-md shadow-md bg-dark-green text-primary-green cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            </div>
          </header>
          <main className="p-4 flex-grow bg-white flex-col">
            <Geo />
            <div className="md:h-[80px] h-[80px] p-2 bg-gray place-content-center"></div>
          </main>
          <footer className="md:h-[80px] h-[135px] p-2 bg-dark-green place-content-center">
            <div className="align-middle place-content-center md:flex grid">
              <button
                onClick={this.handleCheckin}
                className="m-2 w-40 md:w-44 md:h-[40px] h-[25px] rounded-md shadow-md bg-primary-green text-dark-green cursor-pointer"
              >
                Check In
              </button>
              <button
                onClick={this.handleCheckout}
                className="m-2 w-40 md:w-44 md:h-[40px] h-[25px] rounded-md shadow-md bg-primary-green text-dark-green cursor-pointer"
              >
                Check Out
              </button>
              <button className="m-2 w-40 md:w-44 md:h-[40px] h-[25px] rounded-md shadow-md bg-light-green text-dark-green cursor-pointer">
                <Link href="/user/report">
                  <a>Absence Report</a>
                </Link>
              </button>
            </div>
          </footer>
        </div>
      </>
    );
  }
}
export default User;
