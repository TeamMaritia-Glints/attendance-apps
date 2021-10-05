import { Component } from "react";
import Router from "next/router";
import Link from "next/link";
import Layout from "../../../components/layout";
import Cookies from "js-cookie";

class OfficeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      latitude: "",
      longitude: "",
      id: "",
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
    const url = typeof window !== "undefined" && window.location.href;
    const urlId = url.substr(url.lastIndexOf("/") + 1);

    const res = await fetch(
      `https://attendance-employee.herokuapp.com/office/${urlId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
      }
    );
    const data = await res.json();
    this.setState({
      name: data.data.name,
      address: data.data.address,
      latitude: data.data.latitude,
      longitude: data.data.longitude,
      id: data.data.id,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const edit = {
      name: this.state.name,
      address: this.state.address,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      status: true,
    };

    fetch(`https://attendance-employee.herokuapp.com/office/${this.state.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify(edit),
    }).then(() => {
      Router.push("/admin/office");
    });
  }

  render() {
    return (
      <>
        <Layout></Layout>
        <div className="flex h-screen">
          <div className="m-auto">
            <div className="container flex justify-center mx-auto max-h-[90%] max-w-[90%] my-12">
              <div className="flex flex-col">
                <div className="w-full">
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
                        onChange={(event) =>
                          this.handleChange(event, "address")
                        }
                      />
                    </div>
                    <div className="mb-[15px]">
                      <input
                        className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                        type="text"
                        placeholder="Latitude"
                        required
                        value={this.state.latitude}
                        onChange={(event) =>
                          this.handleChange(event, "latitude")
                        }
                      />
                    </div>
                    <div className="mb-[15px]">
                      <input
                        className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                        type="text"
                        placeholder="Longitude"
                        required
                        value={this.state.longitude}
                        onChange={(event) =>
                          this.handleChange(event, "longitude")
                        }
                      />
                    </div>
                    <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue">
                      Edit
                    </button>
                    <Link href="/admin/office">
                      <a className="flex w-full h-[40px] mt-2 justify-center items-center rounded-md shadow-md bg-primary-green text-primary-blue">
                        Cancel
                      </a>
                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default OfficeEdit;
