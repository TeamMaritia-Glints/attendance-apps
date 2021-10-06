import { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import Cookies from "js-cookie";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authToken: Cookies.get("token")
        ? Cookies.get("token")
        : Cookies.get("refreshToken")
        ? Cookies.get("refreshToken")
        : undefined,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  async componentDidMount() {}

  handleClick() {
    const role = localStorage.getItem("role");

    if (this.state.authToken === undefined) {
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      Router.push("/login");
    } else {
      if (role === "admin") {
        Router.push("/admin");
      } else if (role === "employee") {
        Router.push("/user");
      } else if (role === undefined) {
        Router.push("/login");
      }
    }
  }

  render() {
    return (
      <>
        <div className="h-screen overflow-hidden flex items-center justify-center">
          <div className="h-screen w-screen bg-gray-100 flex items-center">
            <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700">
              <div className="max-w-md">
                <div className="text-5xl font-dark font-bold">404</div>
                <p className="text-2xl mt-2 md:text-3xl font-light leading-normal">
                  Sorry we could not find this page.{" "}
                </p>
                <p className="mb-8 mt-4 ">
                  But dont worry, you can find plenty of other things on our
                  homepage.
                </p>
                <button
                  onClick={this.handleClick}
                  className="px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700"
                >
                  Back to homepage
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NotFound;
