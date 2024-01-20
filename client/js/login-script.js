import { SnackbarBuilder } from "./class/snackbar.js";
import { setCookie } from "./utils.js";

const loginUsername = document.querySelector(".login-username");
const loginPassword = document.querySelector(".login-password");
const loginButton = document.querySelector(".login-button");


const signupUsername = document.querySelector(".signup-username");
const signupPassword = document.querySelector(".signup-password");
const signupConfirmPassword = document.querySelector(".signup-confirm-password");
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
    const password = signupPassword.value;
    const confirmPassword = signupConfirmPassword.value;
    
    

    if(!username || !password || !confirmPassword) {
        const snackbar = new SnackbarBuilder("Please enter all fields")
            .buildWarning()
            .render(document.querySelector(".snackbar-container"));
        return;

    } else if(password !== confirmPassword) {
        const snackbar = new SnackbarBuilder("Passwords do not match")
            .buildWarning()
            .render(document.querySelector(".snackbar-container"));
        return
    }
    
    const result = await signup(username,password);
    console.log("signup result: ", result);
    if(!result) {
        const snackbar = new SnackbarBuilder("Account creation failed")
            .buildError()
            .render(document.querySelector(".snackbar-container"));
    } else if(result.status === 200) {
        const snackbar = new SnackbarBuilder("Account created successfully")
            .buildSuccess()
            .render(document.querySelector(".snackbar-container"));
    } else if (result.status === 409) {
        const snackbar = new SnackbarBuilder("Username already exists")
            .buildWarning()
            .render(document.querySelector(".snackbar-container"));
    } else {
        const snackbar = new SnackbarBuilder("Account creation failed")
            .buildError()
            .render(document.querySelector(".snackbar-container"));
    }
});





loginButton.addEventListener("click", async () => {
    console.log("login button clicked");

    const username = loginUsername.value;
    const password = loginPassword.value;

    if(!username || !password) {
        new SnackbarBuilder("Please enter all fields")
            .buildWarning()
            .render(document.querySelector(".snackbar-container"));
    } else {
        const result = await login(username, password);
        if(!result || result.status === 500) {
            new SnackbarBuilder("Login failed")
                .buildError()
                .render(document.querySelector(".snackbar-container"));
            return
        } else if (result.status === 404) {
            new SnackbarBuilder("User not found")
                .buildWarning()
                .render(document.querySelector(".snackbar-container"));
            return
        } else {
            const data = await result.json();
            setCookie("token", data.token, 1);
            setCookie("username", data.username, 1);
            setCookie("id", data.id, 1);
            setCookie("role", data.role, 1);

            document.location.href = "/fraudify.html";
        }
    }
});











const signup = async (username, password) => {
    try {
        const payload = {username, password};

        const result = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        return result;
        
    } catch(err) {
        return null;
    }
};

const login = async (username, password) => {
    try {
        const result = await fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        return result;

    } catch(err) {
        console.log(err);
        return;
    }
};


