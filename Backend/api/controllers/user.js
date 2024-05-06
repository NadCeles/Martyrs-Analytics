const User = require('../models/user')
const jwt = require("jsonwebtoken")

const updateUser = async (req, res) => {
    try {
        jwt.verify(req.headers.authorization, process.env.SECRET, async (err, result) => {
            if(err) return res.send('Token not valid')
        
            const [userExists, user] = await User.update(req.body, {
              where: {
                email: result.email
              }
            })
        
            if(!userExists) return res.send('Token not valid')
            res.status(200).json(user);
        })
    } catch(error) {
        res.status(500).send(error.message)
    }
}

const getUserInfoByToken = async (req, res) => {
    try {
        jwt.verify(req.headers.authorization, process.env.SECRET, async (err, result) => {
            if(err) return res.send('Token not valid')
        
            const user = await User.findOne({
              where: {
                email: result.email
              }
            })
        
            if(!user) return res.send('Token not valid')
            res.status(200).send(user);
        })
    } catch(error) {
        res.status(500).send(error.message)
    }
}

module.exports = {
    updateUser,
    getUserInfoByToken
}