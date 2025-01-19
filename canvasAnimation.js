document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("matrixCanvas");
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    const characters =
        "アイウエオカキクケコサシスセタチツテトナヌネノハヒフヘマミムメモヤユヨラリルレロワヲン";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const a = [];

    for (let x = 0; x < columns; x++) {
        a[x] = 1;
    }

    let speed = 1;
    let ac = "normal";
    let aId;

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#31511e";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < a.length; i++) {
            const text = characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
            ctx.fillText(text, i * fontSize, a[i] * fontSize);
            if (a[i] * fontSize > canvas.height && Math.random() > 0.975) {
                a[i] = 0;
            }
            a[i] += speed;
        }

        aId = requestAnimationFrame(draw);
    }

    document.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();
        switch (key) {
            case "s":
                if (ac !== "fast") {
                    speed = 0.8;
                    ac = "fast";
                    canvas.classList.remove("slow");
                    canvas.classList.add("fast");
                }
                break;
            case "w":
                if (ac !== "slow") {
                    speed = 0.3;
                    ac = "slow";
                    canvas.classList.remove("fast");
                    canvas.classList.add("slow");
                }
                break;
        }
    });

    draw();
});
