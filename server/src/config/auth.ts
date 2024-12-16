import jwt from "jsonwebtoken";

export const authenticate = (req: any, res: any, next: any) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token.split(" ")[1], 'your_secret_key', (err: any, decoded: any) => {
        if (err) return res.status(401).json({ error: 'Unauthorized' });
        req.user = decoded;
        next();
    });
};