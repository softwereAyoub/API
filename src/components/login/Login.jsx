import { useState } from "react";
import { instance } from "../../axios";

export default function Login({ setIsConnected }) {
  const [formValues, setFormValues] = useState({ cin: "", password: "" });
  const [isLoading, setIsLoading] = useState("idle");
  
  const handleFormInputs = async (e) => {
    e.preventDefault();
    setIsLoading("pending");
    try {
      const response = await instance.post(`/login`, formValues);
      const token = response.data?.token;
      setIsLoading("fulfield");
      if (token) {
        localStorage.setItem("token", token);
        return setIsConnected(true);
      }
      return setIsConnected(false);
    } catch (error) {
      console.log(error);
      setIsLoading("rejected");
    }
  };

  return (
    <>
      {isLoading !== "pending" ? (
        <div className=" h-screen  items-center justify-center flex flex-col gap-[70px]">
           <h1 className="text-red-500 text-[60px] font-bold">Login </h1>
       
        <div className="  flex items-center justify-center">
         
        <div className="bg-[#8f8e8e] p-6 rounded-md  min-w-[300px] ">
          <form action="" className="flex flex-col" onSubmit={handleFormInputs}>
            <input
              type="text"
              placeholder="CIN"
              className="mb-4 text-white rounded px-3 h-10  bg-[#706d6d] outline-none border-transparent border-[1px] hover:border-[#646cff] hover:border-[1px] hover:border-solid transition"
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, cin: e.target.value }))
              }
              required
            />
            <input
              type="text"
              placeholder="Password"
              className="rounded text-white  px-3 h-10  bg-[#706d6d] outline-none border-transparent border-[1px] hover:border-[#646cff] hover:border-[1px] hover:border-solid transition"
              onChange={(e) =>
                setFormValues((prev) => ({ ...prev, password: e.target.value }))
                
              }
              required
            />
            <button style={{ width: "100%", marginTop: "10px" }}>Submit</button>
          </form>
        
        </div>
        </div>
        </div>
      ) : "loading ..."}
    </>
  );
}
