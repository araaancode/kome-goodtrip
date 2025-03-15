import React from "react";
import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 rtl">
            <div className="text-center p-6 bg-white rounded-2xl">
                <img  src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?uid=R156737658&ga=GA1.1.972404931.1740587830&semt=ais_hybrid" alt="Not Found" className="mx-auto mb-4 w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[400px]" />
                <h1 className="text-6xl font-bold text-blue-600">404</h1>
                <p className="text-xl text-gray-700 mt-4">صفحه مورد نظر یافت نشد</p>
                <p className="text-gray-500 mt-2">متاسفیم، اما صفحه‌ای که به دنبال آن هستید وجود ندارد.</p>
                <Link to="/" className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    بازگشت به صفحه اصلی
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
