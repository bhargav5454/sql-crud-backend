const { userSchema } = require("../model");
const { verifyToken } = require("./JWT.JS");

const auth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        // Check if authorization header is present
        if (!authorization) {
            return res.status(401).send({ message: 'Unauthorized: Authorization header is missing' });
        }

        // Extract the token from the authorization header (Bearer token)
        const authToken = authorization.split(' ')[1];
        if (!authToken) {
            return res.status(401).send({ message: 'Unauthorized: Token is missing' });
        }

        // Check for x-custom-access-id in headers
        const x_access_id = req.headers['x-custom-access-id'];
        if (!x_access_id) {
            return res.status(401).send({ message: 'Unauthorized: x-custom-access-id is missing' });
        }
        const user = await userSchema.findOne({
            where: {
                id: x_access_id
            }
        })
        if (!user) {
            return res.status(401).send({ message: 'Unauthorized: User not found' });
        }

        // Verify the token
        const decodeData = verifyToken(authToken);
        if (!decodeData) {
            return res.status(401).send({ message: 'Unauthorized: Invalid token' });
        }

        // Check if decoded ID matches the x-custom-access-id
        if (decodeData.id != x_access_id) {
            return res.status(401).send({ message: 'Unauthorized: User access ID mismatch' });
        }

        // Attach user ID to the request object
        req.user = decodeData.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Token invalid or access ID not valid", error: error.message });
    }
};

module.exports = auth;
