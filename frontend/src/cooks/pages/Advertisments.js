import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../components/Cards/TitleCard"

import Swal from 'sweetalert2'
import { setPageTitle } from '../features/common/headerSlice'
import axios from "axios"
import "../components/modal.css"
import { PiNewspaperClipping, PiMoney, PiMapPinLight } from "react-icons/pi";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// load icons
import DeleteIcon from '@iconscout/react-unicons/icons/uil-trash-alt'
import EditIcon from '@iconscout/react-unicons/icons/uil-edit-alt'

import { FiFileText, FiPhone, FiUser } from "react-icons/fi";
import { IoIosInformationCircleOutline } from "react-icons/io";


const TopSideButtons = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);


    return (
        <>
            <div className="inline-block">
                <h6>لیست آگهی ها</h6>
            </div>

        </>

    )
}





const deleteAds = (adsId) => {
    let token = localStorage.getItem("userToken")


    axios.delete(`/api/cooks/ads/${adsId}`, {
        headers: {
            'authorization': 'Bearer ' + token
        },
    })
        .then((response) => {
            Swal.fire({
                title: "<small>آیا از حذف آگهی اطمینان دارید؟</small>",
                showDenyButton: true,
                confirmButtonText: "بله",
                denyButtonText: `خیر`
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire("<small>آگهی حذف شد!</small>", "", "success");
                    window.location.reload()
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

const Advertisments = () => {

    const [orderStatus, setAdstatus] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [orderId, setOrderId] = useState("");

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [photo, setPhoto] = useState(null)
    const [photos, setPhotos] = useState([])
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")

    // error variables
    const [nameError, setNameError] = useState(false)
    const [nameErrorMsg, setNameErrorMsg] = useState("")

    const [titleError, setTitleError] = useState(false)
    const [titleErrorMsg, setTitleErrorMsg] = useState("")

    const [phoneError, setPhoneError] = useState(false)
    const [phoneErrorMsg, setPhoneErrorMsg] = useState("")

    const [priceError, setPriceError] = useState(false)
    const [priceErrorMsg, setPriceErrorMsg] = useState("")

    const [photoError, setPhotoError] = useState(false)
    const [photoErrorMsg, setPhotoErrorMsg] = useState("")

    const [photosError, setPhotosError] = useState(false)
    const [photosErrorMsg, setPhotosErrorMsg] = useState("")

    const [descriptionError, setDescriptionError] = useState(false)
    const [descriptionErrorMsg, setDescriptionErrorMsg] = useState("")

    const [addressError, setAddressError] = useState(false)
    const [addressErrorMsg, setAddressErrorMsg] = useState("")



    const handleOrderStatusChange = (e) => {
        setAdstatus(e.target.value);
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
        dispatch(setPageTitle({ title: "لیست آگهی ها" }))
    }, [])



    const [ads, setAds] = useState([])

    useEffect(() => {
        let token = localStorage.getItem("userToken")
        const AuthStr = 'Bearer '.concat(token);

        axios.get('/api/cooks/ads', { headers: { authorization: AuthStr } })
            .then(response => {
                setAds(response.data.ads)
                console.log(response.data.ads);
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
                    title: "<small>آیا از ویرایش آگهی اطمینان دارید؟</small>",
                    showDenyButton: true,
                    confirmButtonText: "بله",
                    denyButtonText: `خیر`
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("<small>آگهی ویرایش شد!</small>", "", "success");
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
               
                <div className="overflow-x-auto w-full">
                    {ads.length > 0 ? (
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>کد آگهی</th>
                                    <th>عنوان آگهی </th>
                                    <th>نام مشتری </th>
                                    <th> شماره همراه</th>
                                    <th>تاریخ ایجاد</th>
                                    <th>ویرایش </th>
                                    <th> حذف</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ads.map((l, k) => {
                                        return (
                                            <tr key={k}>
                                                <td className="flex items-center" >
                                                    <div className="flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <PiNewspaperClipping className="w-7 h-7" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold mr-3">{l._id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{l.title}</td>
                                                <td>{l.company.name}</td>
                                                <td>{l.company.phone}</td>
                                                <td>{new Date(l.createdAt).toLocaleDateString('fa')}</td>
                                                {/* <td>{getStatusComponent(l.orderStatus)}</td> */}
                                                <td><a href={`/cooks/advertisments/${l._id}/update`}><EditIcon /></a></td>
                                                <td><button onClick={() => deleteAds(l._id)}><DeleteIcon /></button></td>
                                                {/* <td><button onClick={() => deleteUser(l._id)}><DeleteIcon /></button></td> */}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    ) : (
                        <h3>هنوز آگهی وجود ندارد...!</h3>
                    )}

                </div>
                <ToastContainer />

            </TitleCard>
        </>
    )
}

export default Advertisments