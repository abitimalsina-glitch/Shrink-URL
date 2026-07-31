import { isValidUrl } from "../utils/validateUrl.js";
import AppError from "../utils/AppError.js";

export const validateShortenRequest = (req, res, next) => {
    const { url } = req.body;

    if (!url) {
        return next(new AppError("URL is required", 400));
    }
    if (!isValidUrl(url)) {
        return next(new AppError("Invalid URL", 400));
    }

    next();
};