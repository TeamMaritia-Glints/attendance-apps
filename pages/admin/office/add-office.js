import { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import Layout from "../../../components/layout";
import Cookies from "js-cookie";

const AddOffice = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const add = {
      name,
      address,
      latitude,
      longitude,
    };

    fetch("https://attendance-employee.herokuapp.com/office", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify(add),
    }).then(() => {
      Router.push("/admin/office");
    });
  };

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
                  onSubmit={handleSubmit}
                >
                  <div className="mb-[15px]">
                    <input
                      className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                      type="text"
                      placeholder="Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-[15px]">
                    <input
                      className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                      type="text"
                      placeholder="Address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="mb-[15px]">
                    <input
                      className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                      type="text"
                      placeholder="Latitude"
                      required
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                    />
                  </div>
                  <div className="mb-[15px]">
                    <input
                      className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                      type="text"
                      placeholder="Longitude"
                      required
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOffice;
