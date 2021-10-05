import { Component } from "react";
import Router from "next/router";
import Link from "next/link";
import Layout from "../../../components/layout";
import Cookies from "js-cookie";
import Head  from "next/head";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      role: "",
      id: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, field) {
    console.log(event.target.value)
    console.log(field)
    this.setState({
      [field]: event.target.value,
    });
  }

  async componentDidMount() {
    const url = typeof window !== "undefined" && window.location.href;
    const urlId = url.substr(url.lastIndexOf("/") + 1);

    const res = await fetch(
      `https://attendance-employee.herokuapp.com/user/${urlId}`,
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
      email: data.data.email,
      role: data.data.role,
      id: data.data.id,
    });
  }

  handleSubmit(e) {
    console.log("execute")
    e.preventDefault();

    const edit = {
      name: this.state.name,
      email: this.state.email,
      role: this.state.role,
      status: true,
    };

    fetch(`https://attendance-employee.herokuapp.com/user/${this.state.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify(edit),
    }).then(() => {
      Router.push("/admin/userManajemen");
    });
  }

  render() {

return (
    <>
    <Head>
        <title>Profile Worker</title>
        <meta name="keywords" content="editUser" />
      </Head>
      <Layout></Layout>
      <div className="sm:bg-wave bg-no-repeat bg-bottom">
        <div className="flex h-screen">
          <div className="m-auto px-12">
            <div className="p-[20px] sm:mb-[100px]">
              <p className="mb-6 text-primary-blue">Edit Profile User</p>
              <form onSubmit={this.handleSubmit}>
                <div className="flex gap-4 mb-[15px]">
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
                    type="email"
                    placeholder="Email"
                    required
                    value={this.state.email}
                    onChange={(event) => this.handleChange(event, "email")}
                  />
                </div>
                <div class="dropdown">
                  <select 
                   required
                   value={this.state.role}
                   onChange = {(event) => this.handleChange(event, "role")}> 
                      <option value="admin" type="select">Admin</option>
                      <option value="employee" >Employee</option>
                  </select>
                </div>
                <Link href={`/admin/userManajemen`}>
                <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue">
                  Cancel
                </button>
                </Link>
                
                <button type ="submit" className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue">
                  Submit
                </button>
                
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
)
};
}

export default EditUser;
