const form = document.getElementById("url-form");
const urlInput = document.getElementById("url-input");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/url/shorten", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            url: urlInput.value,
        }),
    });

    const data = await response.json();

    sessionStorage.setItem("shortenedUrl", JSON.stringify(data));

    window.location.href = "result.html";
});