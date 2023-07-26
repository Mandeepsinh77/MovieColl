import React, { useContext } from 'react'
import { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { query, where, getDocs } from 'firebase/firestore'
import { usersRef } from "../firebase/firebase.js"
import { Appstate } from "../App";
// import bcrypt from "bcryptjs"


const Login = () => {
    const navigate = useNavigate();
    const useAppstate = useContext(Appstate);

    const [form, setForm] = useState({
        mobile: "",
        password: "",

    })
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        try {
            let quer = query(usersRef, where('mobile', '==', form.mobile));
            const incomingData = await getDocs(quer);

            incomingData.forEach((doc) => {
                // console.log("JAY MATAJI")
                const _data = doc.data();
                const isUserexist = (form.password == _data.password)
                console.log(isUserexist)
                if (isUserexist) {
                 
                    useAppstate.setLogin(true);
                    useAppstate.setUserName(_data.name);
                
                    swal({
                        title: "Logged In",
                        icon: "success",
                        buttons: false,
                        timer: 3000
                    })
                    return navigate("/")
                } else {
                    swal({
                        title: "Invalid Credentials",
                        icon: "error",
                        buttons: false,
                        timer: 3000
                    })
                }
            })

        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false);
    }
    return (
        <div className='w-full flex flex-col mt-12 items-center'>
            <h1 className='text-xl  font-bold'>Login </h1>
            <div className="p-2 w-1/1 md:w-1/3">
                <div className="relative">
                    <label htmlFor="name" className="leading-7 text-xl text-gray-300">Mobile No : </label>
                    <input
                        type={"number"}
                        id="name"
                        name="name"
                        value={form.mobile}
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                        className="w-full  bg-gray-400 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none  text-neutral-950 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
            <div className="p-2 w-1/1 md:w-1/3">
                <div className="relative">
                    <label htmlFor="name" className="leading-7 text-xl text-gray-200">Password : </label>
                    <input
                        type="password"
                        id="name"
                        name="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full  bg-gray-400 rounded border border-gray-300 focus:border-indigo-500 focus:header focus:ring-2 focus:ring-white text-base outline-none  text-neutral-950 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
            <div className='p-3 w-full'>
                <button onClick={login} className="flex mx-auto text-white  bg-red-500 border-0 py-2 px-8 focus:outline-none  rounded hover:text-red-600 hover:bg-white text-lg">
                    {loading ? <TailSpin height={25} color='white' /> : "Login"}
                </button>
            </div>
            <div>
                <p>Do not have account ? <Link to={"/signup"}> <span className='text-blue-500'>Sign Up</span></Link></p>
            </div>
        </div>

    )
}

export default Login
