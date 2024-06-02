import mongoose from "mongoose";
import { sweetModel, sweetValidator, sweetValidatorUpdate } from "../models/sweets.js";

const getAllSweets = async (req, res) => {
    // let { limit } = req.query || 4;
    // let { search } = req.query;
    // let { page } = req.query || 1;
    let { limit = 6, search, page = 1 } = req.query;
    let expressionToSearch = RegExp(`${search}`);
    try {
        let filter = {};
        if (search) {
            filter.name = expressionToSearch;
        }

        const allSweets = await sweetModel.find(filter).limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
        console.log(allSweets);
        res.json(allSweets);
        return allSweets;
    }
    catch (err) {
        res.status(400).send({ type: "get sweets error", message: "התרחשה שגיאה בעת הבאת הממתקים מהשרת" })
    }
}

const getFilteredSweets = async (req, res) => {

    let { limit = 6, search, page = 1 } = req.query;
    let expressionToSearch = RegExp(`${search}`);
    try {

        //find(type:expressionToSearch)
        //ובכלל למה תצריך פילטר??
        let filter = { type:expressionToSearch }; // Filter by type 'מתוקים'
       
        const allSweets = await sweetModel.find(filter).limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));
        console.log(allSweets);
        res.json(allSweets);
        return allSweets;
    }
    catch (err) {
        res.status(400).send({ type: "get sweets error", message: "התרחשה שגיאה בעת הבאת הממתקים מהשרת" })
    }
}
const getSweetById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send({ type: "error sweetCode", message: "sweetCode is not valied" });
    }
    try {
        const sweet = await sweetModel.findById(id);
        if (!sweet) {
            return res.status(404).send({ type: "sweet error", message: "didnt found sweet with such id" })
        }
        res.json(sweet);
    }
    catch (err) {
        res.status(400).send(err);
    }
}

const updateSweet = async (req, res) => {
    let { id } = req.params;
    try {
        let validate = sweetValidatorUpdate(req.body);
        if (validate.error) {
            return res.status(403).json({ type: "error validate", message: validate.error.details[0].message })
        }

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ type: "error sweetCode", message: "sweetCode is not valied" });
        }
        let sweetToUpdate = await sweetModel.findById(id);
        if (!sweetModel) {
            return res.status(404).send({ type: "sweet error", message: "didnt found sweet with such id" })
        }
        sweetToUpdate = await sweetModel.findByIdAndUpdate(id, req.body);
        res.json(sweetToUpdate);
    }
    catch (err) {
        res.status(400).send(err);
    }
}
const deleteSweet = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ type: "error sweetCode", message: "sweetCode is not valied" });
        }
        let sweetTodelete = await sweetModel.findByIdAndDelete(id);
        if (!sweetTodelete) {
            return res.status(404).send({ type: "sweet error", message: "didnt found sweet with such id" })
        }
        res.json(sweetTodelete);
    }
    catch (err) {
        res.json(err);
    }
}
const addSweet = async (req, res) => {

    let { sweetName, sweetPrice, sweetMenueFactureDate, sweetAmount, imgSweet,type } = req.body;
    let validate = sweetValidator(req.body);
    if (validate.error) {
        return res.status(403).json({ type: "error validate", message: validate.error.details[0].message })
    }
    try {

        let sameSweet = await sweetModel.findOne({ sweetName: sweetName });
        if (sameSweet) {
            return res.status(409).json({ type: "same sweet", message: "there is a sweet with such sweetCode" })
        }
        let newSweet = new sweetModel({ sweetName, sweetPrice, sweetMenueFactureDate, sweetAmount, imgSweet ,type});
        await newSweet.save();
        res.json(newSweet);
    }
    catch (err) {
        res.json(err);
    }
}

// const getQtyOfSweets2 = async (req, res) => {
//     try {
//         let allSweets;
//         allSweets = await getAllSweets(req, res);
//         if (allSweets) {
//             let count = allSweets.length;
//             console.log(count);
//             return res.json({count})

//         }
//         else {
//             return res.status(200).send({ type: "undefine  sweetsArray", message: "the problem in the getAllSweet function" }); // Return 0 if allSweets is falsy
//         }
//     }
//     catch (err) {
//         res.status(400).json(err);
//     }

// }



const getQtyOfSweets = async (req, res) => {
    try {
        let cnt = 0;
        const allSweets = await sweetModel.find({});
        for (let i = 0; i < allSweets.length; i++) {
            cnt++;

        }
        // res.send(cnt);
        console.log(cnt);
        return res.json({ cnt });

    }
    catch (err) {
        res.status(400).send({ type: "get sweets error", message: "התרחשה שגיאה בעת הבאת הממתקים מהשרת" })
    }
}

export { getAllSweets, getSweetById, updateSweet, deleteSweet, addSweet, getQtyOfSweets ,getFilteredSweets};

