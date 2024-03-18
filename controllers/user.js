import { hash, compare } from "bcrypt";
import { UserModel, userValidator, userValidatorLogin } from "../models/user.js";
import { gnerateToken } from "../middleware/generateToken.js";

//מה ההבדל בין פינד לפינד וואן
const addUser = async (req, res) => {
    let { userName, email, userPwd, role, date } = req.body;
    let validate = userValidator(req.body);
    if (validate.error) {
        return res.status(403).json({ type: "validate error", message: validate.error.details[0].message })
    }
    try {
        let sameUser = await UserModel.findOne({ email: email });
        if (sameUser) {
            return res.status(409).json({ type: "add user error", message: "there is a user with such email" });
        }
        let hashPwd = await hash(userPwd, 12);
        let newUser = new UserModel({ userName, email, userPwd: hashPwd, role, date });
        await newUser.save();
        let token = gnerateToken(newUser);
        res.json({ token, role, userName });


    }
    catch (err) {
        res.json("user התרחשה שגיאה בעת הוספת", err);
    }
}

const userLogin = async (req, res) => {
    let validate = userValidatorLogin(req.body);
    if (validate.error) {
        return res.status(400).json({ type: "userName or pwd is not valied", message: validate.error.details[0].message })
    }
    try {
        let { email } = req.body;
        let { userPwd } = req.body;
        let userToLogin = await UserModel.findOne({ email: email });
        if (!userToLogin || ! await compare(userPwd, userToLogin.userPwd)) {
            return res.status(404).json({ type: "no such user", message: "please sign up" });
        }
        let token = gnerateToken(userToLogin);
        let userName = userToLogin.userName;
        let role = userToLogin.role;
        res.json({ token, role, userName });

    }
    catch (err) {

        res.status(400).json(err);
    }
}

const getAllUsers = async (req, res) => {
    try {
        let allUsers = await UserModel.find({}, "-userPwd");
        res.json(allUsers)
    }
    catch (err) {
        res.status(400).json("התרחשה שגיאה בעת שליפת משתמשים מהשרת", err);
    }
}
export { addUser, userLogin, getAllUsers };