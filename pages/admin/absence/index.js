import { Component } from "react";
import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import Layout from "../../../components/layout";
import Cookies from "js-cookie";

class Absence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      absenceData: [],
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
      "https://attendance-employee.herokuapp.com/attendance/employee-absence-report?year=2021&month=10",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.state.authToken,
        },
      }
    );
    const data = await res.json();
    this.setState({ absenceData: data.data.absenceReport });
  }

  render() {
    const { absenceData } = this.state;

    return (
      <>
        <Layout>
          <div className="px-12 pb-12">
            <h1>Workers with more than 3 days absence in a month</h1>
            <div className="overflow-auto border">
              <table className="min-w-full divide-y">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="font-normal px-6 py-2">Name</th>
                    <th className="font-normal px-6 py-2">Role</th>
                    <th className="font-normal px-6 py-2">Absence</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {absenceData.map((absence) => (
                    <tr key={absence.employeeId}>
                      <th className="font-normal px-6 py-2">
                        {absence.User.name}
                      </th>
                      <th className="font-normal px-6 py-2">
                        {absence.User.role}
                      </th>
                      <th className="font-normal px-6 py-2">
                        {absence["absence count"] + " days"}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/admin">
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

export default Absence;
