import { useRef } from "react";
import UpdateModal from "./UpdateMoal";

function LoginUpdate() {


  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);

  function dialogOpenHandler(){
    dialogRef?.current?.showModal();
  }

  function dialogCloseHandler(){
    dialogRef?.current?.close()
  }

  async function UpdateAuthHanlder() {
    const response = await fetch("http://localhost:2999/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
      }),
      credentials : 'include'
    });
    const resData = await response.json();
    if(emailRef.current && passwordRef.current){
      emailRef.current.value = '';
      passwordRef.current.value = '';
    } else {
      return;
    }
    if(resData.length){
      console.log('here?')
      dialogOpenHandler();
    } else {
      return;
    }
  }

  return (
    <>
      <main className="border-[1px] rounded-lg p-4 bg-red-400 mt-4">
        <h1 className="font-mono mb-2 font-bold text-2xl">Update Page</h1>
        <div className="flex flex-row justify-center gap-2 mb-2">
          <label htmlFor="Email">Email</label>
          <input
            ref={emailRef}
            className="border-[1px] rounded-lg text-center font-bold"
            type="text"
          ></input>
        </div>
        <div className="flex flex-row justify-center gap-2">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            className="border-[1px] rounded-lg text-center font-bold"
            type="password"
          ></input>
        </div>
        <button onClick={UpdateAuthHanlder} className="border-[1px] rounded-lg p-2 mt-2 font-bold text-white border-black">
          Auth
        </button>
      </main>
      <UpdateModal dialogRef={dialogRef} dialogCloseHandler={dialogCloseHandler}></UpdateModal>
    </>
  );
}

export default LoginUpdate;
