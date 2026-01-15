import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../components/loader";
import { GoVerified } from "react-icons/go";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);  

  useEffect(() => {
    if(!loaded){
        axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users/all" , {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
            console.log(response.data);
            setUsers(response.data);
            setLoaded(true);
        });
    }
    
  }, [loaded]); 

  return (
    <div className="min-h-screen w-full bg-primary/60 text-secondary">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl lg:text-4xl font-extrabold">
            Manage users
          </h1>
        </div>

        <div className="overflow-hidden rounded-2xl border border-secondary/10 bg-white shadow-xl">
          <div className="overflow-x-auto">
            {loaded ? 
            <table className="min-w-full table-auto">
              <thead className="bg-secondary text-primary">
                <tr className="text-left text-sm uppercase tracking-wider">
                  <th className="px-5 py-4">Image</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">First Name</th>
                  <th className="px-5 py-4">Last Name</th>
                  <th className="px-5 py-4">Role</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-secondary/10">
                {users.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="bg-primary/20 transition-colors hover:bg-accent/10"
                    >
                      <td className="px-5 py-4">
                        <img
                          src={item.image}
                          className="h-10 w-10 rounded-lg object-cover ring-1 ring-secondary/10"
                        />
                      </td>
                      <td className="px-5 py-4 font-medium text-secondary/80">
                        {item.email}
                        {item.isEmailVerified ? <GoVerified className="inline-block ml-2 text-blue-500"/> : null}
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-semibold">{item.firstName}</div>
                      </td>
                      <td className="px-5 py-4 text-secondary/70">
                        {item.lastName}
                      </td>
                      <td className="px-5 py-4">
                        <div className="inline-block rounded-lg bg-secondary/5 px-2 py-1 text-sm">
                          {item.role}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="inline-block rounded-lg bg-secondary/5 px-2 py-1 text-sm ">
                          {item.isBlocked ? "Blocked" : "Active"}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={
                            async ()=>{
                              await axios.put(import.meta.env.VITE_BACKEND_URL + "/users/toggle-block/" + item.email, {
                                isBlocked: !item.isBlocked
                              },
                            {
                              headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                              }
                            });
                            setLoaded(false);
                            }
                          } 
                          className="px-3 py-1 bg-accent/50 text-primary rounded-lg hover:bg-accent/80 transition-colors">
                          {
                            item.isBlocked?"Unblock User":"Block User"
                          }

                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>:<Loader/>}
          </div>
        </div>
      </div>
    </div>
  );
}
