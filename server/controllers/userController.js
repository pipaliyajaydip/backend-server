import { getUsers } from '../models/userModel.js'

export const fetchUsers = async (req, res) => {
    try {
        console.log("result: is form here");
        const result = await getUsers();
        console.log("result: ", result);
        res.status(200).json({
            data: result
        });
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({
            error: 'something went wrong'
        });
    }
}

