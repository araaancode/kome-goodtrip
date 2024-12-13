import { useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon'

import { RiMailOpenLine } from "@remixicon/react"

import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RiEye2Line, RiEyeCloseLine, RiPhoneLine, RiLoader2Fill, RiLoaderLine, RiLockPasswordLine } from "@remixicon/react"
import { MdOutlineSms } from "react-icons/md";
import { useNavigate } from 'react-router-dom'


function ResetPassword() {

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [linkSent, setLinkSent] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    let token=document.URL.split("?")[1].split("&")[0].split("=")[1]
    let adminId=document.URL.split("?")[1].split("&")[1].split("=")[1]

    const [errorPasswordMessage, setErrorPasswordMessage] = useState("")
    const [errorConfirmPasswordMessage, setErrorConfirmPasswordMessage] = useState("")

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const submitForm = (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (password.trim() === "") return setErrorPasswordMessage("پسورد ضروری است!")
        if (confirmPassword.trim() === "") return setErrorConfirmPasswordMessage("نایید پسورد ضروری است!")
        else {
            // setLoading(true)
            // Call API to send password reset link
            // setLoading(false)
            // setLinkSent(true)

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }


            axios.post('/api/admins/auth/reset-password', { password, confirmPassword,adminId,token}, config).then((data) => {

                if (data) {
                    console.log(data);
                    
                    toast.info('!پسورد تغییر کرد', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    setLinkSent(true)
                }
            }).catch((errMsg) => {
                console.log(errMsg);
                toast.error(errMsg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })



        }
    }


    return (
        <div className="min-h-screen bg-gray-50 flex items-center text-right">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <div className="hero min-h-full rounded-l-xl bg-base-200">
                            <div className="hero-content py-6">
                                <div className="max-w-md">
                                    <h1 className="mb-10 text-center font-bold text-lg">تغییر پسورد</h1>
                                    <div className="text-center mt-0 mb-35"><img src="../intro.jpeg" alt="اقامتگاه" className="w-full rounded rounded-lg inline-block shadow-md"></img></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='py-10 px-10'>
                        <h2 className='text-2xl mb-2 text-center'>تغییر پسورد</h2>

                        {
                            linkSent &&
                            <>
                                <div className='text-center mt-8'><CheckCircleIcon className='inline-block w-32 text-success' /></div>
                                <p className='my-4 text-xl font-bold text-center'> پسورد تغییر کرد</p>
                                <div className='text-center mt-4'><Link to="/admins/login"><button className="btn btn-block bg-blue-800 text-white hover:bg-blue-900 mt-5">ورود</button></Link></div>

                            </>
                        }

                        {
                            !linkSent &&
                            <>
                                <p className='mb-6 mt-4 text-center'>در زیر می توانید پسورد خود را تغییر دهید</p>
                                <form onSubmit={(e) => submitForm(e)}>

                                    <div className="flex flex-col mb-2">
                                        <label htmlFor="phone" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">پسورد</label>
                                        <div className="relative">
                                            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                                <RiLockPasswordLine />
                                            </div>
                                            <input style={{ borderRadius: '5px' }} type="text" value={password}
                                                onChange={handlePasswordChange} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" placeholder="پسورد" />
                                        </div>
                                        <span className='text-red-500 relative text-sm'>{errorPasswordMessage ? errorPasswordMessage : ""}</span>
                                    </div>


                                    <div className="flex flex-col mb-2">
                                        <label htmlFor="phone" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">تایید پسورد</label>
                                        <div className="relative">
                                            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                                <RiLockPasswordLine />
                                            </div>
                                            <input style={{ borderRadius: '5px' }} type="text" value={confirmPassword}
                                                onChange={handleConfirmPasswordChange} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" placeholder="تایید پسورد" />
                                        </div>
                                        <span className='text-red-500 relative text-sm'>{errorConfirmPasswordMessage ? errorConfirmPasswordMessage : ""}</span>
                                    </div>

                                    <div className="flex w-full">
                                        <button type="submit" className="btn mt-5 w-full bg-blue-800 text-white hover:bg-blue-900">تغییر پسورد</button>
                                    </div>

                                    <div className='text-center mt-4'>حساب ندارید؟ <Link to="/admins/register">ثبت نام</Link></div>
                                </form>
                            </>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword