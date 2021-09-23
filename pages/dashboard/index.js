import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import Geo from "./location";

const User = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const signIn = {
      email,
      password,
    };

    fetch("https://attendance-employee.herokuapp.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signIn),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status === "error") {
          throw Error(data.message);
        } else {
          setError(null);
          console.log(data);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="keywords" content="dashboard" />
      </Head>


      <div class="flex flex-col h-screen">
  <header class="h-[100px] md:h-[160px] bg-light-green text-dark-green">
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
  <main class="p-4 flex-grow bg-white">
   <div className= "p-1 md:p-3 flex flex-col text-dark-green text-base md:text-xl">
  <h>Name : </h>
  <h>Role : </h>
  </div>
  <div class= "md:p-3 h-[320px] bg-light-green align-middle text-center">
<Geo/>
  </div>
  </main>
  <footer class="md:h-[80px] h-[135px] p-2 bg-dark-green align-middle items-center text-center">
    <div classname="flex justify-between items-center">
    <button className="m-2 w-40 md:w-44 md:h-[40px] h-[25px] rounded-md shadow-md bg-primary-green text-dark-green cursor-pointer">
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

export default User;
