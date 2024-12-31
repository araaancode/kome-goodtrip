import { useState, useRef, useEffect } from "react"
import TitleCard from "../components/Cards/TitleCard"

import { FiFileText, FiPhone, FiUser } from "react-icons/fi";

import { IoIosInformationCircleOutline } from "react-icons/io";

import Swal from 'sweetalert2'
import axios from "axios"

function CreateSupportTicket() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [photo, setPhoto] = useState(null)
    const [cookId, setCookId] = useState("")


    let token = localStorage.getItem("userToken")



    // error variables
    const [titleError, setTitleError] = useState(false)
    const [titleErrorMsg, setTitleErrorMsg] = useState("")

    const [photoError, setPhotoError] = useState(false)
    const [photoErrorMsg, setPhotoErrorMsg] = useState("")

    const [descriptionError, setDescriptionError] = useState(false)
    const [descriptionErrorMsg, setDescriptionErrorMsg] = useState("")


    // photo vars
    const [selectedFiles, setSelectedFiles] = useState([]);


    const fileInputRef = useRef(null);
    const acceptedFileExtensions = ["jpg", "png", "jpeg"];

    const acceptedFileTypesString = acceptedFileExtensions
        .map((ext) => `.${ext}`)
        .join(",");



    const handleFileChange = (event) => {
        const newFilesArray = Array.from(event.target.files);
        processFiles(newFilesArray);
    };


    const processFiles = (filesArray) => {
        const newSelectedFiles = [...selectedFiles];
        let hasError = false;
        const fileTypeRegex = new RegExp(acceptedFileExtensions.join("|"), "i");
        filesArray.forEach((file) => {

            if (newSelectedFiles.some((f) => f.name === file.name)) {
                alert("File names must be unique", "error");
                hasError = true;
            } else if (!fileTypeRegex.test(file.name.split(".").pop())) {
                alert(`Only ${acceptedFileExtensions.join(", ")} files are allowed`, "error");
                hasError = true;
            } else {
                newSelectedFiles.push(file);
            }
        });

        if (!hasError) {
            setSelectedFiles(newSelectedFiles);
        }
    };

    const handleCustomButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileDelete = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };



    // get cook info
    useEffect(() => {
        axios.get('/api/cooks/me', {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setCookId(response.data.cook._id)
            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    }, [])




    const createSupportTicketFunction = async (e) => {
        e.preventDefault();


        if (!title || title === "" || title === undefined || title === null) {
            setTitleError(true)
            setTitleErrorMsg("* عنوان تیکت پشتیبانی باید وارد شود")
        }

        if (!selectedFiles || selectedFiles === "" || selectedFiles === undefined || selectedFiles === null) {
            setPhotoError(true)
            setPhotoErrorMsg("* تصویر اصلی تیکت پشتیبانی باید وارد شود")
        }

        if (!description || description === "" || description === undefined || description === null) {
            setDescriptionError(true)
            setDescriptionErrorMsg("* توضیح تیکت پشتیبانی باید وارد شود")
        }

        else {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image', selectedFiles[0]);
            formData.append('cook', cookId);
            formData.append('assignedTo', cookId);



            console.log(selectedFiles[0]);
            

            try {
                const response = await axios.post('/api/cooks/support-tickets', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'authorization': 'Bearer ' + token
                    },
                });
                Swal.fire({
                    title: "<small>آیا از ایجاد تیکت پشتیبانی اطمینان دارید؟</small>",
                    showDenyButton: true,
                    confirmButtonText: "بله",
                    denyButtonText: `خیر`
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("<small>تیکت پشتیبانی ایجاد شد!</small>", "", "success");
                        setTitle("");
                        setDescription("");
                        setPhoto(null);
                        setSelectedFiles([])

                    } else if (result.isDenied) {
                        Swal.fire("<small>تغییرات ذخیره نشد</small>", "", "info");
                    }
                });

            } catch (error) {
                console.log('error', error)
                Swal.fire("<small>تغییرات ذخیره نشد</small>", "", "error");
            }
        }

    };



    return (
        <>

            <TitleCard title="ایجاد تیکت پشتیبانی" topMargin="mt-2">


                <form onSubmit={createSupportTicketFunction}>
                    <div className="">


                        {/* ads title */}
                        <div className="flex flex-col mb-6">
                            <label htmlFor="title" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">عنوان</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <FiFileText className="w-6 h-6 text-gray-400" />
                                </div>
                                <input style={{ borderRadius: '5px' }} type="text" value={title}
                                    onChange={(e) => setTitle(e.target.value)} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" placeholder="عنوان" />
                            </div>
                            <span className='text-red-500 relative text-sm'>{titleError ? titleErrorMsg : ""}</span>
                        </div>


                        {/*  description */}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="description" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">توضیحات </label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute left-0 h-full w-10 text-gray-400" style={{ bottom: "52px" }}>
                                    <IoIosInformationCircleOutline className="w-6 h-6 text-gray-400" />
                                </div>
                                <textarea style={{ borderRadius: '5px', resize: 'none' }} type="text" value={description}
                                    onChange={(e) => setDescription(e.target.value)} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" placeholder="توضیحات "></textarea>
                            </div>
                            <span className='text-red-500 relative text-sm'>{descriptionError ? descriptionErrorMsg : ""}</span>
                        </div>


                        {/*  ads photo  */}
                        <div className="flex flex-col mb-6">
                            <label htmlFor="photo" className="mb-2 text-xs sm:text-sm tracking-wide text-gray-600">تصویر اصلی تیکت پشتیبانی </label>

                            {/* <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <PiImage className="w-6 h-6 text-gray-400" />
                                </div> */}
                            {/* <input type="file" onChange={(e) => setPhoto(e.target.files[0])} name="photo" id="photo" className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" /> */}
                            <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-400 rounded-md py-2 focus:outline-none focus:border-blue-800">
                                <div className="flex items-center">
                                    <button
                                        type="button"
                                        onClick={handleCustomButtonClick}
                                        className="px-6 py-2 mx-4 bg-green-800 text-white rounded-lg hover:bg-green-900 focus:outline-none focus:bg-green-900"
                                    >
                                        انتخاب تصویر اصلی
                                    </button>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept={acceptedFileTypesString}
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleFileChange}
                                        onClick={(event) => {
                                            event.target.value = null;
                                        }}
                                    />
                                </div>

                                <div className="rounded-3xl py-4 max-h-[23rem] overflow-auto">
                                    {selectedFiles.length > 0 ? (
                                        <ul className="px-4">
                                            {selectedFiles.map((file, index) => (

                                                <li
                                                    key={file.name}
                                                    className="flex justify-between items-center border-b py-2"
                                                >
                                                    <div className="flex items-center">
                                                        {/* <img
                                                            src={window.location.origin + file.name}
                                                            alt="File"
                                                            className="w-10 h-10 mr-2"
                                                        /> */}
                                                        <span className="text-base mx-2">{file.name}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleFileDelete(index)}
                                                        className="text-red-500 hover:text-red-700 focus:outline-none"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                            className="w-6 h-6"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                d="M6 4l8 8M14 4l-8 8"
                                                            />
                                                        </svg>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="h-full flex justify-center items-center">
                                            <p className="text-center text-gray-500 text-sm">
                                                هنوز تصویری آپلود نشده است...
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <span className='text-red-500 relative text-sm'>{photoError ? photoErrorMsg : ""}</span>
                        </div>
                    </div>
                    <div className="mt-2"><button type="submit" className="btn bg-blue-800 hover:bg-blue-900 text-white float-right px-8">ایجاد تیکت پشتیبانی </button></div>
                </form>


            </TitleCard>
        </>
    )
}


export default CreateSupportTicket