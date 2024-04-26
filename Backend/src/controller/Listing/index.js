import ListingModel from "../../model/Listings/index.js";

const listingController = {
    createListing: async (req, res) => {
        try {
            const payload = req.body; 
            const listing = await ListingModel.create(payload);
            return res.status(201).json(listing);
        } catch (error) {
            console.error("Error creating listing:", error);
        }
    },

    getListing: async (req, res) => {
        try {
            const id = req.params.id;
            const listing = await ListingModel.findByPk(id);
            if (!listing) {
                return res.status(404).json({ message: 'Listing not found' });
            }
            return res.status(200).json(listing);
        } catch (error) {
            console.error("Error fetching listing:", error);
        }
    },

    getAllListings: async (req, res) => {
        try {
            const userId = req.params.userId; 
            const listings = await ListingModel.findAll({ where: { userRef: userId } });
            return res.status(200).json(listings);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    },

    getAllListingsdb: async (req, res) => {
        try {
            const listings = await ListingModel.findAll();
            return res.status(200).json(listings);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    }
};
    

export default listingController;
