const response = JSON.parse(sessionStorage.getItem("shortenedUrl"));

if (!response) {
    window.location.href = "shrink-url.html";
}

const { shortUrl, originalUrl } = response.data;

document.getElementById("short-url").value = shortUrl;

const longUrl = document.getElementById("long-url");
longUrl.textContent = originalUrl;
longUrl.href = originalUrl;