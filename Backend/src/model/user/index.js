import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import ListingModel from "../Listings/index.js";

const UserModel = sequelize.define (
    "User",
     {
     username: {
        type: DataTypes.STRING
     },

     email: {
        type: DataTypes.STRING
     },

     password: {
        type: DataTypes.STRING
     },

     avatar : {
       type: DataTypes.STRING,
       defaultValue: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
     }
    },
   
    {paranoid: true}
);



export default UserModel;