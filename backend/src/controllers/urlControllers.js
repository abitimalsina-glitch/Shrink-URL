import { createShortenedUrl, resolveShortCode } from "../services/urlServices.js";

export const createShortUrl = async (req, res, next) => {
    try {
        const { url } = req.body;

        const { urlDoc, isNew } = await createShortenedUrl(url);
        const shortUrl = `${req.protocol}://${req.get("host")}/${urlDoc.shortCode}`;

        return res.status(isNew ? 201 : 200).json({
            success: true,
            ...(isNew && { message: "Short URL created successfully" }),
            data: {
                ...urlDoc.toObject(),
                shortUrl,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const redirectToOriginalUrl = async (req, res, next) => {
    try {
        const { shortCode } = req.params;

        const url = await resolveShortCode(shortCode);

        return res.redirect(url.originalUrl);
    } catch (error) {
        next(error);
    }
};