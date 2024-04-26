import Jwt from "jsonwebtoken";

const authenticateMiddleware = (req, res, next) => {
    const headers = req.headers;

    console.log(headers); 

    let token = headers.authorization;
    
    if (token) {
        token = token.split(" ");
        token = token[1];

        try {
            const userData = Jwt.verify(token,  process.env.JWT_SIGNATURE);
            console.log(userData, "decode");
            req.user = userData;
        } catch (error) {
            console.log(error, "error");
            return res
                .status(401)
                .json({ message: "Invalid token - please login again" });
        }
    } else {
        return res
            .status(401)
            .json({ message: "Authorization header is missing" });
    }

    next();
};

export default authenticateMiddleware;
