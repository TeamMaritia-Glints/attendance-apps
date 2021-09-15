import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {};

  return (
    <>
      <Head>
        <title>Attendance App - Forgot Password</title>
        <meta name="keywords" content="forgot-password" />
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
              <form onSubmit={handleSubmit}>
                <p className="mb-6 text-center text-primary-blue">
                  Insert your email to reset the password
                </p>
                <div className="flex gap-4 mb-[15px]">
                  <input
                    className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue">
                  Send
                </button>
              </form>
              <p className="mt-4 text-primary-blue">
                Back to{" "}
                <span className="text-primary-green">
                  <Link href="/login">
                    <a>Login</a>
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

export default ForgotPassword;
