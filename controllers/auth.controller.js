import {User} from '../models/User.js'
import jwt from 'jsonwebtoken'

export const register = async(req, res) =>{
  const {email, password} = req.body
  try {
    const user = new User({email, password})
    await user.save()
    //jwt token
    return res.status(201).json({message: 'Usuario creado'})
  } catch (error) {
    console.log(error)
    if(error.code === 11000){
      return res.status(400).json({message: 'El usuario ya existe'})
    }
    return res.status(500).json({message: 'Error del servidor'})
  }
}

export const login = async (req, res) =>{
  const {email, password} = req.body
  try {
    let user = await User.findOne({email})
    if(!user) return res.status(403).json({message: 'El usuario no existe'})
    const isMatch = await user.comparePassword(password)
    if(!isMatch) return res.status(403).json({message: 'Contraseña incorrecta'})

    //jwt token
    const token = jwt.sign({uid: user._id}, process.env.JWT_SECRET)
    res.json({token: token})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'Error del servidor'})
  }

}
