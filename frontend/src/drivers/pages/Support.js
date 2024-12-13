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
import Subtitle from "../components/Typography/Subtitle"

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
  //         <button className="btn px-6 btn-sm normal-case btn-primary" onClick={() => createNewUser()}>ایجاد کاربر جدید</button>
  //     </div>
  // )
}


const TEAM_MEMBERS = [
  { name: "راننده یک", avatar: "https://cdn-icons-png.flaticon.com/128/2684/2684197.png", email: "example@admin.test", role: "Owner", joinedOn: MomentJalali(new Date()).add(-5 * 1, 'days').format("jYYYY/jMM/jDD"), lastActive: "5 hr ago" },
  { name: "راننده دو", avatar: "https://cdn-icons-png.flaticon.com/128/2684/2684197.png", email: "example@admin.test", role: "Admin", joinedOn: MomentJalali(new Date()).add(-5 * 2, 'days').format("jYYYY/jMM/jDD"), lastActive: "15 min ago" },
  { name: "راننده سه", avatar: "https://cdn-icons-png.flaticon.com/128/2684/2684197.png", email: "example@admin.test", role: "Admin", joinedOn: MomentJalali(new Date()).add(-5 * 3, 'days').format("jYYYY/jMM/jDD"), lastActive: "20 hr ago" },
  { name: "راننده چهار", avatar: "https://cdn-icons-png.flaticon.com/128/2684/2684197.png", email: "example@admin.test", role: "Manager", joinedOn: MomentJalali(new Date()).add(-5 * 4, 'days').format("jYYYY/jMM/jDD"), lastActive: "1 hr ago" },
  { name: "راننده پنج", avatar: "https://cdn-icons-png.flaticon.com/128/2684/2684197.png", email: "example@admin.test", role: "Support", joinedOn: MomentJalali(new Date()).add(-5 * 5, 'days').format("jYYYY/jMM/jDD"), lastActive: "40 min ago" },
  { name: "راننده شش", avatar: "https://cdn-icons-png.flaticon.com/128/2684/2684197.png", email: "example@admin.test", role: "Support", joinedOn: MomentJalali(new Date()).add(-5 * 7, 'days').format("jYYYY/jMM/jDD"), lastActive: "5 hr ago" },

]

const updateUser = () => {
  alert("update user")
}



const deleteUser = () => {
  Swal.fire({
    title: "آیا از حذف ادمین اطمینان دارید؟",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "بله",
    denyButtonText: `خیر`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("ادمین حذف شد!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("تغییرات ذخیره نشد", "", "info");
    }
  });
}

const Support = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle({ title: "پشتیبانی" }))
  }, [])

  const [members, setMembers] = useState(TEAM_MEMBERS)

  return (
    <>
      <div className={"card w-full p-6 bg-base-100 shadow-xl mt-6 h-screen"}>

        {/* Title for Card */}
        <Subtitle styleClass={TopSideButtons ? "inline-block" : ""}>
          پشتیبانی

          {/* Top side button, show only if present */}
          {
            TopSideButtons && <div className="inline-block float-righ">{TopSideButtons}</div>
          }
        </Subtitle>

        <div className="divider mt-2"></div>

        {/** Card Body */}
        <div className='h-full w-full pb-6 bg-base-100'>
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>نام و نام خانوادگی</th>
                  <th>ایمیل</th>
                  <th>شروع رزرو</th>
                  <th>پایان رزرو</th>
                  <th>حذف</th>
                  <th>ویرایش</th>
                </tr>
              </thead>
              <tbody>
                {
                  members.map((l, k) => {
                    return (
                      <tr key={k}>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-circle w-12 h-12">
                                <img className="w-6 h-6" src={l.avatar} alt="Avatar" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold mr-3">{l.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>{l.email}</td>
                        <td>{l.joinedOn}</td>
                        <td>{l.lastActive}</td>
                        <td><button onClick={() => deleteUser()}><DeleteIcon /></button></td>
                        <td><button onClick={() => updateUser()}><EditIcon /></button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Support