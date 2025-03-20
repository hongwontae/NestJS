import { useState } from "react";
import "./App.css";
import AuthComponent from "./components/Auth";
import LoginComponent from "./components/Login";
import LoginInfo from "./components/LoginInfo";
import LogoutComponent from "./components/Logout";
import LoginUpdate from "./components/LoginUpdate";

interface loginType {
  admin: boolean;
  email: string;
  password: string;
}

function App() {
  const [toggle, setToggle] = useState(1);
  const [loginSuccess, setLoginSuccess] = useState<loginType[]>([]);
  

  return (
    <>
      <div className="text-3xl font-bold text-red-500">Hello-World</div>
      <LoginInfo email={loginSuccess[0]?.email}></LoginInfo>
      <button
        onClick={() => {
          setToggle((prev) => {
            return prev <= 3 ? prev + 1 : 1;
          });
        }}
        className="border-[1px] p-2"
      >
        Change
      </button>
      {toggle === 1 ? (
        <LoginComponent
          loginSuccess={loginSuccess}
          setLoginSuccess={setLoginSuccess}
        />
      ) : toggle === 2 ? (
        <AuthComponent />
      ) : toggle === 3 ? (
        <LoginUpdate></LoginUpdate>
      ) : toggle === 4 ? (
        <LogoutComponent setLoginSuccess={setLoginSuccess}></LogoutComponent>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
