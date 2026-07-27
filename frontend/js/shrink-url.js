const form = document.getElementById("url-form");
const resultSection = document.getElementById("result");
const shortUrlInput = document.getElementById("short-url");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const shortUrl = "http://localhost:3000/abc123"; //just an example

    shortUrlInput.value = shortUrl;

    resultSection.hidden = false;
});