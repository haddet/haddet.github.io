document.addEventListener("DOMContentLoaded", () => {
    const screen1 = document.getElementById("screen-1");
    const screen2 = document.getElementById("screen-2");
    const screen3 = document.getElementById("screen-3");
    const screen4 = document.getElementById("screen-4");
    const btnStart = document.getElementById("btn-start");
    const btnToPuzzle = document.getElementById("btn-to-puzzle");
    const btnCheckPuzzle = document.getElementById("btn-check-puzzle");
    const btnToFinal = document.getElementById("btn-to-final");
    const btnRestart = document.getElementById("btn-restart");
    const puzzleInput = document.getElementById("puzzle-input");
    const puzzleError = document.getElementById("puzzle-error");
    const puzzleSuccess = document.getElementById("puzzle-success");
    const btnLoveYes = document.getElementById("btn-love-yes");
    const btnLoveNo = document.getElementById("btn-love-no");
    const heartsContainer = document.getElementById("hearts-container");
    const btnStartMemories = document.getElementById("btn-start-memories");
    const memoryTimeline = document.getElementById("memory-timeline");
    const nextMemButtons = document.querySelectorAll(".btn-next-mem");
    function switchScreen(fromScreen, toScreen) {
        fromScreen.classList.remove("active");
        fromScreen.classList.add("hidden");
        
        setTimeout(() => {
            toScreen.classList.remove("hidden");
            toScreen.classList.add("active");
        }, 500); 
    }

    btnStart.addEventListener("click", () => {
        const loader = document.getElementById("loader");
        const music = document.getElementById("bg-music");
        if (music) {
            music.volume = 0.1; 
            music.play().catch(err => console.log("Браузер заблокировал автозвук:", err));
        }
        btnStart.classList.add("hidden");
        loader.classList.remove("hidden");
        setTimeout(() => {
            switchScreen(screen1, screen2);
        }, 2000);
    });
    
    btnToPuzzle.addEventListener("click", () => {
        switchScreen(screen2, screen3);
    });
    btnCheckPuzzle.addEventListener("click", () => {
        const userAnswer = puzzleInput.value.trim().toLowerCase();
        const correctFinalAnswer = "никита"; 

        if (userAnswer === correctFinalAnswer) {
            puzzleError.classList.add("hidden");
            puzzleSuccess.classList.remove("hidden");
            btnCheckPuzzle.classList.add("hidden");
            btnToFinal.classList.remove("hidden");
            puzzleInput.disabled = true; 
        } else {
            puzzleError.classList.remove("hidden");
            const currentCard = screen3.querySelector(".glass-card");
            currentCard.style.transform = "translateX(10px)";
            setTimeout(() => currentCard.style.transform = "translateX(-10px)", 100);
            setTimeout(() => currentCard.style.transform = "translateX(0)", 200);
        }
    });

    btnToFinal.addEventListener("click", () => {
        switchScreen(screen3, screen4);
    });

    btnLoveNo.addEventListener("mouseover", () => {
    
        const x = Math.random() * 120 - 60;
        const y = Math.random() * 60 - 30;
        btnLoveNo.style.transform = `translate(${x}px, ${y}px)`;
    });

    btnLoveNo.addEventListener("click", () => {
        alert("упси, эта кнопка сломалась (Error 404: Option Not Found)! попробуй другую(");
    });

    function spawnHearts() {
        const heartIcons = ["❤️", "💖", "🥰", "✨", "💕"];
        for (let i = 0; i < 40; i++) {
            setTimeout(() => {
                const heart = document.createElement("div");
                heart.classList.add("falling-heart");
                heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
                
                heart.style.left = Math.random() * 100 + "vw";
                heart.style.animationDuration = Math.random() * 2 + 2 + "s"; // от 2 до 4 секунд
                heart.style.opacity = Math.random();
                
                heartsContainer.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 4000);
            }, i * 100);
        }
    }

    btnLoveYes.addEventListener("click", () => {
        spawnHearts();
        btnLoveNo.style.transform = "translate(0, 0)";
        alert("я так и знала, хехе, потому что тебя тоже очень люблю)");
    });

    btnStartMemories.addEventListener("click", () => {
        btnStartMemories.classList.add("hidden");
        memoryTimeline.classList.remove("hidden");
    });
    nextMemButtons.forEach(button => {
        button.addEventListener("click", () => {
            const nextIndex = button.getAttribute("data-next");
            const currentCard = button.closest(".mem-card");
            const nextCard = document.getElementById(`mem-card-${nextIndex}`);
            currentCard.classList.add("hidden");
            spawnHearts(); 
            if (nextCard) {
                nextCard.classList.remove("hidden");
            }
        });
    });
    btnRestart.addEventListener("click", () => {
        puzzleInput.disabled = false;
        puzzleInput.value = "";
        puzzleSuccess.classList.add("hidden");
        btnToFinal.classList.add("hidden");
        btnCheckPuzzle.classList.remove("hidden");
        btnStartMemories.classList.remove("hidden");
        memoryTimeline.classList.add("hidden");
        document.querySelectorAll(".mem-card").forEach((card, idx) => {
            if (idx === 0) card.classList.remove("hidden");
            else card.classList.add("hidden");
        });
        btnStart.classList.remove("hidden");
        document.getElementById("loader").classList.add("hidden");
        switchScreen(screen4, screen1);
    });
});
