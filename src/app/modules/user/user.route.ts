import express from 'express';
import { validationMiddleWare } from '../../middleware/validateRequest';
import { UserValidationSchema } from './user.zod.validation';
import { UserController } from './user.controller';
const router = express.Router();


router.route('/register')
        .post(validationMiddleWare(UserValidationSchema.createUserValidationSchema),
        UserController.registerUser
    )

export const UserRoute = router;