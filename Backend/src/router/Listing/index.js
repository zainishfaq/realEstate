import { Router } from "express";
import listingController from "../../controller/Listing/index.js";

const listRouter = Router();

listRouter.post("/list", listingController.createListing)
listRouter.get("/getlist/:id",listingController.getListing)
listRouter.get("/getlistall/:userId",listingController.getAllListings)
listRouter.get("/getalllisting",listingController.getAllListingsdb)

export default listRouter;
