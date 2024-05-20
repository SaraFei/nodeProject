import mongoose from "mongoose";
import Joi from "joi";
const minimalProduct = mongoose.Schema({
    productName: String,
    amount: Number
})
const OrderSchema = mongoose.Schema({
    orderDate: { type: Date, default: Date.now() },
    deliveryDate: Date,
    customerAddress: String,
    customerCode: String,
    productsDetails: [minimalProduct],
    orderShipped: { type: Boolean, default: false }
})

export const OrderModel = mongoose.model("orders", OrderSchema);

const minimalProductSchema = Joi.object({
    productName: Joi.string().required(),
    amount: Joi.number().required()
});

export const orderValidator = (order) => {
    const schema = Joi.object({
        orderDate: Joi.date(),
        deliveryDate: Joi.date(),
        customerAddress: Joi.string(),
        //-----------------טעון בדיקה
        customerCode: Joi.string().min(9).max(9).pattern(/^\d+$/).required(),
        productsDetails: Joi.array().items(minimalProductSchema).required(),
        orderShipped: Joi.boolean()
    })
    return schema.validate(order);

}

