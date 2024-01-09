const loginEmail = document.querySelector(".login-email");
const loginPassword = document.querySelector(".login-password");
const loginButton = document.querySelector(".login-button");


const signupUsername = document.querySelector(".signup-username");
const signupEmail = document.querySelector(".signup-email");
const signupPassword = document.querySelector(".signup-password");
const signupButton = document.querySelector(".signup-button");


const signupPage = document.querySelector(".a-signup");
const passwordResetPage = document.querySelector(".a-password-reset");
const loginPage = document.querySelector(".a-login");


const signupForm = document.querySelector(".signup-form");
const loginForm = document.querySelector(".login-form");



signupPage.addEventListener("click", () => {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
});

loginPage.addEventListener("click", () => {
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
});

passwordResetPage.addEventListener("click", () => {
    console.log("Nothing here yet...");
});





signupButton.addEventListener("click", async () => {
    const username = signupUsername.value;
    const email = signupEmail.value;
    const password = signupPassword.value;
    
    if(!username || !password || !email) {
        alert("Please enter all fields");
        return;
    } else {
        console.log(username, email, password);
        await signup(username, email, password);
    }
});





loginButton.addEventListener("click", async () => {
    console.log("login button clicked");

    const email = loginEmail.value;
    const password = loginPassword.value;

    if(!email || !password) {
        alert("Please enter all fields");
        return;
    } else {
        await login(email, password);
    }
});











const signup = async (username, email, password) => {
    try {
        const payload = {username, email, password};

        const result = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await result.json();
        return;
        
    } catch(err) {
        console.log(err);
        return;
    }
};

const login = async (email, password) => {
    try {
        const result = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });

        const data = await result.json();
        setCookie("token", data.token, 1);
        window.location.href = "/player.html";
        return;

    } catch(err) {
        console.log(err);
        return;
    }
};


function setCookie(cookieName, cookieValue, expirationDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));

    const expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while(cookie.charAt(0) == " ") {
            cookie = cookie.substring(1);
        }
        if(cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}