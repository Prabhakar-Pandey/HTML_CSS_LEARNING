




var SNLG = function () {
    // confingration will keep the snake and ladder array object
    var config = {
        maxLength: 30,
        ladders: [
            {
                start: 5,
                end: 16
            },
            {
                start: 11,
                end: 26
            }
        ],
        snakes: [{
            start: 17,
            end: 4
        },
        {
            start: 27,
            end: 1
        }]
    }

    var players =
        {
            p1: {
                name: "p1",
                currentPosition: 1
            },
            p2: {
                name: "p2",
                currentPosition: 1
            }
        }


    return {
        // this method will return you next move position by checking the snake and ladder object
        moveNext(moves, player, currentPosition) {
            var { currentPosition } = {currentPosition} || players[player];
            let nextposition = currentPosition + moves;

            let ladder = config.ladders.find((item) => item.start === nextposition);
            let snake = config.snakes.find((item) => item.start === nextposition);

            if (ladder) {
                nextposition = ladder.end;
            }
            if (snake) {
                nextposition = snake.end
            }
            players[player]={
                currentPosition : nextposition,
                name:player
            }
            
            return nextposition;
        },
        getConfigurations() {
            return config;
        }
    }

}();


var nodes = function (color,name) {
    this.name = name;
    this.currentPosition = 1;
    this.color = color;
    this.html = `<div class="player" id="${this.name}" style="background-color:${color}">${this.name}</div>`
    this.set = function (value) {
        this.currentPosition = value;
        //createUI(SNLG.getConfigurations().maxLength, 6);
        var cell = document.getElementById(value);
        var player = document.getElementById(name);
        if(player){
            player.remove()
        }
        cell.innerHTML += this.html;
    }
}

// on domcontentloaded we are creating the bord first with empty cells and we are giving id as number to each cells
function createUI(length, breaks) {
    var html = "<div class='bord'>";

    for (var j = length; j > 0; j--) {
        html += `<div class="cells" id=${j}></div>`;
    }

    html += "</div>";
    var root = document.getElementById("root");
    root.innerHTML = html;
}


var obj={}; // This object will keep the players in it
window.addEventListener("DOMContentLoaded", () => {
    let length = SNLG.getConfigurations().maxLength;
    createUI(length, 6);
    console.log(length);
})

// This function will generate a random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }



  // this function will use to make move of the player and is global can be called from browser
function move(playerName,moves){
    if(!obj[playerName]){
        obj[playerName] = new nodes(getRandomColor(),playerName);
    }
    obj[playerName].set(SNLG.moveNext(moves,playerName,obj[playerName].currentPosition));

    return;
    if(playerName=="P1"){
        player1.set(SNLG.moveNext(moves,"player1",player1.currentPosition));
    }
    if(playerName=="P2"){
        player2.set(SNLG.moveNext(moves,"player2",player2.currentPosition));
    }
}


