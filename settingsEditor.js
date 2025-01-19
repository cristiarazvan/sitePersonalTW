document.addEventListener("DOMContentLoaded", () => {
    const toggles = {
        meteors: document.getElementById("toggleMeteors"),
        cube: document.getElementById("toggleCube"),
        quotes: document.getElementById("toggleQuotes"),
    };

    const states = {
        meteors: localStorage.getItem("homePageMeteorsEnabled") !== "false",
        cube: localStorage.getItem("homePageCubeEnabled") !== "false",
        quotes: localStorage.getItem("homePageQuotesEnabled") !== "false",
    };

    Object.entries(toggles).forEach(([key, btn]) => {
        if (btn) {
            updateButtonState(btn, states[key]);

            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const isEnabled = !states[key];
                states[key] = isEnabled;
                updateButtonState(btn, isEnabled);
                localStorage.setItem(
                    `homePage${
                        key.charAt(0).toUpperCase() + key.slice(1)
                    }Enabled`,
                    isEnabled
                );
            });
        }
    });
});

function updateButtonState(button, isEnabled) {
    const status = button.querySelector(".toggle-status");
    status.textContent = isEnabled ? "ON" : "OFF";
    button.classList.toggle("disabled", !isEnabled);
}
