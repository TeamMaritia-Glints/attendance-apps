import { Component } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import swal from "sweetalert";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
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

    const fullName = this.state.lastName
      ? `${this.state.firstName} ${this.state.lastName}`
      : this.state.firstName;

    const signUpData = {
      name: fullName,
      email: this.state.email,
      password: this.state.password,
      confirmpassword: this.state.confirmPassword,
      role: "employee",
      status: false,
    };

    fetch("http://localhost:3307/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpData),
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
          <title>Attendance App - Register</title>
          <meta name="keywords" content="register" />
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
              <div className="p-[20px] sm:mb-[50px]">
                <p className="mb-6 text-primary-blue">Create your account</p>
                <form onSubmit={this.handleSubmit}>
                  <div className="flex gap-4 mb-[15px]">
                    <input
                      className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                      type="text"
                      placeholder="First Name"
                      pattern="[^0-9]*"
                      required
                      value={this.state.firstName}
                      onChange={(event) =>
                        this.handleChange(event, "firstName")
                      }
                    />
                    <input
                      className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                      type="text"
                      placeholder="Last Name"
                      pattern="[^0-9]*"
                      value={this.state.lastName}
                      onChange={(event) => this.handleChange(event, "lastName")}
                    />
                  </div>
                  <div className="mb-[15px]">
                    <input
                      className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                      type="email"
                      placeholder="Email"
                      required
                      value={this.state.email}
                      onChange={(event) => this.handleChange(event, "email")}
                    />
                  </div>
                  <div className="mb-[15px]">
                    <input
                      className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                      type="password"
                      placeholder="Password"
                      minLength="6"
                      required
                      value={this.state.password}
                      onChange={(event) => this.handleChange(event, "password")}
                    />
                  </div>
                  <div className="mb-[15px]">
                    <input
                      className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                      type="password"
                      placeholder="Confirm Password"
                      minLength="6"
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
                      Sign Up
                    </button>
                  )}
                  {!this.state.isSame && (
                    <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue cursor-not-allowed">
                      Sign Up
                    </button>
                  )}
                </form>
                <p className="mt-2 text-primary-blue">
                  Already have an account?{" "}
                  <span className="text-primary-green">
                    <Link href="/login">
                      <a>Sign in</a>
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

export default Register;
