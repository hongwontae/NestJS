import { useRef, useState } from "react";

function AuthComponent() {

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [authResponse, setAuthResponse] = useState([]);

  async function loginRequest(){
      const response = await fetch('http://localhost:2999/user/signup', {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({email : emailRef.current.value, password : passwordRef.current.value})
      });

      if(!response.ok){
        console.log(response.status)
      }

      const resData = await response.json();

      console.log(resData);

      setAuthResponse(resData);
  }


  return (
    <>
      <main className="border-[1px] p-2 m-auto bg-red-300 mt-2">
      <h1 className="mb-4 mt-4 font-bold text-2xl">Singup Page</h1>
        <div className="flex flex-row justify-center gap-2 mb-2">
          <label id="email" htmlFor="email">
            Email
          </label>
          <input ref={emailRef} type="text" id="email" className="border-[1px] rounded-lg text-center"></input>
        </div>
        <div className="flex flex-row justify-center gap-2">
          <label id="password" htmlFor="password">
            Password
          </label>
          <input ref={passwordRef} type="password" id="password" className="border-[1px] rounded-lg text-center"></input>
        </div>
        <button className="border-[1px] p-2 mt-2 rounded-lg font-bold" onClick={()=>loginRequest()}>Singup</button>
      </main>
    </>
  );
}

export default AuthComponent;
