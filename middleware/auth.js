import jwt from "jsonwebtoken";

export const authAdmin = async (req, res, next) => {
    let token = req.headers["a-access-token"];
    try {
        if (!token.role == 'admin') {
            return res.status(401).json({ type: "not authoried", message: "authorized for administrators only" })
        }
        let confirmed = jwt.verify(token, process.env.JWT_SECRET);
        if (!confirmed) {
            return res.status(401).json({ type: "not authoried", message: "the user is not authoried" });
        }
        req.user=confirmed;
        next();
    }
    catch (err) {
        res.status(400).send("error occure with token");
    }
}

export const authUser = async (req, res, next) => {
    let token = req.headers["a-access-token"];
    try {
        if (!token) {
            return res.status(401).json({ type: "not authoried", message: "authorized for administrators only" })
        }
        let confirmed = jwt.verify(token, process.env.JWT_SECRET);
        if (!confirmed) {
            return res.status(401).json({ type: "not authoried", message: "the user is not authoried" });
        }
        req.user=confirmed;
        next();
    }
    catch (err) {
        res.status(400).send("error occure with token");
    }
}