const { StatusCodes } = require('http-status-codes');
const House = require("../../models/House")
const User = require("../../models/User")
const Booking = require("../../models/Booking")
const Owner = require("../../models/Owner")
const Food = require("../../models/Food")
const Bus = require("../../models/Bus")
const OrderFood = require("../../models/OrderFood")
const BusTicket = require("../../models/BusTicket");
const UserNotification = require("../../models/UserNotification");
const UserSupportTicket = require("../../models/UserSupportTicket");

// const calculateBookignHousePrice = (housePrice, guestsCount, checkInDate, checkOutDate) => {
//     //    return housePrice * guestsCount * 
//     let checkInMounth = checkInDate.split('-')[1]
//     let checkOutMounth = checkOutDate.split('-')[1]
//     let checkInDay = checkInDate.split('-')[2]
//     let checkOutDay = checkOutDate.split('-')[2]
//     let daysDiffer = 0


//     if(checkOutMounth === checkInMounth){
//         daysDiffer = checkOutDay - checkInDay
//     }else if(checkOutMounth > checkInMounth){
//         daysDiffer = checkOutDay - checkInDay

//     }
// }

const determineSeatNumbers = (pL, capacity, seats) => {
    subtrack = capacity - seats
    let seatNums = []

    for (let i = 0; i < pL; i++) {
        seatNums.push((i + 1) + subtrack)
    }

    return seatNums;
}


exports.getMe = async (req, res) => {
    try {
        let user = await User.findById(req.user._id).select('-password')
        if (user) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "کاربر پیدا شد",
                user: user
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "کاربر پیدا نشد"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// ********************* profile *********************
// # description -> HTTP VERB -> Accesss
// # update user profile -> PUT -> user
exports.updateProfile = async (req, res) => {
    try {

        console.log(req.body);

        await User.findByIdAndUpdate(
            req.user._id,
            {
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                username: req.body.username,
                nationalCode: req.body.nationalCode,
                province: req.body.province,
                city: req.body.city,
                gender: req.body.gender,
            },
            { new: true }
        ).then((user) => {
            if (user) {
                res.status(StatusCodes.OK).json({
                    msg: 'کاربر ویرایش شد',
                    user,
                })
            }
        }).catch((error) => {
            console.log(error);
            res.status(StatusCodes.BAD_REQUEST).json({
                msg: "پروفایل ویرایش نشد",
                error: error
            })
        })
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "خطای داخلی سرور",
            error: error
        })
    }
}

// # description -> HTTP VERB -> Accesss
// # update user avatar -> PUT -> user
exports.updateAvatar = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            {
                avatar: req.file.filename,
            },
            { new: true }
        ).then((user) => {
            if (user) {
                res.status(StatusCodes.OK).json({
                    msg: 'آواتار کاربر ویرایش شد',
                    user,
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(StatusCodes.BAD_REQUEST).json({
                msg: 'آواتار کاربر ویرایش نشد',
                err,
            })
        })
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            msg: "خطای داخلی سرور",
            error: error
        })
    }
}

// ********************* houses *********************

