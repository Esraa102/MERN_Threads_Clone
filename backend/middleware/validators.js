import { body, validationResult } from "express-validator";

export const validators = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      console.log("result ===>", result);
      if (result.errors.length > 0) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      return res.status(422).json({ status: "Error", message: errors.array() });
    }
  };
};
export const logInValidation = [
  body("email").notEmpty().isEmail().withMessage("Please Provide Valid Email"),
  body("password")
    .notEmpty()
    .isLength({ min: 8, max: 20 })
    .withMessage(
      " password should be at least 8 characters and can't be more than 20 characters"
    ),
];

export const registerValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Please Provide Your Full Name"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Please Provide Your Username"),
  ...logInValidation,
];

export const postValidation = [
  body("content")
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 3000 })
    .withMessage(
      "Post content should be at least 1 character and can't be greater than 3000 characters"
    ),
];

export const commentValidation = [
  body("text")
    .trim()
    .notEmpty()
    .isLength({ min: 1, max: 500 })
    .withMessage(
      "A comment should be at least 1 character and can't be greater than 500 characters"
    ),
];
