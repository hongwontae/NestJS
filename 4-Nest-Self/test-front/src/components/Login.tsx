import { useState } from "react";

interface loginType {
  admin: boolean;
  email: string;
  password: string;
}

interface propsType {
  loginSuccess : loginType[];
  setLoginSuccess : (resData : [])=>void
}

function LoginComponent({loginSuccess, setLoginSuccess} : propsType) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });


  async function loginHandler() {
    const response = await fetch("http://localhost:2999/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
      credentials : 'include'
    });

    if (!response.ok) {
      throw new Error("전송 중 실패");
    }
    const resData = await response.json();
    console.log(resData);
    setLoginSuccess(resData);
  }

  return (
    <>
      <main className="bg-red-300 p-2 mt-2">
        <h1 className="mb-4 mt-4 font-bold text-2xl">Login Page</h1>
        <div className="flex flex-row justify-center mb-2 gap-2">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => {
              setLoginData((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              });
            }}
            value={loginData.email}
            className="border-[1px] rounded-lg"
            id="email"
            type="text"
          ></input>
        </div>
        <div className="flex flex-row justify-center gap-2">
          <label htmlFor="password">password</label>
          <input
            onChange={(e) => {
              setLoginData((prev) => {
                return {
                  ...prev,
                  password: e.target.value,
                };
              });
            }}
            value={loginData.password}
            className="border-[1px] rounded-lg"
            id="password"
            type="password"
          ></input>
        </div>
        <button
          type="button"
          onClick={loginHandler}
          className="border-[1px] p-2 mt-2 rounded-lg"
        >
          Login
        </button>
      </main>
    </>
  );
}

export default LoginComponent;
