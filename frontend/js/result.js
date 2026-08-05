const response = JSON.parse(sessionStorage.getItem("shortenedUrl"));
const copyButton = document.getElementById("copy-button");
const shortUrlInput = document.getElementById("short-url");

if (!response) {
    window.location.href = "shrink-url.html";
}

const { shortUrl, originalUrl } = response.data;

document.getElementById("short-url").value = shortUrl;

const longUrl = document.getElementById("long-url");
longUrl.textContent = originalUrl;
longUrl.href = originalUrl;

copyButton.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(shortUrlInput.value);

        copyButton.textContent = "Copied!";

        setTimeout(() => {
            copyButton.textContent = "Copy URL";
        }, 2000);

    } catch (error) {
        console.error("Failed to copy:", error);
        copyButton.textContent = "Copy failed";
    }
});