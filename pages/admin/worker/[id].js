import { Component } from "react";
import Router from "next/router";
import Link from "next/link";
import Layout from "../../../components/layout";
import Cookies from "js-cookie";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      role: "",
      office_id: null,
      id: "",
      authToken: Cookies.get("token")
        ? Cookies.get("token")
        : Cookies.get("refreshToken")
        ? Cookies.get("refreshToken")
        : undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, field) {
    this.setState({
      [field]: event.target.value,
    });
  }

  async componentDidMount() {
    const role = localStorage.getItem("role");

    if (role === "employee") {
      Router.push("/user");
    } else if (role === undefined) {
      Router.push("/login");
    }

    if (this.state.authToken === undefined) {
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      Router.push("/login");
    }

    const url = typeof window !== "undefined" && window.location.href;
    const urlId = url.substr(url.lastIndexOf("/") + 1);

    const res = await fetch(
      `https://attendance-employee.herokuapp.com/user/${urlId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.state.authToken,
        },
      }
    );
    const data = await res.json();
    this.setState({
      name: data.data.name,
      email: data.data.email,
      role: data.data.role,
      office_id: data.data.Office ? data.data.Office.id : null,
      id: data.data.id,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const edit = {
      name: this.state.name,
      email: this.state.email,
      role: this.state.role,
      office_id: parseInt(this.state.office_id),
      status: true,
    };

    fetch(`https://attendance-employee.herokuapp.com/user/${this.state.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.authToken,
      },
      body: JSON.stringify(edit),
    }).then(() => {
      Router.push("/admin/worker");
    });
  }

  render() {
    return (
      <>
        <Layout>
          <div className="self-center px-12">
            <p className="mb-6 text-primary-blue">Edit User Profile</p>
            <form
              className="border w-[400px] p-10 bg-gray-50 rounded shadow"
              onSubmit={this.handleSubmit}
            >
              <div className="mb-[15px]">
                <input
                  className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                  type="text"
                  placeholder="Name"
                  required
                  value={this.state.name}
                  onChange={(event) => this.handleChange(event, "name")}
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
              <div className="dropdown">
                <select
                  className="p-2 rounded-md text-white bg-primary-blue"
                  value={this.state.role}
                  required
                  onChange={(event) => this.handleChange(event, "role")}
                >
                  <option value="admin" type="select">
                    Admin
                  </option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              <div>
                  <input
                   className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white" 
                   type="number"
                   placeholder="Office"
                   required
                   value={this.state.office_id}
                   onChange = {(event) => this.handleChange(event, "office_id")}
                  />
                </div>
              <button
                type="submit"
                className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue"
              >
                Submit
              </button>
              <Link href={`/admin/worker`}>
                <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue">
                  Cancel
                </button>
              </Link>
            </form>
          </div>
        </Layout>
      </>
    );
  }
}

export default EditUser;
