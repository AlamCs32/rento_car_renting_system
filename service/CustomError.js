class CustomError extends Error {

    constructor(message, status) {
        super()
        this.message = message
        this.status = status
    }

    static UserExist(message = "User is present", status = 303) {
        return new CustomError(message, status)
    }
    static PasswordIncorrect(message = "email or password is incorrect", status = 400) {
        return new CustomError(message, status)
    }
    static No_Item(message = "No Book Found", status = 404) {
        return new CustomError(message, status)
    }
    static OutOfStock(message = "Bike is Not Availabel", status = 303) {
        return new CustomError(message, status)
    }
    static BookedTime(message = "Booked is That Time", status = 303) {
        return new CustomError(message, status)
    }
    static IsAuthorize(message = "You are not Allow to access this Service", status = 401) {
        return new CustomError(message, status)
    }
    static ImageType(message = "pls provide jpeg or png image file", status = 403) {
        return new CustomError(message, status)
    }
    static InvalidTime(message = "pls enter valid Time", status = 403) {
        return new CustomError(message, status)
    }
}
module.exports = CustomError