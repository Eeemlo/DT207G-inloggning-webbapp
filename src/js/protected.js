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
};
