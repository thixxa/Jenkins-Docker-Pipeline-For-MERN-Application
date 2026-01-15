import Header from "../components/header.jsx";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./productPage.jsx";
import ProductOverview from "./productOverviewPage.jsx";
import CartPage from "./cart.jsx";
import CheckOutPage from "./checkOut.jsx";
import OrdersPage from "./ordersPage.jsx";
import AboutPage from "./aboutPage.jsx";
import ContactPage from "./contactPage.jsx";
import HomeViewPage from "./homeViewPage.jsx";
import Footer from "../components/footer.jsx";
import ReviewPage from "./reviewPage.jsx";

export default function HomePage() {
    return (
        <div className="w-full h-full">
            <Header/>
            <div className="w-full min-h-[calc(100%-100px)] overflow-y-scroll">
                <Routes>
                    <Route path='/' element={<HomeViewPage/>} />
                    <Route path='/products' element={<ProductPage/>} />
                    <Route path='/about' element={<AboutPage/>} />
                    <Route path='/contact' element={<ContactPage/>} />
                    <Route path='/reviews' element={<ReviewPage/>} />
                    <Route path='/overview/:productID' element={<ProductOverview/>}/>
                    <Route path='/cart' element={<CartPage/>}/>
                    <Route path='/checkout' element={<CheckOutPage/>} />
                    <Route path='/orders' element={<OrdersPage/>} />
                    <Route path='/*' element={<h1>Page Not Found</h1>} />
                </Routes>

            </div>
            <Footer/>

        </div>
    )
}