import { useEffect, useState, useRef } from "react"
import TitleCard from "../components/Cards/TitleCard"

import Select from "react-tailwindcss-select";
import 'react-tailwindcss-select/dist/index.css'

import { IoFastFoodOutline } from "react-icons/io5";
import { GoNumber } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import { TbClockHour12 } from "react-icons/tb";
import { PiChefHatLight } from "react-icons/pi";
import { IoPricetagOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";

import Swal from 'sweetalert2'
import axios from "axios"


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const options = [
    {
        label: "غذاهای ایرانی",
        options: [
            { value: "kebab", label: "کباب" },
            { value: "ghormeh_sabzi", label: "قرمه سبزی" },
            { value: "fesenjan", label: "فسنجان" },
            { value: "tahchin", label: "ته چین" },
            { value: "ash_reshteh", label: "آش رشته" },
            { value: "zereshk_polo", label: "زرشک پلو" },
            { value: "bademjan", label: "بادمجان" },
            { value: "gheymeh", label: "قیمه" },
            { value: "kashke_bademjan", label: "کشک بادمجان" },
            { value: "dizi", label: "دیزی" },
            { value: "baghali_polo", label: "باقالی پلو" },
            { value: "sabzi_polo", label: "سبزی پلو" },
            { value: "shirin_polo", label: "شیرین پلو" },
            { value: "khoreshte_bamieh", label: "خورشت بامیه" },
            { value: "adas_polo", label: "عدس پلو" },
            { value: "abgoosht", label: "آبگوشت" },
            { value: "tahdig", label: "ته دیگ" },
            { value: "loobia_polo", label: "لوبیا پلو" },

        ]
    },

];

const weekDays = [
    {
        label: "روزهای هفته",
        options: [
            { value: "sat", label: "شنبه" },
            { value: "sun", label: "یکشنبه" },
            { value: "mon", label: "دوشنبه" },
            { value: "thu", label: "سه شنبه" },
            { value: "wed", label: "چهارشنبه" },
            { value: "thur", label: "پنج شنبه" },
            { value: "fri", label: "جمعه" },
        ]
    },

];


const hourOptions = [
    { value: "morning", label: "صبح تا ظهر (7 تا 12)" },
    { value: "noon", label: "صبح تا شب (7 تا 0)" },
    { value: "night", label: "ظهر تا شب (12 تا 0)" },
    { value: "none", label: "هیچکدام" }
];

const categoryOptions = [
    { value: "Appetizer", label: "پیش غذا و سوپ" },
    { value: "Main Course", label: "غذای اصلی" },
    { value: "Dessert", label: "دسر و نوشیدنی" },
];


function UpdateFood() {

    const [name, setName] = useState("")
    const [count, setCount] = useState("")
    const [cookDate, setCookDate] = useState([])
    const [cookHour, setCookHour] = useState(null)
    const [price, setPrice] = useState(null)
    const [description, setDescription] = useState(null)
    const [category, setCategory] = useState(null)
    const [cookName, setCookName] = useState("")
    const [photo, setPhoto] = useState(null)
    const [photos, setPhotos] = useState([])
    const [btnSpinner, setBtnSpinner] = useState(false)


    let token = localStorage.getItem("userToken")
    let foodId = window.location.href.split('/foods/')[1].split('/update')[0]


    // error variables
    const [nameError, setNameError] = useState(false)
    const [nameErrorMsg, setNameErrorMsg] = useState("")

    const [countError, setCountError] = useState(false)
    const [countErrorMsg, setCountErrorMsg] = useState("")

    const [cookDateError, setCookDateError] = useState(false)
    const [cookDateErrorMsg, setCookDateErrorMsg] = useState("")

    const [cookHourError, setCookHourError] = useState(false)
    const [cookHourErrorMsg, setCookHourErrorMsg] = useState("")

    const [priceError, setPriceError] = useState(false)
    const [priceErrorMsg, setPriceErrorMsg] = useState("")

    const [descriptionError, setDescriptionError] = useState(false)
    const [descriptionErrorMsg, setDescriptionErrorMsg] = useState("")

    const [categoryError, setCategoryError] = useState(false)
    const [categoryErrorMsg, setCategoryErrorMsg] = useState("")

    const [cookNameError, setCookNameError] = useState(false)
    const [cookNameErrorMsg, setCookNameErrorMsg] = useState("")


    const [photoError, setPhotoError] = useState(false)
    const [photoErrorMsg, setPhotoErrorMsg] = useState("")

    const [photosError, setPhotosError] = useState(false)
    const [photosErrorMsg, setPhotosErrorMsg] = useState("")




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

    // photos vars
    const [selectedFiles2, setSelectedFiles2] = useState([]);

    const fileInputRef2 = useRef(null);
    const acceptedFileExtensions2 = ["jpg", "png", "jpeg"];

    const acceptedFileTypesString2 = acceptedFileExtensions2
        .map((ext) => `.${ext}`)
        .join(",");

    const handleFileChange2 = (event) => {
        const newFilesArray = Array.from(event.target.files);
        processFiles2(newFilesArray);
    };

    const processFiles2 = (filesArray) => {
        const newSelectedFiles2 = [...selectedFiles2];
        let hasError = false;
        const fileTypeRegex = new RegExp(acceptedFileExtensions2.join("|"), "i");
        filesArray.forEach((file) => {
            if (newSelectedFiles2.some((f) => f.name === file.name)) {
                alert("File names must be unique", "error");
                hasError = true;
            } else if (!fileTypeRegex.test(file.name.split(".").pop())) {
                alert(`Only ${acceptedFileExtensions2.join(", ")} files are allowed`, "error");
                hasError = true;
            } else {
                newSelectedFiles2.push(file);
            }
        });

        if (!hasError) {
            setSelectedFiles2(newSelectedFiles2);
        }
    };

    const handleCustomButtonClick2 = () => {
        fileInputRef2.current.click();
    };

    const handleFileDelete2 = (index) => {
        const updatedFiles = [...selectedFiles2];
        updatedFiles.splice(index, 1);
        setSelectedFiles2(updatedFiles);
    };


    const UpdateFoodFunction = async (e) => {
        e.preventDefault();

        // name error
        if (!name || name === "" || name === undefined || name === null) {
            setNameError(true)
            setNameErrorMsg("* نام غذا باید وارد شود")
        }

        if (!count || count === "" || count === undefined || count === null) {
            setCountError(true)
            setCountErrorMsg("*  تعداد غذا باید وارد شود")
        }

        if (!price || price === "" || price === undefined || price === null) {
            setPriceError(true)
            setPriceErrorMsg("*  قیمت غذا باید وارد شود")
        }

        if (!cookDate || cookDate === "" || cookDate === undefined || cookDate === null || cookDate.length === 0) {
            setCookDateError(true)
            setCookDateErrorMsg("*  تاریخ پخت غذا باید وارد شود")
        }

        if (!cookHour || cookHour === "" || cookHour === undefined || cookHour === null) {
            setCookHourError(true)
            setCookHourErrorMsg("* ساعت پخت غذا باید وارد شود")
        }

        if (!description || description === "" || description === undefined || description === null) {
            setDescriptionError(true)
            setDescriptionErrorMsg("* توضیحات غذا باید وارد شود")
        }

        if (!category || category === "" || category === undefined || category === null) {
            setCategoryError(true)
            setCategoryErrorMsg("* دسته بندی غذا باید وارد شود")
        }

        if (!cookName || cookName === "" || cookName === undefined || cookName === null) {
            setCookNameError(true)
            setCookNameErrorMsg("* نام سرآشپز باید وارد شود")
        }

        else {
            setBtnSpinner(true)

            Swal.fire({
                title: "<small>آیا از ویرایش غذا اطمینان دارید؟</small>",
                showDenyButton: true,
                confirmButtonText: "بله",
                denyButtonText: `خیر`
            }).then((result) => {
                if (result.isConfirmed) {
                    // Swal.fire("<small>غذا ویرایش شد!</small>", "", "success");
                    try {
                        axios.put(`/api/cooks/foods/${foodId}/update-food`, { name, count, price, cookDate, cookHour, photo: selectedFiles[0], photos: selectedFiles2, description, category, cookName }, {
                            headers: {
                                'Content-Type': 'application/json',
                                'authorization': 'Bearer ' + token
                            },
                        }).then((res) => {
                            setBtnSpinner(false)

                            toast.success('غذا ویرایش شد', {
                                position: "top-left",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            })

                        })

                    } catch (error) {
                        setBtnSpinner(false)
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
                    }
                } else if (result.isDenied) {
                    setBtnSpinner(false)
                    toast.info('تغییرات ذخیره نشد..!', {
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

    };



    // get single food
    useEffect(() => {
        axios.get(`/api/cooks/foods/${foodId}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setPhoto(response.data.food.photo)
                setPhotos(response.data.food.photos)
                setName(response.data.food.name)
                setCount(response.data.food.count)
                setPrice(response.data.food.price)
                setDescription(response.data.food.description)
                setCookName(response.data.food.cookName)

            })
            .catch((error) => {
                console.error(error);
            });
    }, [])


    // update food main photo 
    const UpdateFoodMainPhoto = async () => {
        if (!selectedFiles || selectedFiles === "" || selectedFiles === undefined || selectedFiles === null || selectedFiles.length === 0) {
            setPhotoError(true)
            setPhotoErrorMsg("* تصویر اصلی غذا باید وارد شود")
        } else {
            try {
                setBtnSpinner(true)
                const formData = new FormData();
                formData.append("photo", selectedFiles[0])


                Swal.fire({
                    title: "<small>آیا از ویرایش تصویر غذا اطمینان دارید؟</small>",
                    showDenyButton: true,
                    confirmButtonText: "بله",
                    denyButtonText: `خیر`
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.put(`/api/cooks/foods/${foodId}/update-food-photo`, formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                'authorization': 'Bearer ' + token
                            },
                        }).then((res) => {
                            setBtnSpinner(false)
                            toast.success('تصویر اصلی غذا ویرایش شد', {
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
                        setBtnSpinner(false)
                        toast.info('تغییرات ذخیره نشد..!', {
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
            } catch (error) {
                console.log('error', error)
                setBtnSpinner(false)
                toast.error('خطایی وجود دارد. دوباره امتحان کنید...', {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }
    }

    // update food photos
    const UpdateFoodPhotos = async () => {
        if (!selectedFiles2 || selectedFiles2 === "" || selectedFiles2 === undefined || selectedFiles2 === null || selectedFiles2.length === 0) {
            setPhotoError(true)
            setPhotoErrorMsg("* تصاویر غذا باید وارد شوند")
        } else {
            try {

                const formData = new FormData();
                selectedFiles2.forEach(image => formData.append('photos', image));


                const response = await axios.put(`/api/cooks/foods/${foodId}/update-food-photos`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'authorization': 'Bearer ' + token
                    },
                });
                Swal.fire({
                    title: "<small>آیا از ویرایش تصاویر غذا اطمینان دارید؟</small>",
                    showDenyButton: true,
                    confirmButtonText: "بله",
                    denyButtonText: `خیر`
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("<small>تصاویر غذا ویرایش شد!</small>", "", "success");
                    } else if (result.isDenied) {
                        Swal.fire("<small>تغییرات ذخیره نشد</small>", "", "info");
                    }
                });
                console.log(response);
            } catch (error) {
                console.log('error', error)
                Swal.fire("<small>تغییرات ذخیره نشد</small>", "", "error");
                Swal.fire(`${error.response.data.msg}`, "", "error");
            }
        }
    }


    return (
        <>

            <TitleCard title="ویرایش غذا" topMargin="mt-2">
                <div className="">
                    <div>
                        <div>
                            <h4 className="font-bold text-gray-600">ویرایش عکس اصلی غذا</h4>
                            {/*  food photo  */}
                            <div className="flex flex-col my-6">

                                {/* <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <PiImage className="w-6 h-6 text-gray-400" />
                                    </div> */}
                                {/* <input type="file" onChange={(e) => setPhoto(e.target.files[0])} name="photo" id="photo" className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" /> */}
                                <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-400 rounded-md py-2 focus:outline-none focus:border-blue-800">

                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={handleCustomButtonClick}
                                            className="app-btn-gray"
                                        >
                                            انتخاب تصویر اصلی
                                        </button>
                                        <input
                                            type="file"
                                            id="photo"
                                            name="photo"
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

                            {/* <div className="flex items-center">
                                <a href={`${photo}`} className="ml-6" target="_blank">
                                    <img className="w-20 h-20 rounded-md mb-4" src={`${photo}`} />
                                </a>
                                <button onClick={UpdateFoodMainPhoto} className="btn bg-blue-800 hover:bg-blue-900 text-white">ویرایش تصویر اصلی</button>
                            </div> */}


                            <div className="flex items-center">
                                <a href={`${photo}`} className="ml-6" target="_blank">
                                    <img className="w-20 h-20 rounded-md mb-4" src={`${photo}`} />
                                </a>
                                <button className="app-btn-blue mt-2" onClick={UpdateFoodMainPhoto} >
                                    {btnSpinner ? (
                                        <div className="px-10 py-1 flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                        </div>
                                    ) : (
                                        <span> ویرایش تصویر اصلی</span>
                                    )}
                                </button>

                            </div>
                        </div>


                        <hr className="my-6" />

                        {/* food photos */}
                        <div>
                            <h4 className="font-bold text-gray-600">ویرایش عکس های غذا</h4>
                            <div className="flex flex-col my-6">

                                {/* <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                    <PiImage className="w-6 h-6 text-gray-400" />
                                </div> */}
                                {/* <input type="file" onChange={(e) => setPhoto(e.target.files[0])} name="photo" id="photo" className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" /> */}
                                <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-400 rounded-md py-2 focus:outline-none focus:border-blue-800">
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={handleCustomButtonClick2}
                                            className="app-btn-gray"
                                        >
                                            انتخاب تصاویر غذا
                                        </button>
                                        <input
                                            type="file"
                                            id="photos"
                                            name="photos"
                                            multiple
                                            accept={acceptedFileTypesString2}
                                            ref={fileInputRef2}
                                            className="hidden"
                                            onChange={handleFileChange2}
                                            onClick={(event) => {
                                                event.target.value = null;
                                            }}
                                        />
                                    </div>

                                    <div className="rounded-3xl py-4 max-h-[23rem] overflow-auto">
                                        {selectedFiles2.length > 0 ? (
                                            <ul className="px-4">
                                                {selectedFiles2.map((file, index) => (

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
                                                            onClick={() => handleFileDelete2(index)}
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

                                <span className='text-red-500 relative text-sm'>{photosError ? photosErrorMsg : ""}</span>
                            </div>

                            <div className="flex items-center">
                                {photos.map(p => (
                                    <a key={Math.floor(Math.random() * 10000)} href={`${p}`} target="_blank" className="ml-6">
                                        <img className="w-20 h-20 rounded-md mb-4" src={`${p}`} />
                                    </a>
                                ))}
                                <button onClick={UpdateFoodPhotos} className="btn bg-blue-800 hover:bg-blue-900 text-white">ویرایش تصاویر</button>
                            </div>

                        </div>
                    </div>

                    <hr className="my-6" />
                    <h4 className="font-bold text-gray-600 my-6">ویرایش غذا</h4>
                    <form onSubmit={UpdateFoodFunction}>
                        <div className="mx-auto">
                            {/*  food name  */}
                            <div className="flex flex-col mb-6">
                                <label htmlFor="title" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">نام غذا</label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <IoFastFoodOutline className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <input style={{ borderRadius: '5px' }} type="text" value={name}
                                        onChange={(e) => setName(e.target.value)} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:border-blue-800" placeholder="نام غذا" />
                                </div>
                                <span className='text-red-500 relative text-sm'>{nameError ? nameErrorMsg : ""}</span>
                            </div>

                            {/*  food count  */}
                            <div className="flex flex-col mb-6">
                                <label htmlFor="count" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">تعداد غذاها  </label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <GoNumber className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <input style={{ borderRadius: '5px' }} type="number" min={1} value={count}
                                        onChange={(e) => setCount(e.target.value)} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:border-blue-800" placeholder="تعداد غذاها " />
                                </div>
                                <span className='text-red-500 relative text-sm'>{countError ? countErrorMsg : ""}</span>
                            </div>

                            {/*  food date  */}
                            <div className="flex flex-col mb-6">
                                <label htmlFor="cookDate" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"> تاریخ پخت  </label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <SlCalender className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <Select
                                        value={cookDate}
                                        onChange={(e) => setCookDate(e)}
                                        options={weekDays}
                                        isMultiple={true}
                                        placeholder="انتخاب"
                                        formatGroupLabel={data => (
                                            <div className={`py-2 text-xs flex items-center justify-between`}>
                                                <span className="font-bold">{data.label}</span>
                                                <span className="bg-gray-200 h-5 h-5 p-1.5 flex items-center justify-center rounded-full">
                                                    {data.options.length}
                                                </span>
                                            </div>
                                        )}
                                    />

                                </div>
                                <span className='text-red-500 relative text-sm'>{cookDateError ? cookDateErrorMsg : ""}</span>
                            </div>

                            {/*  food hour  */}
                            <div className="flex flex-col mb-6">
                                <label htmlFor="cookHour" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"> ساعت پخت  </label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <TbClockHour12 className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <Select
                                        value={cookHour}
                                        onChange={(e) => setCookHour(e)}
                                        options={hourOptions}
                                        placeholder="انتخاب"
                                        classNames={`placholder-gray-400`}
                                    />
                                </div>
                                <span className='text-red-500 relative text-sm'>{cookHourError ? cookHourErrorMsg : ""}</span>

                            </div>


                            {/*  food type  */}
                            <div className="flex flex-col mb-6">
                                <label htmlFor="cookHour" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"> نوع غذا   </label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <TbClockHour12 className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <Select
                                        value={category}
                                        onChange={(e) => setCategory(e)}
                                        options={categoryOptions}
                                        placeholder="انتخاب"
                                        classNames={`placholder-gray-400`}
                                    />
                                </div>
                                <span className='text-red-500 relative text-sm'>{categoryError ? categoryErrorMsg : ""}</span>

                            </div>



                            {/*  price  */}
                            <div className="flex flex-col mb-6">
                                <label htmlFor="title" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">قیمت غذا</label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <IoPricetagOutline className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <input style={{ borderRadius: '5px' }} type="number" value={price}
                                        onChange={(e) => setPrice(e.target.value)} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:border-blue-800" placeholder="قیمت غذا " />
                                </div>
                                {/* <span className='text-red-500 relative text-sm'>{errorPhoneMessage ? errorPhoneMessage : ""}</span> */}
                                <span className='text-red-500 relative text-sm'>{priceError ? priceErrorMsg : ""}</span>

                            </div>

                            {/*  cook name  */}
                            <div className="flex flex-col mb-6">
                                <label htmlFor="cookName" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"> نام سرآشپز   </label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <PiChefHatLight className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <input style={{ borderRadius: '5px' }} type="text" value={cookName}
                                        onChange={(e) => setCookName(e.target.value)}
                                        className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:border-blue-800" placeholder=" نام سرآشپز  " />
                                </div>
                                <span className='text-red-500 relative text-sm'>{cookNameError ? cookNameErrorMsg : ""}</span>

                            </div>



                            {/*  description */}
                            <div className="flex flex-col mb-2">
                                <label htmlFor="description" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">توضیحات </label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 h-full w-10 text-gray-400" style={{ bottom: "52px" }}>
                                        <IoIosInformationCircleOutline className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <textarea style={{ borderRadius: '5px', resize: 'none' }} type="text" value={description}
                                        onChange={(e) => setDescription(e.target.value)} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-300 w-full py-2 focus:outline-none focus:border-blue-800" placeholder="توضیحات "></textarea>
                                </div>
                                <span className='text-red-500 relative text-sm'>{descriptionError ? descriptionErrorMsg : ""}</span>
                            </div>
                        </div>
                        {/* <div className="mt-2"><button type="submit" className="btn bg-blue-800 hover:bg-blue-900 text-white float-right px-8">ویرایش غذا </button></div> */}
                        <button className="app-btn-blue mt-2">
                            {btnSpinner ? (
                                <div className="px-10 py-1 flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <span> ویرایش غذا</span>
                            )}
                        </button>
                    </form>
                </div>


            </TitleCard >
        </>
    )
}


export default UpdateFood