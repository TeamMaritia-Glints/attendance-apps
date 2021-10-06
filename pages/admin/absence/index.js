import { Component } from "react";
import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import Layout from "../../../components/layout";
import Cookies from "js-cookie";

class Absence extends Component {
  constructor(props) {
    super(props);
    this.state = { absenceData: [] };
  }

  async componentDidMount() {
    const res = await fetch(
      "https://attendance-employee.herokuapp.com/attendance/employee-absence-report?year=2021&month=10",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
      }
    );
    const data = await res.json();
    console.log(data);
    this.setState({ absenceData: data.data.absenceReport });
  }

  render() {
    const { absenceData } = this.state;

    return (
      <>
        <Layout>
          <div className="px-12">
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
                    <tr key={absence.EmployeeId}>
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
          </div>
        </Layout>
      </>
    );
  }
}

export default Absence;
