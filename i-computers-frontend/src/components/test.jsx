import { useState } from "react";
export default function Test() {

    const [count, setCount] = useState(0) 
    const [status, setStatus] = useState("OFF")


    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-[300px] h-[200px] shadow-2xl flex justify-center items-center">
                <button className="w-[100px] h-[50px] bg-red-400 text-white "
                 onClick={()=>{
                    console.log("decrement")
                    setCount(count - 1)
                    console.log(count)
                }}>
                    Decrement
                </button>
                <h1 className="w-[100px] h-[50px] text-[30px] text-center">
                    {count}
                </h1>
                <button className="w-[100px] h-[50px] bg-blue-400 text-white"
                onClick={()=>{
                    console.log("increment")
                    setCount(count + 1)
                    console.log(count)
                }}>
                    Increment
                </button>
                

            </div>
            <div className="w-[300px] h-[200px] shadow-2xl flex flex-col justify-center items-center">
                <span className="h-[30px] text-2xl font-bold flex flex-col">
                    {status}
                </span>
                <div className="w-full h-[50px] flex">
                    <button className="w-[150px] h-full bg-green-400 text-white"
                    onClick={()=>{
                        setStatus("OFF")
                        console.log(status)
                    }}>
                        OFF
                    </button>
                    <button className="w-[150px] h-full bg-red-400 text-white"
                    onClick={()=>{
                        setStatus("ON")
                        console.log(status)
                    }}>
                        ON
                    </button>

                </div>

            </div>
            
        </div>
    )
}