import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";

const EditUser = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
  
      let fullName = lastName
        ? `${firstName} ${lastName}`
        : (fullName = firstName);
        
    }

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
              <form onSubmit={handleSubmit}>
                <div className="flex gap-4 mb-[15px]">
                  <input
                    className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                    type="text"
                    placeholder="First Name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="mb-[15px]">
                  <input
                    className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="dropdown">
                  <select id = "role" onchange = "setRole()"> 
                      <option>Role</option>
                      <option>Admin</option>
                      <option>Worker</option>
                  </select>
                </div>
                <Link href={`/admin`}>
                <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue">
                  Cancel
                </button>
                </Link>
                <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue">
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

export default EditUser;
