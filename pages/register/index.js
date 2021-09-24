import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSame, setIsSame] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const checkConfirmPassword = () => {
    if (password === confirmPassword) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let fullName = lastName
      ? `${firstName} ${lastName}`
      : (fullName = firstName);

    const signUp = {
      name: fullName,
      email: email,
      password: password,
      confirmpassword: confirmPassword,
      role: "employee",
      status: false,
    };

    fetch("https://attendance-employee.herokuapp.com/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUp),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === "error") {
          throw Error(data.message);
        } else {
          setError(null);
          router.push("/login");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <>
      <Head>
        <title>Attendance App - Register</title>
        <meta name="keywords" content="register" />
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
            <div className="p-[20px] sm:mb-[50px]">
              <p className="mb-6 text-primary-blue">Create your account</p>
              <form onSubmit={handleSubmit}>
                <div className="flex gap-4 mb-[15px]">
                  <input
                    className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                    type="text"
                    placeholder="First Name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
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
                <div className="mb-[15px]">
                  <input
                    className="w-full h-[40px] pl-[15px] rounded-md bg-primary-blue text-white"
                    type="password"
                    placeholder="Confirm Password"
                    minLength="6"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onKeyUp={checkConfirmPassword}
                  />
                </div>
                {isSame && (
                  <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue">
                    Sign Up
                  </button>
                )}
                {!isSame && (
                  <button className="w-full h-[40px] mt-2 rounded-md shadow-md bg-primary-green text-primary-blue cursor-not-allowed">
                    Sign Up
                  </button>
                )}
                {error !== null && <p className="mt-4 text-[red]">{error}</p>}
              </form>
              <p className="mt-2 text-primary-blue">
                Already have an account?{" "}
                <span className="text-primary-green">
                  <Link href="/login">
                    <a>Sign in</a>
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

export default Register;
