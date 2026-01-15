import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            axios.post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", {
                token: tokenResponse.access_token
            }).then((res) => {
                //store the token in local storage
                localStorage.setItem("token", res.data.token);
                if(res.data.role === 'admin'){
                    navigate('/admin');
                }else{
                    navigate('/');
                }
                toast.success("Login successful!");
            }).catch((error) => {});
        },
        onError: () => {toast.error("Google Login Failed");},
        onNonOAuthError: () => {toast.error("Google Login Failed");}
      });

    async function login(){
        //login logic here
        console.log("Email:", email);
        console.log("Password:", password);

        //send login request to the server
        try{
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
                email: email,
                password: password
            });
            console.log(res)
            //store the token in local storage
            localStorage.setItem("token", res.data.token);

            // Get the token from local storage
            const token = localStorage.getItem("token"); //dan apita onema thanakdi token eka ganna puluwan token kiyana key eka use karala

            if(res.data.role === 'admin'){
                navigate('/admin');
            }else{
                navigate('/');
            }
            toast.success("Login successful!");
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please check your credentials and try again.");
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
                    <h1 className="text-[40px] font-bold mb-[20px] text-accent text-shadow-white">
                        Login
                    </h1>
                    <input 
                        onChange={
                            (e)=>{
                                setEmail(e.target.value);
                            }
                        }
                        type ="email" 
                        placeholder="Your Email" 
                        className="w-[80%] h-[50px] mb-[20px] rounded-lg border-2 border-gray-300 px-4 text-[20px] focus:outline-none focus:border-accent text-white"
                    />
                    <input 
                        onChange={
                            (e)=>{
                                setPassword(e.target.value);
                            }
                        }
                        type ="password" 
                        placeholder="Your Password" 
                        className="w-[80%] h-[50px] rounded-lg border-2 border-gray-300 px-4 text-[20px] focus:outline-none focus:border-accent text-white"
                    />
                    <p className="w-[80%] text-right mb-[20px]">
                        <Link to="/forgot-password" className="text-accent hover:underline italic">
                            Forgot Password?
                        </Link>
                    </p>
                    <button
                        onClick={login} //login button eka click karama login function eka call wenawa
                        className="w-[80%] h-[50px] bg-transparent text-white text-[20px] font-bold rounded-lg border-[2px] border-accent hover:bg-accent hover:text-white mb-[20px]">
                        Login
                    </button>
                    <button 
                        onClick={()=> googleLogin()}
                        className="w-[80%] h-[50px] bg-transparent text-white text-[20px] font-bold rounded-lg border-[2px] border-accent hover:bg-accent hover:text-white">
                        <FcGoogle className="inline-block ml-2 mb-1"/>
                    </button>
                    <p className="text-[16px] text-white mt-[20px] not-italic">
                        Don't have an account?
                        <Link to="/register" className="text-accent ml-[5px] hover:underline italic">
                            Register Here
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    )
}