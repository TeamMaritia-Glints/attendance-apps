import React, { useState } from "react";
import Image from "next/image";
import Wave from "../../public/wave.svg";
import EditAdmin from "./editAdmin";

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var hh = today.getHours();
var min = today.getMinutes();
today = dd+'/'+mm+'/'+yyyy+' - '+hh+':'+min;

const Admin = () => {
  const [Admin] = useState([]);
  

  return (
    <>        
    <div className="m-auto px-12">
        <div className="flex justify-top">
              <Image
                src="/logo.png"
                alt="Glints Logo"
                width={100}
                height={100}
              ></Image>
            </div>
          
        <div>
          <h2>
          {today}
          </h2>
          </div>
      <div className="sm:bg-wave bg-no-repeat bg-bottom">
      <Link to={`/editAdmin`}>
          <button
             className="bg-yellow-500 text-white active:bg-blue-600 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
               >
              Edit
          </button>
       </Link>
    

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
                      Name
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                      }
                    >
                      Check In
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                      }
                    >
                      Check Out
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
                
                </tbody>
              </table>
              
           </div>
         </div>
  
<div>
  <img src={Wave} />
</div>
              </>
            
  );
};


export default Admin;