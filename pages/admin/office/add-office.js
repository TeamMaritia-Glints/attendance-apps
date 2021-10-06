import { Component } from "react";
import Router from "next/router";
import Link from "next/link";
import Layout from "../../../components/layout";
import Cookies from "js-cookie";
import swal from "sweetalert";

class AddOffice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      latitude: "",
      longitude: "",
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
  }

  handleSubmit(e) {
    e.preventDefault();

    const addData = {
      name: this.state.name,
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };

    fetch("https://attendance-employee.herokuapp.com/office", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.state.authToken,
      },
      body: JSON.stringify(addData),
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
          Router.push("/admin/office");
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
            <form
              className="border w-[400px] p-10 bg-gray-50 rounded shadow"
              onSubmit={this.handleSubmit}
            >
              <div className="mb-[15px]">
                <input
                  className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                  type="text"
                  placeholder="Name"
                  required
                  value={this.state.name}
                  onChange={(event) => this.handleChange(event, "name")}
                />
              </div>
              <div className="mb-[15px]">
                <input
                  className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                  type="text"
                  placeholder="Address"
                  required
                  value={this.state.address}
                  onChange={(event) => this.handleChange(event, "address")}
                />
              </div>
              <div className="mb-[15px]">
                <input
                  className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                  type="text"
                  placeholder="Latitude"
                  required
                  value={this.state.latitude}
                  onChange={(event) => this.handleChange(event, "latitude")}
                />
              </div>
              <div className="mb-[15px]">
                <input
                  className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                  type="text"
                  placeholder="Longitude"
                  required
                  value={this.state.longitude}
                  onChange={(event) => this.handleChange(event, "longitude")}
                />
              </div>
              <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue">
                Add
              </button>
              <Link href="/admin/office">
                <a className="flex w-full h-[40px] mt-2 justify-center items-center rounded-md shadow-md bg-primary-green text-primary-blue">
                  Cancel
                </a>
              </Link>
            </form>
          </div>
        </Layout>
      </>
    );
  }
}

export default AddOffice;
