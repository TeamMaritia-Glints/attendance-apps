import { Component } from "react";
import Router from "next/router";
import Link from "next/link";
import Layout from "../../../components/layout";
import Cookies from "js-cookie";
import swal from "sweetalert";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      role: "",
      office_id: "",
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

    if (this.state.authToken === undefined) {
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      Router.push("/login");
    } else {
      if (role === "employee") {
        Router.push("/user");
      } else if (role === undefined) {
        Router.push("/login");
      }
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
    const name = data.data.name.split(" ");

    this.setState({
      firstName: name[0],
      lastName: name ? name[1] : "",
      role: data.data.role,
      office_id: data.data.Office ? data.data.Office.id : null,
      id: data.data.id,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const fullName = this.state.lastName
      ? `${this.state.firstName} ${this.state.lastName}`
      : this.state.firstName;

    const editData = {
      name: fullName,
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
      body: JSON.stringify(editData),
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
          Router.push("/admin/worker");
        }
      })
      .catch((err) => {
        swal({
          text: err.message,
          icon: "warning",
        });
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
              <div className="flex gap-4 mb-[15px]">
                <input
                  className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                  type="text"
                  placeholder="First Name"
                  pattern="^[A-Za-z]+$"
                  required
                  value={this.state.firstName}
                  onChange={(event) => this.handleChange(event, "firstName")}
                />
                <input
                  className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                  type="text"
                  placeholder="Last Name"
                  pattern="^[A-Za-z]+$"
                  value={this.state.lastName ? this.state.lastName : ""}
                  onChange={(event) => this.handleChange(event, "lastName")}
                />
              </div>
              <div className="dropdown mb-[15px]">
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
                  type="text"
                  placeholder="Office"
                  required
                  value={this.state.office_id ? this.state.office_id : ""}
                  onChange={(event) => this.handleChange(event, "office_id")}
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