// # description -> HTTP VERB -> Accesss -> Access Type
// # user get houses -> GET -> USER -> PRIVATE
// @route = /api/users/houses
exports.getHouses = async (req, res) => {
    try {
        let houses = await House.find({ isActive: true, isAvailable: true }).populate('owner')
        if (houses.length > 0) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "خانه ها پیدا شدند",
                count: houses.length,
                houses: houses
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "خانه ها پیدا نشدند"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # user get single house -> GET -> USER -> PRIVATE
// @route = /api/users/houses/:houseId
exports.getHouse = async (req, res) => {
    try {
        let house = await House.findById(req.params.houseId)

        if (house && house.isActive) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "خانه پیدا شد",
                house: house
            })
        } else {
            return res.status(400).json({
                status: 'failure',
                msg: "خانه پیدا نشد"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # user search houses -> POST -> USER -> PRIVATE
// @route = /api/users/houses/search-houses
exports.searchHouses = async (req, res) => {
    try {

        let houses = await House.find({ city: req.body.city, isActive: true })
        if (houses && houses.length > 0) {
            res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "اقامتگاه هاپیدا شد",
                count: houses.length,
                houses: houses
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "اقامتگاهی یافت نشد",
            });
        }

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # get favorites houses -> GET -> USER -> PRIVATE
// @route = /api/users/houses/favorite-houses
exports.getFavoriteHouses = async (req, res) => {
    try {
        let user = await User.findById(req.user._id).select('-password')

        if (user.favoriteHouses && user.favoriteHouses.length > 0) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "خانه ها پیدا شدند",
                count: user.favoriteHouses.length,
                houses: user.favoriteHouses
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "خانه ای به لیست مورد علاقه شما افزوده نشده است"
            })
        }
    } catch (error) {
        console.error(error);
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # get single favorite house -> GET -> USER -> PRIVATE
// @route = /api/users/houses/favorite-houses/:houseId
exports.getFavoriteHouse = async (req, res) => {
    try {
        let user = await User.findById(req.user._id).populate('favoriteHouses')
        if (user.favoriteHouses.length > 0) {
            let house = user.favoriteHouses.find(f => f._id == req.params.houseId)

            if (house) {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "خانه پیدا شد",
                    house
                })
            } else {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "خانه پیدا نشد",
                })
            }

        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "خانه پیدا نشد"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # add house to favorites list -> PUT -> USER -> PRIVATE
// @route = /api/users/houses/add-favorite-house
exports.addFavoriteHouse = async (req, res) => {
    try {

        let user = await User.findById({ _id: req.user._id }).select('-password')

        if (user) {
            if (!user.favoriteHouses.includes(req.body.house)) {
                user.favoriteHouses.push(req.body.house)
            }

            else if (user.favoriteHouses.includes(req.body.house)) {
                user.favoriteHouses = user.favoriteHouses.filter((item) => item != req.body.house)
            }

            let newUser = await user.save()

            if (newUser) {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "خانه به لیست مورد علاقه اضافه شد",
                    newUser
                });
            }


        }


    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # delete house from favorites list -> DELETE -> USER -> PRIVATE
// @route = /api/users/houses/delete-favorite-house
exports.deleteFavoriteHouse = async (req, res) => {
    try {
        let user = await User.findById(req.user._id).populate('favoriteHouses')
        if (user.favoriteHouses.length > 0) {
            let filterHouses = user.favoriteHouses.filter(f => f._id != req.params.houseId)
            user.favoriteHouses = filterHouses

            let newUser = await user.save()

            if (newUser) {
                res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "خانه حذف شد",
                    newUser
                });
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "خانه حذف نشد",
                });
            }
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "خانه ها حذف نشد"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # booking house -> POST -> USER -> PRIVATE
// @route = /api/users/houses/book-house
exports.bookHouse = async (req, res) => {

    try {
        let house = await House.findOne({ _id: req.body.house })
        let checkInMounth = new Date(req.body.checkIn).toLocaleDateString().split('/')[0]
        let checkOutMounth = new Date(req.body.checkOut).toLocaleDateString().split('/')[0]

        let checkInDay = new Date(req.body.checkIn).toLocaleDateString().split('/')[1]
        let checkOutDay = new Date(req.body.checkOut).toLocaleDateString().split('/')[1]

        let differ = checkOutMounth - checkInMounth

        let countDays = 0;




        // function compare() {
        //     if (1 <= checkOutMounth <= 6) {
        //         return 31;
        //     } else if (1 <= checkOutMounth <= 11) {
        //         return 30;
        //     } else {
        //         return 29;
        //     }
        // }

        // let base = compare()
        // console.log(base);

        // if (checkInMounth == checkOutMounth) {
        //     countDays = checkOutDay - checkInDay
        // } else if (checkOutMounth > checkInMounth) {
        //     let base = compare()
        //     console.log(base);
        // }


        if (!house || !house.isActive || !house.isAvailable) {
            res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "اقامتگاه پیدا نشد",
            });
        }
        else {
            // let totalBookingHousePrice = calculateBookignHousePrice(house.price, req.body.guests, req.body.checkIn, req.body.checkOut)

            let newBooking = await Booking.create({
                user: req.user._id,
                owner: house.owner,
                house: house._id,
                // price: Number(house.price) * Number(req.body.guests) * Number(checkOutMounth > checkInMounth ? (checkOutDay > checkInDay ?  (checkOutDay - checkInDay  + 30) : (((checkOutDay - checkInDay) * (-1))  + 30)) : (checkOutMounth == checkInMounth ? (1) : ((checkOutDay - checkInDay)))),
                // price: Number(house.price),
                price: Number(house.price) * Number(req.body.guests) * Number(checkOutDay - checkInDay),
                checkIn: req.body.checkIn,
                checkOut: req.body.checkOut,
                guests: req.body.guests,
            })

            if (newBooking) {
                house.isAvailable = false
                await house.save().then((data) => {
                    res.status(StatusCodes.CREATED).json({
                        status: 'success',
                        msg: "اقامتگاه رزرو شد",
                        booking: newBooking,
                        house: house
                    });
                })
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "اقامتگاه رزرو نشد",
                });
            }
        }


    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # get user booking houses -> GET -> USER -> PRIVATE
// @route = /api/users/houses/bookings
exports.houseBookings = async (req, res) => {
    try {
        let bookings = await Booking.find({ user: req.user._id }).populate("owner house")

        if (bookings) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "رزروها پیدا شدند",
                count: bookings.length,
                bookings: bookings
            })
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "رزروها پیدا نشدند"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # get user booking houses -> GET -> USER -> PRIVATE
// @route = /api/users/houses/bookings/:bookingId
exports.houseBooking = async (req, res) => {
    try {
        let booking = await Booking.findOne({ user: req.user._id, _id: req.params.bookingId }).populate("owner house")

        if (booking) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "رزرو پیدا شد",
                booking: booking
            })
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "رزرو پیدا نشد"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # confirm booking house -> PUT -> USER -> PRIVATE
// @route = /api/users/houses/bookings/:bookingId/confirm-booking
exports.confirmHouseBooking = async (req, res) => {
    try {
        let bookings = await Booking.find({ user: req.user._id })
        let findBooking = bookings.find(booking => booking._id == req.params.bookingId)

        if (findBooking) {
            findBooking.isConfirmed = true
            await findBooking.save().then((booking) => {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "رزرو تایید شد",
                    booking: booking
                })
            }).catch(() => {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "رزرو تایید نشد",
                })
            })

        } else {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "رزرو پیدا نشد"
            })
        }


    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # cancel booking house -> PUT -> USER -> PRIVATE
