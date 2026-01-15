import { addToCart, getCart } from "../utils/cart";
import { useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { getCartTotal } from "../utils/cart";
import { Link } from "react-router-dom";


export default function CartPage(){

    const [cart, setCart] = useState(getCart());


    return(
        <div className="w-full flex flex-col items-center p-[20px] gap-4 justify-between">
            {
                cart.map(
                    (item, index)=>{
                        return(
                            <div key={index} className="w-full lg:w-[50%] pt-[20px] relative lg:h-[200px] rounded-xl overflow-hidden flex my-1 shadow-2xl justify-between ">
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
                                                    addToCart(item, 1);
                                                    const newCart = getCart();
                                                    setCart(newCart);
                                                }
                                            }
                                            className="text-2xl text-secondary cursor-pointer hover:text-accent"/>
                                        <span className="text-lg font-semibold text-secondary">{item.quantity}</span>
                                        <BsChevronDown 
                                            onClick={
                                                ()=>{
                                                    addToCart(item, -1);
                                                    const newCart = getCart();
                                                    setCart(newCart);
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
            <div className="w-[80%] lg:w-[40%] h-[100px] rounded-xl overflow-hidden flex my-1 shadow-2xl justify-between items-center">
                <Link 
                    to="/checkout" 
                    className=" h-[50px] bg-accent/80 hover:bg-accent text-white px-4 py-2 rounded m-4"
                    state={
                        cart
                    }>
                    Checkout
                </Link>
                <span className="w-[150px] pr-4 text-xl font-bold text-right text-accent">
                    LKR. {getCartTotal().toFixed(2)}
                </span>
                
                    
            </div>
        </div>
    )
}