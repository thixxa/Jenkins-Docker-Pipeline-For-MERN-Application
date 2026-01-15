import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/loader.jsx";

export default function RegisterPage() {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function register(){
        //register logic here
        if(firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === ''){
            toast.error("Please fill all the fields");
            return;
        }
        if(password !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }

        setIsLoading(true);

        //send register request to the server
        try{
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/", {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                password: password.trim()
            });
            console.log();
            navigate("/login");
            toast.success("Registration successful!");
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            console.error("Registration error:", error);
            toast.error("Registration failed. Please check your details and try again.");
            setIsLoading(false);
        }

    }

    return(
        <div className="w-full min-h-screen bg-[url('/bglogin1.png')] bg-center bg-cover lg:bg-no-repeat flex flex-col lg:flex-row gap-4 p-4 lg:p-20">
            <div className="w-full lg:w-[50%] flex flex-col justify-center items-center">
                <img src="/logo2.png" alt="Logo" className="w-[300px] h-[300px] mb-[20px] object-cover"/>
                <h1 className="text-[50px] text-accent text-shadow-black font-bold text-center mb-[20px]">
                    Plug In  . Power Up . Play Hard
                </h1>
                <p className="text-[30px] text-white font-semibold text-center italic">
                    Your ultimate destination for gaming gear and accessories. Elevate your gaming experience with our top-notch products designed for gamers by gamers.
                </p>

            </div>
            <div className="w-full lg:w-[50%] flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center">
                    <h1 className="text-[30px] font-semibold mb-[20px] text-accent text-shadow-white">
                        Register Here
                    </h1>
                    <input 
                        onChange={
                            (e)=>{
                                setFirstName(e.target.value);
                            }
                        }
                        type ="text" 
                        placeholder="First Name" 
                        className="w-[80%] h-[50px] mb-[20px] rounded-lg border-2 border-gray-300 px-4 text-[20px] focus:outline-none focus:border-accent text-white"
                    />
                    <input 
                        onChange={
                            (e)=>{
                                setLastName(e.target.value);
                            }
                        }
                        type ="text" 
                        placeholder="Last Name" 
                        className="w-[80%] h-[50px] mb-[20px] rounded-lg border-2 border-gray-300 px-4 text-[20px] focus:outline-none focus:border-accent text-white"
                    />
                    <input 
                        onChange={
                            (e)=>{
                                setEmail(e.target.value);
                            }
                        }
                        type ="email" 
                        placeholder="Email" 
                        className="w-[80%] h-[50px] mb-[20px] rounded-lg border-2 border-gray-300 px-4 text-[20px] focus:outline-none focus:border-accent text-white"
                    />
                    <input 
                        onChange={
                            (e)=>{
                                setPassword(e.target.value);
                            }
                        }
                        type ="password" 
                        placeholder="Password" 
                        className="w-[80%] h-[50px] mb-[20px] rounded-lg border-2 border-gray-300 px-4 text-[20px] focus:outline-none focus:border-accent text-white"
                    />
                    <input 
                        onChange={
                            (e)=>{
                                setConfirmPassword(e.target.value);
                            }
                        }
                        type ="password" 
                        placeholder="Confirm Password" 
                        className="w-[80%] h-[50px] mb-[20px] rounded-lg border-2 border-gray-300 px-4 text-[20px] focus:outline-none focus:border-accent text-white"
                    />
                    <button
                        onClick={register} //register button eka click karama register function eka call wenawa
                        className="w-[80%] h-[50px] bg-transparent text-white text-[20px] font-bold rounded-lg border-[2px] border-accent hover:bg-accent hover:text-white">
                        Register Now
                    </button>
                    <p className="text-[16px] text-white mt-[20px] not-italic">
                        Already have an account?
                        <Link to="/login" className="text-accent ml-[5px] hover:underline italic">
                            Login Here
                        </Link>
                    </p>

                </div>

            </div>
            {isLoading && <Loader/>}

        </div>
    )
}