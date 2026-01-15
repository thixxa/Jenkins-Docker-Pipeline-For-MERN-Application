
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../components/loader.jsx";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer.jsx";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!loaded){
        axios
        .get(import.meta.env.VITE_BACKEND_URL + "/orders",{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response.data);
            setOrders(response.data);
            setLoaded(true);
        });
    }
    
  }, [loaded]); 

  return (
    <div className="min-h-screen w-full bg-primary/60 text-secondary">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">
            My Orders
          </h1>
        </div>

        <div className="overflow-hidden rounded-2xl border border-secondary/10 bg-white shadow-xl">
          <div className="overflow-x-auto">
            {loaded ? ( 
            <table className="min-w-full table-auto">
              <thead className="bg-accent text-primary">
                <tr className="text-left text-sm uppercase tracking-wider">
                  <th className="px-5 py-4">Order ID</th>
                  <th className="px-5 py-4">Customer Email</th>
                  <th className="px-5 py-4">Customer Name</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Total Amount</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-secondary/10">
                {orders.map((order, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-primary/20 transition-colors hover:bg-accent/10"
                    >
                      <td className="px-5 py-4">
                        {order.orderId}
                      </td>
                        <td className="px-5 py-4">
                        {order.email}
                      </td>
                      <td className="px-5 py-4">
                        {order.name}
                      </td> 
                      <td className="px-5 py-4">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-4">
                        {order.status}
                        </td>
                        <td className="px-5 py-4">
                        LKR. {order.total.toFixed(2)}
                      </td>
                      <td className="px-5 py-4">
                        <ViewOrderInfoCustomer order={order} />
                      </td>
                   </tr>
                  );
                })}
              </tbody>
            </table>):(<Loader />)}
          </div>
        </div>
      </div>
    </div>
  );
}
