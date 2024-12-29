
import jwt from "jsonwebtoken"

const verifyToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header is missing or invalid",
      });
    }
  
    const token = authHeader.split(" ")[1]; // Extract the token


    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)

        req.user = decoded
        next()

    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token.' });

    }

}
export { verifyToken }