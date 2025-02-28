const multer = require('multer')
const path = require('path');
const mkdirp = require('mkdirp');
const ownerAvatarDir = path.join(__dirname, '../uploads/ownerAvatars/');
const houseCoverImagesDir = path.join(__dirname, '../uploads/houseCoverImages/');
const userAvatarDir = path.join(__dirname, '../uploads/userAvatarDir/');
const adminAvatarDir = path.join(__dirname, '../uploads/adminAvatarDir/');
const driverAvatarDir = path.join(__dirname, '../uploads/driverAvatarDir/');
const driverAdsPhotosDir = path.join(__dirname, '../uploads/driverAdsPhotosDir/');
const driverBusPhotosDir = path.join(__dirname, '../uploads/driverBusPhotosDir/');
const ownerAdsDir = path.join(__dirname, '../uploads/ownerAdsDir/');
const cookAvatarDir = path.join(__dirname, '../uploads/cookAvatarDir/');
const cookAdsDir = path.join(__dirname, '../uploads/cookAdsDir/');
const foodPhotosDir = path.join(__dirname, '../uploads/foodPhotosDir/');

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'mern_uploads', // Folder in Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file types
    },
});

module.exports = {

    // ******************** owenr ********************
    // owner avatar
    ownerAvatarUpload: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const made = mkdirp.sync(ownerAvatarDir);
                cb(null, ownerAvatarDir)
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })
    }),

    // owner ads
    ownerAdsPhotosUpload: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const made = mkdirp.sync(ownerAdsDir);
                cb(null, ownerAdsDir)
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })
    }),

    // ******************** house cover ********************
    houseUpload: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {

                const made = mkdirp.sync(houseCoverImagesDir);
                cb(null, houseCoverImagesDir)
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })
    }),


    // ******************** user avatar ********************
    userUpload: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const made = mkdirp.sync(userAvatarDir);
                cb(null, userAvatarDir)
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })
    }),

    // ******************** admin avatar ********************
    adminUpload: multer({

        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const made = mkdirp.sync(adminAvatarDir);
                console.log(made);
                cb(null, adminAvatarDir)
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })
    }),



    // ******************** driver ********************
    // driver avatar 
    driverUpload: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const made = mkdirp.sync(driverAvatarDir);
                cb(null, driverAvatarDir)
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })
    }),



    // driver ads photo and photos
    driverAdsPhotosUpload: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const made = mkdirp.sync(driverAdsPhotosDir);
                cb(null, driverAdsPhotosDir)
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })
    }),


    // driver bus photo and photos
    driverBusPhotosUpload: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const made = mkdirp.sync(driverBusPhotosDir);
                cb(null, driverBusPhotosDir)
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })
    }),



    // ******************** cook ********************
    cookAvatarUpload: multer({ storage }),

    // cook ads
    cookAdsPhotosUpload: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const made = mkdirp.sync(cookAdsDir);
                cb(null, cookAdsDir)
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })
    }),

    // cook support ticket image
    cookSupportTicketUpload: multer({ storage }),

    // foods uploads
    // foodPhotosUpload: multer({
    //     storage: multer.diskStorage({
    //         destination: function (req, file, cb) {
    //             const made = mkdirp.sync(foodPhotosDir);
    //             cb(null, foodPhotosDir)
    //         },
    //         filename: function (req, file, cb) {
    //             cb(null, Date.now() + path.extname(file.originalname));
    //         }
    //     })
    // }),

    foodPhotoUpload: multer({ storage }),
    foodPhotosUpload: multer({ storage }),
}