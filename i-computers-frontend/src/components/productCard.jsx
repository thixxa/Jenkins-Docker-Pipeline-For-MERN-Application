import { Link } from "react-router-dom";
export default function ProdcutCard(props) {
    //app.jsx eken ena tika api ganne props kiyala
    const product = props.product;

    return(
        <Link to={'/overview/'+ product.productID} 
            className="w-[250px] h-[450px] m-4 shadow-2xl cursor-pointer relative hover:[&_.buttons]:opacity-100 hover:scale-105 transition-transform">
            <div className="w-full h-[250px] relative">
                <img
                    src={product.images[1]}
                    className="w=full h-full absolute bg-white object-cover"/>
                <img
                    src={product.images[0]}
                    className="w=full h-full absolute bg-white hover:opacity-0 transition-opacity duration-300 object-cover"/>
            </div>
            <div className="w-full h-[150px] p-2 flex flex-col justify-between">
                <h1 className="text-center font-bold text-secondary">
                    {product.name}
                </h1>
                <div className="w-full flex flex-col items-center">
                    {
                        product.labelledPrice > product.price &&
                        <h2 className="text-secondary/80 line-through ">
                            LKR. {product.labelledPrice.toFixed(2)} 
                        </h2>
                    }
                    <h2 className="text-accent font-semibold text-2xl">
                        LKR. {product.price.toFixed(2)}
                    </h2>
                </div>
            </div>
            <div className="w-full h-[140px] bottom-0 opacity-0 absolute buttons bg-white transition-opacity duration-300 justify-center items-center flex flex-col gap-2">
                <button 
                    className=" w-[70%] px-4 py-2 text-center bg-white border-2 border-accent text-accent hover:bg-accent hover:text-white rounded-md transistion">
                    View Details
                </button>
            </div>
        </Link>
    );
}