import Url from "../models/urlModel.js";
import { isValidUrl } from "../utils/validateUrl.js";
import AppError from "../utils/AppError.js";
import crypto from "crypto";


export const createShortUrl = async (req, res, next) => {
    try {
        const { url } = req.body;
        if (!url) {
            return next(new AppError("URL is required", 400));
        }
        if (!isValidUrl(url)) {
            return next(new AppError("Invalid URL", 400));
        }

        const normalizedUrl = url.trim().toLowerCase();

        const existingUrl = await Url.findOne({
            originalUrl: normalizedUrl
        });
        if (existingUrl) {
            return res.status(200).json({
                success: true,
                data: {
                    ...existingUrl.toObject(),
                    shortUrl: `${req.protocol}://${req.get("host")}/${existingUrl.shortCode}`
                }
            });
        }

        let shortCode;
        do {
            shortCode = crypto
                .randomBytes(4)
                .toString("hex");

        }while (
            await Url.exists({ shortCode })
        );

        const newUrl = await Url.create({
            originalUrl: normalizedUrl,
            shortCode
        });

        return res.status(201).json({
            success: true,
            message: "Short URL created successfully",

            data: {
                ...newUrl.toObject(),
                shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`
            }
        });
    } catch (error) {
        next(error);
    }
};

export const redirectToOriginalUrl = async (req, res, next) => {

    try {

        const { shortCode } = req.params;

        const url = await Url.findOne({
            shortCode
        });
        if (!url) {
            return next(new AppError("Short URL not found", 404));
        }
        await Url.findOneAndUpdate(
            { shortCode },
            {
                $inc: {
                    clicks: 1
                }
            }
        );
        return res.redirect(url.originalUrl);
    } catch (error) {
        next(error);
    }
};