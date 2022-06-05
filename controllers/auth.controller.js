import { validationResult } from "express-validator"

export const login = (req, res) =>{
  res.json({ok: 'Login'})
}

export const register = (req, res) =>{
  res.json({ok: 'Register'})
}
