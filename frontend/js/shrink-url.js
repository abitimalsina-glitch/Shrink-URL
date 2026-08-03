const form = document.getElementById("url-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    window.location.href = "result.html";
});