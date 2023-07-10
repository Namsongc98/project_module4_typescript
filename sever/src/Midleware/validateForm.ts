import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from 'express';

const validatorRegister = [
  // validator Email
  check("email")
    .notEmpty()
    .withMessage("Vui lòng nhập Email")
    .custom((value) => {
      if (value.includes(" "))
        throw new Error(
          "Vui lòng kiểm tra lại định dạng Email không chứa đấu cách "
        );
      return true;
    })
    .isEmail()
    .withMessage("vui lòng nhập đúng định đạng Email ví dụ example@gmail.com")
    .isLength({ min: 15, max: 50 })
    .withMessage("Trường Email cần ít nhất 15 đến 50 kí tự"),
  // validator pasword
  check("password")
    .notEmpty()
    .withMessage("Vui lòng nhập password")
    .custom((value) => {
      if (value.includes(" "))
        throw new Error(" Mật khẩu không chứa dấu cách ");
      return true;
    })
    .isLength({ min: 6, max: 20 })
    .withMessage(" Password cần  chứa 6 - 20 kí tự "),
  check("role").exists(),
];




// login 
const validateLogin = [
  check("email")
    .notEmpty()
    .withMessage("Vui lòng nhập email")
    .custom((value) => {
      if (value.includes(" "))
        throw new Error(
          "Vui lòng kiểm tra lại định dạng Email không chứa đấu cách "
        );
      return true;
    })
    .isEmail()
    .withMessage("vui lòng nhập đúng định đạng Email ví dụ example@gmail.com")
    .isLength({ min: 15, max: 40 })
    .withMessage("Trường Email cần ít nhất 15 đến 40 kí tự"),
  // validator pasword
  check("password")
    .notEmpty()
    .withMessage("Vui lòng nhập password")
    .custom((value) => {
      if (value.includes(" "))
        throw new Error("Vui lòng kiểm tra lại, mật khẩu không chứa dấu cách ");
      return true;
    })
    .isLength({ min: 6, max: 20 })
    .withMessage("Trường passwordcần  chứa 6 - 20 kí tự "),
];

const validateResult = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty())
      return res.status(400).json({
        status: 400,
        message: errors.array()[0].msg,
      });
    next();
  };

export { validatorRegister, validateResult, validateLogin };
