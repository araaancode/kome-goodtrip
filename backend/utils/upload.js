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
const cookSupportTicktsDir = path.join(__dirname, '../uploads/cookSupportTicktsDir/');
const foodPhotosDir = path.join(__dirname, '../uploads/foodPhotosDir/');

// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('./cloudinary');


const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: 'mern_uploads', // Folder in Cloudinary
//         allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file types
//     },
// });


// تنظیمات S3 برای پارس پک
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_ENDPOINT,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});


// تابع تولید نام تصادفی برای فایل
const generateFileName = (originalName) => {
    const ext = path.extname(originalName);
    const randomName = crypto.randomBytes(16).toString("hex");
    return `${randomName}${ext}`;
};

// تنظیم Multer برای ذخیره فایل در حافظه موقت
const storage = multer.memoryStorage();
// const upload = multer({ storage });


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
    cookAvatarUpload: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const made = mkdirp.sync(cookAvatarDir);
                cb(null, cookAvatarDir)
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })
    }),

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
    cookSupportTicketUpload: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const made = mkdirp.sync(cookSupportTicktsDir);
                cb(null, cookSupportTicktsDir)
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })
    }),

    // foods uploads
    foodPhotoUpload: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const made = mkdirp.sync(foodPhotosDir);
                cb(null, foodPhotosDir)
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })
    }),

    foodPhotosUpload: multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                const made = mkdirp.sync(foodPhotosDir);
                cb(null, foodPhotosDir)
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname));
            }
        })
    }),


    // foodPhotoUpload: multer({ storage }),
    // foodPhotosUpload: multer({ storage }),
}