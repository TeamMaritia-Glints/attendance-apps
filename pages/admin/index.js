import { Component } from "react";
import Head from "next/head";
import Link from "next/link"
import Layout from "../../components/layout";
import Cookies from "js-cookie";

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var hh = today.getHours();
var min = String(today.getMinutes() + 1).padStart(2, '0');;
today = dd+'/'+mm+'/'+yyyy+' - '+hh+':'+min;

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { attendanceData: [] };
  }
  
  async componentDidMount() {
    const res = await fetch(
      "https://attendance-employee.herokuapp.com/attendance/user-attendances?year=2021&month=10&day=01",
      {
        method: "GET",
        headers: {
          "Content-Type" :"application/json",
          Authorization: Cookies.get("token"),
        },
      }
    );
    const data = await res.json();
    this.setState({ attendanceData: data.data});
  }
  
  handleUpdate(e, type) {
    let payload = {}
    if (type === 'decline') {
      payload = {
        status: "Decline"
      }
    fetch(`https://attendance-employee.herokuapp.com/attendance/update-attendance-status?${e.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
        body: JSON.stringify(payload)
      }).then(() => {
        this.componentDidMount();
      });
    }  
  }

  render() {
    const { attendanceData } = this.state;

  

  return (
    <>  
    <Head>
        <title>Attendance Worker</title>
        <meta name="keywords" content="attendanceList" />
      </Head>
     <Layout></Layout>  
     <div className="sm:bg-wave bg-no-repeat bg-bottom">
      <div className="flex h-screen">     
        <div className="w-full mx-auto">         
          <div className="text-xl">
            {today}
            </div>
            <div className="text-right">
            <Link href="../admin/absence">
               <button
                  className="bg-yellow-500 text-white active:bg-blue-600 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                >
                Absence
               </button>
            </Link>
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
                      Work Hour
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                      }
                    >
                      Status
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
                <tbody className="divide-y">
                {attendanceData.map((attendance) => (
                          <tr key={attendance.id}>
                            <th className="font-normal px-6 py-2">
                              {attendance.User.name}
                            </th>
                            <th className="font-normal px-6 py-2">
                              {attendance.User.role}
                            </th>
                            <th className="font-normal px-6 py-2">
                              {attendance.checkInTime}
                            </th>
                            <th className="font-normal px-6 py-2">
                              {attendance.checkOutTime}
                            </th>
                            <th className="font-normal px-6 py-2">
                              {attendance.workingHourView}
                            </th>
                            <th className="font-normal px-6 py-2">
                              {attendance.status}
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
};
}


export default Admin;