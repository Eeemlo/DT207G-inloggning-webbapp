// Url till API
let url = "http://localhost:3002/api"

// Hämta formulärets element
const loginForm = document.querySelector("#signInForm");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const loginBtn = document.querySelector("#loginBtn");

// Eventlyssnare för att logga in användare
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Hämta värden från login-formulär
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Lägg in kontroller för användarnamn och lösenord

    // Skicka formulär med fetch API
    try {
        const response = await fetch(url + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        
        //Felmeddelande i konsolen om inloggning ej lyckas
            if (!response.ok) {
                throw new Error ("Inloggningen misslyckades!");
            }

            //Lyckad inloggning
            const data = await response.json();
            console.log(data.response.token);
            localStorage.setItem("token", data.response.token); //Lagra token
            window.location.href = "/protected.html" //Omdirigera användaren till skyddad route

        } catch(error) {
            console.error("Fel vid inloggning: " + error.message)
            // LÄGG TILL KOD FÖR ATT HANTERA FELAKTIG INLOGGNING
        }
    });

    // Funktion för att hämta token från localStorage
function getToken() {
    return localStorage.getItem("token");
}

// Funktion för att göra fetch-anrop till den skyddade routen med token i header
async function fetchData() {
    try {
        const token = localStorage.getItem("token");

        const response = await fetch(url + "/protected", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Kunde inte hämta data från den skyddade routen!");
        }

        const data = await response.json();
        console.log("Skyddad data:", data);
    } catch (error) {
        console.error("Fel vid hämtning av skyddad data:", error.message);
    }
}

// Anropa funktionen för att hämta skyddad data när sidan laddas
fetchData();
