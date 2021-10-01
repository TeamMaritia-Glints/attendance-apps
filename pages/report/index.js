import { Component } from "react";
import Link from "next/link";
import Layout from "../../../components/layout";
import Cookies from "js-cookie";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = { officeData: [] };
  }

  async componentDidMount() {
    const res = await fetch(
      "https://attendance-employee.herokuapp.com/attendance/user-attendance-report?year=2021&month=9",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
      }
    );
    const data = await res.json();
    this.setState({ officeData: data.data });
  }
  render() {
    const { officeData } = this.state;
    return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="keywords" content="dashboard" />
      </Head>


      <div class="flex flex-col h-screen">
  <header class="h-[100px] md:h-[160px] bg-light-green text-dark-green p-3 ">
  <div className="flex justify-between items-center">
    <div className="hidden md:contents">
    <Image src="/logo.png"
                alt="Glints Logo"
                width={140} 
                className="w-[146px]"
                height={140}
              ></Image>
    </div>
    <div className="md:hidden contents">
    <Image src="/logo.png"
                alt="Glints Logo"
                width={90} 
                className="w-[146px]"
                height={90}
              ></Image>
    </div>
    <div className="flex flex-row text-center "> 
      <h1 className="text-3xl md:text-6xl">
            {new Date()
                .toLocaleDateString("en-GB", {
                weekday: "short"
                })
                .replace(/ /g, " ")}</h1>
      <div className ="flex flex-col text-center">
        <h1 className="text-xs md:text-lg">
            {new Date()
                .toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                })
                .replace(/ /g, " ")}</h1>
        <h1 className="text-xs md:text-lg">
            {new Date()
                .toLocaleDateString("en-GB", {
                year: "numeric"
                })
                .replace(/ /g, " ")}</h1>
        </div>
        <h1 className="text-3xl md:text-6xl">
            {new Date()
                .toLocaleTimeString("en-GB", {
                hourCycle: "h23",
                hour:	"numeric",
                minute: "2-digit"
                })}</h1>
        </div>
        <div className= "pr-3 fixed flex-col">
      <button className=" w-35 md:w-44 md:h-[40px] h-[25px] rounded-md shadow-md bg-dark-green text-primary-green cursor-pointer">
                    Log Out
                  </button>
    </div>
  </div>
  </header>
  <main class="p-4 flex-grow bg-white">
   <div className= "p-1 md:p-3 flex flex-col text-dark-green text-base md:text-xl">
   <table className="items-center w-full bg-transparent border-collapse text-center">
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
                      Date
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                      }
                    >
                      Check In
                    </th>
                    <th className={
                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                      }
                    >
                      Check Out
                    </th>
                    <th className={
                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                      }
                    >
                      Working Hours
                    </th>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
  </div>
  </main>
  <footer className="md:h-[80px] h-[135px] p-2 bg-dark-green align-middle items-center place-items-center grid">
    <div className="align-middle">
    <button className="m-2 w-40 md:w-44 md:h-[40px] h-[25px] rounded-md shadow-md bg-primary-green text-dark-green cursor-pointer">
                    Check In
                  </button>
    <button className="m-2 w-40 md:w-44 md:h-[40px] h-[25px] rounded-md shadow-md bg-primary-green text-dark-green cursor-pointer">
                    Check Out  
                  </button>
    <button className="m-2 w-40 md:w-44 md:h-[40px] h-[25px] rounded-md shadow-md bg-light-green text-dark-green cursor-pointer">
                    Maps
                  </button>
     </div>             
    </footer>
</div>
    </>
  );
};

export default Report;
