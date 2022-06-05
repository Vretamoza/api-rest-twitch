import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import {body} from 'express-validator';
const router = express.Router();
import {validationResultExpress} from "../middlewares/validationResultExpress.js";

router.post('/register', [
  body('email', 'Formato de email incorrecto')
  .trim()
  .isEmail()
  .normalizeEmail(),
  body('password', 'Formato de password incorrecta')
  .trim()
  .isLength({min: 6})
  .custom((value, {req}) => {
    if(value !==  req.body.repassword){
      throw new Error('Las contraseñas no coinciden');
    }
    return value;
  })
],validationResultExpress,register)

router.post('/login',[
  body('email', 'Formato de email incorrecto')
  .trim()
  .isEmail()
  .normalizeEmail(),
  body('password', 'Minimo 6 caracteres').trim().isLength({min: 6}),
],
validationResultExpress,
login);

export default router;
