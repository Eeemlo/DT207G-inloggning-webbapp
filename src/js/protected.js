"use strict";

// Körs när DOM-trädet är helt laddat
document.addEventListener("DOMContentLoaded", init);

// Kontrollera om giltig token finns i localStorage
async function init() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "index.html";
    } else {
        // Hämta det innehåll som ska visas
        const actualContent = document.getElementById("actualContent");

        // Ta bort hidden-attributet när giltig token finns
        actualContent.removeAttribute("hidden");
    }
}

document.addEventListener("DOMContentLoaded", () => {
// Hämta knappen för utloggning
const logoutBtn = document.querySelector("#logoutBtn");

// Lägg till en händelselyssnare för utloggning
logoutBtn.addEventListener("click", () => {
    // Ta bort token från localStorage
    localStorage.removeItem("token");

    //Omdirigera till startsidan
    window.location.href = "index.html";
});


async function getCatData() {
    const response = await fetch("https://api.thecatapi.com/v1/images/search?api_key=live_cUJHzVEOks0Jqa0JXyWbECsNxJ1dechADhyDbeD5saymameaaSQYnHdGyLsvdRvG")
    const data = await response.json();

    displayCatImage(data);
}


async function displayCatImage(data) {
    const catImageContainer = document.querySelector("#catImageContainer");

    console.log(catImageContainer);
    catImageContainer.innerHTML = `<img class="cat" src="${data[0].url}" alt="random kattbild">`
}

getCatData();
});

