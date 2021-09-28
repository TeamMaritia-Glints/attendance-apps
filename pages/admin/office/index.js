import { Component } from "react";
import Link from "next/link";
import Layout from "../../../components/layout";
import Cookies from "js-cookie";

class Office extends Component {
  constructor(props) {
    super(props);
    this.state = { officeData: [] };
  }

  async componentDidMount() {
    const res = await fetch(
      "https://attendance-employee.herokuapp.com/office?status=1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
      }
    );
    const data = await res.json();
    this.setState({ officeData: data.data });
  }

  handleDelete(id) {
    fetch(`https://attendance-employee.herokuapp.com/office/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
    }).then(() => {
      this.componentDidMount();
    });
  }

  render() {
    const { officeData } = this.state;
    return (
      <>
        <Layout></Layout>
        <div className="flex h-auto">
          <div className="m-auto">
            <div className="container flex justify-center mx-auto max-h-[90%] max-w-[90%] overflow-y-auto my-12">
              <div className="flex flex-col">
                <div className="w-full">
                  <div className="text-right">
                    <Link href="/admin/office/add-office">
                      <button
                        className="bg-primary-green mb-4 text-white text-xs px-4 py-2 rounded outline-none"
                        type="button"
                      >
                        Add Office
                      </button>
                    </Link>
                  </div>
                  <div className="border">
                    <table className="divide-y">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="font-normal px-6 py-2">ID</th>
                          <th className="font-normal px-6 py-2">Name</th>
                          <th className="font-normal px-6 py-2">Address</th>
                          <th className="font-normal px-6 py-2">Latitude</th>
                          <th className="font-normal px-6 py-2">Longitude</th>
                          <th className="font-normal px-6 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {officeData.map((office) => (
                          <tr key={office.id}>
                            <th className="font-normal px-6 py-2">
                              {office.id}
                            </th>
                            <th className="font-normal px-6 py-2">
                              {office.name}
                            </th>
                            <th className="font-normal px-6 py-2">
                              {office.address}
                            </th>
                            <th className="font-normal px-6 py-2">
                              {office.latitude}
                            </th>
                            <th className="font-normal px-6 py-2">
                              {office.longitude}
                            </th>
                            <th className="font-normal px-6 py-2">
                              <div className="inline-flex gap-4">
                                <Link href={`/admin/office/${office.id}`}>
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
                                  onClick={this.handleDelete.bind(
                                    this,
                                    office.id
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
                            </th>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Office;
