import mongoose from "mongoose";
import Joi from "joi";

const userSchema = mongoose.Schema({
    userName: String,
    email: String,
    userPwd: String,
    role: { type: String, default: "user" },
    date: Date
})
export const UserModel = mongoose.model("sweetsUser", userSchema);

export const userValidator = (user) => {
    const schema = Joi.object({
        userName: Joi.string().pattern(new RegExp(/^[A-Za-zא-ת\s]+$/)).required(),
        email: Joi.string().email().required(),
        userPwd: Joi.string().min(6).max(8).required(),
        role: Joi.string().valid("admin", "user"),
        date: Joi.date().less('now')
    })
    return schema.validate(user);
}

export const userValidatorLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        userPwd: Joi.string().min(6).max(8).required()
    })
    return schema.validate(user);
}
