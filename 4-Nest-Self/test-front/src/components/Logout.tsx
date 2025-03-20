
function LogoutComponent({setLoginSuccess}) {

  async function Logout(){
    const response = await fetch('http://localhost:2999/user/logout', {
      method : 'POST',
      credentials : 'include'
    })

    const resData = await response.json();

    console.log(resData);

    setLoginSuccess([]);

  }

  return (
    <>
      <div className="bg-red-300 p-2 mt-2">
        <h1 className="mb-4 mt-4 font-bold text-2xl">Logout Page</h1>
        <button onClick={Logout} className="border-[1px] p-2 font-bold rounded-lg">Logout</button>
      </div>
    </>
  );
}

export default LogoutComponent;
