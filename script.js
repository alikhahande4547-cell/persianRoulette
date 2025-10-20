let players = [];
let currentIndex = 0;
let gameActive = false;


const BTN = document.getElementById("shoot-btn");
const TXT = document.getElementById("text");

function setupGame() {
    let num = parseInt(prompt("تعداد بازیکنان را وارد کنید"));
    if (isNaN(num) || num < 2) {
        alert("تعداد بازیکنان نمی تواند کمتر از دونفر باشد");
        return setupGame();
    }

    for (let i = 0; i < num; i++) {
        let name;
        while (true) {
            name = prompt(`نام بازیکن ${i + 1}:`);
            if (!name) name = `بازیکن ${i + 1}`;

             name = name.trim();

            if (name.length > 11) {
                alert(
                    "حداکثر طول مجاز برای نام 11 کاراکتر می‌باشد. لطفاً کوتاه‌تر وارد کنید."
                );
                continue
            }
            if (name.length === 0) {
                alert("نام نمی‌تواند خالی باشد. لطفاً نام معتبر وارد کنید.");
                continue;

            }
            players.push(name);
            break;

        }
        document.body.style.background = "silver";
        gameActive = true;
        currentIndex = 0;
        TXT.textContent = `نوبت ${players[currentIndex]} است`;
        BTN.textContent = "شلیک";


    }
}
BTN.addEventListener("click", () => {

    if (!gameActive) {
        setupGame();
        return;
    }

    let currentPlayer = players[currentIndex];
    let bullet = Math.random() < 0.3;
    if (players.length === 2){
        bullet = Math.random() < 0.2;
    }
    console.log(bullet);

    if (bullet) {
        TXT.textContent = `${currentPlayer} کوشته شد 💀`;
        players.splice(currentIndex, 1);
        
        if (players.length === 1) {
            BTN.textContent = "منتظر بمانید";
            BTN.disabled = true;
           
            setTimeout(() => {
                endGame(players[0]);
                BTN.textContent = "شروع مجدد";
                BTN.disabled = false;
            }, 1500);

        }
        if (currentIndex >= players.length) currentIndex = 0;
    }else{
        TXT.textContent = `شانس اوردی ${currentPlayer} 😅`;
        currentIndex = (currentIndex + 1) % players.length;
    }

    if (players.length > 1){
        BTN.textContent = "منتظر بمانید";
        BTN.disabled = true;
        setTimeout(() => {
            TXT.textContent =`نوبت ${players[currentIndex]} است`;
            BTN.textContent = "شلیک";
            BTN.disabled = false;
        }, 1500);
    }

});


function endGame(winner) {
    gameActive = false;
    TXT.textContent = `🎉 برنده بازی: ${winner} 🎉`;
    BTN.textContent = "شروع مجدد";
    document.body.style.background = "#34b134ff";
    players = [];
}

// if(playerCount < 1 || playersList.length < 1) location.reload();
