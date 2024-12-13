const { StatusCodes } = require('http-status-codes');
const CookNotification = require("../../models/CookNotification")
const Cook = require("../../models/Cook")
const CookAds = require("../../models/CookAds");
const CookSupportTicket = require('../../models/CookSupportTicket');
const Food = require('../../models/Food');
const OrderFood = require('../../models/OrderFood');

// # description -> HTTP VERB -> Accesss -> Access Type
// # cook get profile -> GET -> Cook -> PRIVATE
// @route = /api/cooks/me
exports.getMe = async (req, res) => {
    try {
        let cook = await Cook.findById(req.cook.id).select('-password')
        if (cook) {
            res.status(StatusCodes.OK).json({
                status: 'success',
                msg: 'غذادار پیدا شد',
                cook,
            })
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: 'غذادار پیدا نشد',

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
// # cook update profile -> PUT -> Cook -> PRIVATE
// @route = /api/cooks/update-profile
exports.updateProfile = async (req, res) => {
    try {
        let cook = await Cook.findByIdAndUpdate(req.cook._id, {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            username: req.body.username,
            nationalCode: req.body.nationalCode,
            province: req.body.province,
            city: req.body.city,
            gender: req.body.gender,
        }, { new: true })

        if (cook) {
            res.status(StatusCodes.OK).json({
                status: 'success',
                msg: 'اطلاعات غذادار ویرایش شد',
                name: cook.name,
                phone: cook.phone,
                email: cook.email,
                username: cook.username,
                nationalCode: cook.nationalCode,
                province: cook.province,
                city: cook.city,
                gender: cook.gender,
            })
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: 'اطلاعات غذادار ویرایش نشد',
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

// *** cooks apis ***
// # description -> HTTP VERB -> Accesss -> Access Type
// # cook update avatar -> PUT -> Cook -> PRIVATE
// @route = /api/cooks/update-avatar
exports.updateAvatar = async (req, res) => {

    try {
        await Cook.findByIdAndUpdate(
            req.cook._id,
            {
                avatar: req.file.filename,
            },
            { new: true }
        ).then((cook) => {
            if (cook) {
                res.status(StatusCodes.OK).json({
                    msg: 'آواتار غذادار ویرایش شد',
                    name: cook.name,
                    phone: cook.phone,
                    email: cook.email,
                    username: cook.username,
                    nationalCode: cook.nationalCode,
                    province: cook.province,
                    city: cook.city,
                    gender: cook.gender,
                    avatar: cook.avatar,
                })
            }
        }).catch(err => {
            console.log(err)
            res.status(StatusCodes.BAD_REQUEST).json({
                msg: 'آواتار غذادار ویرایش نشد',
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



// # description -> HTTP VERB -> Accesss -> Access Type
// # get  owner notifications -> GET -> Cook -> PRIVATE
// @route = /api/cooks/notifications
exports.notifications = async (req, res) => {
    try {
        let notifications = await CookNotification.find({ reciever: req.cook._id })
        // let findCookNotifications = []

        // for (let i = 0; i < notifications.length; i++) {
        //     if (JSON.stringify(notifications[i].reciever) == JSON.stringify(req.cook._id)) {
        //         findCookNotifications.push(notifications[i])
        //     }
        // }

        if (notifications && notifications.length > 0) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "اعلان ها پیدا شدند",
                count: notifications.length,
                notifications
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "اعلان ها پیدا نشدند"
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
// # get single cook notification -> GET -> Cook -> PRIVATE
// @route = /api/cooks/notifications/:ntfId
exports.notification = async (req, res) => {
    try {
        let notification = await CookNotification.findById(req.params.ntfId)
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
// # create notification for cook -> POST -> Cook -> PRIVATE
// @route = /api/cooks/notifications
exports.createNotification = async (req, res) => {
    try {
        await CookNotification.create({
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
// # mark cook notification -> GET -> cook -> PRIVATE
// @route = /api/cooks/notifications/:ntfId/mark-notification
exports.markNotification = async (req, res) => {
    try {
        await CookNotification.findByIdAndUpdate(req.params.ntfId, { read: true }, { new: true }).then((nft) => {
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


// # description -> HTTP VERB -> Accesss -> Access Type
// # get all cooks ads -> GET -> Cook -> PRIVATE
// @route = /api/cooks/ads
exports.allAds = async (req, res) => {
    try {
        let ads = await CookAds.find({ cook: req.cook._id }).populate('cook').select('-password')
        if (ads && ads.length > 0) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "آگهی ها پیدا شد",
                count: ads.length,
                ads
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "آگهی ها پیدا نشد"
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
// # get single cook ads -> GET -> A -> PRIVATE
// @route = /api/cooks/notifications/:adsId
exports.singleAds = async (req, res) => {
    try {
        let ads = await CookAds.findById(req.params.adsId)
        if (ads) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "آگهی پیدا شد",
                ads
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "آگهی پیدا نشد"
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
// # get create cook ads -> POST -> Cook -> PRIVATE
// @route = /api/cooks/ads
exports.createAds = async (req, res) => {
    var photos = [];
    if (req.files.photos) {
        req.files.photos.forEach((element) => {
            photos.push(element.filename);
        });
    }

    try {
        await CookAds.create({
            cook: req.cook._id,
            company: "6702a7927bfdbe2dde087edd",
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            photo: req.files.photo[0].filename,
            photos,
        }).then((data) => {
            res.status(StatusCodes.CREATED).json({
                status: 'success',
                msg: "آگهی ساخته شد",
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
// # update cook ads -> PUT -> Cook -> PRIVATE
// @route = /api/cooks/ads/:adsId/update-ads
exports.updateAds = async (req, res) => {
    try {
        await CookAds.findByIdAndUpdate(req.params.adsId, {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
        }, { new: true }).then((ads) => {
            if (ads) {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "آگهی ویرایش شد",
                    ads
                })
            } else {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "آگهی ویرایش نشد"
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
// # update cook ads photo -> PUT -> Cook -> PRIVATE
// @route = /api/cooks/ads/:adsId/update-photo
exports.updateAdsPhoto = async (req, res) => {
    try {
        await CookAds.findByIdAndUpdate(req.params.adsId, {
            photo: req.file.filename,
        }).then((ads) => {
            if (ads) {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "تصویر اصلی آگهی ویرایش شد",
                    ads
                })
            } else {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "تصویر اصلی آگهی ویرایش نشد",
                })
            }
        });
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
// # update cook ads photos -> PUT -> Cook -> PRIVATE
// @route = /api/cooks/ads/:adsId/update-photos
exports.updateAdsPhotos = async (req, res) => {
    try {
        await CookAds.findByIdAndUpdate(req.params.adsId, {
            photos: req.file.filename,
        }).then((ads) => {
            if (ads) {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "تصاویر آگهی ویرایش شدند",
                    ads
                })
            } else {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "تصاویر آگهی ویرایش نشدند",
                })
            }
        });
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
// # delete cook ads -> DELETE -> Cook -> PRIVATE
// @route = /api/cooks/ads/:adsId
exports.deleteAds = async (req, res) => {
    try {
        await CookAds.findByIdAndDelete(req.params.adsId).then((ads) => {
            if (ads) {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "آگهی حذف شد",
                    ads
                })
            } else {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "آگهی حذف نشد"
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
// # get all cooks support tickets -> GET -> Cook -> PRIVATE
// @route = /api/cooks/support-tickets
exports.supportTickets = async (req, res) => {
    try {
        let tickets = await CookSupportTicket.find({ cook: req.cook._id })
        if (tickets && tickets.length) {
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
// # get single cooks support ticket -> GET -> Cook -> PRIVATE
// @route = /api/cooks/support-tickets/:stId
exports.supportTicket = async (req, res) => {
    try {
        let ticket = await CookSupportTicket.findById(req.params.stId)
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
// # create cooks support ticket -> POST -> Cook -> PRIVATE
// @route = /api/cooks/support-tickets
exports.createSupportTicket = async (req, res) => {
    try {
        await CookSupportTicket.create({
            title: req.body.title,
            description: req.body.description,
            cook: req.cook._id,
            assignedTo: req.cook._id,
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
// # read support ticket -> PUT -> Cook -> PRIVATE
// @route = /api/cooks/support-tickets/:stId/read
exports.readSupportTicket = async (req, res) => {
    try {
        await CookSupportTicket.findByIdAndUpdate(req.params.stId, {
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
// # add comments to support ticket -> PUT -> Cook -> PRIVATE
// @route = /api/cooks/support-tickets/:stId/add-comment
exports.addCommentsToSupportTicket = async (req, res) => {
    try {
        let supportTicketFound = await CookSupportTicket.findById(req.params.stId)
        if (supportTicketFound) {
            let comments = {
                cook: req.cook._id,
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

// # description -> HTTP VERB -> Accesss -> Access Type
// # cook get food -> GET -> Cook -> PRIVATE
// @route = /api/foods
exports.getFoods = async (req, res) => {
    try {
        let foods = await Food.find({ chef: req.cook._id })

        // for (let i = 0; i < foods.length; i++) {

        //     if (JSON.stringify(req.cook._id) == JSON.stringify(foods[i].chef)) {
        //         findFoods.push(foods[i])
        //     }
        // }

        if (foods && foods.length > 0) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "غذا ها پیدا شد",
                count: foods.length,
                foods
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: "غذا ها پیدا نشد"
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
// # cook get food -> GET -> Cook -> PRIVATE
// @route = /api/foods/:foodId
exports.getFood = async (req, res) => {
    try {
        let food = await Food.findById(req.params.foodId)
        if (food) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "غذا پیدا شد",
                food
            })
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
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
// # cook create food -> POST -> Cook -> PRIVATE
// @route = /api/foods
exports.createFood = async (req, res) => {
    try {
        let photos = [];
        if (req.files.photos) {
            req.files.photos.forEach((e) => {
                photos.push(e.filename);
            });
        }

        let food = await Food.create({
            chef: req.cook._id,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            countInDay: req.body.countInDay,
            days: req.body.days,
            startHour: req.body.startHour,
            endHour: req.body.endHour,
            photo: req.files.photo[0].filename,
            photos,
        })

        if (food) {
            res.status(StatusCodes.CREATED).json({
                status: 'success',
                msg: 'غذا ایجاد شد',
                food
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


// # description -> HTTP VERB -> Accesss -> Access Type
// # cook update food -> PUT -> Cook -> PRIVATE
// @route = /api/foods/:foodId/update-food
exports.updateFood = async (req, res) => {
    try {
        let food = await Food.findByIdAndUpdate(req.params.foodId, {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            countInDay: req.body.countInDay,
            days: req.body.days,
            startHour: req.body.startHour,
            endHour: req.body.endHour,
        }, { new: true })

        if (food) {
            res.status(StatusCodes.OK).json({
                status: 'success',
                msg: 'غذا ویرایش شد',
                food,
            })
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({
                status: 'failure',
                msg: 'غذا ویرایش نشد',
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
// # cook update food photo -> PUT -> Cook -> PRIVATE
// @route = /api/foods/:foodId/update-photo
exports.updateFoodPhoto = async (req, res) => {
    try {
        let foodPhoto = await Food.findById(req.params.foodId)

        if (foodPhoto) {
            foodPhoto.photo = req.file.filename
            await foodPhoto.save().then((data) => {
                if (data) {
                    res.status(StatusCodes.OK).json({
                        status: "success",
                        msg: "تصویر ویرایش شد",
                        foodPhoto
                    })
                }
            }).catch((error) => {
                res.status(StatusCodes.BAD_REQUEST).json({
                    status: "failure",
                    msg: "تصویر ویرایش نشد",
                    error
                })
            })

        } else {
            res.status(StatusCodes.OK).json({
                status: "failure",
                msg: "تصویر پیدا نشد",
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
// # cook update food photos -> PUT -> Cook -> PRIVATE
// @route = /api/foods/:foodId/update-food-photos
exports.updateFoodPhotos = async (req, res) => {
    try {
        await Food.findByIdAndUpdate(req.params.foodId, {
            photos: req.file.filename,
        }).then((food) => {
            if (food) {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "تصاویر غذا ویرایش شدند",
                    food
                })
            } else {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "تصاویر غذا ویرایش نشدند",
                })
            }
        });
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
// # delete cook food -> DELETE -> Cook -> PRIVATE
// @route = /api/cooks/foods/:foodId
exports.deleteFood = async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.foodId).then((food) => {
            if (food) {
                return res.status(StatusCodes.OK).json({
                    status: 'success',
                    msg: "غذا حذف شد",
                    food
                })
            } else {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'failure',
                    msg: "غذا حذف نشد"
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
// # cook update house map -> PUT -> Cook -> PRIVATE
// @route = /api/cooks/foods/:foodId/update-map
exports.updateMap = async (req, res) => {
    try {
        let house = await Food.findByIdAndUpdate(req.params.foodId, {
            lat: req.body.lat,
            lng: req.body.lng,
        }, { new: true })

        if (house) {
            res.status(200).json({
                status: 'success',
                msg: 'نقشه ویرایش شد',
                house,
            })
        } else {
            res.status(403).json({
                msg: 'نقشه ویرایش نشد',
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
// # cook update house map -> PUT -> Cook -> PRIVATE
// @route = /api/cooks/foods/order-foods
exports.orderFoods = async (req, res) => {
    try {
        let orders = await OrderFood.find({}).populate('user')
        if (orders && orders.length > 0) {
            return res.status(StatusCodes.OK).json({
                status: 'success',
                msg: "سفارش های غذا پیدا شدند",
                count: orders.length,
                orders
            })
        } else {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: 'failure',
                msg: "سفارش های غذا پیدا نشدند"
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


exports.finance = (req, res) => {
    res.send("owner finance")
}

exports.myTickets = (req, res) => {
    res.send("owner my tickets")
}





