import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSame, setIsSame] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const queryString = typeof window !== "undefined" && window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const tokenUrl = urlParams.get("token");
  const idUrl = urlParams.get("id");
  const [token] = useState(tokenUrl);
  const [id] = useState(idUrl);

  const checkConfirmPassword = () => {
    if (password === confirmPassword) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reset = {
      password,
      confirmpassword: confirmPassword,
    };

    fetch(
      `https://attendance-employee.herokuapp.com/auth/passwordreset?token=${token}&id=${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reset),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === "error") {
          throw Error(data.message);
        } else {
          setError(null);
          setSuccess(data.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <>
      <Head>
        <title>Attendance App - Reset Password</title>
        <meta name="keywords" content="reset-password" />
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
                  Insert your new password to finish
                </p>
                <div className="flex gap-4 mb-[15px]">
                  <input
                    className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex gap-4 mb-[15px]">
                  <input
                    className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                    type="password"
                    placeholder="Confirm New Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyUp={checkConfirmPassword}
                  />
                </div>
                {isSame && (
                  <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue">
                    Reset Password
                  </button>
                )}
                {!isSame && (
                  <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue cursor-not-allowed">
                    Reset Password
                  </button>
                )}
                {success !== null && (
                  <p className="mt-4 text-[green]">{success}</p>
                )}
                {error !== null && <p className="mt-4 text-[red]">{error}</p>}
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

export default ResetPassword;
