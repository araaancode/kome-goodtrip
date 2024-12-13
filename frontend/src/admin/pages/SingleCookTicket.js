import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import TitleCard from "../components/Cards/TitleCard"
import axios from "axios"
import Swal from 'sweetalert2'
import { RiUser3Line } from "@remixicon/react"



const TopSideButtons = () => {
    return (
        <>
            <div className="inline-block">
                <h1>تیکت های پشتیبانی</h1>
            </div>

        </>

    )
}


const SingleCookTicket = () => {
    let { cookId, stId } = useParams();
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('');
    const [cook, setCook] = useState('');
    const [loggedInUser, setLoggedInUser] = useState('')



    const handleAddComment = () => {
        if (newComment.trim() === '') return;

        let token = localStorage.getItem("userToken")


        axios.put(`/api/admins/cooks/${cookId}/support-tickets/${stId}/add-comment`, { comment: newComment }, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        })
            .then((response) => {
                Swal.fire({
                    title: "<small>آیا از پاسخ گویی به تیکت اطمینان دارید؟</small>",
                    showDenyButton: true,
                    confirmButtonText: "بله",
                    denyButtonText: `خیر`
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("<small>تیکت پاسخ داده شد!</small>", "", "success");
                    } else if (result.isDenied) {
                        Swal.fire("<small>تغییرات ذخیره نشد</small>", "", "info");
                    }
                });
            })
            .catch((error) => {
                console.log('error', error)
                Swal.fire("<small>تغییرات ذخیره نشد</small>", "", "error");
            })

        setNewComment('');
    };


    useEffect(() => {
        let token = localStorage.getItem("userToken")
        const AuthStr = 'Bearer '.concat(token);
        axios.get(`/api/admins/cooks/${cookId}/support-tickets/${stId}`, { headers: { authorization: AuthStr } })
            .then(response => {
                console.log(response.data);
                
                setCook(response.data.data.assignedTo.name);
                setComments(response.data.data.comments)
            })
            .catch((error) => {
                console.log('error ' + error);
            });

        axios.get(`/api/admins/me`, { headers: { authorization: AuthStr } })
            .then(response => {
                setLoggedInUser(response.data.admin)
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }, [])


    

    return (
        <TitleCard title="" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
            <div className="container mx-auto p-4 rtl">
                <div className="mb-4">
                    {comments.map((comment) => (
                        <div
                            key={comment._id}
                            className={"cook" in comment ? "bg-blue-100 shadow-md rounded-lg p-4 mb-4 text-right border" : "bg-yellow-100 shadow-md rounded-lg p-4 mb-4 text-right border"}
                        >

                            <div className='flex justify-between'>
                                {"cook" in comment ? (<div className='flex justify-between'>
                                    <RiUser3Line />
                                    <p className='mr-2'> {cook}</p>
                                </div>) : (<div className='flex justify-between'>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 32 32" className="h-8 w-8 text-gray-800" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M 13.0625 4 C 12.1875 4 11.417969 4.449219 10.875 5.03125 C 10.332031 5.613281 9.941406 6.339844 9.59375 7.125 C 9.0625 8.335938 8.683594 9.679688 8.34375 10.9375 C 7.257813 11.253906 6.335938 11.648438 5.59375 12.125 C 4.726563 12.683594 4 13.457031 4 14.5 C 4 15.40625 4.554688 16.132813 5.25 16.65625 C 5.84375 17.101563 6.574219 17.472656 7.4375 17.78125 C 7.488281 18.011719 7.5625 18.246094 7.65625 18.46875 C 6.8125 18.945313 5.476563 19.867188 4.1875 21.625 L 3.59375 22.46875 L 4.4375 23.0625 L 7.71875 25.3125 L 6.375 28 L 25.625 28 L 24.28125 25.3125 L 27.5625 23.0625 L 28.40625 22.46875 L 27.8125 21.625 C 26.523438 19.867188 25.1875 18.945313 24.34375 18.46875 C 24.4375 18.246094 24.511719 18.011719 24.5625 17.78125 C 25.425781 17.472656 26.15625 17.101563 26.75 16.65625 C 27.445313 16.132813 28 15.40625 28 14.5 C 28 13.457031 27.273438 12.683594 26.40625 12.125 C 25.664063 11.648438 24.742188 11.253906 23.65625 10.9375 C 23.28125 9.632813 22.867188 8.265625 22.34375 7.0625 C 22.003906 6.285156 21.628906 5.570313 21.09375 5 C 20.558594 4.429688 19.796875 4 18.9375 4 C 18.355469 4 17.914063 4.160156 17.4375 4.28125 C 16.960938 4.402344 16.480469 4.5 16 4.5 C 15.039063 4.5 14.234375 4 13.0625 4 Z M 13.0625 6 C 13.269531 6 14.5 6.5 16 6.5 C 16.75 6.5 17.417969 6.347656 17.9375 6.21875 C 18.457031 6.089844 18.851563 6 18.9375 6 C 19.167969 6 19.339844 6.074219 19.625 6.375 C 19.910156 6.675781 20.246094 7.21875 20.53125 7.875 C 21.074219 9.117188 21.488281 10.8125 21.9375 12.375 C 21.9375 12.371094 21.992188 12.328125 21.84375 12.40625 C 21.59375 12.542969 21.070313 12.71875 20.4375 12.8125 C 19.167969 13.003906 17.4375 13 16 13 C 14.570313 13 12.835938 12.980469 11.5625 12.78125 C 10.925781 12.683594 10.410156 12.511719 10.15625 12.375 C 10.078125 12.332031 10.050781 12.347656 10.03125 12.34375 C 10.03125 12.332031 10.03125 12.324219 10.03125 12.3125 C 10.035156 12.304688 10.027344 12.289063 10.03125 12.28125 C 10.042969 12.269531 10.050781 12.261719 10.0625 12.25 C 10.136719 12.117188 10.179688 11.964844 10.1875 11.8125 C 10.1875 11.800781 10.1875 11.792969 10.1875 11.78125 C 10.546875 10.453125 10.949219 9.046875 11.4375 7.9375 C 11.730469 7.269531 12.046875 6.726563 12.34375 6.40625 C 12.640625 6.085938 12.84375 6 13.0625 6 Z M 8.1875 13.09375 C 8.414063 13.5625 8.8125 13.9375 9.21875 14.15625 C 9.828125 14.480469 10.527344 14.632813 11.28125 14.75 C 12.789063 14.984375 14.554688 15 16 15 C 17.4375 15 19.207031 15.007813 20.71875 14.78125 C 21.476563 14.667969 22.167969 14.519531 22.78125 14.1875 C 23.191406 13.964844 23.589844 13.570313 23.8125 13.09375 C 24.429688 13.3125 24.949219 13.546875 25.3125 13.78125 C 25.894531 14.15625 26 14.433594 26 14.5 C 26 14.558594 25.949219 14.75 25.53125 15.0625 C 25.113281 15.375 24.394531 15.738281 23.46875 16.03125 C 21.617188 16.621094 18.953125 17 16 17 C 13.046875 17 10.382813 16.621094 8.53125 16.03125 C 7.605469 15.738281 6.886719 15.375 6.46875 15.0625 C 6.050781 14.75 6 14.558594 6 14.5 C 6 14.433594 6.078125 14.183594 6.65625 13.8125 C 7.019531 13.578125 7.554688 13.324219 8.1875 13.09375 Z M 10.78125 18.5625 C 11.109375 18.617188 11.433594 18.707031 11.78125 18.75 C 11.910156 19.628906 12.59375 20.402344 13.6875 20.46875 C 14.53125 20.519531 15.480469 20.121094 15.5625 19 C 15.710938 19 15.851563 19 16 19 C 16.148438 19 16.289063 19 16.4375 19 C 16.519531 20.121094 17.46875 20.519531 18.3125 20.46875 C 19.40625 20.402344 20.089844 19.628906 20.21875 18.75 C 20.566406 18.707031 20.890625 18.617188 21.21875 18.5625 L 21.125 19.1875 C 20.816406 20.832031 20.082031 22.355469 19.15625 23.40625 C 18.230469 24.457031 17.144531 25.015625 16 25 C 14.824219 24.984375 13.761719 24.417969 12.84375 23.375 C 11.925781 22.332031 11.203125 20.839844 10.875 19.1875 Z M 23 20 C 23.371094 20.21875 24.347656 20.859375 25.46875 22.09375 L 22.4375 24.1875 L 21.71875 24.65625 L 22.09375 25.4375 L 22.375 26 L 19.21875 26 C 19.742188 25.648438 20.226563 25.207031 20.65625 24.71875 C 21.757813 23.46875 22.496094 21.832031 22.90625 20.0625 C 22.941406 20.042969 22.96875 20.019531 23 20 Z M 8.96875 20.03125 C 9.007813 20.054688 9.054688 20.070313 9.09375 20.09375 C 9.523438 21.839844 10.257813 23.457031 11.34375 24.6875 C 11.792969 25.199219 12.316406 25.636719 12.875 26 L 9.625 26 L 9.90625 25.4375 L 10.28125 24.65625 L 9.5625 24.1875 L 6.53125 22.09375 C 7.589844 20.925781 8.554688 20.28125 8.96875 20.03125 Z"></path></svg>
                                    <p className='mr-2'>  {loggedInUser.name}</p>
                                </div>)}

                                <h3 className='mt-2'><b>تاریخ ایجاد </b>{new Date(comment.createdAt).toLocaleDateString('fa')}</h3>
                            </div>
                            <p className='mt-6'>{comment.comment}</p>
                        </div>
                    ))}

                </div>
                <textarea
                    className="w-full p-2 border border-blue-400 rounded-md mt-8 mb-2 text-right outline-none"
                    placeholder="پاسخ گویی به تیکت..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                    className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md"
                    onClick={handleAddComment}
                >
                    پاسخ گویی به تیکت
                </button>
            </div>
        </TitleCard>
    );
}

export default SingleCookTicket