var playerTotalBets = 0;
var playerBets = 0;
var tempBets = 0;
var dealerCards = Array(0);
var playerCards = Array(0);
var pickNumber = 0;
var shuffledCards = Array(52);
var cardType = ['club', 'heart', 'spade', 'dimond'];
var cardNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'];
var delayTimes = 0;

window.addEventListener("load", Initialize);

function Initialize() {
    newGame = document.getElementById("newGame");
    newGame.addEventListener("click", CreateNewGame);
    textBox = document.getElementById("textBox");
    gameView = document.getElementById("game");
    WriteTextBox("歡迎來到 Black Jack 遊戲！");
    WriteTextBox("請按下「開始遊戲」來創建新的一局");
}

function CreateNewGame() {
    WriteTextBox("--------------------------------------------");
    WriteTextBox("開始創建新的一局...");
    ResetPlayerBets();
    WriteTextBox("創建完畢！");
    ShowBettingView();
    WriteTextBox("--------------------------------------------");

}

function ResetPlayerBets() {
    playerTotalBets = 100;
    playerBets = 0;
    tempBets = 0;
    WriteTextBox("玩家籌碼：100");
    dealerCards = Array(0);
    playerCards = Array(0);
    pickNumber = 0;
    shuffledCards = Array(52);
    delayTimes = 0;
}

function ShowBettingView() {
    gameView.innerHTML = '<div id="dealerState"><div class="people" id="dealer">莊家</div></div>' +
        '<div id="tableView"><p>欲下注金額</p><p id="betsTotal"></p>' +
        '<div class="bet" id="coins"><div class="betcoin" id="coin1">1</div>' +
        '<div class="betcoin" id="coin5">5</div>' +
        '<div class="betcoin" id="coin10">10</div>' +
        '<div class="betcoin" id="coin50">50</div>' +
        '<div class="betcoin" id="coinAll">All</div></div>' +
        '<div class="bet"><div class="betting" id="bet">下注</div>' +
        '<div class="betting" id="resetBet">重設</div></div></div>' +
        '<div id="playerState"><div class="people">玩家</div>' +
        '<p>現有賭金：' + playerTotalBets + '</p><p>下注賭金：' + playerBets + '</p></div>';

    WriteTextBox('請開始下注...');

    betsTotal = document.getElementById("betsTotal");
    tempBets = 1;
    isFirstTime = true;
    betsTotal.innerHTML = tempBets;
    coins = document.getElementById("coins");

    bet = document.getElementById("bet");
    bet.addEventListener("click", Bet);

    resetBet = document.getElementById("resetBet");
    resetBet.addEventListener("click", ResetBet);

    coin1 = document.getElementById("coin1");
    coin1.addEventListener("click", function () {
        if (isFirstTime) {
            tempBets += 1; isFirstTime = false;
        } else tempBets += 1;
        betsTotal.innerHTML = tempBets; CheckCoins();
    });

    coin5 = document.getElementById("coin5");
    coin5.addEventListener("click", function () {
        if (isFirstTime) {
            tempBets = 5; isFirstTime = false;
        } else tempBets += 5;
        betsTotal.innerHTML = tempBets; CheckCoins();
        });

    coin10 = document.getElementById("coin10");
    coin10.addEventListener("click", function () {
        if (isFirstTime) {
            tempBets = 10; isFirstTime = false;
        } else tempBets += 10;
        betsTotal.innerHTML = tempBets; CheckCoins();
        });

    coin50 = document.getElementById("coin50");
    coin50.addEventListener("click", function () { 
        if (isFirstTime) {
            tempBets = 50; isFirstTime = false;
        } else tempBets += 50;
        betsTotal.innerHTML = tempBets; CheckCoins();
    });

    coinAll = document.getElementById("coinAll");
    coinAll.addEventListener("click", function () { tempBets = playerTotalBets; betsTotal.innerHTML = tempBets; CheckCoins(); });
}

function CheckCoins() {
    (playerTotalBets - tempBets >= 1) ? coin1.style.display = '' : coin1.style.display = 'none';
    (playerTotalBets - tempBets >= 5) ? coin5.style.display = '' : coin5.style.display = 'none';
    (playerTotalBets - tempBets >= 10) ? coin10.style.display = '' : coin10.style.display = 'none';
    (playerTotalBets - tempBets >= 50) ? coin50.style.display = '' : coin50.style.display = 'none';
}

function Bet() {
    playerBets = tempBets;
    playerTotalBets = playerTotalBets - tempBets;
    tempBets = 0;
    ShowPlayingView();
    GameStart();
}

function ResetBet() {
    ShowBettingView();
}

