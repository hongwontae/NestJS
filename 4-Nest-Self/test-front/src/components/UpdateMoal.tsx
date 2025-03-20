import { useEffect, useRef, useState } from "react";

interface updateType {
  email: string;
  password: string;
  existingPassword: string;
}

function UpdateModal({ dialogCloseHandler, dialogRef }) {
  const [data, setData] = useState<updateType>({} as updateType);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
    console.log(data);
  async function updateUser() {
    setIsLoading(true);
    const response = await fetch("http://localhost:2999/user/update", {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        existingPassword: data.existingPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setError("요청 실패!");
      setIsLoading(false);
      return;
    }

    const resData = await response.json();
    console.log(resData);
    setIsLoading(false);
    setData(resData[0]);
  }

  return (
    <>
      <dialog ref={dialogRef} className="p-4 border-[1px] rounded-lg m-auto">
        <h1 className="font-bold text-2xl mb-4">Update Modal</h1>
        <div className="flex flex-row justify-center gap-2 mb-2">
          <label>Email</label>
          <input
            className="border-[1px] rounded-lg text-center"
            type="text"
            onChange={(e) => {
              setData((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              });
            }}
          ></input>
        </div>
        <div className="flex flex-row justify-center gap-2 mb-2">
          <label>Existing Password</label>
          <input
            className="border-[1px] rounded-lg text-center"
            type="password"
            onChange={(e) => {
              setData((prev) => {
                return {
                  ...prev,
                  existingPassword: e.target.value,
                };
              });
            }}
          ></input>
        </div>
        <div className="flex flex-row justify-center gap-2">
          <label>New Password</label>
          <input
            className="border-[1px] rounded-lg text-center"
            type="password"
            onChange={(e) => {
              setData((prev) => {
                return {
                  ...prev,
                  password: e.target.value,
                };
              });
            }}
          ></input>
        </div>
        <div className="flex flex-row justify-center gap-2 mt-2">
          <button
            className="border-[1px] rounded-lg p-2 font-bold"
            onClick={dialogCloseHandler}
          >
            Close
          </button>
          <button
            className="border-[1px] rounded-lg p-2 font-bold"
            onClick={updateUser}
          >
            Submit
          </button>
        </div>
        {isLoading ? <span className="font-bold">Loading...</span> : ""}
        {error ? <span>Error Occurred</span> : ""}
      </dialog>
    </>
  );
}

export default UpdateModal;
