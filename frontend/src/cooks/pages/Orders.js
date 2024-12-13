import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification, setPageTitle } from "../features/common/headerSlice"
import TitleCard from "../components/Cards/TitleCard"
import { RECENT_TRANSACTIONS } from "../utils/dummyData"
import axios from "axios"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import { RiUser3Line } from "@remixicon/react"
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../components/Input/SearchBar"
import EditIcon from '@iconscout/react-unicons/icons/uil-edit-alt'
const MomentJalali = require("moment-jalaali")


const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    const locationFilters = ["تبریز", "اصفهان", "قم", "مشهد", "زاهدان"]

    const showFiltersAndApply = (params) => {
        applyFilter(params)
        setFilterParam(params)
    }

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
    }

    useEffect(() => {
        if (searchText == "") {
            removeAppliedFilter()
        } else {
            applySearch(searchText)
        }
    }, [searchText])

    return (
        <div className="inline-block float-right flex">

        </div>
    )
}


function Orders() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "لیست سفارش ها" }))
    }, [])

    const [trans, setTrans] = useState(RECENT_TRANSACTIONS)

    const [user, setUser] = useState("")
    const [orders, setOrders] = useState([])

    const getStatus = (status) => {
        if (status === "Pending") return <div className="badge badge-primary">در حال پردازش</div>
        if (status === "Cancelled") return <div className="badge badge-ghost">بسته شده</div>
        if (status === "Closed") return <div className="badge badge-secondary"> نویسنده</div>
        else return <div className="badge">{status}</div>
    }


    const changeStatus = (id) => {
        console.log(id)
    }

    const removeFilter = () => {
        setTrans(RECENT_TRANSACTIONS)
    }

    const applyFilter = (params) => {
        let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.location == params })
        setTrans(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.email.toLowerCase().includes(value.toLowerCase()) || t.email.toLowerCase().includes(value.toLowerCase()) })
        setTrans(filteredTransactions)
    }


    let token = localStorage.getItem("userToken")
    useEffect(() => {
        axios.get(`/api/cooks/me`, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        }).then((res) => {
            setUser(res.data.cook)
        }).catch((err) => {
            console.log(err);
        })

        axios.get('/api/cooks/foods/order-foods', {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setOrders(response.data.orders);

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [])



    return (
        <>

            <TitleCard title="لیست سفارش ها" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter} />}>

                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    {orders.length > 0 ? (<table className="table w-full">
                        <thead>
                            <tr>
                                <th>شناسه سفارش</th>
                                <th>نام مشتری</th>
                                <th>تعداد</th>
                                <th>وضعیت سفارش</th>
                                <th>تاریخ سفارش</th>
                                <th>تغییر وضعیت</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <div>
                                                        <div className="font-bold mr-2">{l._id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{l.user.name}</td>
                                            <td>{l.foodItems.length}</td>
                                            <td>{getStatus(l.orderStatus)}</td>
                                            <td>{new Date().toLocaleString("fa")}</td>
                                            <td><button onClick={() => changeStatus(l._id)}><EditIcon /></button></td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>) : (
                        <p>هنوز هیچ سفارشی برای شما ثبت نشده است!!</p>
                    )}

                </div>
            </TitleCard>
        </>
    )
}


export default Orders