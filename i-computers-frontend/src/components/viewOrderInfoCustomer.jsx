import { useState } from "react";
import Modal from "react-modal";

export default function ViewOrderInfoCustomer(props) {
    const order = props.order
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState(order.status);
    const [notes, setNotes] = useState(order.notes || '');

    if(!order) return null;

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="outline-none"
                overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity"
            >
                {/* Modal Content Container */}
                <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                    
                    {/* 1. Header Section */}
                    <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                            <p className="text-sm text-gray-500 tracking-wider">Order ID: {order.orderId}</p>
                        </div>
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="text-black bg-red-200 hover:text-white hover:bg-red-400 p-2 rounded-full transition-colors">
                                X
                        </button>
                    </div>

                    {/* 2. Scrollable Content */}
                    <div className="overflow-y-auto p-6 space-y-6">
                        
                        {/* Customer Info Card */}
                        <h1 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h1>
                        <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 text-xs">Full Name</p>
                                    <p className="font-medium text-gray-900">{order.name}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Email Address</p>
                                    <p className="font-medium text-gray-900 break-all">{order.email}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Phone Number</p>
                                    <p className="font-medium text-gray-900">{order.phone}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Order Date</p>
                                    <p className="font-medium text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-gray-500 text-xs">Delivery Address</p>
                                    <p className="font-medium text-gray-900">{order.address}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Order Status</p>
                                    <div>
                                        <select
                                            className="w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent/50"
                                            value={status}
                                            disabled>
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Additional Notes</p>
                                    <textarea
                                        className="font-medium text-gray-900 w-full outline-0"
                                        value={notes}
                                        disabled
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Purchased Items</h3>
                            <div className="border rounded-lg overflow-hidden">
                                <table className="w-full text-left text-sm text-gray-600">
                                    <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                                        <tr>
                                            <th className="px-4 py-3">Product</th>
                                            <th className="px-4 py-3 text-center">Qty</th>
                                            <th className="px-4 py-3 text-right">Price (LKR)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {order.items.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                                                <td className="px-4 py-3 text-center">{item.quantity}</td>
                                                <td className="px-4 py-3 text-right font-mono text-gray-700">
                                                    {item.price.toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50 font-semibold text-gray-900">
                                        <tr>
                                            <td colSpan="2" className="px-4 py-3 text-right">Total Amount</td>
                                            <td className="px-4 py-3 text-right text-xl text-accent font-mono">
                                                LKR {order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 border rounded-lg hover:bg-gray-600 hover:text-white transition-all">
                            Close
                        </button>
                    </div>
                </div>
            </Modal>

            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-accent/10 hover:bg-accent hover:text-white text-accent font-medium py-2 px-4 rounded-lg border border-accent/20 transition-all duration-200 flex items-center gap-2 text-sm">
                View Info
            </button>
        </>
    );
}