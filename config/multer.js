const multer = require('multer')
const fs = require('fs')
const { ImageType } = require('../service/CustomError')
const userImage = (req, res) => {
    let fiels = [
        {
            name: "user",
            maxCount: 1
        },
        {
            name: "document",
            maxCount: 4
        }
    ]
    const storage = multer.diskStorage({
        destination: "public/upload/user",
        filename: (req, file, cd) => {
            cd(null, Date.now() + file.originalname)
        }
    })

    let upload = multer({
        storage,
        fileFilter: (req, file, cd) => {
            // Image Type is Validating 
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                cd(null, true);
            } else {
                cd(ImageType());
            }
        }
    }).fields(fiels)

    return new Promise((resolve, reject) => {

        upload(req, res, error => {
            if (error) {
                return reject(error)
            }
            return resolve(req.files)
        })
    })
}
// Vehicle Image
const VehicleImage = (req, res, fileName = "vehicle") => {
    const storage = multer.diskStorage({
        destination: "public/upload/vehicle",
        filename: (req, file, cd) => {
            cd(null, Date.now() + file.originalname)
        }
    })
    let upload = multer({
        storage,
        fileFilter: (req, file, cd) => {
            // Image Type is Validating 
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                cd(null, true);
            } else {
                cd(ImageType());
            }
        }
    }).array(fileName)
    return new Promise((resolve, reject) => {
        upload(req, res, error => {
            if (error) {
                return reject(error)
            }
            return resolve(req.files)
        })
    })
}

// User Image

let UpdateProfileImage = (req, res, fileName = "user") => {
    const storage = multer.diskStorage({
        destination: "public/upload/user",
        filename: (req, file, cd) => {
            cd(null, Date.now() + file.originalname)
        }
    })
    let upload = multer({
        storage,
        fileFilter: (req, file, cd) => {
            // Image Type is Validating 
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                cd(null, true);
            } else {
                cd(ImageType());
            }
        }
    }).single(fileName)
    return new Promise((resolve, reject) => {

        upload(req, res, error => {
            if (error) {
                return reject(error)
            }
            return resolve(req.file)
        })
    })
}


// Image File Delete
let ImageFileDelete = (image, fieds = "vehicle") => {
    for (let i of image) {
        fs.stat(`/Rento/public/upload/${fieds}/${i.filename}`, (err, state) => {

            if (err) {
                return console.log(err)
            }

            fs.unlink(`/Rento/public/upload/${fieds}/${i.filename}`, error => {
                if (error) return console.log({ error });
            });
        })
    }
}

let vehicleFileDelete = (image, fieds = "vehicle") => {
    for (let i of image) {
        fs.stat(`/Rento/public/upload/${fieds}/${i}`, (err, state) => {
            if (err) {
                return console.log({ err })
            }
            fs.unlink(`/Rento/public/upload/${fieds}/${i}`, error => {
                if (error) return console.log({ error });
            })
        })
    }
}

let DeleteUpdateProfileImage = (image, fieds = "user") => {
    fs.stat(`/Rento/public/upload/${fieds}/${image}`, (err, state) => {

        if (err) {
            return console.log(err)
        }

        fs.unlink(`/Rento/public/upload/${fieds}/${image}`, error => {
            if (error) return console.log({ error });
        });
    })
}

module.exports = {
    userImage, UpdateProfileImage, VehicleImage, ImageFileDelete, vehicleFileDelete, DeleteUpdateProfileImage
}