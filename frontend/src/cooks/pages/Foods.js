import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../components/Cards/TitleCard"

import Swal from 'sweetalert2'
import { setPageTitle } from '../features/common/headerSlice'
import axios from "axios"
import "../components/modal.css"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// load icons
import DeleteIcon from '@iconscout/react-unicons/icons/uil-trash-alt'
import EditIcon from '@iconscout/react-unicons/icons/uil-edit-alt'



const TopSideButtons = () => {
    return (
        <>
            <div className="inline-block">
                <h6>لیست غذا ها</h6>
            </div>
        </>

    )
}

const deletefoods = async (foodId) => {
    let token = localStorage.getItem("userToken")

    Swal.fire({
        title: "<small>آیا از حذف غذا اطمینان دارید؟</small>",
        showDenyButton: true,
        confirmButtonText: "بله",
        denyButtonText: `خیر`
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`/api/cooks/foods/${foodId}`, {
                headers: {
                    'authorization': 'Bearer ' + token
                },
            })
                .then((response) => {
                    toast.success('غذا حذف شد', {
                        position: "top-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                })
                .catch((error) => {
                    console.log('error', error)
                    toast.error('خطایی وجود دارد. دوباره امتحان کنید !', {
                        position: "top-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                })
        } else if (result.isDenied) {
            toast.info('!.. تغییرات ذخیره نشد', {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    });



}

const Foods = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "لیست غذا ها" }))
    }, [])



    const [foods, setFood] = useState([])


    useEffect(() => {
        let token = localStorage.getItem("userToken")
        const AuthStr = 'Bearer '.concat(token);

        axios.get('/api/cooks/foods', { headers: { authorization: AuthStr } })
            .then(response => {
                setFood(response.data.foods)
                console.log(response.data.foods);
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }, [])


    const showPersianCategory = (c) => {
        if (c === "Dessert") {
            return "دسر و نوشیدنی"
        }
        else if (c === "Appetizer") {
            return "پیش غذا و سوپ"

        } else {
            return "غذای اصلی"
        }
    }


    return (
        <>

            <TitleCard title="" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
                <div className="overflow-x-auto w-full">
                    {foods.length > 0 ? (
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>نام غذا </th>
                                        <th>نام سرآشپز </th>
                                        <th>قیمت</th>
                                        <th>نوع غذا</th>
                                        <th>تاریخ ایجاد</th>
                                        <th>ویرایش </th>
                                        <th> حذف</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        foods.map((l, k) => {
                                            return (
                                                <tr key={k}>
                                                    <td className="flex items-center" >
                                                        <div className="flex items-center space-x-3">
                                                            <div className="">
                                                                {/* <PiNewspaperClipping className="w-7 h-7" /> */}
                                                                <img src={l.photo} className="table-img" />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold mr-3">{l.name}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{l.cookName}</td>
                                                    <td>{l.price}</td>
                                                    <td>{showPersianCategory(l.category)}</td>
                                                    <td>{new Date(l.createdAt).toLocaleDateString('fa')}</td>
                                                    <td><a href={`/cooks/foods/${l._id}/update`}><EditIcon /></a></td>
                                                    <td><button onClick={() => deletefoods(l._id)}><DeleteIcon /></button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                           


                    ) : (
                        <h3>هنوز غذا اضافه نشد ...!</h3>
                    )}

                </div>
                <ToastContainer />
            </TitleCard>
        </>
    )
}

export default Foods