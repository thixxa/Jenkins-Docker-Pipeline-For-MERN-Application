import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import ProductDeleteButton from "../../components/productDeleteButton";

export default function AdminProductPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products")
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  return (
    <div className="min-h-screen w-full bg-primary/60 text-secondary">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="w-full h-[75px] top-0 bg-white flex justify-center items-center mb-4 z-10">
            <input
              type="text"
              placeholder="Find products..."
              className="w-1/2 px-4 py-2 border border-secondary/30 rounded-full outline-none"
              onChange={async (e) => {
                if (e.target.value == "") {
                  setLoaded(false);
                  await axios
                    .get(import.meta.env.VITE_BACKEND_URL + "/products")
                    .then((response) => {
                      console.log(response.data);
                      setProducts(response.data);
                      setLoaded(true);
                    });
                  setLoaded(true);
                } else {
                  await axios
                    .get(
                      import.meta.env.VITE_BACKEND_URL +
                        "/products/search/" +
                        e.target.value
                    )
                    .then((response) => {
                      console.log(response.data);
                      setProducts(response.data);
                      setLoaded(true);
                    });
                  setLoaded(true);
                }
              }}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-secondary/10 bg-white shadow-xl">
          <div className="overflow-x-auto">
            {loaded ? (
              <table className="min-w-full table-auto">
                <thead className="bg-secondary text-primary">
                  <tr className="text-left text-sm uppercase tracking-wider hover:bg-secondary/90">
                    <th className="px-5 py-4 text-center">Image</th>
                    <th className="px-5 py-4 text-center">Product ID</th>
                    <th className="px-5 py-4 text-center">Name</th>
                    <th className="px-5 py-4 text-center">Category</th>
                    <th className="px-5 py-4 text-center">Price</th>
                    <th className="px-5 py-4 text-center">Labelled Price</th>
                    <th className="px-5 py-4 text-center">Brand</th>
                    <th className="px-5 py-4 text-center">Model</th>
                    <th className="px-5 py-4 text-center">Stock</th>
                    <th className="px-5 py-4 text-center">Availability</th>
                    <th className="px-5 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-secondary/10">
                  {products.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-primary/20 transition-colors hover:bg-accent/10"
                      >
                        <td className="px-5 py-4">
                          <img
                            src={item.images[0]}
                            className="h-10 w-10 rounded-lg object-cover ring-1 ring-secondary/10"
                          />
                        </td>
                        <td className="px-5 py-4 font-medium text-secondary/80">
                          {item.productID}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="font-semibold">{item.name}</div>
                        </td>
                        <td className="px-5 py-4 text-secondary/70 text-center">
                          {item.category}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="inline-block rounded-lg bg-secondary/5 px-2 py-1 text-sm">
                            LKR. {item.price}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="inline-block rounded-lg bg-secondary/5 px-2 py-1 text-sm ">
                            LKR. {item.labelledPrice}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-secondary/80 text-center">
                          {item.brand}
                        </td>
                        <td className="px-5 py-4 text-secondary/80 text-center">
                          {item.model}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="inline-block rounded-lg bg-accent/10 px-2 py-1 text-sm text-accent">
                            {item.stock}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="inline-block px-3 py-1 text-xs">
                            {item.isAvailable ? "Available" : "Unavailable"}
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-accent">
                            <Link
                              to="/admin/update-product"
                              className="px-3 py-2 rounded-md w-[90px] text-center text-white bg-accent/70 hover:bg-accent"
                              //state eka ganne data dala yawanna. apita danata product eke wisathara tika one hinda.
                              //api wenas karanne danata thiyena wisthara ne.
                              //state eken danata thiyena wisthara tika dala yawanawa
                              state={item}
                            >
                              Edit
                            </Link>
                            <ProductDeleteButton
                              productID={item.productID}
                              autoReload={() => {
                                setLoaded(flase);
                              }}
                            />
                            <div className="cursor-default select-none opacity-60"></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <Loader />
            )}
          </div>
        </div>

        <Link
          to="/admin/add-product"
          className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-2xl transition-transform hover:scale-105 focus:scale-105 focus:outline-none"
        >
          <BiPlus className="text-4xl" />
        </Link>
      </div>
    </div>
  );
}
