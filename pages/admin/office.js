import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"
import Head from "next/head";
import Layout from "../../components/layout";


const Office = () => {
  const [Office] = useState([]);
  

  return (
    <>
    <Head>
    <title>Office Page</title>
        <meta name="keywords" content="office"/>
        </Head>  
     <Layout></Layout>  
     <div //className="sm:bg-wave bg-no-repeat bg-bottom"
     >
      <div className="flex h-auto">     
        <div className="m-auto">

            <Link href="../../admin/addoffice">
                <button
                className="bg-yellow-500 text-white active:bg-blue-600 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                Add Office
              </button>
          </Link>

              <table className="items-justify w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                      }
                    >
                      No
                    </th>
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
                      Address
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                      }
                    >
                      Latitude
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                      }
                    >
                      Longitude
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                      }
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                <div className="w-full justify-center items-center flex flex-col p-6">
                
                                  
                </div>
                </tbody>
              </table>
             
        </div>
      </div>     
    </div>
  
              </>
            
  );
};


export default Office;