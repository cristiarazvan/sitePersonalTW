document.addEventListener("DOMContentLoaded", () => {
    if (
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname.endsWith("/")
    ) {
        const meteorsEnabled =
            localStorage.getItem("homePageMeteorsEnabled") !== "false";
        const cubeEnabled =
            localStorage.getItem("homePageCubeEnabled") !== "false";
        const quotesEnabled =
            localStorage.getItem("homePageQuotesEnabled") !== "false";

        if (meteorsEnabled) {
            window.meteorInterval = setInterval(createMeteor, 500);
        } else {
            clearInterval(window.meteorInterval);
            document.querySelectorAll(".meteor").forEach((el) => el.remove());
        }

        const cube = document.querySelector(".cube");
        if (cube && !cubeEnabled) {
            const style = getComputedStyle(cube);
            if (style.display !== "none") {
                cube.style.display = "none";
            }
        }

        const quoteContainer = document.querySelector("#quote-container");
        if (quoteContainer && !quotesEnabled) {
            const style = getComputedStyle(quoteContainer);
            if (style.display !== "none") {
                quoteContainer.style.display = "none";
            }
        }
    }
    loadRandomQuote();
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            const fullName = document.getElementById("fullName").value.trim();
            const phoneNumber = document
                .getElementById("phoneNumber")
                .value.trim();

            const namePattern = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
            const phonePattern = /^\+40\d{9}$/;

            let isValid = true;
            let errorMessage = "";

            if (!namePattern.test(fullName)) {
                isValid = false;
                errorMessage +=
                    "Full Name must have two words starting with capital letters.\n";
            }

            if (phoneNumber && !phonePattern.test(phoneNumber)) {
                isValid = false;
                errorMessage +=
                    "Phone Number must start with +40 and be followed by 9 digits.\n";
            }

            if (!isValid) {
                event.preventDefault();
                alert(errorMessage);
            }
        });
    }
    updateAdminOptions();
});

async function loadRandomQuote() {
    const quoteContainer = document.getElementById("quote-container");
    if (quoteContainer) {
        try {
            const response = await fetch("./quotes.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const quotes = data.quotes;
            const randomQuote =
                quotes[Math.floor(Math.random() * quotes.length)];

            const quoteText = document.getElementById("quote-text");
            const quoteAuthor = document.getElementById("quote-author");

            if (quoteText && quoteAuthor && randomQuote) {
                quoteText.textContent = `"${randomQuote.text}"`;
                quoteAuthor.textContent = `- ${randomQuote.author}`;
            }
        } catch (error) {
            console.error("Error loading quote:", error);
            const quoteText = document.getElementById("quote-text");
            const quoteAuthor = document.getElementById("quote-author");
            if (quoteText && quoteAuthor) {
                quoteText.textContent =
                    '"Code is like poetry; it should be simple yet powerful."';
                quoteAuthor.textContent = "- Anonymous";
            }
        }
    }
}

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

if (cursorDot && cursorOutline) {
    let mouseX = 0,
        mouseY = 0;
    let dotX = 0,
        dotY = 0;
    let outlineX = 0,
        outlineY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorDot.style.transform = `translate(${mouseX - 4}px, ${
            mouseY - 4
        }px)`;
        cursorOutline.style.transform = `translate(${outlineX - 20}px, ${
            outlineY - 20
        }px)`;

        requestAnimationFrame(animate);
    }
    animate();
}

//LOGIN PART

let userData = null;

//Fetch
document.addEventListener("DOMContentLoaded", function () {
    fetchUserData();
    checkLoginStatus();

    if (document.getElementById("quote-container")) {
        loadRandomQuote();
    }
});

// Fetch
async function fetchUserData() {
    const response = await fetch("users.json");
    const data = await response.json();
    userData = data.users[0];
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const loginForm = document.getElementById("loginForm");
    const welcomeMessage = document.getElementById("welcomeMessage");

    if (loginForm && welcomeMessage) {
        if (isLoggedIn === "true") {
            loginForm.parentElement.style.display = "none";
            welcomeMessage.style.display = "block";
        } else {
            loginForm.parentElement.style.display = "block";
            welcomeMessage.style.display = "none";
        }
    }

    updateNavigation(isLoggedIn === "true");
}

async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    const errorMessage = document.getElementById("errorMessage");

    if (!userData) {
        await fetchUserData();
    }

    if (email === userData.email && password === userData.password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        errorMessage.textContent = "";
        checkLoginStatus();
        updateAdminOptions();
    } else {
        // Fail
        errorMessage.textContent = "Invalid email or password";
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
    }

    return false;
}

function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    checkLoginStatus();
    updateAdminOptions();
}

function updateNavigation(isLoggedIn) {
    const menuItems = document.querySelectorAll(".menu li, .dropdown li");

    menuItems.forEach((item) => {
        if (item.querySelector("a").href.includes("skillsSettings.html")) {
            item.style.display = isLoggedIn ? "block" : "none";
        }
    });
}

function createMeteor() {
    const meteor = document.createElement("div");
    const size = Math.random() * 10 + 5;
    const startX = Math.random() * window.innerWidth;
    const delay = Math.random() * 2 + 1;

    const colors = [
        "rgba(49, 81, 30, 0.8)",
        "rgba(133, 159, 61, 0.8)",
        "rgba(26, 2, 2, 0.8)",
        "rgba(139, 138, 145, 0.8)",
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    meteor.classList.add("meteor");
    meteor.style.width = `${size}px`;
    meteor.style.height = `${size}px`;
    meteor.style.left = `${startX}px`;
    meteor.style.top = `-50px`;
    meteor.style.backgroundColor = randomColor;
    meteor.style.animationDuration = `${Math.random() * 3 + 3}s`;
    meteor.style.animationDelay = `${Math.random()}s`;

    meteor.style.boxShadow = `0 0 ${Math.random() * 15 + 10}px ${randomColor}`;

    document.body.appendChild(meteor);

    setTimeout(() => {
        meteor.style.opacity = 0;
        setTimeout(() => meteor.remove(), 500);
    }, parseFloat(meteor.style.animationDuration) * 1000);
}

// setInterval(createMeteor, 500);

function updateAdminOptions() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const adminOptions = document.querySelectorAll(".admin-option");

    adminOptions.forEach((option) => {
        option.style.display = isLoggedIn ? "block" : "none";
    });
}
