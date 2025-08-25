import { body } from "express-validator";

export const createEmployeeRules = [
  body("full_name")
    .trim()
    .notEmpty()
    .withMessage("Full name is required"),

  body("contact_primary")
    .trim()
    .notEmpty()
    .withMessage("Primary contact is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("hiring_status")
    .optional()
    .isIn(["Fresher", "Experienced"])
    .withMessage("Hiring status must be Fresher or Experienced"),
];

export const updateEmployeeRules = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Valid email is required"),
];
