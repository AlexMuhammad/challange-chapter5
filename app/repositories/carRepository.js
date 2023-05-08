const { Car, User } = require("../models");

module.exports = {
    create(createArgs) {
        return Car.create(createArgs)
    },

    update(id, updateArgs) {
        return Car.update(updateArgs, {
            where: {
                id,
            },
        });
    },

    delete(id) {
        return Car.destroy({
            where: {
                id,
            }
        },);
    },

    getAll() {
        return Car.findAll();
    },
    getAllById(id) {
        return Car.findOne({
            where: {
                id
            }
        })
    },

    getAllDetail() {
        return Car.findAll({
            include: [
                {
                    model: User,
                    as: "Creator"
                },
                {
                    model: User,
                    as: "Deletor"
                },
                {
                    model: User,
                    as: "Updetor"
                },
            ],
            attributes: {
                exclude: ["createdBy", "updatedBy", "deletedBy"]
            },
            paranoid: false
        })
    },

    getDetail() {
        return Car.findAll({
            include: [
                {
                    model: "User",
                    as: "Creator"
                },
                {
                    model: "User",
                    as: "Deletor"
                },
                {
                    model: "User",
                    as: "Updetor"
                },
            ],
            attributes: {
                exclude: ["createdBy", "updatedBy", "deletedBy"]
            },
            paranoid: false
        })
    },

    findUserByEmail(email) {
        return Car.findOne({
            where: { email }
        })
    }
}