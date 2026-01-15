import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { addToCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";


export default function ProductOverview(){

    const navigate = useNavigate();

    const params = useParams(); //url eke ena parameters ganna(productID eka ganna) 

    const [product, setProduct] = useState(null);

    const [ currentStatus, setCurrrentStatus] = useState("loading");

    useEffect(()=>{
        if(currentStatus=="loading"){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID)
            .then(
                (response)=>{
                    setProduct(response.data);
                    setCurrrentStatus("success"); 
                }
            ).catch(
                (error)=>{
                    toast.error("Product not found. Please try again");
                    setCurrrentStatus("error")
                }
            )
        }
    }, [])

    return(
        <>
        {
            currentStatus == "loading" && <Loader/> 
        }
        {
            currentStatus == "error" && <h1 className="text-center text-2xl mt-10">Error loading product</h1>
        }
        {
            currentStatus == "success" &&
            <div className="w-full h-[calc(100vh-100px)] flex flex-col lg:flex-row">
                <h1 className="text-4xl font-semibold text-center sticky top-0 bg-white lg:hidden">{product.name}</h1>
                <div className="w-full lg:w-1/2 lg:h-full flex justify-center items-center">
                    <ImageSlider images={product.images}/>
                </div>
                <div className="w-full lg:w-1/2 h-full p-10 flex flex-col gap-6">
                    <h1 className="text-4xl font-semibold hidden lg:block">{product.name}</h1>
                    <h2 className="text-lg text-secondary/80">{product.productID}</h2>
                    <h3 className="text-lg text-secondary/80">{product.category}</h3>
                    {/*altnames showing*/}
                    {product.altNames && product.altNames.length > 0 && (
                        <h3 className="text-md text-secondary/80 flex items-center">
                            {product.altNames.join(" | ")}
                        </h3>
                    )}
                    <p className="text-md text-justify text-secondary/80 overflow-y-auto">{product.description}</p>
                    <div className="w-full">
                        {
                            product.labelledPrice > product.price &&
                            <h2 className="text-secondary/80 line-through text-xl">
                                LKR. {product.labelledPrice.toFixed(2)}
                            </h2>
                        }
                        <h2 className="text-accent font-semibold text-3xl">
                            LKR. {product.price.toFixed(2)}
                        </h2>
                    </div>
                    <div className="w-full flex flex-row gap-4 mt-4">
                        <button 
                            className="w-[150px] px-4 py-2 bg-accent/80 text-white rounded hover:bg-accent transistion"
                            onClick={()=>{
                                addToCart(product, 1);
                                
                            }}>
                                Add to Cart
                        </button>
                        <button 
                            className="w-[150px] px-4 py-2 bg-secondary/80 text-white rounded hover:bg-secondary transition"
                            onClick={()=>{
                                navigate("/checkout", {state: [{
                                    productID: product.productID,
                                    name: product.name,
                                    price: product.price,
                                    labelledPrice: product.labelledPrice,
                                    image: product.images[0],
                                    quantity: 1
                                }]});
                            }}>
                                Buy Now
                        </button>
                    </div>
                </div>


            </div>
        }
        </>
    )
}