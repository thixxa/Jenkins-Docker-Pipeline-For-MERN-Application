import { toast } from "react-hot-toast";


const sampleCart = [
    {
        productID: "prod001",
        name: "Sample Product 1",
        price: 199.99,
        labelledPrice: 249.99,
        quantity: 2,
        image: "https://via.placeholder.com/150"
    },
    {
        productID: "prod002",
        name: "Sample Product 2",
        price: 99.99,
        labelledPrice: 129.99,
        quantity: 1,
        image: "https://via.placeholder.com/150"
    }
]
//uda tike sample cart ekaka widiha pennala thiyenne. meka code ekata wadagath na

export function getCart(){
    let cartString = localStorage.getItem("cart"); //cart kiyala local storage eke thiyena data eka ganna
    if(cartString == null){
        localStorage.setItem("cart", "[]"); //cart eka null nam empty array ekak set karanawa
        return [];
    }else{
        const cart = JSON.parse(cartString); //string eka array ekakata convert karanawa
        return cart;
    }
}


export function addToCart(product, quantity){
    const cart = getCart(); //current cart eka gannawa
    //check if product already in cart
    const existingProductIndex = cart.findIndex( //findIndex kiyanne function ekak 
        (item) => { //mehema hoyapu eka hambun nathnam -1 return karanawa
            return item.productID === product.productID
        }
    );
    if(existingProductIndex == -1){
        cart.push( //product eka nathnam cart ekata add karanawa
            {
                productID: product.productID,
                name: product.name,
                price: product.price,
                labelledPrice: product.labelledPrice,
                quantity: quantity,
                image: product.images[0]
            }
        )
        toast.success(`${product.name} added to cart`);
    }else{
        const newQuantity = cart[existingProductIndex].quantity + quantity; //product eka thiyenawanam quantity eka update karanawa

        if(newQuantity <= 0){
            cart.splice(existingProductIndex, 1); //quantity eka 0 wenawanam product eka cart eke nathi karanawa
            toast.success(`${product.name} removed from cart`);
        }else{
            cart[existingProductIndex].quantity = newQuantity; //nathnam quantity eka update karanawa
            toast.success(`Updated quantity of ${product.name} to ${newQuantity}`);
        }
    }
    const cartString = JSON.stringify(cart); //array eka string ekakata convert karanawa
    localStorage.setItem("cart", cartString); //local storage eke cart eka update karanawa
}


export function emptyCart(){
    localStorage.setItem("cart", "[]"); //cart eka empty array ekakata set karanawa
}

export function getCartTotal(){
    let total = 0;
    const cart = getCart();
    cart.forEach(
        (item)=>{
            total += item.price * item.quantity;
        }
    )
    return total;
}