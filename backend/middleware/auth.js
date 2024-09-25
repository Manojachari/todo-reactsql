// // backend/middleware/auth.js
// const jwt = require('jsonwebtoken');
// const secretKey = 'your_secret_key';

// const verifyToken = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) {
//     return res.status(403).json({ error: 'No token provided' });
//   }
//   jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to authenticate token' });
//     }
//     req.userId = decoded.userId;
//     next();
//   });
// };

// module.exports = verifyToken;
