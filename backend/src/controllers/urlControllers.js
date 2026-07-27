import Url from "../models/urlModel.js";
import { isValidUrl } from "../utils/validateUrl.js";
import crypto from "crypto";

export const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({
                success: false,
                message: "URL is required",
            });
        }
        if (!isValidUrl(url)) {
            return res.status(400).json({
                success: false,
                message: "Invalid URL",
            });
        }
        const existingUrl = await Url.findOne({ originalUrl: url });

        if (existingUrl) {
            return res.status(200).json({
                success: true,
                data: existingUrl,
            });
        }

        let shortCode;
        let codeExists = true;
        
        while (codeExists) {
            shortCode = crypto.randomBytes(4).toString("hex");
            codeExists = await Url.exists({ shortCode });
        }

        const newUrl = await Url.create({
            originalUrl: url,
            shortCode,
        });
        return res.status(201).json({
            success: true,
            message: "Short URL created successfully",
            data: {
                ...newUrl.toObject(),
                shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const redirectToOriginalUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found",
            });
        }

        url.clicks += 1;
        await url.save();

        return res.redirect(url.originalUrl);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};