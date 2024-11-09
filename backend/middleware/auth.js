import jwt from 'jsonwebtoken';
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token from header
    
    if (!token) return res.status(401).json({ message: 'Access denied' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: 'Invalid token' });
    }
};
  

export default auth;