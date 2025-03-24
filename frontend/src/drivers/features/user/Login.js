import { useState } from 'react'
import { Link } from 'react-router-dom'

import { RiEye2Line, RiEyeCloseLine, RiPhoneLine, RiUserSmileLine, RiUser2Line, RiMailLine, RiLoader2Fill, RiUser5Line } from "@remixicon/react"

import { MdOutlineSms } from "react-icons/md";

import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'


function Login() {

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [code, setCode] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    const navigate = useNavigate()


    // error
    const [phoneError, setPhoneError] = useState(false)
    const [phoneErrorMsg, setPhoneErrorMsg] = useState("")

    const [passwordError, setPasswordError] = useState(false)
    const [passwordErrorMsg, setPasswordErrorMsg] = useState("")



    // btn spinner
    const [btnSpinner, setBtnSpinner] = useState(false)

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };




    const login = (e) => {
        e.preventDefault()

        

        if (phone && password) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }


            axios.post('/api/drivers/auth/login', { phone, password }, config).then((data) => {

                localStorage.setItem("userId", data.data._id)

                if (data) {
                    axios.post('/api/drivers/auth/send-otp', { phone }, config).then((otpData) => {
                        toast.info('!کد یکبار مصرف ارسال شده را در زیر وارد کنید', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                        setIsLogin(true)
                    })

                }
            }).catch((error) => {
                console.log(error);
                setBtnSpinner(false)

                toast.error(error.response.data.msg || error.name, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })


        } else {
            toast.error('!!لطفا همه فیلدها را وارد کنید', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }


    const verify = (e) => {
        e.preventDefault()

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        if (code) {

            axios.post('/api/drivers/auth/verify-otp', { phone, code }, config).then((data) => {

                if (data) {
                    
                    const token = data.data.token
                    localStorage.setItem("userToken", token)
                    navigate('/drivers/welcome')
                }

            }).catch((error) => {
                console.log(error);

                toast.error(error.response.data.msg || error.name, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        } else {

            toast.error('!!لطفا کد تایید را وارد کنید', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }



    return (
        <>
            <div className="min-h-screen bg-gray-50 flex items-center text-right">
                <div className="card mx-auto w-full max-w-5xl shadow-2xl">
                    <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
                        <div className=''>
                            <div className="hero min-h-full rounded-l-xl bg-base-200">
                                <div className="hero-content p-2">
                                    <div className="w-50 px-6 py-4">
                                        <h1 className="mb-4 text-center font-bold text-lg"> ورود به پنل رانندگان</h1>
                                        <div className="my-auto"><img width={500} height={400} src="https://img.freepik.com/free-photo/portrait-female-bus-driver_23-2151589862.jpg?uid=R156737658&ga=GA1.1.972404931.1740587830&semt=ais_hybrid" style={{ borderRadius: '12px' }} alt="اقامتگاه" className="inline-block"></img></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isLogin ? (
                            <div className="flex flex-col bg-white px-2 sm:px-2 md:px-2 lg:px-2 pt-2 pb-6 w-full max-w-md m-auto">
                                <div className="font-medium mt-2 self-center text-xl sm:text-2xl uppercase text-gray-800">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="remixicon w-12 h-12"><path d="M22.1034 19L12.8659 3.00017C12.7782 2.84815 12.6519 2.72191 12.4999 2.63414C12.0216 2.358 11.41 2.52187 11.1339 3.00017L1.89638 19H1V21C8.33333 21 15.6667 21 23 21V19H22.1034ZM7.59991 19.0002H4.20568L11.9999 5.50017L19.7941 19.0002H16.4001L12 11L7.59991 19.0002ZM12 15.1501L14.1175 19H9.88254L12 15.1501Z"></path></svg>
                                </div>
                                <div className="relative mt-4 h-px bg-gray-300">
                                    <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                                        <span className="bg-white px-4 text-xs text-gray-500 uppercase">تایید کد </span>
                                    </div>
                                </div>
                                <form className="" onSubmit={verify}>
                                    <p className='text-gray-500 mt-6 mb-10'>کد ارسال شده را در زیر وارد کنید. </p>
                                    <div className="flex flex-col mb-2">
                                        <label htmlFor="phone" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">کد یکبار مصرف</label>
                                        <div className="relative">
                                            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                                <MdOutlineSms className='w-6 h-6 text-gray-400' />
                                            </div>
                                            <input style={{ borderRadius: '5px' }} type="text" name='code'
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:border-blue-800" placeholder="کد یکبار مصرف" />
                                        </div>
                                        <span className='text-red-500 relative text-sm'>{phoneError ? phoneErrorMsg : ""}</span>
                                    </div>
                                    {/* verify user */}
                                    <div className="mt-4 w-full">
                                        <button className="app-btn-blue w-full" onClick={verify}>
                                            {btnSpinner ? (
                                                <div className="px-10 py-1 flex items-center justify-center">
                                                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                                </div>
                                            ) : (
                                                <span>تایید کد</span>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="flex flex-col bg-white px-2 sm:px-2 md:px-2 lg:px-2 py-2 w-full max-w-md m-auto">
                                <div className="font-medium mt-4 self-center text-xl sm:text-2xl uppercase text-gray-800">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="remixicon w-12 h-12"><path d="M22.1034 19L12.8659 3.00017C12.7782 2.84815 12.6519 2.72191 12.4999 2.63414C12.0216 2.358 11.41 2.52187 11.1339 3.00017L1.89638 19H1V21C8.33333 21 15.6667 21 23 21V19H22.1034ZM7.59991 19.0002H4.20568L11.9999 5.50017L19.7941 19.0002H16.4001L12 11L7.59991 19.0002ZM12 15.1501L14.1175 19H9.88254L12 15.1501Z"></path></svg>
                                </div>
                                <div className="relative mt-4 h-px bg-gray-300">
                                    <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                                        <span className="bg-white px-4 text-xs text-gray-500 uppercase">ورود به پنل رانندگان </span>
                                    </div>
                                </div>
                                <div className="mt-2 rounded-sm">
                                    <form className="space-y-2 mt-2">
                                        <div className="container mx-auto p-4">

                                            {/* phone */}
                                            <div className="flex flex-col mb-4">
                                                <label htmlFor="phone" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">شماره تلفن</label>
                                                <div className="relative">
                                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                                        <RiPhoneLine />
                                                    </div>
                                                    <input style={{ borderRadius: '5px' }} type="text" value={phone}
                                                        onChange={(e) => setPhone(e.target.value)} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:border-blue-800" placeholder="شماره تلفن" />
                                                </div>
                                                <span className='text-red-500 relative text-sm'>{phoneError ? phoneErrorMsg : ""}</span>
                                            </div>

                                            {/* password */}
                                            <div className="relative mb-4">
                                                <label className="block mb-1 text-xs sm:text-sm tracking-wide text-gray-600" htmlFor="password">
                                                    پسورد
                                                </label>

                                                <input
                                                    type={passwordVisible ? "text" : "password"}
                                                    id="password"
                                                    onChange={handlePasswordChange}
                                                    value={password}
                                                    className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:border-blue-800"
                                                    placeholder="پسورد"
                                                    style={{ borderRadius: '5px' }}
                                                />

                                                <div
                                                    onClick={togglePasswordVisibility}
                                                    className="absolute inset-y-2 left-3 flex items-center cursor-pointer top-6"
                                                >
                                                    {passwordVisible ? (
                                                        <RiEye2Line className='text-gray-400' />
                                                    ) : (
                                                        <RiEyeCloseLine className='text-gray-400' />
                                                    )}
                                                </div>
                                                <span className='text-red-500 relative text-sm'>{passwordError ? passwordErrorMsg : ""}</span>

                                                <div className="flex items-center mb-6">
                                                    <div className="flex ml-auto">
                                                        <Link to="/drivers/forgot-password" className="inline-flex text-xs font-bold sm:text-sm text-blue-800 hover:text-blue-900">پسورد خود را فراموش کردید؟</Link>
                                                    </div>
                                                </div>
                                            </div>




                                            {/* login user */}
                                            <div className="my-2 w-full">
                                                <button className="app-btn-blue w-full" onClick={login}>
                                                    {btnSpinner ? (
                                                        <div className="px-10 py-1 flex items-center justify-center">
                                                            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                                        </div>
                                                    ) : (
                                                        <span>ورود</span>
                                                    )}
                                                </button>
                                            </div>
                                            <p className='text-sm text-gray-800'>حساب ندارید؟ <Link to='/drivers/register' className='hover:text-blue-900 hover:cursor-pointer'>ثبت نام </Link></p>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login