import { Component } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import swal from "sweetalert";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      isSame: false,
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

    const queryString = typeof window !== "undefined" && window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const token = urlParams.get("token");
    const id = urlParams.get("id");

    const resetData = {
      password: this.state.password,
      confirmpassword: this.state.confirmPassword,
    };

    fetch(
      `https://attendance-employee.herokuapp.com/auth/passwordreset?token=${token}&id=${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resetData),
      }
    )
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
          Router.push("/login");
        }
      })
      .catch((err) => {
        swal({
          text: err.message,
          icon: "warning",
        });
      });
  };

  checkConfirmPassword = () => {
    if (this.state.password === this.state.confirmPassword) {
      this.setState({ isSame: true });
    } else {
      this.setState({ isSame: false });
    }
  };

  render() {
    return (
      <>
        <Head>
          <title>Attendance App - Reset Password</title>
          <meta name="keywords" content="reset-password" />
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
                    Insert your new password to finish
                  </p>
                  <div className="flex gap-4 mb-[15px]">
                    <input
                      className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                      type="password"
                      placeholder="New Password"
                      required
                      value={this.state.password}
                      onChange={(event) => this.handleChange(event, "password")}
                    />
                  </div>
                  <div className="flex gap-4 mb-[15px]">
                    <input
                      className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                      type="password"
                      placeholder="Confirm New Password"
                      required
                      value={this.state.confirmPassword}
                      onChange={(event) =>
                        this.handleChange(event, "confirmPassword")
                      }
                      onKeyUp={this.checkConfirmPassword}
                    />
                  </div>
                  {this.state.isSame && (
                    <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue">
                      Reset Password
                    </button>
                  )}
                  {!this.state.isSame && (
                    <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue cursor-not-allowed">
                      Reset Password
                    </button>
                  )}
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

export default ResetPassword;
