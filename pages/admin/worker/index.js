import { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import Layout from "../../../components/layout";
import Cookies from "js-cookie";

class Worker extends Component {
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

    const res = await fetch("http://localhost:3307/user?status=1&active=1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.authToken,
      },
    });
    const data = await res.json();
    this.setState({ userData: data.data });
  }

  handleDelete(id) {
    const payload = {
      active: false,
    };

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this worker data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Worker data has been deleted!", {
          icon: "success",
        });
        fetch(`http://localhost:3307/user/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.state.authToken,
          },
          body: JSON.stringify(payload),
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
            <div className="text-right">
              <Link href="/admin/worker/user-approval">
                <button
                  className="bg-yellow-500 mb-4 text-white text-xs px-4 py-2 rounded outline-none"
                  type="button"
                >
                  User Request
                </button>
              </Link>
            </div>
            <div className="overflow-auto border">
              <table className="min-w-full divide-y">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="font-normal px-6 py-2">ID</th>
                    <th className="font-normal px-6 py-2">Name</th>
                    <th className="font-normal px-6 py-2">Role</th>
                    <th className="font-normal px-6 py-2">Email</th>
                    <th className="font-normal px-6 py-2">Office</th>
                    <th className="font-normal px-6 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user) => (
                    <tr key={user.id}>
                      <td className="font-normal px-6 py-2">{user.id}</td>
                      <td className="font-normal px-6 py-2">{user.name}</td>
                      <td className="font-normal px-6 py-2">{user.role}</td>
                      <td className="font-normal px-6 py-2">{user.email}</td>
                      <td className="font-normal px-6 py-2">
                        {user.Office ? user.Office.name : "No Office"}
                      </td>

                      <td className="font-normal px-6 py-2">
                        <div className="inline-flex gap-4">
                          <Link href={`/admin/worker/${user.id}`}>
                            <a className="cursor-pointer">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-blue-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </a>
                          </Link>
                          <a
                            className="cursor-pointer"
                            onClick={this.handleDelete.bind(this, user.id)}
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
          </div>
        </Layout>
      </>
    );
  }
}

export default Worker;
