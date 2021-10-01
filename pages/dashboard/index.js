import Head from "next/head";
import Image from "next/image";
import { Component } from "react";
import Router from "next/router";
import Geo from "./location";
import Cookies from "js-cookie";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInTime: "",
      checkInLocation: "",
      lat: '',
      lng: ''
    };
    this.handleCheckin = this.handleCheckin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    if (!!navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.log(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
      );
    } else {
      alert('El navegador no soporta la geolocalización,')
    }
  }

  async handleCheckin() {
    const payload = {
      "checkInTime": new Date(), 
      "checkInLocation": {
        "longitude": this.state.lng,
        "latitude": this.state.lat
      }
    }
    const res = await fetch(
      'https://attendance-employee.herokuapp.com/attendance/check-in',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
        body: JSON.stringify(payload)
      }
    );
    // const data = await res.json();
    console.log('got response', res);
  }

  handleSubmit(e) {
    e.preventDefault();

    const edit = {
      checkInTime: this.state.checkInTime,
      checkInLocation: this.state.checkInLocation,
    };

    fetch(`https://attendance-employee.herokuapp.com/attendance/${this.state.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("token"),
      },
      body: JSON.stringify(edit),
    }).then(() => {
      Router.push("/user");
    });
  }

  render() {
    return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="keywords" content="dashboard" />
      </Head>


      <div className="flex flex-col h-screen">
  <header className="h-[100px] md:h-[160px] bg-light-green text-dark-green">
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
        <div className= "pr-3 flex flex-col">
      <button className=" w-35 md:w-44 md:h-[40px] h-[25px] rounded-md shadow-md bg-dark-green text-primary-green cursor-pointer">
                    Log Out
                  </button>
    </div>
  </div>
  </header>
  <main className="p-4 flex-grow bg-white flex-col">
<Geo/>
  </main>
  <footer className="md:h-[80px] h-[135px] p-2 bg-dark-green place-content-center grid">
    <div className="align-middle">
    <button onClick={this.handleCheckin} className="m-2 w-40 md:w-44 md:h-[40px] h-[25px] rounded-md shadow-md bg-primary-green text-dark-green cursor-pointer">
                    Check In
                  </button>
    <button className="m-2 w-40 md:w-44 md:h-[40px] h-[25px] rounded-md shadow-md bg-primary-green text-dark-green cursor-pointer">
                    Check Out  
                  </button>
    <button className="m-2 w-40 md:w-44 md:h-[40px] h-[25px] rounded-md shadow-md bg-light-green text-dark-green cursor-pointer">
                    Absence Report
                  </button>
     </div>             
    </footer>
</div>
    </>
  );
};
}
export default User;
