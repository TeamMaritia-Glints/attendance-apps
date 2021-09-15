import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {};

  return (
    <>
      <Head>
        <title>Attendance App - Login</title>
        <meta name="keywords" content="login" />
      </Head>

      <div className="bg-wave-green bg-no-repeat bg-bottom bg-cover">
        <div className="bg-wave-blue bg-no-repeat bg-bottom bg-cover">
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
              <p className="mb-2 text-center text-primary-blue">
                Sign in and start managing your attendance
              </p>
              <div className="p-[20px]">
                <form onSubmit={handleSubmit}>
                  <div className="mb-[20px]">
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
                </form>
                <p className="mt-4 text-primary-green">
                  <span>
                    <Link href="/forgotPassword">
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
      </div>
    </>
  );
};

export default Login;
