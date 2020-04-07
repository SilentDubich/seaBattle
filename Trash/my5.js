var view ={
    displayMessage: function (msg) {
        var messageDisplay = document.querySelector('#messageArea');
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        var hits = document.getElementById(location);
        hits.setAttribute('class', 'hit');
    },
    displayMiss: function (location) {
        var miss = document.getElementById(location);
        miss.setAttribute('class', 'miss');
    }
};


var model = {
    board: 7, // Размер поля
    numShips: 3, // Число кораблей
    shipSize: 3, // Длина корабля
    shipSunk: 0, // Число потопленных кораблей
    gameFinish: false, // Состояние игры
    ships: [
        { locations: [], hits: ["", "", ""], sunk: false },
        { locations: [], hits: ["", "", ""], sunk: false },
        { locations: [], hits: ["", "", ""], sunk: false }
    ],
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);

            if(ship.hits[index] === "hits"){
                view.displayMessage('Ты сюда уже стрелял !');
                return true;

            } else if (index >= 0){
                ship.hits[index] = 'hits';
                view.displayMessage('Попал !');
                view.displayHit(guess);
                if (this.isSunk(ship)){
                    this.shipSunk++;
                    this.ships[i].sunk = true;
                    view.displayMessage('Потопил !');
                    control.finish();
                }
                return true;
            }
        }
        view.displayMessage('Промах !');
        view.displayMiss(guess);
        return false;
    },
    isSunk: function (ship){
        for(var i = 0; i < this.shipSize; i++){
            if(ship.hits[i] !== "hits"){
                return false;
            }
        }
        return true;
    },
    addLoc: function newShip() {
        var locations;
        for (var i = 0; i < this.numShips; i++){
            do {
                locations = this.generateShip();
            }while (this.locCheck(locations));
            this.ships[i].locations = locations;
        }
        console.log("Ships array: ");
        console.log(this.ships);
    },
    locCheck: function checkLoc(locations) {
        // var count = 0;
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            for (var j = 0; j < locations.length; j++) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    },

    locNearby: function nearby(locations){


    },


    generateShip: function () {
        var row,col;
        var pos = Math.floor(Math.random() * 2);
        if (pos === 1) { // horizontal
            row = Math.floor(Math.random() * this.board);
            col = Math.floor(Math.random() * (this.board - this.shipSize + 1));
        } else { // vertical
            row = Math.floor(Math.random() * (this.board - this.shipSize + 1));
            col = Math.floor(Math.random() * this.board);
        }
        var newShipLocations = [];
        for (var i = 0; i < this.shipSize; i++) {
            if (pos === 1) {
                newShipLocations.push(row.toString() + (col + i).toString());
            } else {
                newShipLocations.push((row + i).toString() + col.toString());
            }
        }
        return newShipLocations;
    }
};


var control = {
    guesses: 0,
    finish: function () {
        if (model.shipSunk == model.numShips){
            view.displayMessage('Ты победил! Ты выстрелил ' + this.guesses +
                ' раз, чтобы потопить все ' + model.numShips + ' цели !');
            model.gameFinish = true;
            console.log(model);
        }
    },
    processGu: function (guess) {
        if (isNaN(guess)){
            var location = this.parseGu(guess);
            if (location){
                this.guesses++;
                var hit = model.fire(location);
            }
        } else{
            var location = guess;
            this.guesses++;
            var hit = model.fire(location);
        }


    },
    parseGu: function (guess) {
        var alphabet = ['A', 'B', 'C', 'D', 'E', 'F','G'];

        if (guess === null || guess.length !== 2){
            view.displayMessage('Вы ввели недопустимое значение !');
        }else{
            var firstChar = guess.charAt(0).toUpperCase();
            var row = alphabet.indexOf(firstChar);
            var column = guess.charAt(1);
            if (isNaN(row) || isNaN(column)){
                view.displayMessage('Вы ввели недопустимое значение !');
            } else if (row < 0 || row >= model.board || column < 0 || row >= model.board){
                view.displayMessage('Вы ввели недопустимое значение !');
            } else {
                var newGuess = row + column;
                console.log(newGuess);
                return newGuess;
            }
        }
        return null;
    }
};


function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    // поработаем с Enter
    var guessInput = document.getElementById('guessInput');
    guessInput.onkeypress = handleKeyPress;
    document.onclick = function(e) { // составляем возможность топить корабли по кликам по клетке
        var name = e.target.id;
        if (name.length === 2 || name.length === 3){
            control.processGu(name);
        }
        // console.log(name);
    };
    model.addLoc();
}

function handleFireButton(){
    var guessInput = document.getElementById('guessInput');
    var guess = guessInput.value;
    control.processGu(guess);

    guessInput.value = "";
}

function handleKeyPress(e){
    var fireButton = document.getElementById("fireButton");
    if(e.keyCode === 13){
        fireButton.click();
        return false;
    }

}

window.onload = init;


console.log(model.ships);
// console.log(model.gameFinish);
// console.log(model.shipSunk);
// console.log(model);

//создать функцию, принимающая локейшн
// превратить строки в числа и их сравнивать


let lastX; // Отслеживает х-координату мыши
let bar = document.querySelector("bar");
bar.addEventListener("mousedown", event => {
    if (event.button === 0) {
        lastX = event.clientX;
        window.addEventListener("mousemove", moved);
        event.preventDefault();
        console.log('...')
    }
    });

        // Заблокировать возможность выделения
        function moved(event) {
            if (event.buttons === 0) {
            window.removeEventListener("mousemove", moved);
        } else {
            let dist = event.clientX - lastX;
            let newWidth = Math.max(10, bar.offsetWidth + dist);
            bar.style.width = newWidth + "рх";
            lastX = event.clientX;
        }
    }



