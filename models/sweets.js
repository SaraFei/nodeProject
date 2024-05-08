import mongoose from "mongoose";
import Joi from "joi";

const sweetSchema = mongoose.Schema({
    sweetName: String,
    sweetPrice: Number,
    sweetMenueFactureDate: Date,
    sweetAmount: Number,
    imgSweet: String,
    data:String,
    type:String
})

export const sweetModel = mongoose.model("sweets", sweetSchema)

export const sweetValidator = (sweet) => {
    const schema = Joi.object({
        sweetName: Joi.string().pattern(new RegExp(/[A-Za-zא-ת]+/)).required(),
        sweetPrice: Joi.number().min(1).required(),
        sweetMenueFactureDate: Joi.date(),
        sweetAmount: Joi.number(),
        imgSweet: Joi.string(),
        data: Joi.string(),
        type: Joi.string()
    });
    return schema.validate(sweet);

}

export const sweetValidatorUpdate = (sweet) => {
    const schema = Joi.object({
        sweetName: Joi.string().pattern(new RegExp(/[A-Za-z]+/)),
        sweetPrice: Joi.number().min(1),
        sweetMenueFactureDate: Joi.date(),
        sweetAmount: Joi.number(),
        imgSweet: Joi.string()
    });
    return schema.validate(sweet);

}