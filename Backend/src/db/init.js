import ListingModel from "../model/Listings/index.js";
import UserModel from "../model/user/index.js";


const dataBaseInIt = async() => {
    await UserModel.sync({ alter: true, force: false });
    await ListingModel.sync({alter: true, force: false})
}

export default dataBaseInIt