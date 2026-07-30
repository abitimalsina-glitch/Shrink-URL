export const isValidUrl = (url) => {
    if (typeof url !== "string") {
        return false;
    }
    try {
        const parsedUrl = new URL(url);
        return (
            parsedUrl.protocol === "http:" ||
            parsedUrl.protocol === "https:"
        );
    } catch {
        return false;
    }
};