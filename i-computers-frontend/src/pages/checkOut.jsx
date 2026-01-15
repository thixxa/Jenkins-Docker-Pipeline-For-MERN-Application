import { useState } from "react";
import toast from "react-hot-toast";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";



export default function CheckOutPage(){

    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const [cart, setCart] = useState(location.state);

    if(location.state == null){
        navigate("/products");
    }

    function getTotalAmount(){
        let total = 0;
        cart.forEach(
            (item)=>{
                total += item.price * item.quantity;
            }
        )
        return total;
    }

    async function submitOrder(){
        //order eka submit karanna
        const token = localStorage.getItem("token");
        if(!token){
            toast.error("Please login to place an order");
            navigate("/login");
            return;
        }

        const orderItems = []

        cart.forEach(
            (item)=>{
                orderItems.push({
                    productID: item.productID,
                    quantity: item.quantity,
                })
            }
        );
        axios.post(import.meta.env.VITE_BACKEND_URL + "/orders",
            {
                name: name,
                address: address,
                phone: phone,
                items: orderItems,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then(()=>{
            toast.success("Order placed successfully");
            navigate("/orders");
        }).catch(
            (error)=>{
                toast.error("Error placing order. Please try again");
                
            }
        )
    }

    return(
        <div className="w-full flex flex-col items-center p-[20px] gap-4 justify-between">
            {
                cart.map(
                    (item, index)=>{
                        return(
                            <div className="w-full lg:w-[50%] pt-[20px] relative lg:h-[200px] rounded-xl overflow-hidden flex my-1 shadow-2xl justify-between" key={item.productID || index}>
                                <h1 className="absolute top-[0px] lg:hidden w-full overflow-hidden h-[20px]">{item.name}</h1>
                                <div className="h-full flex flex-col lg:flex-row">
                                <img src={item.image} className=" h-[40px] lg:h-full aspect-square object-cover"/>
                                <h2 className="text-md text-secondary/80 line-through lg:hidden">
                                        LKR. {(item.labelledPrice).toFixed(2)}
                                    </h2>
                                    <h2 className="text-lg text-accent/80 font-semibold lg:hidden">
                                        LKR. {(item.price).toFixed(2)} 
                                    </h2>
                                </div>
                                <div className="w-[300px] hidden lg:flex flex-col justify-center p-4 gap-2">
                                    <h1 className="text-2xl font-semibold text-secondary">{item.name}</h1>
                                    <h3>ProductID: {item.productID}</h3>
                                    <h2 className="text-md text-secondary/80 line-through">
                                        LKR. {(item.labelledPrice).toFixed(2)}
                                    </h2>
                                    <h2 className="text-lg text-accent/80 font-semibold">
                                        LKR. {(item.price).toFixed(2)} 
                                    </h2>
                                </div>
                                <div className="h-full flex flex-row items-center gap-4">
                                    <div className="h-full flex flex-col justify-center items-center">
                                        <BsChevronUp 
                                            onClick={
                                                ()=>{
                                                    const copiedCart = [...cart]; //copy ekak hadanawa cart eke
                                                    copiedCart[index].quantity += 1;
                                                    setCart(copiedCart);
                                                }
                                            }
                                            className="text-2xl text-secondary cursor-pointer hover:text-accent"/>
                                        <span className="text-lg font-semibold text-secondary">{item.quantity}</span>
                                        <BsChevronDown 
                                            onClick={
                                                ()=>{
                                                    const copiedCart = [...cart];
                                                    copiedCart[index].quantity -= 1;
                                                    if(copiedCart[index].quantity <= 0){
                                                        copiedCart.splice(index, 1);
                                                    }
                                                    setCart(copiedCart);
                                                }
                                            }
                                            className="text-2xl text-secondary cursor-pointer hover:text-accent"/>
                                    </div>
                                    <span className="w-[150px] pr-4 text-lg text-right text-accent font-semibold">
                                       LKR. {(item.price * item.quantity).toFixed(2)}
                                    </span>

                                </div>


                            </div>
                        )
                    }
                )  
            }
            <div className="w-full lg:w-[50%] h-[200px] rounded-xl overflow-hidden flex flex-wrap my-1 shadow-2xl justify-between items-center">
                <div className="flex flex-col w-[50%]">
                <label>Name</label>
                <input 
                    type="text" 
                    className="h-[50px] w-[80%] border-2 border-secondary/50 rounded px-4"
                    value={name}
                    onChange={
                        (e)=>{
                            setName(e.target.value);
                        }
                    }
                />
                </div>
                
                <div className="flex flex-col w-[50%]">
                <label>Phone</label>
                <input 
                    type="text" 
                    className="h-[50px] w-[80%] border-2 border-secondary/50 rounded px-4"
                    value={phone}
                    onChange={
                        (e)=>{
                            setPhone(e.target.value);
                        }
                    }
                />
                </div>
                <div className="flex flex-col w-full">
                <label>Address</label>
                <textarea 
                    className="h-[75px] w-full border-2 border-secondary/50 rounded px-4"
                    value={address}
                    onChange={
                        (e)=>{                    
                            setAddress(e.target.value);
                        }
                    }
                />
                </div>
            </div>

            <div className="w-full lg:w-[50%] h-[100px] rounded-xl overflow-hidden flex my-1 shadow-2xl justify-between items-center">
                <button 
                    onClick={submitOrder}
                    className=" h-[50px] bg-accent/80 hover:bg-accent text-white px-4 py-2 rounded m-4">
                    Order Now
                </button>
                <span className="w-[150px] pr-4 text-xl font-bold text-right text-accent">
                    LKR. {getTotalAmount().toFixed(2)}
                </span>                   
            </div>
        </div>
    )
}