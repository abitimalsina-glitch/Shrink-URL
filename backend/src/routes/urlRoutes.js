import express from 'express'
import {createShortUrl, redirectToOriginalUrl,} from '../controllers/urlControllers.js'
import { validateShortenRequest } from '../middleware/validationMiddleware.js'

const router = express.Router();

router.post("/shorten", validateShortenRequest, createShortUrl);

router.get("/:shortCode", redirectToOriginalUrl);

export default router;