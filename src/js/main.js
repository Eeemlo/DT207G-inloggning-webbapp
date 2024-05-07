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
            localStorage.setItem("token: ", data.token); //Lagra token
            window.location.href = "/protected.html" //Omdirigera användaren till skyddad route

        } catch(error) {
            console.error("Fel vid inloggning: " + error.message)
            // LÄGG TILL KOD FÖR ATT HANTERA FELAKTIG INLOGGNING
        }
    });
