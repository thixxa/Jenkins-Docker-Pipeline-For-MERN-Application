import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData(){

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token != null){
            axios.get(import.meta.env.VITE_BACKEND_URL + '/users/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setUser(response.data);
            }).catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    }, [])

    const [selectedOption, setSelectedOption] = useState("user");

    return (
        <>
        {
            user?
            <div className="w-[150px] flex flex-row">
                <img src={user.image ? user.image : "default.jpg"} referrerPolicy="no-referrer" className="w-[50px] rounded-full mr-2"/> {/* referrerPolicy eka damme nathnam google eke image eka apita load wen na */}
                <select className="bg-transparent outline-none ml-2 text-black font-bold" value={selectedOption}
                onChange={(e)=>{
                    if(e.target.value == "logout"){
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                    }else if(e.target.value == "my-orders"){
                        window.location.href = "/orders";
                    }
                    setSelectedOption("user");

                }}>
                    <option value={"user"}>{user.firstName}</option>
                    <option value={"my-orders"}>My Orders</option>
                    <option value={"logout"}>Logout</option>
                    
                </select>
            </div>:
            <div className="w-[150px] flex flex-row">
                <Link to="/login" className="text-secondary px-4 py-4 bg-white rounded-full">Login</Link>
                <Link to="/register" className="text-secondary px-4 py-4 bg-white rounded-full ml-2">Register</Link>

            </div>
        }
        </>
    )
}