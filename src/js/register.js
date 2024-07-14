"use strict";

const url = "http://localhost:3001/api";

async function getData() {
    const response = await fetch(url + "/users");
    const data = await response.json();
}

getData();

// Hämta formulärets element
const registerForm = document.querySelector("#registerForm");
const addUsername = document.querySelector("#addUsername");
const addPassword = document.querySelector("#addPassword");
const controlPassword = document.querySelector("#controlPassword");

// Hämta containrar för felmeddelanden i formulär
const usernameError = document.querySelector("#usernameError");
const passwordError = document.querySelector("#passwordError");
const controlError = document.querySelector("#controlError");

// Reguljära uttryck för att kontrollera lösenordets komplexitet
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;

// Funktion för att kontrollera lösenordets komplexitet
function checkPasswordComplexity(password) {
    return passwordRegex.test(password);
}

// Eventlyssnare som kontrollerar att lösenorden som anges vid registrering är lika
controlPassword.addEventListener("input", () => {
    if (controlPassword.value !== addPassword.value) {
        controlError.innerHTML = "Lösenorden stämmer inte överens";
    } else {
        controlError.innerHTML = "";
    }
});

// Eventlyssnare som kontrollerar komplexitet på lösenorden
addPassword.addEventListener("input", () => {
    const password = addPassword.value;
    if (!checkPasswordComplexity(password) && password.length < 5) {
        passwordError.innerHTML =
            "Lösenordet bestå av minst fem tecken och innehålla minst en liten bokstav, en stor bokstav och ett specialtecken";
    } else {
        passwordError.innerHTML = "";
    }
});

// Eventlyssnare som skickar en POST-förfrågan vid klick på "registrera"
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = addUsername.value;
    const password = addPassword.value;

    // Kontrollera användarnamnet endast vid submit
    try {
        // Kontrollera om användarnamnet är upptaget
        const response = await fetch(url + "/users/user?username=" + username);
        const data = await response.json();

        if (data.exists) {
            usernameError.innerHTML = "Användarnamnet är upptaget";
            return; // Avbryt registrering om användarnamnet är upptaget
        } else {
            usernameError.innerHTML = "";
        }

        // Skicka post-förfrågan till servern om allt är OK
        const credentials = {
            username: username,
            password: password,
        };

        const registerResponse = await fetch(url + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const registerData = await registerResponse.json();
        console.log(registerData);

        // Återställ formulärfält
        addUsername.value = "";
        addPassword.value = "";
        controlPassword.value = "";


        // Omdirigera till login
        window.location.href = "index.html";

    } catch (error) {
        console.error("Error:", error);
    }
});