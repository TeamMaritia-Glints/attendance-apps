import { Component } from "react";
import Link from "next/link";
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
      dateSearch: new Date().toISOString().slice(0, 10),
      authToken: Cookies.get("token")
        ? Cookies.get("token")
        : Cookies.get("refreshToken")
        ? Cookies.get("refreshToken")
        : undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(event, field) {
    this.setState({
      [field]: event.target.value,
    });
  }

  componentDidMount() {
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

    const date = this.state.dateSearch.replaceAll("-", " ");
    const dateArray = date.split(" ");

    const day = dateArray[2];
    const month = dateArray[1];
    const year = dateArray[0];

    fetch(
      `https://attendance-employee.herokuapp.com/attendance/user-attendances?year=${year}&month=${month}&day=${day}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.state.authToken,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ attendanceData: data.data });
      });

    this.interval = setInterval(() => this.setState({ date: Date() }), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleButton(id, type) {
    const data = { id: id, status: "" };
    let text = "";
    let textSuccess = "";

    if (type === "Approved") {
      data.status = type;
      text = "This worker will be approved!";
      textSuccess = "Worker has been approved!";
    } else {
      data.status = type;
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
        fetch(
          `https://attendance-employee.herokuapp.com/attendance/update-attendance-status`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: this.state.authToken,
            },
            body: JSON.stringify(data),
          }
        ).then(() => {
          this.componentDidMount();
        });
      } else {
        swal("Action canceled!");
      }
    });
  }

  search() {
    const date = this.state.dateSearch.replaceAll("-", " ");
    const dateArray = date.split(" ");

    const day = dateArray[2];
    const month = dateArray[1];
    const year = dateArray[0];

    fetch(
      `https://attendance-employee.herokuapp.com/attendance/user-attendances?year=${year}&month=${month}&day=${day}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.state.authToken,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ attendanceData: data.data });
      });
  }

  render() {
    const { attendanceData } = this.state;

    return (
      <>
        <Layout>
          <div className="px-12 pb-12">
            <div className="text-xl">{this.state.date}</div>
            <div className="flex mt-8 mb-2 justify-between gap-10">
              <div>
                <input
                  className="border border-primary-blue border-b-2 rounded px-2"
                  type="date"
                  value={this.state.dateSearch}
                  onChange={(event) => this.handleChange(event, "dateSearch")}
                />
                <button
                  onClick={this.search}
                  className="bg-primary-blue text-white text-xs ml-4 px-4 py-2 rounded outline-none"
                  type="button"
                >
                  Search
                </button>
              </div>
              <div>
                <Link href="/admin/absence">
                  <button
                    className="bg-[#F87171] mb-4 text-white text-xs px-4 py-2 rounded outline-none"
                    type="button"
                  >
                    Absence List
                  </button>
                </Link>
              </div>
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
                            onClick={this.handleButton.bind(
                              this,
                              attendance.id,
                              "Approved"
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
                              attendance.id,
                              "Declined"
                            )}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="red"
                            >
                              <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
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