// @route = /api/users/houses/bookings/:bookingId/cancel-booking
exports.cancelHouseBooking = async (req, res) => {
    try {
        let bookings = await Booking.find({ user: req.user._id })
        let findBooking = bookings.find(booking => booking._id == req.params.bookingId)

        if (findBooking) {
            findBooking.isConfirmed = false
            await findBooking.save().then((booking) => {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "رزرو لغو شد",
                    booking: booking
                })
            }).catch(() => {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "رزرو لغو نشد",
                })
            })

        } else {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "رزرو پیدا نشد"
            })
        }


    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # add review to house -> PUT -> User -> PRIVATE
// @route = /api/users/houses/:houseId/add-review
exports.addReviewToHouse = async (req, res) => {
    try {
        let review = {
            user: req.user._id,
            name: req.body.name,
            comment: req.body.comment,
            rating: req.body.rating,
        }

        let house = await House.findByIdAndUpdate(req.params.houseId, {
            $push: {
                reviews: review
            }
        }, { new: true })

        if (house) {
            res.status(StatusCodes.OK).json({
                status: 'success',
                msg: 'نظر افزوده شد',
                house,
            })
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                msg: 'نظر افزوده نشد',
            })
        }


    } catch (error) {
        console.error(error);
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}


// ********************* foods *********************
// # description -> HTTP VERB -> Accesss -> Access Type
// # get all foods -> GET -> User -> PRIVATE
// @route = /api/users/foods
exports.getFoods = async (req, res) => {
    try {
        let foods = await Food.find({ isActive: true, isAvailable: true })

        if (foods && foods.length > 0) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "غذاها پیدا شدند",
                count: foods.length,
                foods: foods
            })
        } else {
            return res.status(400).json({
                status: 'failure',
                msg: "غذاها پیدا نشدند"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # get single food -> GET -> User -> PRIVATE
// @route = /api/users/foods/:foodId
exports.getFood = async (req, res) => {
    try {
        let food = await Food.findById({ _id: req.params.foodId, isActive: true, isAvailable: true })

        if (food) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "غذا پیدا شد",
                food: food
            })
        } else {
            return res.status(400).json({
                status: 'failure',
                msg: "غذا پیدا نشد"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # add house to favorites list -> PUT -> USER -> PRIVATE
// @route = /api/users/foods/add-favorite-food
exports.addFavoriteFood = async (req, res) => {
    try {

        let user = await User.findById({ _id: req.user._id }).select('-password')

        if (user) {
            if (!user.favoriteFoods.includes(req.body.food)) {
                user.favoriteFoods.push(req.body.food)
            }

            else if (user.favoriteFoods.includes(req.body.food)) {
                user.favoriteFoods = user.favoriteFoods.filter((item) => item != req.body.food)
            }

            let newUser = await user.save()

            if (newUser) {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "غذا به لیست مورد علاقه اضافه شد",
                    newUser
                });
            }


        }


    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # order food -> POST -> USER -> PRIVATE
// @route = /api/users/foods/order-food
exports.orderFood = async (req, res) => {
    try {

        let totalPrice = 0;
        let foodItems = req.body.foodItems


        for (let i = 0; i < foodItems.length; i++) {
            let findFood = await Food.findOne({ _id: foodItems[i].food }).populate('chef')
            foodItems[i].price = findFood.price
            totalPrice += findFood.price
        }

        let newOrderFood = await OrderFood.create({
            chef:req.body.chef,
            user: req.user._id,
            address: req.body.address,
            foodItems,
            totalPrice,
            lat:req.body.lat,
            lng:req.body.lng,
        })

        if (newOrderFood) {
            res.status(StatusCodes.CREATED).json({
                status: 'success',
                msg: "سفارش غذا ثبت شد",
                order: newOrderFood
            });
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "سفارش غذا ثبت نشد",
            });
        }


    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # search foods -> GET -> USER -> PRIVATE
// @route = /api/users/foods/search-foods
exports.searchFoods = async (req, res) => {
    try {
        let foods = await Food.find({ name: req.body.name, isActive: true, isAvailable: true })
        if (foods.length > 0) {
            res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "غذاها پیدا شدند",
                count: foods.length,
                foods: foods
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "غذا یافت نشدند",
            });
        }

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # delete food from favorites list -> DELETE -> USER -> PRIVATE
// @route = /api/users/foods/delete-favorite-food/:foodId
exports.deleteFavoriteFood = async (req, res) => {

    try {
        let user = await User.findById(req.user._id).populate('favoriteFoods')
        if (user.favoriteFoods.length > 0) {
            let filterFoods = user.favoriteFoods.filter(f => f._id != req.params.foodId)
            user.favoriteFoods = filterFoods

            let newUser = await user.save()

            if (newUser) {
                res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "غذا حذف شد",
                    newUser
                });
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "غذا حذف نشد",
                });
            }
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "غذا ها حذف نشد"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # get all food orders -> GET -> USER -> PRIVATE
// @route = /api/users/foods/orders
exports.getAllOrderFoods = async (req, res) => {
    try {
        let orderFoods = await OrderFood.find({ user: req.user._id })

        if (orderFoods) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: " سفارش های غذا پیدا شدند",
                count: orderFoods.length,
                orderFoods: orderFoods
            })
        } else {
            return res.status(400).json({
                status: 'failure',
                msg: " سفارش های غذا پیدا نشدند"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # get single food order -> GET -> USER -> PRIVATE
// @route = /api/users/foods/orders/:orderId
exports.getSingleOrderFood = async (req, res) => {
    try {
        let orderFood = await OrderFood.findOne({ user: req.user._id, _id: req.params.orderId })

        if (orderFood) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: " سفارش غذا پیدا شد",
                orderFood: orderFood
            })
        } else {
            return res.status(400).json({
                status: 'failure',
                msg: " سفارش غذا پیدا نشد"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # confirm order food -> PUT -> USER -> PRIVATE
// @route = /api/users/foods/orders/:orderId/confirm
exports.confirmOrderFood = async (req, res) => {
    try {

        await OrderFood.findByIdAndUpdate(req.params.orderId, { orderStatus: 'Confirmed' }, { new: true }).then((order) => {
            if (order) {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "سفارش غذا تایید شد",
                    order
                })
            } else {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "سفارش غذا تایید نشد"
                })
            }
        })
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # cancel order food -> PUT -> USER -> PRIVATE
// @route = /api/users/foods/orders/:orderId/cancel
exports.cancelOrderFood = async (req, res) => {
    try {

        await OrderFood.findByIdAndUpdate(req.params.orderId, { orderStatus: 'Cancelled' }, { new: true }).then((order) => {
            if (order) {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "سفارش غذا لغو شد",
                    order
                })
            } else {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "سفارش غذا لغو نشد"
                })
            }
        })
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}


// ********************* buses *********************
// # description -> HTTP VERB -> Accesss -> Access Type
// # get all active and available buses -> GET -> USER -> PUBLIC
// @route = /api/users/buses
exports.getBuses = async (req, res) => {
    try {
        let buses = await Bus.find({ isActive: true, isAvailable: true })

        if (buses) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "اتوبوس ها پیدا شدند",
                count: buses.length,
                buses: buses
            })
        } else {
            return res.status(400).json({
                status: 'failure',
                msg: "اتوبوس ها پیدا نشدند"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # get single active and available bus -> GET -> USER -> PUBLIC
// @route = /api/users/buses/:busId
exports.getBus = async (req, res) => {
    try {
        let bus = await Bus.findOne({ _id: req.params.busId, isActive: true, isAvailable: true })

        if (bus) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "اتوبوس پیدا شد",
                bus: bus
            })
        } else {
            return res.status(400).json({
                status: 'failure',
                msg: "اتوبوس پیدا نشد"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}


// # description -> HTTP VERB -> Accesss -> Access Type
// # add bus to favorites list -> PUT -> USER -> PRIVATE
// @route = /api/users/buses/add-favorite-bus
exports.addFavoriteBus = async (req, res) => {
    try {
        let user = await User.findById({ _id: req.user._id }).select('-password')
        if (user && req.body.bus) {
            if (!user.favoriteBuses.includes(req.body.bus)) {
                user.favoriteBuses.push(req.body.bus)
                let newUser = await user.save()

                if (newUser) {
                    return res.status(StatusCodes.OK).json({
                        status: 'success',
                        msg: "اتوبوس به لیست مورد علاقه اضافه شد",
                        newUser
                    });
                }
            } else {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "اتوبوس در لیست مورد علاقه وجود دارد. نمیتوانید دوباره آن را اضافه کنید!!!",
                });
            }
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "اتوبوس به لیست مورد علاقه اضافه نشد",
            });
        }


    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # delete bus from favorites list -> PUT -> USER -> PRIVATE
// @route = /api/users/buses/delete-favorite-bus/:busId
exports.deleteFavoriteBus = async (req, res) => {

    try {
        let user = await User.findById(req.user._id).populate('favoriteBuses')
        if (user.favoriteBuses.length > 0) {
            let filterBuses = user.favoriteBuses.filter(f => f._id != req.params.busId)
            user.favoriteBuses = filterBuses

            let newUser = await user.save()

            if (newUser) {
                res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "اتوبوس حذف شد",
                    newUser
                });
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "اتوبوس حذف نشد",
                });
            }
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "اتوبوس ها حذف نشد"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # search buses -> POST -> USER -> PUBLIC
// @route = /api/users/buses/search-buses
exports.searchBuses = async (req, res) => {
    try {

        let buses = await Bus.find({ name: req.body.bus, isActive: true })
        if (buses.length > 0) {
            res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "اتوبوس هاپیدا شد",
                count: buses.length,
                buses: buses
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "اتوبوسی یافت نشد",
            });
        }

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # search available bus tickets -> POST -> USER -> PUBLIC
// @route = /api/users/buses/search-one-side-bus-tickets
exports.searchOneSideBusTickes = async (req, res) => {
    try {

        let buses = await Bus.find({ isActive: true, isAvailable: true }).populate('driver').select('-password')

        let userFirstCity = req.body.firstCity
        let userLastCity = req.body.lastCity
        let userCount = req.body.count
        let userMovingDate = req.body.movingDate
        let userReturningDate = req.body.returningDate


        let results = []


        buses.forEach((bus) => {
            if (bus.driver.firstCity === userFirstCity && bus.driver.lastCity === userLastCity) {
                if (bus.seats >= userCount) {
                    if (bus.driver.movingDate.toLocaleDateString().split('/')[1] == userMovingDate.split('-')[2]) {
                        results.push(bus)
                    }
                }
            }
        })


        if (results.length > 0) {
            res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "بلیط های اتوبوس پیدا شدند",
                count: results.length,
                buses: results
            })
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "بلیط های اتوبوس پیدا نشدند",
            })
        }


    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # search available bus tickets -> POST -> USER -> PUBLIC
// @route = /api/users/buses/search-two-side-bus-tickets
exports.searchTwoSideBusTickes = async (req, res) => {
    try {

        let buses = await Bus.find({ isActive: true, isAvailable: true }).populate('driver').select('-password')

        let userFirstCity = req.body.firstCity
        let userLastCity = req.body.lastCity
        let userCount = req.body.count
        let userMovingDate = req.body.movingDate
        let userReturningDate = req.body.returningDate


        let results = []


        buses.forEach((bus) => {
            if (bus.driver.firstCity === userFirstCity && bus.driver.lastCity === userLastCity) {
                if (bus.seats >= userCount) {
                    if (bus.driver.movingDate.toLocaleDateString().split('/')[1] == userMovingDate.split('-')[2]) {
                        if (bus.driver.returningDate.toLocaleDateString().split('/')[1] == userReturningDate.split('-')[2]) {
                            results.push(bus)

                        }
                    }
                }
            }
        })


        if (results.length > 0) {
            res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "بلیط های اتوبوس پیدا شدند",
                count: results.length,
                buses: results
            })
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "بلیط های اتوبوس پیدا نشدند",
            })
        }


    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # search buses -> POST -> USER -> PUBLIC
