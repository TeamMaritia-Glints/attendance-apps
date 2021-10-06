import { Component } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

class Home extends Component {
  constructor(props) {
    super(props);
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
    } else {
      Router.push("/login");
    }
  }

  render() {
    return <></>;
  }
}

export default Home;
