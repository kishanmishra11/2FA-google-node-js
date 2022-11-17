const {authenticator} = require('otplib')
const qrcode = require('qrcode')


/* Generate new Secret key Function */
const generateUniqueSecret = () => {
    return authenticator.generateSecret()
}

/* Generate new OTP Token Function  */
const generateOTPToken = (username, serviceName, secret) => {
    return authenticator.keyuri(username, serviceName, secret)
}

/* Verify OTP Token Function */
const verifyOTPToken = (token, secret) => {
    return authenticator.verify({ token, secret })
    // return authenticator.check(token, secret)
}

/* Generate QR Code Function  */
const generateQRCode = async (otpAuth) => {
    try {
        const QRCodeImageUrl = await qrcode.toDataURL(otpAuth)
        return `<img src='${QRCodeImageUrl}'/>`
    } catch (error) {
        console.log('Could not generate QR code', error)
        return
    }
}

module.exports = {generateUniqueSecret,generateOTPToken,verifyOTPToken,generateQRCode}