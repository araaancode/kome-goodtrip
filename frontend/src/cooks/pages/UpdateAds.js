import { useEffect, useState, useRef } from "react"
import TitleCard from "../components/Cards/TitleCard"

import { FiFileText, FiPhone, FiUser } from "react-icons/fi";

import { PiMoney, PiMapPinLight } from "react-icons/pi";
import { IoIosInformationCircleOutline } from "react-icons/io";

import Swal from 'sweetalert2'
import axios from "axios"

function UpdateAds() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [photo, setPhoto] = useState(null)
    const [photos, setPhotos] = useState([])
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")

    const [singleAds, setSingleAds] = useState({})

    let token = localStorage.getItem("userToken")
    let adsId = window.location.href.split('/advertisments/')[1].split('/update')[0]

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


    const updateAdsFunction = async (e) => {
        e.preventDefault();

        // name error
        if (!name || name === "" || name === undefined || name === null) {
            setNameError(true)
            setNameErrorMsg("* نام مشتری باید وارد شود")
        }
        if (!title || title === "" || title === undefined || title === null) {
            setTitleError(true)
            setTitleErrorMsg("* عنوان آگهی باید وارد شود")
        }
        if (!phone || phone === "" || phone === undefined || phone === null) {
            setPhoneError(true)
            setPhoneErrorMsg("* شماره همراه مشتری باید وارد شود")
        }
        if (!price || price === "" || price === undefined || price === null) {
            setPriceError(true)
            setPriceErrorMsg("* قیمت باید وارد شود")
        }
        // if (!selectedFiles || selectedFiles === "" || selectedFiles === undefined || selectedFiles === null) {
        //     setPhotoError(true)
        //     setPhotoErrorMsg("* تصویر اصلی آگهی باید وارد شود")
        // }
        // if (!selectedFiles2 || selectedFiles2 === "" || selectedFiles2 === undefined || selectedFiles2 === null) {
        //     setPhotosError(true)
        //     setPhotosErrorMsg("* تصاویر آگهی باید وارد شوند")
        // }
        if (!description || description === "" || description === undefined || description === null) {
            setDescriptionError(true)
            setDescriptionErrorMsg("* توضیح آگهی باید وارد شود")
        }
        if (!address || address === "" || address === undefined || address === null) {
            setAddressError(true)
            setAddressErrorMsg("* آدرس باید وارد شود")
        }
        else {
            // const formData = new FormData();
            // formData.append('title', title);
            // formData.append('description', description);
            // formData.append('price', price);
            // formData.append('name', name);
            // formData.append('address', address);
            // formData.append('phone', phone);
            // formData.append('photo', selectedFiles[0]);
            // selectedFiles2.forEach(image => formData.append('photos', image));
            // // formData.append('photos', selectedFiles2)

            try {
                const response = await axios.put(`/api/cooks/ads/${adsId}/update-ads`, { name, phone, address, title, description, price }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + token
                    },
                });
                Swal.fire({
                    title: "<small>آیا از ویرایش آگهی اطمینان دارید؟</small>",
                    showDenyButton: true,
                    confirmButtonText: "بله",
                    denyButtonText: `خیر`
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("<small>آگهی ویرایش شد!</small>", "", "success");
                    } else if (result.isDenied) {
                        Swal.fire("<small>تغییرات ذخیره نشد</small>", "", "info");
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.log('error', error)
                Swal.fire("<small>تغییرات ذخیره نشد</small>", "", "error");
                Swal.fire(`${error.response.data.msg}`, "", "error");
            }
        }

    };



    // get single ads
    useEffect(() => {
        axios.get(`/api/cooks/ads/${adsId}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setSingleAds(response.data.ads)
                setTitle(response.data.ads.title)
                setDescription(response.data.ads.description)
                setPhoto(response.data.ads.photo)
                setPhotos(response.data.ads.photos)
                setPrice(response.data.ads.price)
                setName(response.data.ads.company.name)
                setPhone(response.data.ads.company.phone)
                setAddress(response.data.ads.company.address)

            })
            .catch((error) => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });
    }, [])



    // update ads main photo 
    const updateAdsMainPhoto = async () => {
        if (!selectedFiles || selectedFiles === "" || selectedFiles === undefined || selectedFiles === null) {
            setPhotoError(true)
            setPhotoErrorMsg("* تصویر اصلی آگهی باید وارد شود")
        } else {
            try {

                const formData = new FormData();
                formData.append("photo", selectedFiles[0])

                const response = await axios.put(`/api/cooks/ads/${adsId}/update-photo`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'authorization': 'Bearer ' + token
                    },
                });
                Swal.fire({
                    title: "<small>آیا از ویرایش تصویر آگهی اطمینان دارید؟</small>",
                    showDenyButton: true,
                    confirmButtonText: "بله",
                    denyButtonText: `خیر`
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("<small>تصویر آگهی ویرایش شد!</small>", "", "success");
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

    // update ads photos
    const updateAdsPhotos = async () => {
        if (!selectedFiles || selectedFiles === "" || selectedFiles === undefined || selectedFiles === null) {
            setPhotoError(true)
            setPhotoErrorMsg("* تصاویر آگهی باید وارد شوند")
        } else {
            try {

                const formData = new FormData();
                selectedFiles2.forEach(image => formData.append('photos', image));


                const response = await axios.put(`/api/cooks/ads/${adsId}/update-photos`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'authorization': 'Bearer ' + token
                    },
                });
                Swal.fire({
                    title: "<small>آیا از ویرایش تصاویر آگهی اطمینان دارید؟</small>",
                    showDenyButton: true,
                    confirmButtonText: "بله",
                    denyButtonText: `خیر`
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("<small>تصاویر آگهی ویرایش شد!</small>", "", "success");
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

            <TitleCard title="ویرایش آگهی" topMargin="mt-2">


                <div className="">
                    <div>
                        <div>
                            <h4 className="font-bold text-gray-600">ویرایش عکس اصلی آگهی</h4>
                            {/*  ads photo  */}
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
                                            className="px-6 py-2 mx-4 bg-green-800 text-white rounded-lg hover:bg-green-900 focus:outline-none focus:bg-green-900"
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

                            <div className="flex items-center">
                                <a href={`https://res.cloudinary.com/dlxpihq5c/image/upload/v123456789/mern_uploads/ppn5oumuwl0rzirzzkkd`} className="ml-6">
                                    <img className="w-20 h-20 rounded-md mb-4" src={`https://res.cloudinary.com/dlxpihq5c/image/upload/v123456789/${photo}`} />
                                </a>
                                <button onClick={updateAdsMainPhoto} className="btn bg-blue-800 hover:bg-blue-900 text-white">ویرایش تصویر اصلی</button>
                            </div>
                        </div>


                        <hr className="my-6" />

                        <div>
                            <h4 className="font-bold text-gray-600">ویرایش عکس های آگهی</h4>
                            {/* ads photos */}
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
                                            className="px-6 py-2 mx-4 bg-green-800 text-white rounded-lg hover:bg-green-900 focus:outline-none focus:bg-green-900"
                                        >
                                            انتخاب تصاویر آگهی
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
                                    <a key={Math.floor(Math.random() * 10000)} href={`https://res.cloudinary.com/dlxpihq5c/image/upload/v123456789/mern_uploads/ppn5oumuwl0rzirzzkkd`} className="ml-6">
                                        <img className="w-20 h-20 rounded-md mb-4" src={`https://res.cloudinary.com/dlxpihq5c/image/upload/v123456789/${p}`} />
                                    </a>
                                ))}
                                <button onClick={updateAdsPhotos} className="btn bg-blue-800 hover:bg-blue-900 text-white">ویرایش تصاویر</button>
                            </div>

                        </div>
                    </div>

                    <hr className="my-4" />
                    <form onSubmit={updateAdsFunction}>

                        <div>
                            <h4 className="font-bold text-gray-600">ویرایش  آگهی</h4>

                            {/* name */}
                            <div className="flex flex-col my-6">
                                <label htmlFor="name" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">نام و نام خانوادگی مشتری</label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <FiUser className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <input style={{ borderRadius: '5px' }} type="text" value={name}
                                        onChange={(e) => setName(e.target.value)} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" placeholder="نام و نام خانوادگی مشتری" />
                                </div>
                                <span className='text-red-500 relative text-sm'>{nameError ? nameErrorMsg : ""}</span>
                            </div>

                            {/* phone */}
                            <div className="flex flex-col mb-6">
                                <label htmlFor="phone" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">شماره همراه مخاطب</label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <FiPhone className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <input style={{ borderRadius: '5px' }} type="text" value={phone}
                                        onChange={(e) => setPhone(e.target.value)} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" placeholder="شماره همراه مخاطب" />
                                </div>
                                <span className='text-red-500 relative text-sm'>{phoneError ? phoneErrorMsg : ""}</span>
                            </div>

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

                            {/* ads price */}
                            <div className="flex flex-col mb-6">
                                <label htmlFor="price" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">قیمت</label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <PiMoney className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <input style={{ borderRadius: '5px' }} type="text" value={price}
                                        onChange={(e) => setPrice(e.target.value)} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" placeholder="شماره همراه مخاطب" />
                                </div>
                                <span className='text-red-500 relative text-sm'>{priceError ? priceErrorMsg : ""}</span>
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

                            {/*  address */}
                            <div className="flex flex-col mb-4">
                                <label htmlFor="address" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">آدرس </label>
                                <div className="relative">
                                    <div className="inline-flex items-center justify-center absolute left-0 h-full w-10 text-gray-400" style={{ bottom: "52px" }}>
                                        <PiMapPinLight className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <textarea style={{ borderRadius: '5px', resize: 'none' }} type="text" value={address}
                                        onChange={(e) => setAddress(e.target.value)} className="text-sm sm:text-base placeholder-gray-400 pl-10 pr-4 rounded-lg border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-800" placeholder="آدرس "></textarea>
                                </div>
                                <span className='text-red-500 relative text-sm'>{addressError ? addressErrorMsg : ""}</span>

                            </div>

                        </div>
                        <div className="mt-2"><button type="submit" className="btn bg-blue-800 hover:bg-blue-900 text-white float-right px-8">ویرایش آگهی </button></div>
                    </form>
                </div>


            </TitleCard >
        </>
    )
}


export default UpdateAds