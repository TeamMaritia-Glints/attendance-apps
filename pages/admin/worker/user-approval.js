import { Component } from "react";
import Link from "next/link";
import Head from "next/head";
import Layout from "../../../components/layout";
import Cookies from "js-cookie";

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
    this.handleUpdate = this.handleUpdate.bind(this);
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

  handleUpdate(e, type) {
    let payload = {};
    if (type === "delete") {
      payload = {
        active: false,
      };
    } else if (type === "update") {
      payload = {
        status: true,
      };
    }
    let popUpConfirm = confirm(`Are you sure want to ${type}?`);
    if (popUpConfirm === true) {
      
      fetch(`https://attendance-employee.herokuapp.com/user/${e.id}`, {
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
      return true;
    }

    
  }

  render() {
    const { userData } = this.state;

    return (
      <>
        <Head>
          <title>User Page</title>
          <meta name="keywords" content="userAcc" />
        </Head>
        <Layout>
          <div className="px-12">
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
                            onClick={() => this.handleUpdate(user, "update")}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="green"
                            >
                              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                            </svg>
                          </a>
                          <a
                            className="cursor-pointer"
                            onClick={() => this.handleUpdate(user, "delete")}
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

export default UserAcc;