// @route = /api/users/buses/search-buses
exports.bookBus = async (req, res) => {
    try {

        let ticketType = req.body.ticketType
        let passengers = req.body.passengers

        // user bus tickets
        let busTickets = await BusTicket.find({ user: req.user._id })
        // all active and available buses
        let buses = await Bus.find({ isActive: true, isAvailable: true }).populate('driver')
        let userMovingDate = req.body.movingDate
        let userReturningDate = req.body.returningDate
        let count = req.body.count
        let userFirstCity = req.body.firstCity
        let userLastCity = req.body.lastCity
        let userStartHour = req.body.startHour
        let userEndHour = req.body.endHour
        let userStartMin = req.body.startMin
        let userEndMin = req.body.endMin
        let userBus = req.body.bus

        let validTickets = []


        // res.json({
        //     startHour:userStartHour,
        //     endHour:userEndHour,
        //     startMin:userStartMin,
        //     endMin:userEndMin,
        // })

        if (busTickets && busTickets.length > 0) {
            // *** run bus expiretion date validation ***
            const now = new Date();
            // Update each ticket's validity based on expirationDate
            for (const ticket of busTickets) {
                if (ticket.movingDate < now) {

                    // If the expiration date has passed, mark the ticket as invalid
                    ticket.isValid = false;
                    ticket.isExpired = true;
                    await ticket.save();
                }
            }


            for (const ticket of busTickets) {
                if (ticket.isValid && !ticket.isExpired) {
                    validTickets.push(ticket)
                }
            }

            //    if user has valid ticket, ticket must not registered, otherwise ticket ti can registered
            if (validTickets && validTickets.length > 0) {
                res.status(StatusCodes.BAD_REQUEST).json(
                    {
                        status: 'failure',
                        msg: "شما نمیتوانید بلیط بگیرید. هنوز بلیط های قبلی شما منقضی نشده اند",
                    }
                )
            } else {
                // if user has no valid tickets they can take ticket
                if (ticketType === "oneSide") {
                    // *** run one side algorithm ***
                    let bus = await Bus.findOne({ _id: userBus, isActive: true, isAvailable: true }).populate('driver')
                    if (bus) {
                        // #1 first of all check if user first city is the same with the driver first city
                        // #2  check if user last city is the same with the driver last city
                        if (userFirstCity === bus.driver.firstCity && userLastCity === bus.driver.lastCity && count <= bus.seats && bus.driver.movingDate.toLocaleDateString().split('/')[1] == userMovingDate.split('-')[2]) {
                            let ticketStartHour = new Date();
                            ticketStartHour.setHours(userStartHour)
                            ticketStartHour.setMinutes(userStartMin)

                            let ticketEndHour = new Date();
                            ticketEndHour.setHours(userEndHour)
                            ticketStartHour.setMinutes(userEndMin)

                            let newBusTicket = await BusTicket.create({
                                bus: req.body.bus,
                                user: req.user._id,
                                driver: bus.driver,
                                passengers: req.body.passengers,
                                firstCity: req.body.firstCity,
                                lastCity: req.body.lastCity,
                                movingDate: req.body.movingDate,
                                // returningDate: req.body.returningDate,
                                startHour: ticketStartHour,
                                endHour: ticketEndHour,
                                ticketPrice: Number(Object.keys(passengers).length) * Number(bus.price),
                                seatNumbers: determineSeatNumbers(req.body.passengers.length, bus.capacity, bus.seats),
                                ticketType,
                                count: req.body.count
                            })

                            bus.seats -= Number(req.body.passengers.length)

                            if (bus.seats === 0) {
                                bus.isAvailable = false
                                await bus.save()
                                if (newBusTicket) {
                                    await bus.save()

                                    console.log("notification and sms send for user and driver");

                                    res.status(StatusCodes.CREATED).json({
                                        status: 'success',
                                        msg: "بلیط اتوبوس صادر شد",
                                        ticket: newBusTicket,
                                    })

                                }
                            } else {
                                await bus.save()
                                if (newBusTicket) {
                                    await bus.save()

                                    console.log("notification and sms send for user and driver");

                                    res.status(StatusCodes.CREATED).json({
                                        status: 'success',
                                        msg: "بلیط اتوبوس صادر شد",
                                        ticket: newBusTicket,
                                    })

                                }
                            }
                        } else {
                            res.status(StatusCodes.NOT_FOUND).json({
                                msg: "بلیط اتوبوس صادر نشد",
                            })
                        }

                    } else {
                        res.status(StatusCodes.NOT_FOUND).json({
                            msg: "اتوبوس پیدا نشد",
                        })
                    }


                } else if (ticketType === "twoSide") {
                    // run two side algorithm
                    let bus = await Bus.findOne({ _id: userBus }).populate('driver')

                    if (bus) {
                        // #1 first of all check if user first city is the same with the driver first city
                        // #2  check if user last city is the same with the driver last city
                        if (userFirstCity === bus.driver.firstCity && userLastCity === bus.driver.lastCity && count <= bus.seats && bus.driver.movingDate.toLocaleDateString().split('/')[1] == userMovingDate.split('-')[2] && bus.driver.returningDate.toLocaleDateString().split('/')[1] == userReturningDate.split('-')[2]) {

                            let ticketStartHour = new Date();
                            ticketStartHour.setHours(userStartHour)
                            ticketStartHour.setMinutes(userStartMin)

                            let ticketEndHour = new Date();
                            ticketEndHour.setHours(userEndHour)
                            ticketStartHour.setMinutes(userEndMin)

                            let newBusTicket = await BusTicket.create({
                                bus: req.body.bus,
                                user: req.user._id,
                                driver: bus.driver,
                                passengers: req.body.passengers,
                                firstCity: req.body.firstCity,
                                lastCity: req.body.lastCity,
                                movingDate: req.body.movingDate,
                                returningDate: req.body.returningDate,
                                startHour: ticketStartHour,
                                endHour: ticketEndHour,
                                ticketPrice: Number(Object.keys(passengers).length) * Number(bus.price),
                                seatNumbers: determineSeatNumbers(req.body.passengers.length, bus.capacity, bus.seats),
                                ticketType,
                                count: req.body.count
                            })

                            bus.seats -= Number(req.body.passengers.length)

                            if (bus.seats === 0) {
                                bus.isAvailable = false
                                await bus.save()
                                if (newBusTicket) {
                                    await bus.save()

                                    console.log("notification and sms send for user and driver");

                                    res.status(StatusCodes.CREATED).json({
                                        status: 'success',
                                        msg: "بلیط اتوبوس صادر شد",
                                        ticket: newBusTicket,
                                    })

                                }
                            } else {
                                await bus.save()
                                if (newBusTicket) {
                                    await bus.save()

                                    console.log("notification and sms send for user and driver");

                                    res.status(StatusCodes.CREATED).json({
                                        status: 'success',
                                        msg: "بلیط اتوبوس صادر شد",
                                        ticket: newBusTicket,
                                    })

                                }
                            }
                        } else {
                            res.status(StatusCodes.NOT_FOUND).json({
                                msg: "بلیط اتوبوس صادر نشد ",
                            })
                        }

                    } else {
                        res.status(StatusCodes.NOT_FOUND).json({
                            msg: "اتوبوس پیدا نشد",
                        })
                    }
                }
            }



        } else {
            if (ticketType === "oneSide") {
                // *** run one side algorithm ***
                let bus = await Bus.findOne({ _id: userBus }).populate('driver')

                if (bus) {
                    // #1 first of all check if user first city is the same with the driver first city
                    // #2  check if user last city is the same with the driver last city
                    if (userFirstCity === bus.driver.firstCity && userLastCity === bus.driver.lastCity && count <= bus.seats && bus.driver.movingDate.toLocaleDateString().split('/')[1] == userMovingDate.split('-')[2]) {

                        let ticketStartHour = new Date();
                        ticketStartHour.setHours(userStartHour)
                        ticketStartHour.setMinutes(userStartMin)

                        let ticketEndHour = new Date();
                        ticketEndHour.setHours(userEndHour)
                        ticketStartHour.setMinutes(userEndMin)

                        let newBusTicket = await BusTicket.create({
                            bus: req.body.bus,
                            user: req.user._id,
                            driver: bus.driver,
                            passengers: req.body.passengers,
                            firstCity: req.body.firstCity,
                            lastCity: req.body.lastCity,
                            movingDate: req.body.movingDate,
                            // returningDate: req.body.returningDate,
                            startHour: ticketStartHour,
                            endHour: ticketEndHour,
                            ticketPrice: Number(Object.keys(passengers).length) * Number(bus.price),
                            seatNumbers: determineSeatNumbers(req.body.passengers.length, bus.capacity, bus.seats),
                            ticketType,
                            count: req.body.count
                        })

                        bus.seats -= Number(req.body.passengers.length)

                        if (bus.seats === 0) {
                            bus.isAvailable = false
                            await bus.save()
                            if (newBusTicket) {
                                await bus.save()

                                console.log("notification and sms send for user and driver");

                                res.status(StatusCodes.CREATED).json({
                                    status: 'success',
                                    msg: "بلیط اتوبوس صادر شد",
                                    ticket: newBusTicket,
                                })

                            }
                        } else {
                            await bus.save()
                            if (newBusTicket) {
                                await bus.save()

                                console.log("notification and sms send for user and driver");

                                res.status(StatusCodes.CREATED).json({
                                    status: 'success',
                                    msg: "بلیط اتوبوس صادر شد",
                                    ticket: newBusTicket,
                                })

                            }
                        }
                    } else {
                        res.status(StatusCodes.NOT_FOUND).json({
                            msg: "بلیط اتوبوس  صادر نشد",
                        })
                    }

                } else {
                    res.status(StatusCodes.NOT_FOUND).json({
                        msg: "اتوبوس پیدا نشد",
                    })
                }


            } else if (ticketType === "twoSide") {
                // *** run two side algorithm ***
                let bus = await Bus.findOne({ _id: userBus }).populate('driver')


                if (bus) {
                    // #1 first of all check if user first city is the same with the driver first city
                    // #2  check if user last city is the same with the driver last city
                    if (userFirstCity === bus.driver.firstCity && userLastCity === bus.driver.lastCity && count <= bus.seats && bus.driver.movingDate.toLocaleDateString().split('/')[1] == userMovingDate.split('-')[2] && bus.driver.returningDate.toLocaleDateString().split('/')[1] == userReturningDate.split('-')[2]) {

                        let ticketStartHour = new Date();
                        ticketStartHour.setHours(userStartHour)
                        ticketStartHour.setMinutes(userStartMin)

                        let ticketEndHour = new Date();
                        ticketEndHour.setHours(userEndHour)
                        ticketStartHour.setMinutes(userEndMin)

                        let newBusTicket = await BusTicket.create({
                            bus: req.body.bus,
                            user: req.user._id,
                            driver: bus.driver,
                            passengers: req.body.passengers,
                            firstCity: req.body.firstCity,
                            lastCity: req.body.lastCity,
                            movingDate: req.body.movingDate,
                            returningDate: req.body.returningDate,
                            startHour: ticketStartHour,
                            endHour: ticketEndHour,
                            ticketPrice: Number(Object.keys(passengers).length) * Number(bus.price),
                            seatNumbers: determineSeatNumbers(req.body.passengers.length, bus.capacity, bus.seats),
                            ticketType,
                            count: req.body.count
                        })

                        bus.seats -= Number(req.body.passengers.length)

                        if (bus.seats === 0) {
                            bus.isAvailable = false
                            await bus.save()
                            if (newBusTicket) {
                                await bus.save()

                                console.log("notification and sms send for user and driver");

                                res.status(StatusCodes.CREATED).json({
                                    status: 'success',
                                    msg: "بلیط اتوبوس صادر شد",
                                    ticket: newBusTicket,
                                })

                            }
                        } else {
                            await bus.save()
                            if (newBusTicket) {
                                await bus.save()

                                console.log("notification and sms send for user and driver");

                                res.status(StatusCodes.CREATED).json({
                                    status: 'success',
                                    msg: "بلیط اتوبوس صادر شد",
                                    ticket: newBusTicket,
                                })

                            }
                        }
                    } else {
                        res.status(StatusCodes.NOT_FOUND).json({
                            msg: "بلیط اتوبوس صادر نشد ",
                        })
                    }

                } else {
                    res.status(StatusCodes.NOT_FOUND).json({
                        msg: "اتوبوس پیدا نشد",
                    })
                }
            }

        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

exports.updateBusAfterArrived = async (req, res) => {
    res.send("updateBusAfterArrived")
}

exports.updateDriverAfterArrived = async (req, res) => {
    res.send("updateBusAfterArrived")
}

exports.updateUserAfterArrived = async (req, res) => {
    res.send("updateBusAfterArrived")
}

exports.updateTicketAfterArrived = async (req, res) => {
    res.send("updateBusAfterArrived")
}

exports.getAllBusTickets = async (req, res) => {
    try {
        let busTickets = await BusTicket.find({ user: req.user._id })
        if (busTickets && busTickets.length > 0) {
            res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "بلیط های اتوبوس پیدا شدند",
                count: busTickets.length,
                tickets: busTickets
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "بلیط های اتوبوس پیدا نشدند",
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

exports.getSingleBusTicket = async (req, res) => {
    try {
        let busTicket = await BusTicket.findById({ _id: req.params.ticketId })
        if (busTicket) {
            res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "بلیط اتوبوس پیدا شد",
                tickets: busTicket
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "بلیط اتوبوس پیدا نشد",
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

exports.confirmBusTicket = async (req, res) => {
    try {
        await BusTicket.findByIdAndUpdate(req.params.ticketId, { isCanceled: false, isConfirmed: true }, { new: true }).then((busTicket) => {
            if (busTicket) {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "بلیط اتوبوس تایید شد",
                    busTicket
                })
            } else {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "بلیط اتوبوس تایید نشد",
                })
            }
        })
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

exports.cancelBusTicket = async (req, res) => {
    try {
        await BusTicket.findByIdAndUpdate(req.params.ticketId, { isCanceled: true, isConfirmed: false }, { new: true }).then((busTicket) => {
            if (busTicket) {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "بلیط اتوبوس لغو شد",
                    busTicket
                })
            } else {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "بلیط اتوبوس لغو نشد",
                })
            }
        })
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}


// ********************* notifications *********************
// # description -> HTTP VERB -> Accesss -> Access Type
// # get all user notifications -> GET -> Driver -> PRIVATE
// @route = /api/users/notifications
exports.notifications = async (req, res) => {
    try {
        let notifications = await UserNotification.find({})
        let findUserNotifications = []

        for (let i = 0; i < notifications.length; i++) {
            if (JSON.stringify(notifications[i].reciever) == JSON.stringify(req.user._id)) {
                findUserNotifications.push(notifications[i])
            }
        }

        if (findUserNotifications && findUserNotifications.length > 0) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "اعلان ها پیدا شد",
                count: findUserNotifications.length,
                findUserNotifications
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "اعلان ها پیدا نشد"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}


// # description -> HTTP VERB -> Accesss -> Access Type
// # get single user notification -> GET -> User -> PRIVATE
// @route = /api/users/notifications/:ntfId
exports.notification = async (req, res) => {
    try {
        let notification = await UserNotification.findById(req.params.ntfId)
        if (notification) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "اعلان پیدا شد",
                notification
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "اعلان پیدا نشد"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # create notification for user -> POST -> User -> PRIVATE
// @route = /api/users/notifications
exports.createNotification = async (req, res) => {
    try {
        await UserNotification.create({
            title: req.body.title,
            message: req.body.message,
            reciever: req.body.reciever,
        }).then((data) => {
            res.status(StatusCodes.CREATED).json({
                status: 'success',
                msg: "اعلان ساخته شد",
                data
            })
        })
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

// # description -> HTTP VERB -> Accesss -> Access Type
// # mark user notification -> PUT -> User -> PRIVATE
// @route = /api/users/notifications/:ntfId/mark-notification
exports.markNotification = async (req, res) => {
    try {
        await UserNotification.findByIdAndUpdate(req.params.ntfId, { read: true }, { new: true }).then((nft) => {
            if (nft) {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "اعلان خوانده شد",
                    nft
                })
            } else {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "اعلان خوانده نشد"
                })
            }
        })

    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}



// ********************* support tickets *********************

// # description -> HTTP VERB -> Accesss -> Access Type
// # get all users support tickets -> GET -> user -> PRIVATE
// @route = /api/users/support-tickets
exports.supportTickets = async (req, res) => {
    try {
        let tickets = await UserSupportTicket.find({ user: req.user._id })
        if (tickets) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "تیکت های پشتیبانی پیدا شد",
                count: tickets.length,
                tickets
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "تیکت های پشتیبانی پیدا نشد"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}


// # description -> HTTP VERB -> Accesss -> Access Type
// # get single users support ticket -> GET -> user -> PRIVATE
// @route = /api/users/support-tickets/:stId
exports.supportTicket = async (req, res) => {
    try {
        let ticket = await UserSupportTicket.findById(req.params.stId)
        if (ticket) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "تیکت پشتیبانی پیدا شد",
                ticket
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "تیکت پشتیبانی پیدا نشد"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}


// # description -> HTTP VERB -> Accesss -> Access Type
// # create users support ticket -> POST -> user -> PRIVATE
// @route = /api/users/support-tickets
exports.createSupportTicket = async (req, res) => {
    try {
        await UserSupportTicket.create({
            title: req.body.title,
            description: req.body.description,
            user: req.user._id,
            assignedTo: req.user._id,
        }).then((data) => {
            res.status(StatusCodes.CREATED).json({
                status: 'success',
                msg: "تیکت پشتیبانی ساخته شد",
                data
            })
        })
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}


// # description -> HTTP VERB -> Accesss -> Access Type
// # read support ticket -> PUT -> user -> PRIVATE
// @route = /api/users/support-tickets/:stId/read
exports.readSupportTicket = async (req, res) => {
    try {
        await UserSupportTicket.findByIdAndUpdate(req.params.stId, {
            isRead: true
        }, { new: true }).then((ticket) => {
            if (ticket) {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "تیکت خوانده شد",
                    ticket
                })
            } else {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "تیکت خوانده نشد"
                })
            }
        })

    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}


// # description -> HTTP VERB -> Accesss -> Access Type
// # add comments to support ticket -> PUT -> User -> PRIVATE
// @route = /api/users/support-tickets/:stId/add-comment
exports.addCommentsToSupportTicket = async (req, res) => {
    try {
        let supportTicketFound = await UserSupportTicket.findById(req.params.stId)
        if (supportTicketFound) {
            let comments = {
                user: req.user._id,
                comment: req.body.comment
            }

            supportTicketFound.comments.push(comments)


            await supportTicketFound.save().then((ticket) => {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "پاسخ گویی به تیکت",
                    ticket
                })
            }).catch((error) => {
                console.log(error);
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "عدم پاسخ گویی به تیکت",
                    error
                })
            })
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "تیکت پیدا نشد"
            })
        }

    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}



// ********************* finance *********************
exports.finance = (req, res) => {
    res.send("user finance")
}



// ********************* owners *********************

exports.getOwners = async (req, res) => {
    try {
        let owners = await Owner.find({}).select('-password -phone -role')
        if (owners.length > 0) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "مالک ها پیدا شدند",
                count: owners.length,
                owners: owners
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "مالک ها پیدا نشدند"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}

exports.getOwner = async (req, res) => {
    try {
        let owner = await Owner.findById(req.params.ownerId).select('-password -phone -role')
        if (owner) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "مالک پیدا شد",
                owner: owner
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "مالک پیدا نشد"
            })
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'failure',
            msg: "خطای داخلی سرور",
            error
        });
    }
}


