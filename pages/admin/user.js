import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"
import Layout from "../../components/layout";

export const getStaticProp = async () => {
  const res = await fetch (`https://attendance-employee.herokuapp.com/user?status=1&active=1&office_id=`);
  const data = await res.json();

  return{
    props: {user: data}
  } 
}

const User = ({user}) => {
  const [User] = useState([]);
  

  return (
    <>  
     <Layout></Layout>  
     <div className="sm:bg-wave bg-no-repeat bg-bottom">
      <div className="flex h-screen">     
        <div className="m-auto px-12">             

              <table className="items-center w-full bg-transparent border-collapse">
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
                      ID
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
                      Email
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

                 <div>
                 {user.map(x => (
                          <tr>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left font-bold">
                              {i++}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left font-bold">
                              {x.id}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left font-bold">
                              {x.name}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left font-bold">
                              {x.role}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left font-bold">
                              {x.email}
                            </td>
                            <Link href="../../admin/editUser">
                                  <button
                                    className="bg-yellow-500 text-white active:bg-blue-600 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                    type="button"
                                  >
                                    Edit
                                  </button>
                              </Link>
                          </tr>
                        ))}
                   


            
                  
                                  
                </div>
                </tbody>
              </table>
             
        </div>
      </div>     
    </div>
  
              </>
            
  );
};


export default User;