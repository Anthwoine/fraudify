const loginBtn = document.querySelector(".login-btn");


loginBtn.addEventListener("click", async function (event) {
    console.log('login');
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    const result = await fetch("/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    const data = await result.json();
    const token = data.access_token;
    setCookie("token", token, 0.5/48); //15 minutes
});


// Fonction pour définir un cookie
function setCookie(cookieName, cookieValue, expirationDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000)); // Convertir les jours en millisecondes
  
    const expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    console.log("cookie: ", document.cookie);
}

// Fonction pour supprimer un cookie en fixant sa date d'expiration antérieure
function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
