import crypto from "crypto";
import Url from "../models/urlModel.js";
import AppError from "../utils/AppError.js";

const normalizeUrl = (url) => url.trim().toLowerCase();

const generateUniqueShortCode = async () => {
    let shortCode;
    do {
        shortCode = crypto.randomBytes(4).toString("hex");
    } while (await Url.exists({ shortCode }));
    return shortCode;
};

export const createShortenedUrl = async (url) => {
    const normalizedUrl = normalizeUrl(url);

    const existingUrl = await Url.findOne({ originalUrl: normalizedUrl });
    if (existingUrl) {
        return { urlDoc: existingUrl, isNew: false };
    }

    const shortCode = await generateUniqueShortCode();

    const newUrl = await Url.create({
        originalUrl: normalizedUrl,
        shortCode,
    });

    return { urlDoc: newUrl, isNew: true };
};

export const resolveShortCode = async (shortCode) => {
    const url = await Url.findOne({ shortCode });

    if (!url) {
        throw new AppError("Short URL not found", 404);
    }

    await Url.findOneAndUpdate(
        { shortCode },
        { $inc: { clicks: 1 } }
    );

    return url;
};