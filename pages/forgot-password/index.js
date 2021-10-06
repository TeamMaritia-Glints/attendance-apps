import { Component } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import swal from "sweetalert";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, field) {
    this.setState({
      [field]: event.target.value,
    });
  }

  componentDidMount() {
    const token = Cookies.get("token");
    if (token !== undefined) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.data.role === "admin") {
        Router.push("/admin");
      } else if (decodedToken.data.role === "employee") {
        Router.push("/user");
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const forgotData = {
      email: this.state.email,
    };

    fetch("https://attendance-employee.herokuapp.com/auth/forgotpw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(forgotData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === "error") {
          if (typeof data.message === "object") {
            throw Error(data.message[0].message);
          } else {
            throw Error(data.message);
          }
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
  };

  render() {
    return (
      <>
        <Head>
          <title>Attendance App - Forgot Password</title>
          <meta name="keywords" content="forgot-password" />
        </Head>

        <div className="sm:bg-wave bg-no-repeat bg-bottom">
          <div className="flex h-screen">
            <div className="m-auto px-12">
              <div className="flex justify-center">
                <Image
                  src="/logo.png"
                  alt="Glints Logo"
                  width={200}
                  height={200}
                ></Image>
              </div>
              <div className="p-[20px] sm:mb-[80px]">
                <form onSubmit={this.handleSubmit}>
                  <p className="mb-6 text-center text-primary-blue">
                    Insert your email to reset the password
                  </p>
                  <div className="flex gap-4 mb-[15px]">
                    <input
                      className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                      type="email"
                      placeholder="Email"
                      required
                      value={this.state.email}
                      onChange={(event) => this.handleChange(event, "email")}
                    />
                  </div>
                  <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue">
                    Send
                  </button>
                </form>
                <p className="mt-4 text-primary-blue">
                  Back to{" "}
                  <span className="text-primary-green">
                    <Link href="/login">
                      <a>Login</a>
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ForgotPassword;
