import { body } from "express-validator"
import { GroupStatus } from "../../../shared/enums/GroupStatus.enum";
import { GroupPrivacy } from "../../../shared/enums/GroupPrivacy.enum";

export const validateCreateGroup = () => {
    return [
        body("categoryId").notEmpty(),
        body("image").custom((value, { req }) => {
            if (!req.file)
                throw new Error("image can't be empty");
            return true;
        }),
        body("status")
            .notEmpty()
            .isIn(Object.values(GroupStatus)),
        body("privace")
            .notEmpty()
            .isIn(Object.values(GroupPrivacy)),
        body("categoryId")
            .notEmpty()
            .isInt()
    ]
};

export const validateUpdateGroup = () => {
    return [
        body("privace")
        .optional()
        .notEmpty()
        .isIn(Object.values(GroupPrivacy)),
        body("status")
        .optional()
        .notEmpty()
        .isIn(Object.values(GroupStatus)),
        body("name")
        .optional()
        .notEmpty()
    ]
}