import UserModel from "../../model/user/index.js";
import bcrypt from "bcrypt";

const userController = {
    update: async (req, res) => {
        try {
            const payload = req.body;
            const params = req.params;

            let user = await UserModel.findByPk(params.userId);

            if (!user) {
                return res.status(404).json({
                    message: "User not Found"
                });
            }


            const { username, email, password, avatar } = payload;

            if (username) user.username = username;
            if (email) user.email = email;
            if (password) {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                user.password = hashedPassword;
            }
            if(avatar) user.avatar = avatar;

            await user.save();

            res.json({
                message: "User Updated Successfully",
                user
            });
        } catch (error) {
            console.error("Error updating user", error);
            res.status(500).json({
                message: "Error updating user"
            });
        }
    },
    
    deleteAccount: async(req, res) => {

        try {
            const params = req.params;

        const user = await UserModel.findByPk(params.userId)
         
        if(!user){
           return res.status(404).json({
                message: "User not Found",
            })
        }

        await user.destroy();

        return res.json({
            message: "User deleted Successfully",
        
        })
            
        } catch (error) {
            console.error("Error Deleting User", error);
            return res.status(500).json({
                message: "Internal Server Error"
            })
            
        }
    }
    

};


export default userController;
