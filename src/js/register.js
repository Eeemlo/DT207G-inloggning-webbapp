"use strict";

const url = "http://localhost:3002/api";

async function getData() {
    const response = await fetch(url + "/users");
    const data = await response.json();
    console.log(data);
}

getData();

// Hämta formulärets element
const registerForm = document.querySelector("#registerForm");
const addUsername = document.querySelector("#addUsername");
const addPassword = document.querySelector("#addPassword");
const controlPassword = document.querySelector("#controlPassword");

//Hämta containrar för felmeddelanden i formulär
const usernameError = document.querySelector("#usernameError");
const passwordError = document.querySelector("#passwordError");
const controlError = document.querySelector("#controlError");

// Reguljära uttryck för att kontrollera lösenordets komplexitet
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;

//Funktion för att kontrollera lösenordets komplexitet
function checkPasswordComplexity(password) {
    return passwordRegex.test(password);
}

//Eventlyssnare som kontrollerar att lösenorden som anges vid registrering är lika
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

//Eventlyssnare som kontrollerar att användarnamnet är unikt och innehåller minst fem tecken
addUsername.addEventListener("input", async () => {
    const username = addUsername.value;
    try {
        const response = await fetch(url + "/users/user?username=" + username);
        const data = await response.json();

        // Ge felmeddelande om användarnamnet existerar
        if (data.exists) {
            usernameError.innerHTML = "Användarnamnet är upptaget";
        } else {
            usernameError.innerHTML = "";
        }

        // Ge felmeddelande om användarnamnet är kortare än 5 tecken
        if (username.length < 5) {
            usernameError.innerHTML =
                "Användarnamnet måste bestå av minst fem tecken";
        } else {
            usernameError.innerHTML = "";
        }
    } catch (error) {
        "Fel vid kontroll av användarnamn:", error;
    }
});

//Eventlyssnare som skickar en POST-förfrågan vid klick på "registrera"
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Array som lagrar input-elementen för username och password
    const inputs = [addUsername, addPassword, controlPassword];

    const username = addUsername.value;
    const password = addPassword.value;

    // Objekt med användarnamn och lösenord
    const credentials = {
        username: username,
        password: password,
    };

    try {
        // Skicka post-förfrågan till servern
        const response = await fetch(url + "/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }

    // Återställ formulärfält
    inputs.forEach(input => input.value = "");

    window.location.href = "index.html";
});
