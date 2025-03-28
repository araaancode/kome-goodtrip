import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../components/Cards/TitleCard"
import { showNotification } from '../features/common/headerSlice'
import MomentJalali from "moment-jalaali"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import { openModal } from "../features/common/modalSlice"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { setPageTitle } from '../features/common/headerSlice'
import axios from "axios"
import { RiUser3Line } from "@remixicon/react"
import "../components/modal.css"
import { RiEye2Line, RiEyeCloseLine, RiPhoneLine, RiUserSmileLine, RiUser2Line, RiMailLine, RiUser5Line } from "@remixicon/react"
import { IoColorPaletteOutline } from "react-icons/io5";
import { PiHouseLight } from "react-icons/pi";
import { HiOutlineMap } from "react-icons/hi2";
import { GrMap } from "react-icons/gr";
import { TfiUser } from "react-icons/tfi";
import { TbPhone } from "react-icons/tb";
import { RxRulerHorizontal } from "react-icons/rx";
import { MdOutlineWarehouse } from "react-icons/md";
import { PiHourglassSimpleLow } from "react-icons/pi";
import { VscLaw } from "react-icons/vsc";
import { FaUsers } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { PiImagesLight } from "react-icons/pi";
import { PiSignInLight } from "react-icons/pi";
import { PiWarehouseLight } from "react-icons/pi";
import { FaRegSquare } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";
import { PiThermometerColdLight } from "react-icons/pi";
import { LuParkingCircle } from "react-icons/lu";
import { PiSolarRoof } from "react-icons/pi";
import { CiImageOn } from "react-icons/ci";
import { CiViewTimeline } from "react-icons/ci";
import { RiPriceTagLine } from "react-icons/ri";
import { TbCircleDashedNumber4 } from "react-icons/tb";
import { CiCalendar } from "react-icons/ci";
import { CiBank } from "react-icons/ci";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { CiDiscount1 } from "react-icons/ci";
import { TbMoodHappy } from "react-icons/tb";
import { FaRegCalendarCheck } from "react-icons/fa";
import { TbToolsKitchen2 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom'
import { IoFastFoodOutline } from "react-icons/io5";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// load icons
import DeleteIcon from '@iconscout/react-unicons/icons/uil-trash-alt'
import EditIcon from '@iconscout/react-unicons/icons/uil-edit-alt'

import UpdateAdmin from "../features/admins/UpdateAdmin"

const TopSideButtons = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate()

    const [selectedRole, setSelectedRole] = useState('');

    const handleChange = (e) => {
        setRole(e.target.value);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    }


    const handleNameChange = (e) => {
        setName(e.target.value)
    }


    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const createNewAdmin = (e) => {
        e.preventDefault()

        if (phone && password && name && username && email && role) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }


            axios.post('/api/cooks/auth/register', { phone, password, name, username, email }, config).then((data) => {
                console.log(data.data.msg);
                toast.success(data.data.msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setTimeout(() => {
                    navigate('/admins/all-admins')
                }, 2000);
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

    return (
        <>
            <div className="inline-block">
                <h6>لیست سفارش ها</h6>
            </div>
            <div>
                {isOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content mx-10">
                            <h3 className="my-4">ایجاد سفارش جدید</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                                {/* name */}
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="phone" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">نام و نام خانوادگی </label>
                                    <div className="relative">
                                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                            {/* <PiHouseLight className="w-6 h-6 text-gray-400" /> */}
                                            <RiUser2Line />
                                        </div>
                                        <input style={{ borderRadius: '5px' }} type="text" value={name}
                                            onChange={handleNameChange} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" />
                                    </div>

                                </div>

                                {/* username */}
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="phone" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">نام کاربری</label>
                                    <div className="relative">
                                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                            {/* <HiOutlineMap className="w-6 h-6 text-gray-400" /> */}
                                            <RiUser5Line />
                                        </div>
                                        <input style={{ borderRadius: '5px' }} type="text" value={username}
                                            onChange={handleUsernameChange} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" />
                                    </div>
                                </div>

                                {/* phone */}
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="phone" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">شماره همراه</label>
                                    <div className="relative">
                                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                            {/* <GrMap className="w-6 h-6 text-gray-400" /> */}
                                            <RiPhoneLine />
                                        </div>
                                        <input style={{ borderRadius: '5px' }} type="text" value={phone}
                                            onChange={handlePhoneChange} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" />
                                    </div>
                                </div>

                                {/* email */}
                                <div className="flex flex-col mb-6">
                                    <label htmlFor="phone" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">  ایمیل</label>
                                    <div className="relative">
                                        <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                            {/* <TfiUser className="w-6 h-6 text-gray-400" /> */}
                                            <RiMailLine />
                                        </div>
                                        <input style={{ borderRadius: '5px' }} type="text" value={email}
                                            onChange={handleEmailChange} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" />
                                    </div>
                                </div>

                                {/* role */}
                                <div className="admin-role-select w-full mx-auto mt-1">
                                    <label htmlFor="adminRole" className="block mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                                        نقش سفارش
                                    </label>
                                    <select
                                        id="adminRole"
                                        value={role}
                                        onChange={handleChange}
                                        className="block w-full items-center px-3 py-3 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                                    >
                                        <option value="">انتخاب نقش</option>
                                        <option value="superAdmin">مدیر اصلی</option>
                                        <option value="admin">مدیر داخلی</option>
                                        <option value="moderator">نویسنده</option>
                                    </select>
                                    {role && (
                                        <p className="mt-3 text-sm text-gray-600">
                                            نقش انتخاب شده <span className="font-semibold">{role}</span>
                                        </p>
                                    )}
                                </div>


                                {/* password */}
                                <div className="flex flex-col mb-1">
                                    <div className="mb-2 relative">
                                        <label className="block mb-1 sm:text-sm tracking-wide text-gray-600" htmlFor="password">
                                            پسورد
                                        </label>

                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            id="password"
                                            onChange={handlePasswordChange}
                                            value={password}
                                            className="w-full px-4 py-2 border border-gray-400 placeholder-gray-400 rounded-sm focus:outline-none focus:border-blue-800"
                                            style={{ borderRadius: '5px' }}
                                        />

                                        <div
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 left-3 flex items-center cursor-pointer top-6"
                                        >
                                            {passwordVisible ? (
                                                <RiEye2Line className='text-gray-400' />
                                            ) : (
                                                <RiEyeCloseLine className='text-gray-400' />
                                            )}
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <button onClick={createNewAdmin} className="text-white modal-btn bg-blue-800 hover:bg-blue-900">
                                ایجاد سفارش جدید
                            </button>

                            <button onClick={closeModal} className="text-white modal-btn bg-gray-500 hover:bg-gray-600">
                                بستن
                            </button>


                        </div>
                    </div>
                )}
            </div>
        </>

    )
}





// const deleteUser = (adminId) => {
//     let token = localStorage.getItem("userToken")


//     axios.delete(`/api/cooks/${adminId}`, {
//         headers: {
//             'authorization': 'Bearer ' + token
//         },
//     })
//         .then((response) => {
//             console.log('response', response.data)
//             Swal.fire({
//                 title: "<small>آیا از حذف سفارش اطمینان دارید؟</small>",
//                 showDenyButton: true,
//                 confirmButtonText: "بله",
//                 denyButtonText: `خیر`
//             }).then((result) => {
//                 if (result.isConfirmed) {
//                     Swal.fire("<small>سفارش حذف شد!</small>", "", "success");
//                 } else if (result.isDenied) {
//                     Swal.fire("<small>تغییرات ذخیره نشد</small>", "", "info");
//                 }
//             });
//         })
//         .catch((error) => {
//             console.log('error', error)
//             Swal.fire("<small>تغییرات ذخیره نشد</small>", "", "error");
//         })

// }

const Orders = () => {

    const [orderStatus, setOrderStatus] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [orderId, setOrderId] = useState("");


    const handleOrderStatusChange = (e) => {
        setOrderStatus(e.target.value);
    };

    const openChangeStatusModal = (orderId) => {
        setIsOpen(true);
        setOrderId(orderId)
    };

    const closeModal = () => {
        setIsOpen(false);
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "لیست سفارش ها" }))
    }, [])


    const getStatusComponent = (orderStatus) => {
        if (orderStatus === "Pending") return <div className="badge badge-primary">در حال پردازش</div>
        if (orderStatus === "Completed") return <div className="badge bg-green-500 text-white">پرداخت شده</div>
        if (orderStatus === "Cancelled") return <div className="badge badge-ghost"> لغو شده</div>
        if (orderStatus === "Confirmed") return <div className="badge badge-secondary"> تایید شده</div>
        else return <div className="badge">{orderStatus}</div>
    }


    const [admins, setOrders] = useState([])

    useEffect(() => {
        let token = localStorage.getItem("userToken")
        const AuthStr = 'Bearer '.concat(token);

        axios.get('/api/cooks/foods/order-foods', { headers: { authorization: AuthStr } })
            .then(response => {
                setOrders(response.data.orders)
                console.log(response.data.orders[0]);
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }, [])


    const changeOrderStatus = () => {
        let token = localStorage.getItem("userToken")

        axios.put(`/api/cooks/foods/order-foods/${orderId}/change-status`, { orderStatus }, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        })
            .then((response) => {
                console.log('response', response.data)
                Swal.fire({
                    title: "<small>آیا از ویرایش سفارش اطمینان دارید؟</small>",
                    showDenyButton: true,
                    confirmButtonText: "بله",
                    denyButtonText: `خیر`
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("<small>سفارش ویرایش شد!</small>", "", "success");
                        document.location.reload()
                    } else if (result.isDenied) {
                        Swal.fire("<small>تغییرات ذخیره نشد</small>", "", "info");
                    }
                });
            })
            .catch((error) => {
                console.log('error', error)
                Swal.fire("<small>تغییرات ذخیره نشد</small>", "", "error");
            })
    }

    return (
        <>

            <TitleCard title="" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <div>
                    {isOpen && (
                        <div className="modal-overlay">
                            <div className="modal-content mx-10" id="change-status-modal">
                                <h1 className="my-4 font-bold text-xl"> تغییر وضعیت سفارش </h1>
                                {/* order status */}
                                <div className="admin-role-select w-full mx-auto mt-1">

                                    <select
                                        id="orderStatus"
                                        value={orderStatus}
                                        onChange={handleOrderStatusChange}
                                        className="block w-full items-center px-3 py-3 border border-gray-400 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
                                    >
                                        <option value="">تغییر وضعیت</option>
                                        <option value="Pending">در حال پردازش</option>
                                        <option value="Completed">پرداخت شده</option>
                                        <option value="Cancelled">لغو شده</option>
                                        <option value="Confirmed">تایید شده</option>
                                    </select>
                                    {orderStatus && (
                                        <p className="mt-3 text-sm text-gray-600">
                                            وضعیت انتخاب شده <span className="font-semibold">{orderStatus}</span>
                                        </p>
                                    )}
                                </div>

                                <button onClick={changeOrderStatus} className="text-white modal-btn bg-blue-800 hover:bg-blue-900">
                                    تغییر وضعیت
                                </button>

                                <button onClick={closeModal} className="text-white modal-btn bg-gray-500 hover:bg-gray-600">
                                    بستن
                                </button>


                            </div>
                        </div>
                    )}
                </div>
                <div className="overflow-x-auto w-full">
                    {admins.length > 0 ? (
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>کد سفارش</th>
                                    <th>نام مشتری</th>
                                    <th> شماره همراه</th>
                                    <th>تاریخ ایجاد</th>
                                    <th>وضعیت </th>
                                    <th>تغییر وضعیت</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    admins.map((l, k) => {
                                        return (
                                            <tr key={k}>
                                                <td  className="flex items-center" >
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <IoFastFoodOutline className="w-7 h-7" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold mr-3">{l._id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{l.user.name}</td>
                                                <td>{l.user.phone}</td>
                                                <td>{new Date(l.createdAt).toLocaleDateString('fa')}</td>
                                                <td>{getStatusComponent(l.orderStatus)}</td>
                                                <td><button onClick={() => openChangeStatusModal(l._id)}><EditIcon /></button></td>
                                                {/* <td><button onClick={() => deleteUser(l._id)}><DeleteIcon /></button></td> */}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    ) : (
                        <h3>هنوز سفارشی وجود ندارد...!</h3>
                    )}

                </div>
                <ToastContainer />

            </TitleCard>
        </>
    )
}

export default Orders