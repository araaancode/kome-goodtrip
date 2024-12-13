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

// load icons
import DeleteIcon from '@iconscout/react-unicons/icons/uil-trash-alt'
import EditIcon from '@iconscout/react-unicons/icons/uil-edit-alt'

import UpdateAdmin from "../features/admins/UpdateAdmin"


const TopSideButtons = () => {

    const dispatch = useDispatch()

    const createNewUser = () => {
        // dispatch(showNotification({ message: "Add New Member clicked", status: 1 }))
        dispatch(openModal({ title: "ایجاد ادمین جدید", bodyType: MODAL_BODY_TYPES.ADD_NEW_ADMIN }))
    }



    // return (
    //     <div className="inline-block float-right">
    //         <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => createNewUser()}>ایجاد راننده جدید</button>
    //     </div>
    // )
}


const updateDriver = (isActiveState, userId) => {
    let token = localStorage.getItem("userToken")

    if (isActiveState) {
        axios.put(`/api/admins/drivers/${userId}/deactive`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then((response) => {
                console.log('response', response.data)
                Swal.fire({
                    title: "<small>آیا از غیر فعال کردن راننده اطمینان دارید؟</small>",
                    showDenyButton: true,
                    confirmButtonText: "بله",
                    denyButtonText: `خیر`
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("<small>راننده ویرایش شد!</small>", "", "success");
                    } else if (result.isDenied) {
                        Swal.fire("<small>تغییرات ذخیره نشد</small>", "", "info");
                    }
                });
            })
            .catch((error) => {
                console.log('error', error)
                Swal.fire("<small>تغییرات ذخیره نشد</small>", "", "danger");
            })
    } else {
        axios.put(`/api/admins/drivers/${userId}/active`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then((response) => {
                console.log('response', response.data)
                Swal.fire({
                    title: "<small>آیا از فعال کردن راننده اطمینان دارید؟</small>",
                    showDenyButton: true,
                    confirmButtonText: "بله",
                    denyButtonText: `خیر`
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("<small>راننده ویرایش شد!</small>", "", "success");
                    } else if (result.isDenied) {
                        Swal.fire("<small>تغییرات ذخیره نشد</small>", "", "info");
                    }
                });
            })
            .catch((error) => {
                console.log('error', error)
                Swal.fire("تغییرات ذخیره نشد", "", "danger");
            })
    }

}



const Drivers = () => {
    const [drivers, setDrivers] = useState([])

    useEffect(() => {
        let token = localStorage.getItem("userToken")
        const AuthStr = 'Bearer '.concat(token);



        axios.get('/api/admins/drivers', { headers: { authorization: AuthStr } })
            .then(response => {
                setDrivers(response.data.drivers)
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }, [])


    return (
        <>

            <TitleCard title="راننده ها" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                {drivers.length > 0 ? (<div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>نام و نام خانوادگی</th>
                                <th>شماره تلفن</th>
                                <th>ایمیل</th>
                                <th>تاریخ عضویت</th>
                                <th>وضعیت</th>
                                <th>تغییر وضعیت</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                drivers.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div className="avatar">
                                                        <RiUser3Line />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold mr-3">{l.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{l.phone}</td>
                                            <td>{l.email}</td>
                                            <td>{new Date(l.createdAt).toLocaleDateString('fa')}</td>
                                            <td>{l.isActive ? 'فعال' : 'غیرفعال'}</td>
                                            <td><button onClick={() => updateDriver(l.isActive, l._id)}><EditIcon /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>) :(
                    <h3>هنوز راننده ای وجود ندارد...</h3>
                )}
                
            </TitleCard>
        </>
    )
}

export default Drivers