function ShowPlayingView() {
    gameView.innerHTML = '<div id="dealerState"><div class="people" id="dealer">莊家</div></div>' +
        '<div id="tableView"><div class="cards" id="dealerCardsView"></div>' +
        '<div class="cards" id="playerCardsView"><div class="hitAndStand"></div></div></div>' +
        '<div id="playerState"><div class="people">玩家</div>' +
        '<p>現有賭金：' + playerTotalBets + '</p><p>下注賭金：' + playerBets + '</p></div>';

    dealerState = document.getElementById("dealerState");
    dealerCardsView = document.getElementById("dealerCardsView");
    playerState = document.getElementById("playerState");
    playerCardsView = document.getElementById("playerCardsView");

}

function GameStart() {
    dealerCards = Array(0);
    playerCards = Array(0);

    playerCards[0] = PickCard();
    ShowCard(playerCards);
    playerCards[1] = PickCard();
    ShowCard(playerCards);
    dealerCards[0] = PickCard();
    ShowCard(dealerCards);
    dealerCards[1] = PickCard();
    ShowCard(dealerCards);
    Check(Calculate(playerCards));
}

function PickCard() {
    if (pickNumber % 52 == 0) {
        Shuffle();
        pickNumber = 0;
    }
    pickNumber++;
    // WriteTextBox("第" + (pickNumber - 1) + "張牌");
    return shuffledCards[pickNumber - 1];
}

function Hit() {
    WriteTextBox("加牌！");
    playerCards[playerCards.length] = PickCard();
    ShowCard(playerCards);
    Check(Calculate(playerCards));
}

function Stand() {
    WriteTextBox("停牌！");
    for (var i = 0; i < playerCards.length; i++) {
        if (i == 0) {
            playerCardsView.innerHTML = '<img class="card" src="pic/' + cardType[Math.floor(playerCards[i] / 13)] + '-' + cardNumber[playerCards[i] % 13] + '.png">';
        }
        else {
            playerCardsView.innerHTML += '<img class="card" src="pic/' + cardType[Math.floor(playerCards[i] / 13)] + '-' + cardNumber[playerCards[i] % 13] + '.png">';
        }
    }
    GetResult(Calculate(playerCards));
}

function Shuffle() {
    for (var i = 0; i < shuffledCards.length; i++) {
        shuffledCards[i] = i;
    }

    for (var i = 0; i < shuffledCards.length; i++) {
        var j = Math.floor(Math.random() * 52);
        temp = shuffledCards[i];
        shuffledCards[i] = shuffledCards[j];
        shuffledCards[j] = temp;
    }
}

function ShowCard(cards) {
    if (cards === dealerCards) {
        for (var i = 0; i < cards.length; i++) {

            if (i == 0) {
                dealerCardsView.innerHTML = '<img class="card" src="pic/' + cardType[Math.floor(cards[i] / 13)] + '-' + cardNumber[cards[i] % 13] + '.png">';
            }
            else if (i == 1 && cards.length == 2) {
                delayTimes++;
                setTimeout(function () { dealerCardsView.innerHTML += '<img class="card" src="pic/back.png">'; }, 500 * delayTimes, i);
            }
            else if (i == 1 && playerCards.length == 2) {
                dealerCardsView.innerHTML += '<img class="card" src="pic/' + cardType[Math.floor(cards[i] / 13)] + '-' + cardNumber[cards[i] % 13] + '.png">';
            }
            else if (i == 1) {
                dealerCardsView.innerHTML += '<img class="card" src="pic/' + cardType[Math.floor(cards[i] / 13)] + '-' + cardNumber[cards[i] % 13] + '.png">';
            }
            else {
                delayTimes++;
                setTimeout(function (i) { dealerCardsView.innerHTML += '<img class="card" src="pic/' + cardType[Math.floor(cards[i] / 13)] + '-' + cardNumber[cards[i] % 13] + '.png">'; }, 500 * delayTimes, i);
            }

        }
    }
    else if (cards === playerCards) {
        for (var i = 0; i < cards.length; i++) {
            if (i == 0) {
                playerCardsView.innerHTML = '<img class="card" src="pic/' + cardType[Math.floor(cards[i] / 13)] + '-' + cardNumber[cards[i] % 13] + '.png">';
            }
            else if (i == cards.length - 1) {
                delayTimes++;
                setTimeout(function (i) { playerCardsView.innerHTML += '<img class="card" src="pic/' + cardType[Math.floor(cards[i] / 13)] + '-' + cardNumber[cards[i] % 13] + '.png">'; }, 500 * delayTimes, i);
            }
            else {
                playerCardsView.innerHTML += '<img class="card" src="pic/' + cardType[Math.floor(cards[i] / 13)] + '-' + cardNumber[cards[i] % 13] + '.png">';
            }
        }
    }
}

function Calculate(cards) {
    var score = 0;
    var cardA = 0;
    for (var i = 0; i < cards.length; i++) {
        if (cards[i] % 13 == 0) {
            cardA += 1;
        }
        else if (cards[i] % 13 < 9) {
            score += (cards[i] % 13 + 1);
        }
        else {
            score += 10;
        }
    }
    while (cardA > 0) {
        if (score >= 11) {
            score += 1;
        }
        else {
            score += 11;
        }
        cardA--;
    }
    return score;
}

