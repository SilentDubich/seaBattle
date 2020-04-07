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
    numShips: 7, // Число кораблей
    // Длина кораблей
    sizeOne: 1,
    sizeTwo: 2,
    sizeThree: 3,
    sizeFour: 4,
    shipSunk: 0, // Число потопленных кораблей
    gameFinish: false, // Состояние игры
    ships: [
        { locations: [], reserve: [], hits: [""], sunk: false, size: 1 },
        { locations: [], reserve: [], hits: [""], sunk: false, size: 1 },
        // { locations: [], reserve: [], hits: [""], sunk: false, size: 1 },
        { locations: [], reserve: [], hits: ["", ""], sunk: false, size: 2 },
        { locations: [], reserve: [], hits: ["", ""], sunk: false, size: 2 },
        { locations: [], reserve: [], hits: ["", ""], sunk: false, size: 2 },
        { locations: [], reserve: [], hits: ["", ""], sunk: false, size: 2 },
        { locations: [], reserve: [], hits: ["", "", ""], sunk: false, size: 3 },

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
        for(var i = 0; i < ship.hits.length; i++){
            if (ship.size === 1){
                if(ship.hits[i] !== "hits"){
                    return false;
                }
            }
            if (ship.size === 2){
                if(ship.hits[i] !== "hits"){
                    return false;
                }
            }
            if (ship.size === 3){
                if(ship.hits[i] !== "hits"){
                    return false;
                }
            }
            if (ship.size === 4){
                if(ship.hits[i] !== "hits"){
                    return false;
                }
            }

        }
        return true;
    },
    addLoc: function newShip() {
        var locations, reserve;
        for (var i = 0; i < this.numShips; i++){
            if (this.ships[i].size === 1){
                do {
                    locations = this.generateShipOne();
                }while (this.locCheck(locations.loc) || this.locNearby(locations.loc));
                this.ships[i].locations = locations.loc;
                this.ships[i].reserve = locations.res;
            }
            if (this.ships[i].size === 2){
                do {
                    locations = this.generateShipTwo();
                }while (this.locCheck(locations.loc) || this.locNearby(locations.loc));
                this.ships[i].locations = locations.loc;
                this.ships[i].reserve = locations.res;
            }
            if (this.ships[i].size === 3){
                do {
                    locations = this.generateShipThree();
                }while (this.locCheck(locations.loc) || this.locNearby(locations.loc));
                this.ships[i].locations = locations.loc;
                this.ships[i].reserve = locations.res;
            }
            if (this.ships[i].size === 4){
                do {
                    locations = this.generateShipFour();
                }while (this.locCheck(locations.loc));
                this.ships[i].locations = locations.loc;
                this.ships[i].reserve = locations.res;
            }

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

    locNearby: function nearby(reserve){
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            for (var k = 0; k < reserve.length; k++) {
                if (ship.reserve.indexOf(reserve[k]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    },


    generateShipThree: function () {
        var row,col;
        var pos = Math.floor(Math.random() * 2);
        if (pos === 1) { // horizontal
            row = Math.floor(Math.random() * this.board);
            col = Math.floor(Math.random() * (this.board - this.sizeThree));
        } else { // vertical
            row = Math.floor(Math.random() * (this.board - this.sizeThree));
            col = Math.floor(Math.random() * this.board);
        }
        var newShipLocations = [];
        var reserved = [];
        for (var i = 0; i < this.sizeThree; i++) {
            if (pos === 1) {
                newShipLocations.push(row.toString() + (col + i).toString());
                reserved.push((row + 1).toString() + (col + i).toString());
                reserved.push((row - 1).toString() + (col + i).toString())
            } else {
                newShipLocations.push((row + i).toString() + col.toString());
                reserved.push((row + i).toString() + (col + 1).toString());
                reserved.push((row + i).toString() + (col - 1).toString())
            }
        }
        if (pos === 1){
            reserved.push(row.toString() + (col - 1).toString());
            reserved.push((row + 1).toString() + (col - 1).toString());
            reserved.push((row - 1).toString() + (col - 1).toString());
            reserved.push(row.toString() + (col + 3).toString());
            reserved.push((row + 1).toString() + (col + 3).toString());
            reserved.push((row - 1).toString() + (col + 3).toString());
        } else{
            reserved.push((row - 1).toString() + col.toString());
            reserved.push((row - 1).toString() + (col - 1).toString());
            reserved.push((row - 1).toString() + (col + 1).toString());
            reserved.push((row + 3).toString() + col.toString());
            reserved.push((row + 3).toString() + (col - 1).toString());
            reserved.push((row + 3).toString() + (col + 1).toString());
        }

        return {
            loc: newShipLocations,
            res: reserved
        };
    },
    generateShipOne: function () {
        var row,col;
        var pos = Math.floor(Math.random() * 2);
        if (pos === 1) { // horizontal
            row = Math.floor(Math.random() * this.board);
            col = Math.floor(Math.random() * (this.board - this.sizeOne));
        } else { // vertical
            row = Math.floor(Math.random() * (this.board - this.sizeOne));
            col = Math.floor(Math.random() * this.board);
        }
        var newShipLocations = [];
        var reserved = [];
        for (var i = 0; i < this.sizeOne; i++) {
            if (pos === 1) {
                newShipLocations.push(row.toString() + (col + i).toString());
                reserved.push((row + 1).toString() + (col + i).toString());
                reserved.push((row - 1).toString() + (col + i).toString())
            } else {
                newShipLocations.push((row + i).toString() + col.toString());
                reserved.push((row + i).toString() + (col + 1).toString());
                reserved.push((row + i).toString() + (col - 1).toString())
            }
        }
        if (pos === 1){
            reserved.push(row.toString() + (col - 1).toString());
            reserved.push((row + 1).toString() + (col - 1).toString());
            reserved.push((row - 1).toString() + (col - 1).toString());
            reserved.push(row.toString() + (col + 1).toString());
            reserved.push((row + 1).toString() + (col + 1).toString());
            reserved.push((row - 1).toString() + (col + 1).toString());
        } else{
            reserved.push((row - 1).toString() + col.toString());
            reserved.push((row - 1).toString() + (col - 1).toString());
            reserved.push((row - 1).toString() + (col + 1).toString());
            reserved.push((row + 1).toString() + col.toString());
            reserved.push((row + 1).toString() + (col - 1).toString());
            reserved.push((row + 1).toString() + (col + 1).toString());
        }
        return {
            loc: newShipLocations,
            res: reserved
        };
    },
    generateShipTwo: function () {
        var row,col;
        var pos = Math.floor(Math.random() * 2);
        if (pos === 1) { // horizontal
            row = Math.floor(Math.random() * this.board);
            col = Math.floor(Math.random() * (this.board - this.sizeTwo));
        } else { // vertical
            row = Math.floor(Math.random() * (this.board - this.sizeTwo));
            col = Math.floor(Math.random() * this.board);
        }
        var newShipLocations = [];
        var reserved = [];
        for (var i = 0; i < this.sizeTwo; i++) {
            if (pos === 1) {
                newShipLocations.push(row.toString() + (col + i).toString());
                reserved.push((row + 1).toString() + (col + i).toString());
                reserved.push((row - 1).toString() + (col + i).toString())
            } else {
                newShipLocations.push((row + i).toString() + col.toString());
                reserved.push((row + i).toString() + (col + 1).toString());
                reserved.push((row + i).toString() + (col - 1).toString())
            }
        }
        if (pos === 1){
            reserved.push(row.toString() + (col - 1).toString());
            reserved.push((row + 1).toString() + (col - 1).toString());
            reserved.push((row - 1).toString() + (col - 1).toString());
            reserved.push(row.toString() + (col + 3).toString());
            reserved.push((row + 1).toString() + (col + 2).toString());
            reserved.push((row - 1).toString() + (col + 2).toString());
        } else{
            reserved.push((row - 1).toString() + col.toString());
            reserved.push((row - 1).toString() + (col - 1).toString());
            reserved.push((row - 1).toString() + (col + 1).toString());
            reserved.push((row + 2).toString() + col.toString());
            reserved.push((row + 2).toString() + (col - 1).toString());
            reserved.push((row + 2).toString() + (col + 1).toString());
        }
        return {
            loc: newShipLocations,
            res: reserved
        };
    },
    generateShipFour: function () {
        var row,col;
        var pos = Math.floor(Math.random() * 2);
        if (pos === 1) { // horizontal
            row = Math.floor(Math.random() * this.board);
            col = Math.floor(Math.random() * (this.board - this.sizeFour));
        } else { // vertical
            row = Math.floor(Math.random() * (this.board - this.sizeFour));
            col = Math.floor(Math.random() * this.board);
        }
        var newShipLocations = [];
        var reserved = [];
        for (var i = 0; i < this.sizeFour; i++) {
            if (pos === 1) {
                newShipLocations.push(row.toString() + (col + i).toString());
                reserved.push((row + 1).toString() + (col + i).toString());
                reserved.push((row - 1).toString() + (col + i).toString())
            } else {
                newShipLocations.push((row + i).toString() + col.toString());
                reserved.push((row + i).toString() + (col + 1).toString());
                reserved.push((row + i).toString() + (col - 1).toString())
            }
        }
        if (pos === 1){
            reserved.push(row.toString() + (col - 1).toString());
            reserved.push((row + 1).toString() + (col - 1).toString());
            reserved.push((row - 1).toString() + (col - 1).toString());
            reserved.push(row.toString() + (col + 4).toString());
            reserved.push((row + 1).toString() + (col + 4).toString());
            reserved.push((row - 1).toString() + (col + 4).toString());
        } else{
            reserved.push((row - 1).toString() + col.toString());
            reserved.push((row - 1).toString() + (col - 1).toString());
            reserved.push((row - 1).toString() + (col + 1).toString());
            reserved.push((row + 4).toString() + col.toString());
            reserved.push((row + 4).toString() + (col - 1).toString());
            reserved.push((row + 4).toString() + (col + 1).toString());
        }
        return {
            loc: newShipLocations,
            res: reserved
        };
    },
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
        if (name.length === 2){
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


console.log(model.ships[0].size);
// console.log(model.gameFinish);
// console.log(model.shipSunk);
// console.log(model);

//создать функцию, принимающая локейшн
// превратить строки в числа и их сравнивать

// for (var i = 0; i < this.numShips; i++){
//     var ship = this.ships[i];
//     for (var j = 0; j < locations.length; j++){
//         if (locations.length === 1){
//             this.ships[i].reserve.push(ship.locations[j]);
//             console.log(this.ships.reserve);
//         }
//         else if (locations.length === 2){
//             this.ships[i].reserve.push(ship.locations[j]);
//             console.log(this.ships.reserve);
//         }
//         else if (locations.length === 3){
//             this.ships[i].reserve.push(ship.locations[j]);
//             console.log(this.ships.reserve);
//         }
//         else if (locations.length === 4){
//             this.ships[i].reserve.push(ship.locations[j]);
//             console.log(this.ships.reserve);
//         }
//     }
//
// }
