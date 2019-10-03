




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
            },
            {
                start: 3,
                end: 22
            },
            {
                start: 20,
                end: 29
            }
        ],
        snakes: [{
            start: 17,
            end: 4
        },
        {
            start: 11,
            end: 7
        },
        {
            start: 21,
            end: 9
        },
        {
            start: 27,
            end: 1
        }
        ]
    }



    return {
        // this method will return you next move position by checking the snake and ladder object
        moveNext(moves, player, currentPosition) {
            var { currentPosition } = {currentPosition};
            let nextposition = currentPosition + moves;

            let ladder = config.ladders.find((item) => item.start === nextposition);
            let snake = config.snakes.find((item) => item.start === nextposition);

            if (ladder) {
                nextposition = ladder.end;
            }
            if (snake) {
                nextposition = snake.end
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
    this.currentPosition = 0;
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

var UILayout = {
    1:[25,26,27,28,29,30],
    2:[24,23,22,21,20,19],
    3:[13,14,15,16,17,18],
    4:[12,11,10,9,8,7],
    5:[1,2,3,4,5,6]
}

// on domcontentloaded we are creating the bord first with empty cells and we are giving id as number to each cells
function createUI(length, breaks) {
    var html = "<div class='bord'>";

    Object.keys(UILayout).map((row)=>{
        let arr = UILayout[row].reverse();
        arr.forEach((item)=>{
            html += `<div class="cells" id=${item}></div>`;
        })
    })

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



  // move with player name and dice value from console, if the player exits it will move the player to its specified position, if player is not there then it will create new player and assign the position passed to it
function move(playerName,moves){
    if(!obj[playerName]){
        obj[playerName] = new nodes(getRandomColor(),playerName);
    }
    obj[playerName].set(SNLG.moveNext(moves,playerName,obj[playerName].currentPosition));
}


