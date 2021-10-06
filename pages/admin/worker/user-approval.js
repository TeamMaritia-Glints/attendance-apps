import { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import Layout from "../../../components/layout";
import Cookies from "js-cookie";
import swal from "sweetalert";

class UserAcc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      authToken: Cookies.get("token")
        ? Cookies.get("token")
        : Cookies.get("refreshToken")
        ? Cookies.get("refreshToken")
        : undefined,
    };
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

    const res = await fetch(
      "https://attendance-employee.herokuapp.com/user?status=0&active=1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.state.authToken,
        },
      }
    );
    const data = await res.json();
    this.setState({ userData: data.data });
  }

  handleButton(id, type) {
    const data = {};
    let text = "";
    let textSuccess = "";

    if (type === "approve") {
      data.status = true;
      text = "This worker will be approved!";
      textSuccess = "Worker has been approved!";
    } else {
      data.active = false;
      text = "This worker will be declined!";
      textSuccess = "Worker has been declined!";
    }

    swal({
      title: "Are you sure?",
      text: text,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal(textSuccess, {
          icon: "success",
        });
        fetch(`https://attendance-employee.herokuapp.com/user/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.state.authToken,
          },
          body: JSON.stringify(data),
        }).then(() => {
          this.componentDidMount();
        });
      } else {
        swal("Action canceled!");
      }
    });
  }

  render() {
    const { userData } = this.state;

    return (
      <>
        <Layout>
          <div className="px-12 pb-12">
            <h1>User Waiting for Approval</h1>
            <div className="overflow-auto border">
              <table className="min-w-full divide-y">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="font-normal px-6 py-2">Name</th>
                    <th className="font-normal px-6 py-2">Role</th>
                    <th className="font-normal px-6 py-2">Email</th>
                    <th className="font-normal px-6 py-2">Approval</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index) => (
                    <tr key={index}>
                      <td className="font-normal px-6 py-2">{user.name}</td>
                      <td className="font-normal px-6 py-2">{user.role}</td>
                      <td className="font-normal px-6 py-2">{user.email}</td>
                      <td className="font-normal px-6 py-2">
                        <div className="inline-flex gap-4">
                          <a
                            className="cursor-pointer"
                            onClick={this.handleButton.bind(
                              this,
                              user.id,
                              "approve"
                            )}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="green"
                            >
                              <path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03"></path>
                            </svg>
                          </a>
                          <a
                            className="cursor-pointer"
                            onClick={this.handleButton.bind(
                              this,
                              user.id,
                              "decline"
                            )}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 text-red-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/admin/worker">
              <button className="mt-4 px-4 inline py-2 text-sm font-medium leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-blue-600 active:bg-blue-600 hover:bg-blue-700">
                Back
              </button>
            </Link>
          </div>
        </Layout>
      </>
    );
  }
}

export default UserAcc;
