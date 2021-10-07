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
      dateNow: new Date().toISOString().slice(0, 7),
      dateSearch: new Date().toISOString().slice(0, 7),
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

    const date = this.state.dateSearch.replaceAll("-", " ");
    const dateArray = date.split(" ");

    const month = dateArray[1];
    const year = dateArray[0];

    const res = await fetch(
      `https://attendance-employee.herokuapp.com/attendance/employee-absence-report?year=${year}&month=${month}`,
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

  search() {
    const date = this.state.dateSearch.replaceAll("-", " ");
    const dateArray = date.split(" ");

    const month = dateArray[1];
    const year = dateArray[0];

    fetch(
      `https://attendance-employee.herokuapp.com/attendance/employee-absence-report?year=${year}&month=${month}`,
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
        this.setState({ absenceData: data.data.absenceReport });
      });
  }

  render() {
    const { absenceData } = this.state;

    return (
      <>
        <Layout>
          <div className="px-12 pb-12">
            <h1>Workers with more than 3 days absence in a month</h1>
            <div className="mt-8 mb-2">
              <input
                className="border border-primary-blue border-b-2 rounded px-2"
                type="month"
                max={this.state.dateNow}
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
