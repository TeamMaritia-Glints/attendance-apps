import { Component } from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import Cookies from "js-cookie";


class Absence extends Component {
  constructor(props) {
    super(props);
    this.state = { absenceData: [] };
  }

  async componentDidMount() {
    const res = await fetch(
      "https://attendance-employee.herokuapp.com/attendance/employee-absence-report?year=2021&month=10",
      {
        method: "GET",
        headers: {
          "Content-Type" :"application/json",
          Authorization: Cookies.get("token"),
        },
      }
    );
    const data = await res.json();
    console.log(data)
    this.setState({ absenceData: data.data.absenceReport});
  }
  

  render() {
    const { absenceData } = this.state;
  

  return (
    <>
    <Head>
    <title>Absence Page</title>
        <meta name="keywords" content="absence"/>
    </Head>  
     <Layout></Layout>  
     <div className="sm:bg-wave bg-no-repeat bg-bottom">
      <div className="flex h-screen">     
        <div className="w-full mx-auto"
        >
            <div>
                <h1>
                    Workers with more than 2 absence in a month
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
                      Absence
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="divide-y">
                {absenceData.map((absence) => (
                          <tr key={absence.EmployeeId}>
                            <th className="font-normal px-6 py-2">
                              {absence.User.name}
                            </th>
                            <th className="font-normal px-6 py-2">
                              {absence.User.role}
                            </th>
                            <th className="font-normal px-6 py-2">
                              {absence["absence count"]}
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
};


export default Absence;