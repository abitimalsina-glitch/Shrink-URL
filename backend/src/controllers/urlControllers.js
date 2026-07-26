import crypto from "crypto";

export const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({
                message: "URL is required"
            });
        }

        if (!isValidUrl(url)) {
            return res.status(400).json({
                message: "Invalid URL"
            });
        }
    }

    catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export const redirectToOriginalUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;
    } 

    catch (error) {
        res.status(500).json({
            message: "Internal Sever Error"
        });
    }
    
}