import { getUsers, insertUser } from '../models/userModel.js'

export const pingTest = (req, res) => {
    try {
        res.status(200).json({
            msg: `Your api is up and running on worker ${process.pid}`
        });
    } catch (err) {
        res.status(500).json({
            msg: `something went wrong on WorkerId: ${process.pid}`,
            error: err.message
        });
    }
}

export const fetchUsers = async (req, res) => {
    try {
        const result = await getUsers();
        res.status(200).json({
            data: result
        });
    } catch (err) {
        res.status(500).json({
            error: 'something went wrong while fetching the user data'
        });
    }
}

export const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await insertUser(name, email, password);
        res.status(201).json({
            msg: "user inserted successfully",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            msg: "something went wrong on addUser endpoint",
            error: err.message
        });
    }
}

