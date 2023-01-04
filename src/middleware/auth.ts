import jwt from 'jsonwebtoken';

export const SECRET = "financial"
export const auth = (req, res, next) => {
    let authorization = req.headers.authorization;
    if (authorization) {
        let accessToken = authorization.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json({
                message: "Chua co Token"
            })
        } else {
            jwt.verify(accessToken, SECRET, (err, data) => {
                if (err) {
                    return res.status(401).json({
                        message: "Chua co Token"
                    })
                } else {
                    req.decode = data;
                    next()
                }
            })
        }
    } else {
        return res.status(401).json({
            message: "Chua co Token"
        })
    }
}