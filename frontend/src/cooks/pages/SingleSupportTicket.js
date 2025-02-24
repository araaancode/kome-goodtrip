import { useState, useRef, useEffect } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Swal from 'sweetalert2'
import axios from "axios"
import { GoLaw } from "react-icons/go";

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


function SingleSupportTicket() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [comments, setComments] = useState([])

    const [ticket, setTicket] = useState({})

    const [btnSpinner, setBtnSpinner] = useState(false)
    const [value, setValue] = useState('');

    let token = localStorage.getItem("userToken")
    let stId = window.location.href.split('/support-tickets/')[1].split('/update')[0]



    // error variables
    const [titleError, setTitleError] = useState(false)
    const [titleErrorMsg, setTitleErrorMsg] = useState("")

    const [descriptionError, setDescriptionError] = useState(false)
    const [descriptionErrorMsg, setDescriptionErrorMsg] = useState("")

    const updateSupportTicketHandle = (e) => {
        e.preventDefault();

        // title error
        if (!title || title === "" || title === undefined || title === null) {
            setTitleError(true)
            setTitleErrorMsg("* نام غذا باید وارد شود")
        }

        if (!description || description === "" || description === undefined || description === null) {
            setDescriptionError(true)
            setDescriptionErrorMsg("* توضیحات غذا باید وارد شود")
        }

        else {
            setBtnSpinner(true)

            // Swal.fire({
            //     title: "<small>آیا از ویرایش غذا اطمینان دارید؟</small>",
            //     showDenyButton: true,
            //     confirmButtonText: "بله",
            //     denyButtonText: `خیر`
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         // Swal.fire("<small>غذا ویرایش شد!</small>", "", "success");
            //         try {
            //             axios.put(`/api/cooks/foods/${stId}/update-food`, { name, count, price, cookDate, cookHour, description, category, cookName }, {
            //                 headers: {
            //                     'Content-Type': 'application/json',
            //                     'authorization': 'Bearer ' + token
            //                 },
            //             }).then((res) => {
            //                 setBtnSpinner(false)

            //                 toast.success('غذا ویرایش شد', {
            //                     position: "top-left",
            //                     autoClose: 5000,
            //                     hideProgressBar: false,
            //                     closeOnClick: true,
            //                     pauseOnHover: true,
            //                     draggable: true,
            //                     progress: undefined,
            //                 })

            //             })

            //         } catch (error) {
            //             setBtnSpinner(false)
            //             console.log('error', error)
            //             toast.error('خطایی وجود دارد. دوباره امتحان کنید !', {
            //                 position: "top-left",
            //                 autoClose: 5000,
            //                 hideProgressBar: false,
            //                 closeOnClick: true,
            //                 pauseOnHover: true,
            //                 draggable: true,
            //                 progress: undefined,
            //             })
            //         }
            //     } else if (result.isDenied) {
            //         setBtnSpinner(false)
            //         toast.info('تغییرات ذخیره نشد..!', {
            //             position: "top-left",
            //             autoClose: 5000,
            //             hideProgressBar: false,
            //             closeOnClick: true,
            //             pauseOnHover: true,
            //             draggable: true,
            //             progress: undefined,
            //         })
            //     }
            // });

        }
    }

    // get single support tickets
    useEffect(() => {
        const fetchSupportTicket = async () => {
            await axios.get(`/api/cooks/support-tickets/${stId}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    setTicket(response.data.ticket);
                    setTitle(response.data.ticket.title)
                    setDescription(response.data.ticket.description)
                    setDate(response.data.ticket.createdAt)
                    setComments(response.data.ticket.comments);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        fetchSupportTicket()
    }, [])

    return (
        <div className="grid grid-cols-[2fr_1fr] gap-4 p-4">
            {/* ticket */}
            <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
                <div className="text-xl font-semibold text-right">
                    پشتیبانی - {ticket.title}
                </div>
                <h6 className="text-gray-600 mt-2">گفتگوی شما و بخش پشتیبانی</h6>
                <div className="divider mt-2"></div>

                <div className='h-full w-full pb-6 bg-base-100'>
                    <div className="mx-auto">
                        {/* ticket */}
                        <div className="bg-blue-50 p-6 rounded-md w-full">
                            <div className="flex justify-between">
                                <h2 className="text-lg font-bold">{title}</h2>
                                <span className="text-sm">{new Date(ticket.createdAt).toLocaleDateString('fa')}</span>
                            </div>
                            <p className="mt-2">{ticket.description}</p>
                        </div>



                        <div className="divider mt-2"></div>

                        {/* comments & add comment */}
                        {comments && comments.length > 0 ? (
                            <div className="bg-yellow-100 p-6 rounded-md w-full">
                                <div className="flex justify-between">
                                    <h2 className="text-lg font-bold">{ticket.title}</h2>
                                    <span className="text-sm">{new Date(ticket.createdAt).toLocaleDateString('fa')}</span>
                                </div>
                                <p className="mt-2">{ticket.description}</p>
                            </div>
                        ) : (
                            <p className="text-gray-700">تیکت شما هنوز پاسخ داده نشده است...</p>
                        )}


                        {/* text editor */}
                        <p className="mt-6">پیام: </p>
                        <div dir="ltr" className="p-4 bg-white w-full ">
                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                        </div>

                    </div>
                </div>
                <ToastContainer />
            </div>

            {/* ticket status */}
            <div className="card w-full p-6 bg-base-100 shadow-xl mt-6">
                <div className="p-4 flex items-center">
                    <GoLaw className="w-6 h-6" />
                    <span className="mx-2"> سایر اطلاعات</span>
                </div>

                <div className="p-4">
                    <div className="flex justify-center items-center">
                        <table className="border-collapse border border-gray-300 w-full">
                            <tbody>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4">
                                        <p> آغاز درخواست: {new Date(ticket.createdAt).toLocaleDateString('fa')}</p>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-300">
                                    <td className="p-4">
                                        نوع درخواست: پشتیبانی
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4">
                                        وضعیت: {showPersianStatus(ticket.status)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="p-4">
                    <p>حاضران:</p>
                    <ul className="list-disc">
                        <li> user</li>
                        <li>پشتیبانی سایت</li>
                    </ul>
                </div>

            </div>
        </div>
    )
}


export default SingleSupportTicket