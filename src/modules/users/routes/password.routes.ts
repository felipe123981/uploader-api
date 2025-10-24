import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

/**
 * @swagger
 * tags:
 *   name: Password
 *   description: API endpoints for password recovery and reset
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ForgotPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User's registered email address
 *       example:
 *         email: user@example.com
 *
 *     ResetPasswordRequest:
 *       type: object
 *       required:
 *         - token
 *         - password
 *         - password_confirmation
 *       properties:
 *         token:
 *           type: string
 *           format: uuid
 *           description: Valid password reset token sent via email
 *         password:
 *           type: string
 *           format: password
 *           description: New password (min 6 chars recommended)
 *         password_confirmation:
 *           type: string
 *           format: password
 *           description: Must match the new password
 *       example:
 *         token: a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8
 *         password: newSecurePassword123
 *         password_confirmation: newSecurePassword123
 */

/**
 * @swagger
 * /password/forgot:
 *   post:
 *     summary: Request a password reset email
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       204:
 *         description: Email sent successfully (no content)
 *       400:
 *         description: Invalid email format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Email not found in the system
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);

/**
 * @swagger
 * /password/reset:
 *   post:
 *     summary: Reset password using a valid token
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       204:
 *         description: Password successfully reset (no content)
 *       400:
 *         description: Invalid input (e.g., token format, password mismatch)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
