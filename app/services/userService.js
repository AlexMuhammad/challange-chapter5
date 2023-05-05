const userRepository = require("../repositories/userRepository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT = 10
const secret = "secret"

const encryptedPassword = async (password) => {
    try {
        const encryptPassword = await bcrypt.hash(password, SALT)
        return encryptPassword
    } catch (error) {
        return error
    }
}

const comparePassword = async (password, encryptPassword) => {
    try {
        const match = await bcrypt.compare(password, encryptPassword);
        return match
    } catch (error) {
        return error
    }
}

const createToken = (payload) => {
    return jwt.sign(payload, secret)
}

module.exports = {
    async createAdmin(requestBody) {
        const { name, email, password } = requestBody;
        const encryptPassword = await encryptedPassword(password)
        return userRepository.create({
            name,
            email,
            password: encryptPassword,
            role: "admin"
        })
    },
    async createMember(requestBody) {
        const { name, email, password } = requestBody;
        const encryptPassword = await encryptedPassword(password)
        return userRepository.create({
            name,
            email,
            password: encryptPassword,
            role: "member"
        })
    },

    async login(requestBody) {
        const { email, password } = requestBody;

        const user = await userRepository.findUserByEmail(email);

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid || !user) {
            return {
                isValid: false,
                message: "Email and Password Wrong",
            }
        }

        const token = createToken({
            id: user.id,
            role: user.role,
            name: user.name,
            email: user.email
        })

        user.token = token

        if (isPasswordValid) {
            return {
                isValid: true,
                message: "Password Correct",
                data: user
            }
        }
    }
}