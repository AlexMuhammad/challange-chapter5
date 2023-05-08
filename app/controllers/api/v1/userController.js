const userService = require("../../../services/userService");
const jwt = require("jsonwebtoken");
const secret = "secret"

module.exports = {
    register(req, res) {
        userService
            .createMember(req.body)
            .then((user) => {
                res.status(201).json({
                    status: "OK",
                    data: user
                })
            })
            .catch((error) => {
                res.status(422).json({
                    status: "FAIL",
                    message: error.message,
                })
            })
    },
    registerAdmin(req, res) {
        userService
            .createAdmin(req.body)
            .then((user) => {
                res.status(201).json({
                    status: "OK",
                    data: user
                })
            })
            .catch((error) => {
                res.status(422).json({
                    status: "FAIL",
                    message: error.message,
                })
            })
    },
    login(req, res) {
        userService
            .login(req.body)
            .then((user) => {
                if (!user.data) {
                    res.status(401).json({
                        status: "FAIL",
                        message: user.message,
                        data: null
                    })
                    return
                }
                res.status(201).json({
                    status: "OK",
                    data: {
                        name: user.data.name,
                        email: user.data.email,
                        token: user.data.token
                    }
                })
            })
            .catch((err) => {
                res.status(422).json({
                    status: "FAIL",
                    message: err.message
                })
            })
    },
    authorize(req, res, next) {
        try {
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split("Bearer ")[1];
            const tokenPayload = jwt.verify(token, secret)

            req.user = tokenPayload;
            next()
        } catch (error) {
            res.status(401).json({
                status: "FAIL",
                message: "Unauthorized"
            })
        }
    },
    current(req, res) {
        try {
            const { name, email } = req.user;
            console.log(req.user);
            res.status(200).json({
                name,
                email
            })
        } catch (error) {
            return error
        }
    },
    isSuperAdmin(req, res, next) {
        try {
            const { role } = req.user;

            if (role === "superadmin") return next();

            res.status(403).json({
                status: "FAIL",
                message: "YOU DONT HAVE AN ACCESS",
            })
        } catch (error) {
            res.status(401).json({
                message: "Unauthorized"
            })
        }
    },
    isAdmin(req, res, next) {
        try {
            const { role } = req.user;
            if (role === "admin") return next()

            res.status(403).json({
                status: "FAIL",
                message: "YOU DONT HAVE AN ACCESS"
            })
        } catch (error) {
            res.status(401).json({
                message: "Unauthorized"
            })
        }
    }
}