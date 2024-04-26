import joi from "joi"

const userValidator = {
    create: (req, res, next) => {
        const schema = joi.object({
            username: joi.string().min(5).max(20).required(),

            email: joi.string().min(5).max(50).required(),

            password: joi.string().min(5).max(20).required()
        });

        const response = schema.validate(req.body)
        if(response.error) {
            return res.status(400).json({message: "Invalid Format", error: response.error})
        }

        console.log(response);
        next();
    }
};

export default userValidator;