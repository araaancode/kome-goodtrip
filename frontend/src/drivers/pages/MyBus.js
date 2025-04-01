import { useState, useRef, useEffect } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Swal from 'sweetalert2'
import axios from "axios"
import { GoLaw } from "react-icons/go";
import { IoIosInformationCircleOutline } from "react-icons/io";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const showPersianStatus = (c) => {
    if (c === "Open") {
        return "باز"
    }
    else if (c === "In Progress") {
        return "در حال بررسی"

    } else {
        return "بسته شده"
    }
}

function MyBus() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [comments, setComments] = useState([])
    const [driver, setDriver] = useState({})
    const [ticket, setTicket] = useState({})
    const [btnSpinner, setBtnSpinner] = useState(false)
    const [comment, setComment] = useState('');

    const [bus, setBus] = useState(null)


    // url
    let token = localStorage.getItem("userToken")
    // let stId = window.location.href.split('/support-tickets/')[1].split('/update')[0]


    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'align': ['right'] }], // Align text
            [{ 'direction': 'rtl' }], // RTL button
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean']
        ]
    };

    // error variables
    const [commentError, setCommentError] = useState(false)
    const [commentErrorMsg, setCommentErrorMsg] = useState("")



    // get bus
    useEffect(() => {
        const fetchDriverBus = async () => {
            await axios.get('/api/drivers/bus', {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setBus(response.data.bus);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        fetchDriverBus()


        axios.get(`/api/drivers/me`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        }).then((res) => {
            setDriver(res.data.driver);
        }).catch((err) => {
            console.log(err);
        })

    }, [])

    const sendSupportTicket = (e) => {
        e.preventDefault();

        if (!comment || comment === "" || comment === undefined || comment === null) {
            setCommentError(true)
            setCommentErrorMsg("*  پیام باید وارد شود")
        } else {
            setBtnSpinner(true)

            // try {
            //     axios.put(`/api/drivers/support-tickets/${stId}/add-comment`, { comment }, {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'authorization': 'Bearer ' + token
            //         },
            //     }).then((res) => {

            //         setBtnSpinner(false)

            //         toast.success('پیام فرستاده شد', {
            //             position: "top-left",
            //             autoClose: 5000,
            //             hideProgressBar: false,
            //             closeOnClick: true,
            //             pauseOnHover: true,
            //             draggable: true,
            //             progress: undefined,
            //         })

            //     })

            // } catch (error) {
            //     setBtnSpinner(false)
            //     console.log('error', error)
            //     toast.error('خطایی وجود دارد. دوباره امتحان کنید !', {
            //         position: "top-left",
            //         autoClose: 5000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //     })
            // }
        }

    }


    

    return (
        <>
            {bus ? (
                <div className="flex flex-col gap-6 p-4 rtl text-right w-full">
                    {/* First Card */}
                    <div className="border rounded-xl shadow-lg py-4 px-8 w-full bg-white">
                        <div className="flex items-center justify-between gap-4 mt-4">
                            <div className="flex-1 text-right">
                                <h2 className="text-lg font-bold">{bus.name}</h2>
                                <p className="text-sm text-gray-600 my-2">{bus.description}</p>
                                <ul className="list-disc pr-5 mt-2 text-sm text-gray-700">
                                    {/* {bus.options.map((opt) => (
                                        <li>{opt.replace(",", " ")}</li>
                                    ))} */}

                                    {/* {bus.options.map((item, index) => (
                                       <li key={index}>{item.replace(","," ")}</li>
                                    ))} */}
                                </ul>
                            </div>
                            <img
                                src={bus.photo}
                                alt="Bus"
                                className="w-1/3 h-32 object-cover rounded-lg"
                            />

                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-6">
                            {bus.photos.map((item, index) => (
                                <img
                                    key={index}
                                    src={item[index]}
                                    alt="Bus Gallery"
                                    className="w-full h-20 object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Second Card (Form) */}
                    <div className="border rounded-2xl shadow-lg p-4 w-full bg-white">
                        <h2 className="text-lg font-bold mb-3">بروزرسانی اطلاعات</h2>
                        <form className="flex flex-col gap-3">
                            <label className="text-sm font-medium">عنوان</label>
                            <input
                                type="text"
                                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="عنوان جدید"
                            />
                            <label className="text-sm font-medium">توضیحات</label>
                            <textarea
                                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="توضیحات جدید"
                            ></textarea>
                            <button className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                                ذخیره تغییرات
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-6 p-4 rtl text-right w-full">
                    <div className="border rounded-xl shadow-lg py-4 px-8 w-full bg-white">
                        <h1>اتوبوس هنوز اضافه نشده است ...</h1>
                    </div>
                </div>

            )}
            <ToastContainer />
        </>
    )
}


export default MyBus