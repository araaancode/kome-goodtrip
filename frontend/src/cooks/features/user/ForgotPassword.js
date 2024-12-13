import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon'

import { RiMailOpenLine } from "@remixicon/react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [linkSent, setLinkSent] = useState(false)
    const [email, setEmail] = useState("")


    const [errorEmailMessage, setErrorEmailMessage] = useState("")

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const submitForm = (e) => {
        e.preventDefault()
        setErrorMessage("")

        if (email) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }


            axios.post('/api/cooks/auth/forgot-password', { email }, config).then((data) => {
                if(data){
                    toast.success('لینک تغییر فرستاده شد', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }

                setLinkSent(true)


            }).catch((errMsg) => {
                console.log(errMsg.response.data.msg);

                toast.error(errMsg.response.data.msg, {
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
            toast.error('!!لطفا ایمیل را وارد کنید', {
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
        <div className="min-h-screen bg-gray-50 flex items-center text-right">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className='w-50'>
                        <div className="hero min-h-full rounded-l-xl bg-base-200">
                            <div className="hero-content py-6">
                                <div className="w-50">
                                    <h1 className="mb-4 text-center font-bold text-lg">فراموشی پسورد</h1>
                                    <div className="text-center mt-4 mb-10"><img width={500} height={400} src="https://i.pinimg.com/736x/f2/a7/8a/f2a78a484ee31f62ed9f1ea433597d9b.jpg" alt="اقامتگاه" className="w-full rounded rounded-lg inline-block shadow-md"></img></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='py-10 px-10 mt-10'>
                        <h2 className='text-2xl mb-2 text-center'>فراموشی پسورد</h2>

                        {
                            linkSent &&
                            <>
                                <div className='text-center mt-8'><CheckCircleIcon className='inline-block w-32 text-success' /></div>
                                <p className='my-4 text-xl font-bold text-center'> لینک فرستاده شد</p>
                                <p className='mt-4 mb-8 font-semibold text-center'>ایمیل خود را برای تغییر پسورد بررسی کنید</p>

                            </>
                        }

                        {
                            !linkSent &&
                            <>
                                <p className='my-8 text-center'>لینک تغییر پسورد به ایمیل شما فرستاده خواهد شد</p>
                                <form onSubmit={(e) => submitForm(e)}>

                                    <div className="flex flex-col mb-2">
                                        <label htmlFor="phone" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">ایمیل</label>
                                        <div className="relative">
                                            <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                                <RiMailOpenLine />
                                            </div>
                                            <input style={{ borderRadius: '5px' }} type="text" value={email}
                                                onChange={handleEmailChange} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" placeholder="ایمیل" />
                                        </div>
                                        <span className='text-red-500 relative text-sm'>{errorEmailMessage ? errorEmailMessage : ""}</span>
                                    </div>

                                    <div className="flex w-full">
                                        <button type="submit" className="btn mt-5 w-full bg-blue-800 text-white hover:bg-blue-900">فرستادن لینک تغییر</button>
                                    </div>

                                    <div className='text-center mt-4'>حساب ندارید؟ <Link to="/cooks/register">ثبت نام</Link></div>
                                </form>
                            </>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword