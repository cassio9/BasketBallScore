const scoreHome = document.getElementById("score-home");
const scoreGuest = document.getElementById("score-guest");
const active = document.querySelectorAll(".active");
const timer = document.getElementById("timer");
let winner = document.getElementById("winner");
let winner1 = document.getElementById("winner1");
let timerInterval;

function add(element, add) {
  element.innerText = Number(element.innerText) + add;
  adjustingBorder(element);
  checkWinningPlayer();
}

const startGame = () => {
  //New Game, reset score, timer, Winning and activate buttons;
  scoreHome.innerText = 0;
  scoreGuest.innerText = 0;
  timer.innerText = "00:10";
  active.forEach((element) => (element.disabled = false));
  scoreGuest.style.boxShadow = "0 0 0px";
  scoreHome.style.boxShadow = "0 0 0px";
  winner.innerText = "";
  winner1.innerText = "";
  clearInterval(timerInterval);

  //never set second = 0 example:
  //1 minute (second = 59 minute = 0).
  //2 minutes (second = 59 minute = 1).
  // + change timer.innerText.
  let second = 9,
    minute = 0;

  // Next we set a interval every 1000 ms
  timerInterval = setInterval(function () {
    // We set the timer text to include a two digit representation
    timer.innerHTML =
      (minute < 10 ? "0" + minute : minute) +
      ":" +
      (second < 10 ? "0" + second : second);
    // Next, we subtract a second since one second is passed
    second = second - 1;
    // We check if the second equals 60 "one minute"
    if (second == 0) {
      // If so, we add a minute and reset our seconds to 0
      minute--;
      second = 59;
    }

    //setting timer to 00:00 and disable buttons
    if (timer.innerHTML == "00:01") {
      clearInterval(timerInterval);
      setTimeout(function () {
        timer.innerText = "00:00";
        active.forEach((element) => (element.disabled = true));
        messageWinner();
      }, 1000);
    }
  }, 1000);
};

function checkWinningPlayer() {
  if (Number(scoreHome.innerText) > Number(scoreGuest.innerText)) {
    scoreHome.style.boxShadow = "0px 0px 30px red";
    scoreGuest.style.boxShadow = "0 0 0";
  } else if (Number(scoreHome.innerText) < Number(scoreGuest.innerText)) {
    scoreGuest.style.boxShadow = "0px 0px 30px red";
    scoreHome.style.boxShadow = "0 0 0";
  } else {
    scoreGuest.style.boxShadow = "0 0 30px green";
    scoreHome.style.boxShadow = "0 0 30px green";
  }
}

function messageWinner() {
  if (Number(scoreHome.innerText) > Number(scoreGuest.innerText)) {
    winner.innerText = "HOME TEAM WON!!";
    winner1.innerText = "HOME TEAM WON!!";
  } else if (Number(scoreHome.innerText) < Number(scoreGuest.innerText)) {
    winner.innerText = "GUEST TEAM WON!!";
    winner1.innerText = "GUEST TEAM WON!!";
  } else {
    winner.innerText = "TIE!!";
    winner1.innerText = "TIE!!";
  }
}

function adjustingBorder(player) {
  if (player.textContent >= 100) {
    player.style.paddingRight = "20px";
  }
}
