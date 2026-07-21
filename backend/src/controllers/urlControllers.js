export const createShortUrl = async (req, res) => {
    const { url } = req.body;

    res.json({
        url,
    });
}

export const redirectToOriginalUrl = async (req, res) => {
    const { shortCode } = req.params;

    res.json({
        shortCode,
    });
}