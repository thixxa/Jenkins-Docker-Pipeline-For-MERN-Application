import { Router } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import AdminProductPage from "./admin/adminProductPage.jsx"
import AdminAddProductPage from "./admin/adminAddProductPage.jsx"
import AdminUpdateProductPage from "./admin/adminUpdateProductPage.jsx"
import AdminOrdersPage from "./admin/adminOrdersPage.jsx"
import AdminUsersPage from "./admin/adminUsersPage.jsx"
import AdminReviewPage from "./admin/adminReviewPage.jsx"

import { LuClipboardList } from "react-icons/lu";
import { LuBoxes } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdReviews } from "react-icons/md";
import Loader from "../components/loader.jsx"





export default function AdminPage() {

    // Authentication check
    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token == null){
            window.location.href = '/';
            return;
        }
        axios.get(import.meta.env.VITE_BACKEND_URL + '/users/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            if(response.data.role == 'admin'){
                setUser(response.data);
            }else{
                window.location.href = '/';
            }
        }).catch(() => {
            window.location.href = '/login';
        });
    },[])

    return (
        <div className="w-full h-full max-h-full flex bg-accent">
            {user ?
            <>
            <div className="w-[300px] h-full bg-accent">
                <div className="w-full h-[100px] text-primary flex items-center ">
                    <img src="/logo2.png" alt="Logo" className="h-full" />
                    <h1 className="text-2xl">
                        Admin 
                    </h1>
                </div>
                <div className="w-full h-[400px] text-white text-2xl flex flex-col pl-[20px] pt-[20px]">
                    <Link to="/admin/"className="w-full flex items-center h-[50px] gap-[10px] hover:scale-110 transition-transform"><LuClipboardList />Orders</Link>
                    <Link to="/admin/products"className="w-full flex items-center h-[50px] gap-[10px] hover:scale-110 transition-transform"><LuBoxes />Products</Link>
                    <Link to="/admin/users"className="w-full flex items-center h-[50px] gap-[10px] hover:scale-110 transition-transform"><FiUsers />Users</Link>
                    <Link to="/admin/reviews"className="w-full flex items-center h-[50px] gap-[10px] hover:scale-110 transition-transform"><MdReviews />Reviews</Link>

                </div>

            </div>
            <div className="w-[calc(100%-300px)] h-full max-h-full bg-primary border-[5px] border-accent flex flex-col rounded-3xl overflow-y-scroll">
                <Routes>
                    <Route path='/' element={<AdminOrdersPage />} />
                    <Route path='/products' element={<AdminProductPage />} />
                    <Route path='/add-product' element={<AdminAddProductPage />} />
                    <Route path='/update-product' element={<AdminUpdateProductPage/>}/>
                    <Route path='/users' element={<AdminUsersPage />} />
                    <Route path='/reviews' element={<AdminReviewPage />} />


                </Routes>

            </div>
            </>:
            <Loader />
            }

        </div>
    )
} 