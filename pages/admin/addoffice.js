import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";

export const getStaticProp = async () => {
    const res = await fetch (`https://attendance-employee.herokuapp.com/office`);
    const data = await res.json();
  
    return{
      props: {addOffice: data}
    } 
  }

const AddOffice = (addOffice) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
          
    }

return (
    <>
    <Head>
        <title>Office</title>
        <meta name="keywords" content="editUser" />
      </Head>
      <Layout></Layout>
      <div className="sm:bg-wave bg-no-repeat bg-bottom">
        <div className="flex h-screen">
          <div className="m-auto px-12">
            <div className="p-[20px] sm:mb-[100px]">
              <p className="mb-6 text-primary-blue">Add New Office</p>
              <form onSubmit={handleSubmit}>
                <div className="flex gap-4 mb-[15px]">
                  <input
                    className="w-full h-[0px] pl-[15px] rounded-md bg-primary-blue text-white"
                    type="text"
                    placeholder="Office's Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="mb-[15px]">
                  <input
                    className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                    type="text"
                    placeholder="latitude"
                    required
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </div>
                <div className="mb-[15px]">
                  <input
                    className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                    type="text"
                    placeholder="longitude"
                    required
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </div>
                <Link href={`/admin/office`}>
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

export default AddOffice;
