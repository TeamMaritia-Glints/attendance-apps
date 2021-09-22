import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
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
        <title>Attendance App - Login</title>
        <meta name="keywords" content="login" />
      </Head>

      <div className="sm:bg-wave bg-no-repeat bg-bottom">
        <div className="flex h-screen">
          <div className="m-auto px-12">
            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="Glints Logo"
                width={200}
                height={200}
              ></Image>
            </div>
            <div className="p-[20px] sm:mb-[80px]">
              <p className="mb-6 text-center text-primary-blue">
                Sign in and start managing your attendance
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-[15px]">
                  <input
                    className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-[15px]">
                  <input
                    className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                    type="password"
                    placeholder="Password"
                    minLength="6"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue">
                  Sign In
                </button>
                {error !== null && error !== "[object Object]" && (
                  <p className="mt-4 text-[red]">{error}</p>
                )}
                {error === "[object Object]" && (
                  <p className="mt-4 text-[red]">email is not valid.</p>
                )}
              </form>
              <p className="mt-4 text-primary-green">
                <span>
                  <Link href="/forgot-password">
                    <a>Forgot Password?</a>
                  </Link>
                </span>
              </p>
              <p className="mt-2 text-primary-blue">
                Don't have an account yet?{" "}
                <span className="text-primary-green">
                  <Link href="/register">
                    <a>Sign up</a>
                  </Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
