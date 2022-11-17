const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const helper = require('../helper/helper')
const {
    META_STATUS_0,
    META_STATUS_1,
    SUCCESSFUL,
    VALIDATION_ERROR,
    INTERNAL_SERVER_ERROR
} = require("../config/key")

const {generateUniqueSecret, verifyOTPToken, generateOTPToken, generateQRCode} = require('../helper/2fa')

/* Register new user and store secret in database */
exports.register = async (req, res) => {
    try {
        let reqParam = req.body
        const userInfo = await userModel.findOne({email: reqParam.email});
        if(userInfo){
           return helper.success(res,("email Already Exists"),META_STATUS_0,SUCCESSFUL);
        }
         const secret = generateUniqueSecret();

        const userData = new userModel(
            {
                username: reqParam.userName,
                email: reqParam.email,
                password: reqParam.password = await bcrypt.hashSync(req.body.password,10),
                secret: secret
            }
        )
        await userData.save();
        return helper.success(res,("user Added Successfully"),META_STATUS_1,SUCCESSFUL, {userData});
    } catch (e) {
        return helper.error(res,INTERNAL_SERVER_ERROR,("something Went Wrong"));
    }
}

/*Login user and generate QR code */
exports.createOtp = async (req, res) => {
    try {
        let reqParam = req.body
        const userData = await userModel.findOne({email:reqParam.email})
        if(!userData){
            return helper.error(res,VALIDATION_ERROR,("please Enter Correct Email"))
        }
        const password = await bcrypt.compare(reqParam.password, userData.password);
        if(!password){
            return helper.error(res,VALIDATION_ERROR,("please Enter Correct Password"))
        }

        const serviceName = "2 Factor Authentication"

        const otpAuth = generateOTPToken(userData.email, serviceName, userData.secret)

        const QRCodeImage = await generateQRCode(otpAuth)
        return helper.success(res,("QR Code Generated Successfully"),META_STATUS_1,SUCCESSFUL, {QRCodeImage});

    } catch (e) {
        return helper.error(res,INTERNAL_SERVER_ERROR,("something Went Wrong"));
    }
}
/* Verify user's Secret and otp */
exports.validateSecret = async (req, res) => {
        try {
            const userInfo = await userModel.findOne({_id:req.body.userId})
            const  otp  = req.body.token
            const secretKey = userInfo.secret
            const isValid = await verifyOTPToken(otp, secretKey)
            if(isValid == true){
                return helper.success(res,("OTP verified successfully"),META_STATUS_1,SUCCESSFUL, {isValid});
            }
            else{
                return helper.error(res,VALIDATION_ERROR,("please Enter Valid OTP"))
            }
    } catch (e) {
            return helper.error(res,INTERNAL_SERVER_ERROR,("something Went Wrong"));
    }
}
