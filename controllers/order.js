import mongoose from "mongoose";
import { OrderModel, orderValidator } from "../models/order.js";

const getAllOrders = async (req, res) => {

    try {
        let allOrders = await OrderModel.find({});
        res.json(allOrders);
    }
    catch (err) {
        res.status(400).json({ type: "error get orders", message: "התרחשה שגיאה בעת טעינת המוצרים מהשרת", err })
    }
}

const addOrder = async (req, res) => {
    let { id } = req.body;
    let validate = orderValidator(req.body);
    if (validate.error) {
        return res.status(400).json({ type: "order valied error", message: "there is an error by order details" + validate.error.details[0].message })
    }
    try {
        let sameOrder = await OrderModel.findById(id);
        if (sameOrder) {
            return res.status(409).json({ type: "same order", message: "there is a order with such ID" });
        }
        let newOrder = new OrderModel(req.body);
        await newOrder.save();
        res.json(newOrder);

    }
    catch (err) {
        res.status(500).json({ type: "error", message: "An error occurred while adding the order", error: err.message });

    }
}

const deleteOrder = async (req, res) => {
    let { id } = req.params;//איי די של הזמנה
    let { _id,role } = req.user;
    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send("id is not valied");
        }
        let orderToDelete = await OrderModel.findById(id);
        if (!orderToDelete) {
            return res.status(400).json({ type: "delete order ", message: "there is not order withsuch ID" });
        }
        //או שאתה לא מנהל, או שהת.ז לא זהה
        if (!orderToDelete.customerCode ==_id || !role == 'admin') {
            res.status(409).json({ type: "not aouthoried", nessage: "the ID is not the same as what was typed" })
        }
        
        if (orderToDelete.orderShipped == true) {
            return res.json("sorry, the order shipped the order cannot be deleted");
        }
        orderToDelete = await OrderModel.findByIdAndDelete(id);
        res.json(orderToDelete);
    }
    catch (err) {
        res.status(400).json({ type: "delete order error", message: "התרחשה  שגיאה בעת מחיקת ההזמנה" });
    }
}

const isShipped = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send("id is not valied");
        }
        let orderToShipped = await OrderModel.findById(id);
        if (!orderToShipped) {
            return res.json("sorry, didnt found an order with such id");
        }
        if (orderToShipped.orderShipped == true) {
            return res.send("the order is shipped already")
        }
        orderToShipped.orderShipped = true;
        await orderToShipped.save();
        res.send("Order has been marked as shipped");
    }
    catch (err) {
        res.status(400).json({ type: "update shipping", message: err.message })
    }

}

const getOrderById = async (req, res) => {
    let { id } = req.body;
    let { _id, role } = req.user;
    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send("id is not valied");
        }
        if (id && role == 'admin') {
            _id = id;
        }
        let allOrdersById = await OrderModel.find({customerCode:_id});
        res.json(allOrdersById);
    }
    catch (err) {
        res.status(400).json({ type: "error get orders", message: "התרחשה שגיאה בעת טעינת המוצרים מהשרת", err })
    }

}


export { getAllOrders, addOrder, deleteOrder, isShipped, getOrderById };