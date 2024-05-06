const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Character = require('../models/character');

const signup = async (req, res) => {
  try {
    const saltRounds = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
    req.body.password = hashedPassword
    const payload = { email: req.body.email }
    const secret = process.env.SECRET
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    await User.create(req.body)
    return res.status(200).json({ token })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (!user) return res.status(401).send('Error: Email or Password incorrect')
    const comparePass = bcrypt.compareSync(req.body.password, user.password)
    if (comparePass) {
      const payload = { email: req.body.email }
      const secret = process.env.SECRET
      const token = jwt.sign(payload, secret, { expiresIn: '1h' })
      return res.status(200).json({ token })
    } else {
      return res.status(401).json('Error: Email or Password incorrect')
    }
  } catch (error) {
    res.status(500).send(error)
  }
}

const getUserCharacters = async (req, res) => {
  try {
    jwt.verify(req.headers.authorization, process.env.SECRET, async (err, result) => {
      if (err) {
          console.log(err);
          return res.send('Token not valid')
      } 

      console.log(result);

      const user = await User.findOne(req.body, {
        where: {
          email: result.email
        }
      })

      if (!user) {
        console.log('User doesnt exists');
        return res.send('Token not valid')
      } 


      const characters = await Character.findAll({
        where: {
          steam_id: user.steam_id
        }
      })
      if (characters) {
        return res.status(200).json(characters)
      } else {
        return res.status(404).send('No characters records found')
      }
    })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

module.exports = {
  signup,
  login,
  getUserCharacters
}