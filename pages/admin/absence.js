import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"
import Head from "next/head";
import Layout from "../../components/layout";


const Absence = () => {
  const [Absence] = useState([]);
  

  return (
    <>
    <Head>
    <title>Absence Page</title>
        <meta name="keywords" content="absence"/>
    </Head>  
     <Layout></Layout>  
     <div className="sm:bg-wave bg-no-repeat bg-bottom">
      <div className="flex h-screen">     
        <div //className="m-auto px-12"
        >
            <div>
                <h1>
                    Workers with more than 2 absence in a month
                </h1>
            </div>

              <table className="table-auto">
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
                      Role
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                      }
                    >
                      Absence
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


export default Absence;