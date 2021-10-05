import { Component } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
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
        Router.push("/dashboard");
      }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const signInData = {
      email: this.state.email,
      password: this.state.password,
    };

    fetch("https://attendance-employee.herokuapp.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signInData),
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
          Cookies.set("token", data.token, { expires: 0.5 });
          Cookies.set("refreshToken", data["refresh_token"], { expires: 1 });

          const token = Cookies.get("token");
          const decodedToken = jwtDecode(token);
          localStorage.setItem("name", decodedToken.data.name);
          localStorage.setItem("role", decodedToken.data.role);

          const role = localStorage.getItem("role");
          if (role === "admin") {
            Router.push("/admin");
          } else if (role === "employee") {
            Router.push("/dashboard");
          }
        }
      })
      .catch((err) => {
        this.setState({ error: err.message });
      });
  };

  render() {
    return (
      <>
        <Head>
          <title>Attendance App - Login</title>
          <meta name="keywords" content="login" />
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
                <p className="mb-6 text-center text-primary-blue">
                  Sign in and start managing your attendance
                </p>
                <form onSubmit={this.handleSubmit}>
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
                  <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue">
                    Sign In
                  </button>
                  {this.state.error !== null && (
                    <p className="mt-4 text-[red] w-72">{this.state.error}</p>
                  )}
                </form>
                <p className="mt-4 text-primary-green">
                  <span>
                    <Link href="/forgot-password">
                      <a>Forgot Password?</a>
                    </Link>
                  </span>
                </p>
                <p className="mt-2 text-primary-blue">
                  {"Don't have an account yet? "}
                  <span className="text-primary-green">
                    <Link href="/register">
                      <a>Sign up</a>
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

export default Login;
