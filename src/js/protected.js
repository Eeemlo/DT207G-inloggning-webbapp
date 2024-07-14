const apiUrl = "https://authorization-server-1.onrender.com/api";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    const token = localStorage.getItem("token"); // Kontrollera om giltig token finns i localStorage

    if (!token) {
        window.location.href = "index.html"; // Omdirigera till inloggningssidan om token saknas
    } else {
        try {
            const data = await fetchProtectedData(token); // Hämta skyddad data
            displayProtectedContent(data); // Visa skyddat innehåll
        } catch (error) {
            console.error("Fel vid hämtning av skyddad data:", error.message);
            logoutUser(); // Logga ut användaren vid fel
        }
    }
}

// Funktion för att hämta skyddad data från servern
async function fetchProtectedData(token) {
    const response = await fetch(`${apiUrl}/protected`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`, // Skicka token i Authorization-header
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Kunde inte hämta skyddad data");
    }

    return await response.json(); // Returnera skyddad data som JSON
}

// Funktion för att visa skyddat innehåll på sidan
function displayProtectedContent(data) {
    const actualContent = document.getElementById("actualContent");
    actualContent.removeAttribute("hidden"); // Ta bort hidden-attributet för att visa innehållet

    // Skriv ut användarnamn till DOM
    const usernameContainer = document.getElementById("usernameContainer");
    usernameContainer.innerHTML = `<h1>Inloggad som: ${data.username}</h1>`;
}

// Funktion för att logga ut användaren
function logoutUser() {
    localStorage.removeItem("token"); // Ta bort token från localStorage
    window.location.href = "index.html"; // Omdirigera till inloggningssidan
}

document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.querySelector("#logoutBtn");

    logoutBtn.addEventListener("click", () => {
        logoutUser(); // Logga ut användaren när knappen klickas
    });

    getCatData(); // Hämta kattdata från API
});

// Funktion för att hämta kattdata från API
async function getCatData() {
    try {
        const response = await fetch(
            "https://api.thecatapi.com/v1/images/search?api_key=live_cUJHzVEOks0Jqa0JXyWbECsNxJ1dechADhyDbeD5saymameaaSQYnHdGyLsvdRvG"
        );
        const data = await response.json();
        displayCatImage(data); // Visa kattbild på sidan
    } catch (error) {
        console.error("Fel vid hämtning av kattbilder:", error.message);
    }
}

// Funktion för att visa kattbild på sidan
function displayCatImage(data) {
    const catImageContainer = document.querySelector("#catImageContainer");
    catImageContainer.innerHTML = `<img class="cat" src="${data[0].url}" alt="random kattbild">`;
}
