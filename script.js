/* =========================================================
   VARIABLES
========================================================= */

const letter = document.getElementById("letter");

const letterScreen =
    document.getElementById("letterScreen");

const birthdayScreen =
    document.getElementById("birthdayScreen");

const cakeScreen =
    document.getElementById("cakeScreen");

const finalScreen =
    document.getElementById("finalScreen");

const cakeButton =
    document.getElementById("cakeButton");

const candles =
    document.querySelectorAll(".candle");

const counter =
    document.querySelector("#counter span");


/* =========================================================
   OUVERTURE DE LA LETTRE
========================================================= */

let letterOpened = false;

letter.addEventListener("click", () => {

    if (letterOpened) return;

    letterOpened = true;

    letter.classList.add("open");

    /*
        On attend que l'animation
        de la lettre soit terminée.
    */

    setTimeout(() => {

        letterScreen.classList.remove("active");

        birthdayScreen.classList.add("active");

        startFireworks();

    }, 1300);

});


/* =========================================================
   BOUTON → GÂTEAU
========================================================= */

cakeButton.addEventListener("click", () => {

    birthdayScreen.classList.remove("active");

    setTimeout(() => {

        cakeScreen.classList.add("active");

    }, 500);

});


/* =========================================================
   BOUGIES
========================================================= */

let candlesRemaining = candles.length;


/*
    Chaque bougie est cliquable.
*/

candles.forEach((candle) => {

    candle.addEventListener("click", () => {

        if (candle.classList.contains("off")) {
            return;
        }

        candle.classList.add("off");

        candlesRemaining--;

        counter.textContent = candlesRemaining;

        /*
            Quand toutes les bougies
            sont éteintes...
        */

        if (candlesRemaining === 0) {

            setTimeout(() => {

                cakeScreen.classList.remove("active");

                setTimeout(() => {

                    finalScreen.classList.add("active");

                    createConfetti();

                }, 600);

            }, 1800);

        }

    });

});


/* =========================================================
   FEUX D'ARTIFICE
========================================================= */

const canvas =
    document.getElementById("fireworks");

const ctx =
    canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* créer un feu */

function createFirework(x, y) {

    const colors = [
        "#ffd166",
        "#ff6b6b",
        "#ffffff",
        "#8ecae6",
        "#ff9f1c",
        "#c77dff"
    ];

    const color =
        colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];

    for (let i = 0; i < 80; i++) {

        const angle =
            Math.random() *
            Math.PI *
            2;

        const speed =
            Math.random() * 6 + 2;

        particles.push({

            x: x,

            y: y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life: 100,

            color: color,

            size:
                Math.random() * 2 + 1

        });

    }
}


/* animation */

function animateFireworks() {

    ctx.fillStyle =
        "rgba(3, 5, 20, 0.20)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(
        (particle, index) => {

            particle.x += particle.vx;

            particle.y += particle.vy;

            particle.vy += 0.045;

            particle.vx *= 0.985;

            particle.vy *= 0.985;

            particle.life--;

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                particle.color;

            ctx.globalAlpha =
                particle.life / 100;

            ctx.fill();

            if (particle.life <= 0) {

                particles.splice(
                    index,
                    1
                );

            }

        }
    );

    ctx.globalAlpha = 1;

    requestAnimationFrame(
        animateFireworks
    );
}

animateFireworks();


/* lancement automatique */

function startFireworks() {

    let count = 0;

    const interval =
        setInterval(() => {

            const x =
                Math.random() *
                canvas.width;

            const y =
                Math.random() *
                canvas.height *
                0.55;

            createFirework(
                x,
                y
            );

            count++;

            if (count >= 12) {

                clearInterval(interval);

            }

        }, 450);

}


/* =========================================================
   CONFETTIS FINAUX
========================================================= */

function createConfetti() {

    const container =
        document.querySelector(".confetti");

    for (let i = 0; i < 80; i++) {

        const piece =
            document.createElement("span");

        piece.style.position =
            "absolute";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.top =
            Math.random() * -100 + "px";

        piece.style.width =
            Math.random() * 8 + 5 + "px";

        piece.style.height =
            Math.random() * 15 + 7 + "px";

        piece.style.background =
            [
                "#ffd166",
                "#ff6b6b",
                "#8ecae6",
                "#c77dff",
                "#ffffff"
            ][
                Math.floor(
                    Math.random() * 5
                )
            ];

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        piece.style.animation =
            `confettiPiece ${
                Math.random() * 3 + 3
            }s linear infinite`;

        piece.style.animationDelay =
            Math.random() * 3 + "s";

        container.appendChild(piece);

    }
}


/* animation confetti */

const style =
    document.createElement("style");

style.innerHTML = `

@keyframes confettiPiece {

    0% {
        transform:
            translateY(-100px)
            rotate(0deg);
        opacity: 1;
    }

    100% {
        transform:
            translateY(110vh)
            rotate(720deg);
        opacity: .2;
    }

}

`;

document.head.appendChild(style);