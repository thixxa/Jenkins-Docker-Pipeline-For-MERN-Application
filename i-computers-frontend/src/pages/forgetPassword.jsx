import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/loader.jsx";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    async function resetPassword() {
        if(newPassword !== confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try{
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/validate-otp", {
                email: email,
                otp: otp,
                newPassword: newPassword
            });
            toast.success("Password reset successful");
            setLoading(false);
            navigate('/login');
        }catch(error){
            console.error("Error resetting password:", error);
            toast.error("Failed to reset password. Please try again.");
            setLoading(false);
        }
    }

    async function sendOtp() {
        setLoading(true);
        try{
            await axios.get(import.meta.env.VITE_BACKEND_URL + "/users/send-otp/"+email);
            toast.success("OTP sent to your email");
            setLoading(false);
            setOtpSent(true);

        }catch(error){
            console.error("Error sending OTP:", error);
            toast.error("Failed to send OTP. Please try again.");
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            {
                loading &&
                <Loader />
            }
            {
                otpSent ? 
                    <div className="w-[400px] h-[400px] flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-6">Enter OTP and New Password</h2>
                        <input 
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <button
                            onClick={resetPassword}
                            className="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Reset Password
                        </button>
                    </div>:
                    <div className="w-[400px] h-[400px] flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-bold mb-6">Reset Your Password</h2>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <button
                            onClick={sendOtp}
                            className="w-full bg-blue-400 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Send OTP
                        </button>
                    </div>  
            }
        </div>
    );
}