function Check(playerScore) {
    setTimeout(function () { WriteTextBox("玩家點數：" + playerScore); }, 500 * delayTimes);

    if (playerCards.length == 5) {
        GetResult(playerScore);
    }
    else if (playerScore > 21) {
        GetResult(playerScore);
    }
    else if (playerScore == 21 && playerCards.length == 2) {
        setTimeout(function () { delayTimes = 0; GetResult(playerScore); }, 500 * (delayTimes + 1), playerScore);
    }
    else if (playerScore == 21) {
        GetResult(playerScore);
    }
    else {
        delayTimes++;
        setTimeout(function () {
            playerCardsView.innerHTML += '<div class="hitAndStand"><div class="hitOrStand" id="hit">加牌</div>' +
                '<div class="hitOrStand" id="stand">停牌</div></div>';
            document.getElementById("hit").addEventListener("click", Hit);
            document.getElementById("stand").addEventListener("click", Stand);
        }, 500 * delayTimes);
        delayTimes = 0;
    }
}
function GetResult(playerScore) {
    var dealerScore = Calculate(dealerCards);
    while (dealerScore < 17) {
        if (dealerCards.length == 5) break;
        dealerCards[dealerCards.length] = PickCard();
        dealerScore = Calculate(dealerCards);
    }

    if (dealerCards.length == 2) {
        setTimeout(function () {
            dealerCardsView.innerHTML = '<img class="card" src="pic/' + cardType[Math.floor(dealerCards[0] / 13)] + '-' + cardNumber[dealerCards[0] % 13] + '.png">' +
                '<img class="card" src="pic/' + cardType[Math.floor(dealerCards[1] / 13)] + '-' + cardNumber[dealerCards[1] % 13] + '.png">';
        }, 500);
    }
    else {
        ShowCard(dealerCards);
    }
    delayTimes++;
    setTimeout(ShowResult, 500 * delayTimes, playerScore, dealerScore);

}

function ShowResult(playerScore, dealerScore) {

    WriteTextBox("莊家點數：" + dealerScore);
    WriteTextBox("--------------------------------------------");

    if (playerScore > 21) {
        WriteTextBox("玩家爆點");
        playerTotalBets = playerTotalBets;
        playerBets = 0;
        dealerState.innerHTML = '<div class="people win" id="dealer">莊家</div>';
        playerState.innerHTML = '<div class="people">玩家</div><p>現有賭金：' + playerTotalBets + '</p><p>下注賭金：' + playerBets + '</p></div>';
    }
    else if (dealerScore > 21) {
        WriteTextBox("莊家爆點");
        playerTotalBets = playerTotalBets + playerBets * 2;
        playerBets = 0;
        dealerState.innerHTML = '<div class="people" id="dealer">莊家</div>';
        playerState.innerHTML = '<div class="people win">玩家</div><p>現有賭金：' + playerTotalBets + '</p><p>下注賭金：' + playerBets + '</p></div>';
    }
    else if (playerScore == dealerScore) {
        WriteTextBox("平手");
        playerTotalBets = playerTotalBets + playerBets;
        playerBets = 0;
        dealerState.innerHTML = '<div class="people win" id="dealer">莊家</div>';
        playerState.innerHTML = '<div class="people win">玩家</div><p>現有賭金：' + playerTotalBets + '</p><p>下注賭金：' + playerBets + '</p></div>';
    }
    else if (playerScore > dealerScore) {
        WriteTextBox("玩家勝");
        playerTotalBets = playerTotalBets + playerBets * 2;
        playerBets = 0;
        playerState.innerHTML = '<div class="people win">玩家</div><p>現有賭金：' + playerTotalBets + '</p><p>下注賭金：' + playerBets + '</p></div>';
    }
    else if (playerScore < dealerScore) {
        WriteTextBox("莊家勝");
        playerTotalBets = playerTotalBets;
        playerBets = 0;
        dealerState.innerHTML = '<div class="people win" id="dealer">莊家</div>';
        playerState.innerHTML = '<div class="people">玩家</div><p>現有賭金：' + playerTotalBets + '</p><p>下注賭金：' + playerBets + '</p></div>';
    }

    WriteTextBox('玩家剩餘賭金：' + playerTotalBets);

    if (playerTotalBets <= 0) {
        setTimeout(Final, 3000);
        WriteTextBox('玩家賭金用盡');
    }
    else {
        WriteTextBox("--------------------------------------------");
        setTimeout(ShowBettingView, 3000);
        delayTimes = 0;
    }
}

function Final() {
    gameView.innerHTML = '<div id="dealerView"></div><div id="tableView"><div id="newGameView"><p>遊戲結束</p>' +
        '<div id="newGame">開始新局</div></div></div><div id="playerView"></div>';
    newGame = document.getElementById("newGame");
    newGame.addEventListener("click", CreateNewGame);
}

function WriteTextBox(text) {
    textBox.innerHTML += '<p>' + text + '</p>';
    textBox.scrollTop = textBox.scrollHeight;
}