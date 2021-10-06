import { Component } from "react";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import Layout from "../../components/layout";
import Cookies from "js-cookie";
import swal from "sweetalert";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      attendanceData: [],
      date: null,
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
      "https://attendance-employee.herokuapp.com/attendance/user-attendances?year=2021&month=10&day=01",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.state.authToken,
        },
      }
    );
    const data = await res.json();
    this.setState({ attendanceData: data.data });
    this.interval = setInterval(() => this.setState({ date: Date() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleUpdate(e, type) {
    let payload = {};
    if (type === "Declined") {
      payload = {
        status: "Declined",
      };
    } else if (type === "Approved") {
      payload = {
        status: "Approved",
      };
    }
    let popUpConfirm = confirm(`Are you sure want to ${type}?`);
    if (popUpConfirm === true) {
      fetch(
        `https://attendance-employee.herokuapp.com/attendance/update-attendance-status?${e.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: Cookies.get("token"),
          },
          body: JSON.stringify(payload),
        }
      ).then(() => {
        this.componentDidMount();
      });
    } else {
      return true;
    }
  }

  render() {
    const { attendanceData } = this.state;

    return (
      <>
        <Head>
          <title>Attendance Worker</title>
          <meta name="keywords" content="attendanceList" />
        </Head>

        <Layout>
          <div className="px-12">
            <div className="text-xl">{this.state.date}</div>
            <div className="text-right">
              <Link href="/admin/absence">
                <button
                  className="bg-[#F87171] mb-4 text-white text-xs px-4 py-2 rounded outline-none"
                  type="button"
                >
                  Absence
                </button>
              </Link>
            </div>
            <div className="overflow-auto border">
              <table className="min-w-full divide-y">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="font-normal px-6 py-2">Name</th>
                    <th className="font-normal px-6 py-2">Role</th>
                    <th className="font-normal px-6 py-2">Check In</th>
                    <th className="font-normal px-6 py-2">Check Out</th>
                    <th className="font-normal px-6 py-2">Work Hour</th>
                    <th className="font-normal px-6 py-2">Status</th>
                    <th className="font-normal px-6 py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {attendanceData.map((attendance) => (
                    <tr key={attendance.id}>
                      <th className="font-normal px-6 py-2">
                        {attendance.User.name}
                      </th>
                      <th className="font-normal px-6 py-2">
                        {attendance.User.role}
                      </th>
                      <th className="font-normal px-6 py-2">
                        {attendance.checkInTime
                          .replace("T", " / ")
                          .replace(".000Z", "")}
                      </th>
                      <th className="font-normal px-6 py-2">
                        {attendance.checkOutTime
                          .replace("T", " / ")
                          .replace(".000Z", "")}
                      </th>
                      <th className="font-normal px-6 py-2">
                        {attendance.workingHourView}
                      </th>
                      <th className="font-normal px-6 py-2">
                        {attendance.status}
                      </th>

                      <td className="font-normal px-6 py-2">
                        <div className="inline-flex gap-4">
                          <a
                            className="cursor-pointer"
                            onClick={() =>
                              this.handleUpdate(attendance, "Approved")
                            }
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
                            onClick={() =>
                              this.handleUpdate(attendance, "Declined")
                            }
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

export default Admin;
