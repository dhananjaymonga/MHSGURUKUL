const jwt = require('jsonwebtoken');
const JWT_SECRET = 'dhananjay';
export const verifyTokenAndAdmin = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user to request object
    if (!req.user.isAdmin) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
 export const verifyAdmin = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};
