const url = "https://authorization-server-1.onrender.com/api";

document.addEventListener("DOMContentLoaded", () => {
    // Hämta formulärets element
    const loginForm = document.querySelector("#signInForm");
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");
    const loginError = document.querySelector("#loginError");

    // Eventlyssnare för att logga in användare
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();  // Förhindra att formuläret skickas på vanligt sätt

        // Hämta värden från login-formulär
        const username = usernameInput.value;
        const password = passwordInput.value;

        try {
            // Skicka formulär med fetch API
            const response = await fetch(`${url}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),  // Skicka användarnamn och lösenord som JSON
            });

            // Felmeddelanden
            if (!response.ok) {    
                loginError.innerHTML = "Felaktigt användarnamn och/eller lösenord";
                throw new Error("Inloggningen misslyckades!");  // Skriv ut felmeddelande i konsolen
            }

            // Lyckad inloggning
            const data = await response.json();
            console.log(data.response.token);
            localStorage.setItem("token", data.response.token);  // Lagra token i localStorage
            window.location.href = "/protected.html";  // Omdirigera användaren till skyddad route
        } catch (error) {
            console.error("Fel vid inloggning: " + error.message);
        } 
    });
});