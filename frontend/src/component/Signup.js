import React from 'react'
import { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { bcrypt } from "bcryptjs"
import { usersRef } from '../firebase/firebase.js';
import { addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
/*Note : if any of the variable or function is export from its file as a default then we did not write a it in {}
         but if it does not come as a default then we write it in braket { }*/
import app from '../firebase/firebase.js'
import swal from 'sweetalert'
const auth = getAuth(app);


const Signup = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        mobile: "",
        password: "",

    })

    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [OTP, setOTP] = useState("");


    //IT IS VARIFIY IS IT HUMAN OR BOT USING RECAPTHAVARIFICATION WHEN WE GENERATE OTP AND VARIFY IT
    const generateRecaptha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            // window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, auth);
    }

    const requestOtp = () => {
        setLoading(true);
        generateRecaptha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                swal({
                    text: "OTP Sent",
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                });
                setOtpSent(true);
                setLoading(false);
            }).catch((error) => {
                console.log(error)
            })
    }

    const verifyOTP = () => {
        try {
            setLoading(true);
            window.confirmationResult.confirm(OTP).then((result) => {
                uploadData();
                swal({
                    text: "Sucessfully Registered",
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                });
                navigate('/login')
                setLoading(false);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const uploadData = async () => {
        try {
            // const saltRounds = 10;
            // const salt = bcrypt.genSaltSync(saltRounds);
            // var hash = bcrypt.hashSync(form.password, salt);

            const no = form.password;
            await addDoc(usersRef, {
                name: form.name,
                password: no,
                mobile: form.mobile
            });


        } catch (err) {
            window.alert(err);
        }
    }

    return (
        <div className='w-full flex flex-col mt-12 items-center'>
            <h1 className='text-xl  font-bold'>Sign Up </h1>
            {otpSent ?
                <>
                    <div className="p-2 w-1/1 md:w-1/3">
                        <div className="relative">
                            <label htmlFor="name" className="leading-7 text-xl text-gray-300">Enter OTP : </label>
                            <input
                                id="name"
                                name="name"
                                value={OTP}
                                onChange={(e) => setOTP(e.target.value)}
                                className="w-full  bg-gray-400 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none  text-neutral-950 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className='p-3 w-full'>
                            <button onClick={verifyOTP} className="flex mx-auto text-white  bg-red-500 border-0 py-2 px-8 focus:outline-none  rounded hover:text-red-600 hover:bg-white text-lg">
                                {loading ? <TailSpin height={25} color='white' /> : "Confirm OTP"}
                            </button>
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="p-2 w-1/1 md:w-1/3">
                        <div className="relative">
                            <label htmlFor="name" className="leading-7 text-xl text-gray-300">Name : </label>
                            <input
                                type="name"
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full bg-gray-400 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none  text-neutral-950 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>

                    <div className="p-2 w-1/1 md:w-1/3">
                        <div className="relative">
                            <label htmlFor="name" className="leading-7 text-xl text-gray-300">Mobile No : </label>
                            <input
                                type={Number}
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
                                className="w-full  bg-gray-400 rounded border border-gray-300 focus:border-indigo-500 focus:header focus:ring-2 focus:ring-indigo-200 text-base outline-none  text-neutral-950 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                    </div>
                    <div className='p-3 w-full'>
                        <button onClick={requestOtp} className="flex mx-auto text-white  bg-red-500 border-0 py-2 px-8 focus:outline-none  rounded hover:text-red-600 hover:bg-white text-lg">
                            {loading ? <TailSpin height={25} color='white' /> : "Sign Up"}
                        </button>
                    </div>
                </>
            }
            <div>
                <p>Already have an account ? <Link to={"/login"}> <span className='text-blue-500'>Login</span></Link></p>
            </div>
            <div id="recaptcha-container"></div>
        </div>

    )
}

export default Signup
