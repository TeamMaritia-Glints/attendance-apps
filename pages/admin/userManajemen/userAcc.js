import { Component } from "react";

import Head from "next/head";
import Layout from "../../../components/layout";
import Cookies from "js-cookie";


class UserAcc extends Component {
  constructor(props) {
    super(props);
    this.state = { userData: [] };
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  

  async componentDidMount() {
    const res = await fetch(
      "https://attendance-employee.herokuapp.com/user?status=0&active=1",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
      }
    );
    const data = await res.json();
    this.setState({ userData: data.data });

  }

  handleUpdate(e, type) {
    console.log(e)
    console.log(type)
    let payload = {}
    if (type === 'delete') {
      payload = {
        active: false
      }
    } else if (type === 'update') {
      payload = {
        status: true
      }
    }
 console.log(payload)

    fetch(`https://attendance-employee.herokuapp.com/user/${e.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify(payload)
    }).then(() => {
      this.componentDidMount();
    });
  }

  render() {
    const { userData } = this.state;
  
  return (
    <>
    <Head>
    <title>User Page</title>
        <meta name="keywords" content="userAcc"/>
    </Head>  
     <Layout></Layout>  
     <div className="sm:bg-wave bg-no-repeat bg-bottom">
      <div className="flex h-screen"> 
        <div className="w-full mx-auto">
            <div>
                <h1>
                    User Waiting For Approve
                </h1>
            </div>

              <table className="justify-center items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                      }
                    >
                      Name
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                      }
                    >
                      Role
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                      }
                    >
                      Email
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                      }
                    >
                      Approval
                    </th>
                  </tr>
                </thead>
                <tbody>
                   {userData.map((x) => (
                          <tr>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left font-bold">
                              {x.name}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left font-bold">
                              {x.role}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left font-bold">
                              {x.email}
                            </td>
                            <th className="font-normal px-6 py-2">
                              <div className="inline-flex gap-4">
                                  <a 
                                    className="cursor-pointer"
                                    onClick={() => this.handleUpdate(x, 'update')}
                                    >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="w-6 h-6 text-green-400"
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
                                
                                <a
                                  className="cursor-pointer"
                                  onClick={() => this.handleUpdate(x, 'delete')}
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
  
              </>
            
  );
}
};


export default UserAcc;