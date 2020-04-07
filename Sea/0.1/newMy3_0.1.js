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
    },
    displaySunk: function (location) {
        var sunk = document.getElementById(location);
        sunk.setAttribute('class', 'sunk');
    },
    displayCourse: function (msg) {
        var messageDisplay = document.querySelector('#course');
        course.innerHTML = msg;
    },
    displayBotHit: function (location) {
        var hits = document.getElementById(location);
        hits.setAttribute('class', 'x');
    }
};


var model = {
    shoots: 0,
    board: 10, // Размер поля
    numShips: 10, // Число кораблей
    // Длина кораблей
    sizeOne: 1,
    sizeTwo: 2,
    sizeThree: 3,
    sizeFour: 4,
    shipSunk: 0, // Число потопленных кораблей
    ships: [
        { locations: [], reserve: [], hits: [""], sunk: false, size: 1 },
        { locations: [], reserve: [], hits: [""], sunk: false, size: 1 },
        { locations: [], reserve: [], hits: [""], sunk: false, size: 1 },
        { locations: [], reserve: [], hits: [""], sunk: false, size: 1 },
        { locations: [], reserve: [], hits: ["", ""], sunk: false, size: 2 },
        { locations: [], reserve: [], hits: ["", ""], sunk: false, size: 2 },
        { locations: [], reserve: [], hits: ["", ""], sunk: false, size: 2 },
        { locations: [], reserve: [], hits: ["", "", ""], sunk: false, size: 3 },
        { locations: [], reserve: [], hits: ["", "", ""], sunk: false, size: 3 },
        { locations: [], reserve: [], hits: ["", "", "", ""], sunk: false, size: 4 },

    ],
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);

            if(ship.hits[index] === "hits"){
                view.displayMessage('Ты сюда уже стрелял !');
                // control.plCourse = true;
                // control.course();
                return true;
            }
            else if (index >= 0){
                ship.hits[index] = 'hits';
                view.displayMessage('Попал !');
                view.displayHit(guess);
                // control.plCourse = true;
                if (this.isSunk(ship)){
                    this.shipSunk++;
                    this.ships[i].sunk = true;
                    view.displayMessage('Потопил !');
                    for (var j = 0; j < ship.reserve.length; j++){
                        if (ship.reserve[j].length === 2){
                            view.displaySunk(ship.reserve[j]);
                        }
                    }
                    control.finish();
                }
                return true;
            }
        }
        view.displayMessage('Промах !');
        view.displayMiss(guess);
        return false;
    },

    fireBot: function() {
        var row, col, loc, index;
            row = Math.floor(Math.random() * this.board);
            col = Math.floor(Math.random() * this.board);
            loc = '0' + row.toString() + col.toString();
        var elem = document.getElementById(loc);
            for (var i = 0; i < player.shipNum; i++){
                index = player.plShips[i].locations.indexOf(loc);
                if(elem.classList.contains('sunk') || elem.classList.contains('miss') || elem.classList.contains('x')){
                    return null;
                }
                else if (index >= 0){
                    player.plShips[i].hits[index] = 'hits';
                    view.displayMessage('Бот попал !');
                    view.displayBotHit(loc);
                    this.shoots++;
                    console.log('Попал бот ! ' + loc);
                    if (this.isSunk(player.plShips[i])){
                        player.sunkShip++;
                        player.plShips[i].sunk = true;
                        view.displayMessage('Бот потопил твой корабль !');
                        for (var j = 0; j < player.plShips[i].reserve.length; j++){
                            if (player.plShips[i].reserve[j].length === 3){
                                view.displaySunk(player.plShips[i].reserve[j]);
                            }
                        }
                        control.finish();
                    }
                    return {
                        bool: true,
                        row: row,
                        col: col,
                    };
                }
            }
            view.displayMessage('Бот промазал !');
            console.log('Промах бота ! ' + loc);
            view.displayMiss(loc);
            this.shoots++;
            control.botCourse = false;
            return false;
    },


    botShootCheck: function () {
        if (control.botCourse){
            model.fireBot();
        } else{
            control.plCourse = true;
            control.course();
        }

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
        var locations;
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
                }while (this.locCheck(locations.loc) || this.locNearby(locations.loc));
                this.ships[i].locations = locations.loc;
                this.ships[i].reserve = locations.res;
            }

        }
        console.log("Расположение кораблей ИИ : ");
        console.log(this.ships);
    },

    addLocPl: function newShip() {
        var locations;
        for (var i = 0; i < this.numShips; i++){
            if (player.plShips[i].size === 1){
                do {
                    locations = this.generateShipOne();
                }while (this.locCheckPl(locations.plLoc) || this.locNearbyPl(locations.plLoc));
                player.plShips[i].locations = locations.plLoc;
                player.plShips[i].reserve = locations.plRes;
            }
            if (player.plShips[i].size === 2){
                do {
                    locations = this.generateShipTwo();
                }while (this.locCheckPl(locations.plLoc) || this.locNearbyPl(locations.plLoc));
                player.plShips[i].locations = locations.plLoc;
                player.plShips[i].reserve = locations.plRes;
            }
            if (player.plShips[i].size === 3){
                do {
                    locations = this.generateShipThree();
                }while (this.locCheckPl(locations.plLoc) || this.locNearbyPl(locations.plLoc));
                player.plShips[i].locations = locations.plLoc;
                player.plShips[i].reserve = locations.plRes;
            }
            if (player.plShips[i].size === 4){
                do {
                    locations = this.generateShipFour();
                }while (this.locCheckPl(locations.plLoc) || this.locNearbyPl(locations.plLoc));
                player.plShips[i].locations = locations.plLoc;
                player.plShips[i].reserve = locations.plRes;
            }

        }
        console.log("Расположение кораблей игрока : ");
        console.log(player.plShips);
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

    locCheckPl: function checkLoc(locations) {
        // var count = 0;
        for (var i = 0; i < player.shipNum; i++) {
            var plShip = player.plShips[i];
            for (var j = 0; j < locations.length; j++) {
                if (plShip.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    },

    locNearbyPl: function nearby(reserve){
        for (var i = 0; i < player.shipNum; i++) {
            var plShip = player.plShips[i];
            for (var k = 0; k < reserve.length; k++) {
                if (plShip.reserve.indexOf(reserve[k]) >= 0) {
                    return true;
                }
            }
        }
        return false;
    },

    generateShipThree: function () {
        var row,col,plRow,plCol;
        var pos = Math.floor(Math.random() * 2);
        if (pos === 1) { // horizontal
            row = Math.floor(Math.random() * this.board);
            col = Math.floor(Math.random() * (this.board - this.sizeThree));
            plRow = Math.floor(Math.random() * this.board);
            plCol = Math.floor(Math.random() * (this.board - this.sizeThree));
        } else { // vertical
            row = Math.floor(Math.random() * (this.board - this.sizeThree));
            col = Math.floor(Math.random() * this.board);
            plRow = Math.floor(Math.random() * (this.board - this.sizeThree));
            plCol = Math.floor(Math.random() * this.board);
        }
        var newShipLocations = [];
        var reserved = [];
        var playerShip = [];
        var playerReserved = [];
        for (var i = 0; i < this.sizeThree; i++) {
            if (pos === 1) {
                newShipLocations.push(row.toString() + (col + i).toString());
                playerShip.push('0' + plRow.toString() + (plCol + i).toString());
                reserved.push((row + 1).toString() + (col + i).toString());
                reserved.push((row - 1).toString() + (col + i).toString());
                playerReserved.push('0' + (plRow + 1).toString() + (plCol + i).toString());
                playerReserved.push('0' + (plRow - 1).toString() + (plCol + i).toString());
            } else {
                newShipLocations.push((row + i).toString() + col.toString());
                playerShip.push('0' + (plRow + i).toString() + plCol.toString());
                reserved.push((row + i).toString() + (col + 1).toString());
                reserved.push((row + i).toString() + (col - 1).toString());
                playerReserved.push('0' + (plRow + i).toString() + (plCol + 1).toString());
                playerReserved.push('0' + (plRow + i).toString() + (plCol - 1).toString());
            }
        }
        var rowRes = row - 1;
        var colRes = col - 1;
        var plRowRes = plRow - 1;
        var plColRes = plCol - 1;
        for (var k = 0; k < 3; k++){
            if (pos === 1){
                reserved.push((rowRes + k).toString() + colRes.toString());
                reserved.push((rowRes + k).toString() + (col + this.sizeThree));
                playerReserved.push('0' + (plRowRes + k).toString() + plColRes.toString());
                playerReserved.push('0' + (plRowRes + k).toString() + (plCol + this.sizeThree));
            } else{
                reserved.push(rowRes.toString() + (colRes + k).toString());
                reserved.push((row + this.sizeThree).toString() + (colRes + k).toString());
                playerReserved.push('0' + plRowRes.toString() + (plColRes + k).toString());
                playerReserved.push('0' + (plRow + this.sizeThree).toString() + (plColRes + k).toString());
            }
        }
        return {
            loc: newShipLocations,
            res: reserved,
            plLoc : playerShip,
            plRes : playerReserved
        };
    },
    generateShipOne: function () {
        var row,col,plRow,plCol;
            row = Math.floor(Math.random() * this.board);
            col = Math.floor(Math.random() * (this.board - this.sizeOne));
            plRow = Math.floor(Math.random() * this.board);
            plCol = Math.floor(Math.random() * (this.board - this.sizeOne));
        var newShipLocations = [];
        var reserved = [];
        var playerShip = [];
        var playerReserved = [];
                newShipLocations.push(row.toString() + col.toString());
                playerShip.push('0' + plRow.toString() + plCol.toString());
                reserved.push((row + 1).toString() + col.toString());
                reserved.push((row - 1).toString() + col.toString());
                playerReserved.push('0' + (plRow + 1).toString() + plCol.toString());
                playerReserved.push('0' + (plRow - 1).toString() + plCol.toString());
        var rowRes = row - 1;
        var colRes = col - 1;
        var plRowRes = plRow - 1;
        var plColRes = plCol - 1;
        for (var k = 0; k < 3; k++){
                reserved.push((rowRes + k).toString() + colRes.toString());
                reserved.push((rowRes + k).toString() + (col + this.sizeOne));
                playerReserved.push('0' + (plRowRes + k).toString() + plColRes.toString());
                playerReserved.push('0' + (plRowRes + k).toString() + (plCol + this.sizeOne));
        }
        return {
            loc: newShipLocations,
            res: reserved,
            plLoc : playerShip,
            plRes : playerReserved
        };
    },
    generateShipTwo: function () {
        var row,col,plRow,plCol;
        var pos = Math.floor(Math.random() * 2);
        if (pos === 1) { // horizontal
            row = Math.floor(Math.random() * this.board);
            col = Math.floor(Math.random() * (this.board - this.sizeTwo));
            plRow = Math.floor(Math.random() * this.board);
            plCol = Math.floor(Math.random() * (this.board - this.sizeTwo));
        } else { // vertical
            row = Math.floor(Math.random() * (this.board - this.sizeTwo));
            col = Math.floor(Math.random() * this.board);
            plRow = Math.floor(Math.random() * (this.board - this.sizeTwo));
            plCol = Math.floor(Math.random() * this.board);
        }
        var newShipLocations = [];
        var reserved = [];
        var playerShip = [];
        var playerReserved = [];
        for (var i = 0; i < this.sizeTwo; i++) {
            if (pos === 1) {
                newShipLocations.push(row.toString() + (col + i).toString());
                playerShip.push('0' + plRow.toString() + (plCol + i).toString());
                reserved.push((row + 1).toString() + (col + i).toString());
                reserved.push((row - 1).toString() + (col + i).toString());
                playerReserved.push('0' + (plRow + 1).toString() + (plCol + i).toString());
                playerReserved.push('0' + (plRow - 1).toString() + (plCol + i).toString());
            } else {
                newShipLocations.push((row + i).toString() + col.toString());
                playerShip.push('0' + (plRow + i).toString() + plCol.toString());
                reserved.push((row + i).toString() + (col + 1).toString());
                reserved.push((row + i).toString() + (col - 1).toString());
                playerReserved.push('0' + (plRow + i).toString() + (plCol + 1).toString());
                playerReserved.push('0' + (plRow + i).toString() + (plCol - 1).toString());
            }
        }
        var rowRes = row - 1;
        var colRes = col - 1;
        var plRowRes = plRow - 1;
        var plColRes = plCol - 1;
        for (var k = 0; k < 3; k++){
            if (pos === 1){
                reserved.push((rowRes + k).toString() + colRes.toString());
                reserved.push((rowRes + k).toString() + (col + this.sizeTwo));
                playerReserved.push('0' + (plRowRes + k).toString() + plColRes.toString());
                playerReserved.push('0' + (plRowRes + k).toString() + (plCol + this.sizeTwo));
            } else{
                reserved.push(rowRes.toString() + (colRes + k).toString());
                reserved.push((row + this.sizeTwo).toString() + (colRes + k).toString());
                playerReserved.push('0' + plRowRes.toString() + (plColRes + k).toString());
                playerReserved.push('0' + (plRow + this.sizeTwo).toString() + (plColRes + k).toString());
            }
        }
        return {
            loc: newShipLocations,
            res: reserved,
            plLoc : playerShip,
            plRes : playerReserved
        };
    },
    generateShipFour: function () {
        var row,col,plRow,plCol;
        var pos = Math.floor(Math.random() * 2);
        if (pos === 1) { // horizontal
            row = Math.floor(Math.random() * this.board);
            col = Math.floor(Math.random() * (this.board - this.sizeFour));
            plRow = Math.floor(Math.random() * this.board);
            plCol = Math.floor(Math.random() * (this.board - this.sizeFour));
        } else { // vertical
            row = Math.floor(Math.random() * (this.board - this.sizeFour));
            col = Math.floor(Math.random() * this.board);
            plRow = Math.floor(Math.random() * (this.board - this.sizeFour));
            plCol = Math.floor(Math.random() * this.board);
        }
        var newShipLocations = [];
        var reserved = [];
        var playerShip = [];
        var playerReserved = [];
        for (var i = 0; i < this.sizeFour; i++) {
            if (pos === 1) {
                newShipLocations.push(row.toString() + (col + i).toString());
                playerShip.push('0' + plRow.toString() + (plCol + i).toString());
                reserved.push((row + 1).toString() + (col + i).toString());
                reserved.push((row - 1).toString() + (col + i).toString());
                playerReserved.push('0' + (plRow + 1).toString() + (plCol + i).toString());
                playerReserved.push('0' + (plRow - 1).toString() + (plCol + i).toString());
            } else {
                newShipLocations.push((row + i).toString() + col.toString());
                playerShip.push('0' + (plRow + i).toString() + plCol.toString());
                reserved.push((row + i).toString() + (col + 1).toString());
                reserved.push((row + i).toString() + (col - 1).toString());
                playerReserved.push('0' + (plRow + i).toString() + (plCol + 1).toString());
                playerReserved.push('0' + (plRow + i).toString() + (plCol - 1).toString())
            }
        }
        var rowRes = row - 1;
        var colRes = col - 1;
        var plRowRes = plRow - 1;
        var plColRes = plCol - 1;
        for (var k = 0; k < 3; k++){
            if (pos === 1){
                reserved.push((rowRes + k).toString() + colRes.toString());
                reserved.push((rowRes + k).toString() + (col + this.sizeFour));
                playerReserved.push('0' + (plRowRes + k).toString() + plColRes.toString());
                playerReserved.push('0' + (plRowRes + k).toString() + (plCol + this.sizeFour));
            } else{
                reserved.push(rowRes.toString() + (colRes + k).toString());
                reserved.push((row + this.sizeFour).toString() + (colRes + k).toString());
                playerReserved.push('0' + plRowRes.toString() + (plColRes + k).toString());
                playerReserved.push('0' + (plRow + this.sizeFour).toString() + (plColRes + k).toString());
            }
        }
        return {
            loc: newShipLocations,
            res: reserved,
            plLoc : playerShip,
            plRes : playerReserved
        };
    },
};

var player = {
    shipNum: 10,
    sunkShip: 0,
    plShips: [
        { locations: [], reserve: [], hits: [""], sunk: false, size: 1 },
        { locations: [], reserve: [], hits: [""], sunk: false, size: 1 },
        { locations: [], reserve: [], hits: [""], sunk: false, size: 1 },
        { locations: [], reserve: [], hits: [""], sunk: false, size: 1 },
        { locations: [], reserve: [], hits: ["", ""], sunk: false, size: 2 },
        { locations: [], reserve: [], hits: ["", ""], sunk: false, size: 2 },
        { locations: [], reserve: [], hits: ["", ""], sunk: false, size: 2 },
        { locations: [], reserve: [], hits: ["", "", ""], sunk: false, size: 3 },
        { locations: [], reserve: [], hits: ["", "", ""], sunk: false, size: 3 },
        { locations: [], reserve: [], hits: ["", "", "", ""], sunk: false, size: 4 },
    ],
    plDispShip: function () {
        for (var i = 0; i < this.shipNum; i++){
            for (var k = 0; k < this.plShips[i].locations.length; k++){
                view.displayHit(this.plShips[i].locations[k]);
            }
        }
    }
};

var control = {
    plCourse: true, // ход игрока
    botCourse: false, // ход бота
    gameFinish: false,
    guesses: 0,
    finish: function () {
        if (model.shipSunk === model.numShips){
            view.displayMessage('Ты победил! Ты выстрелил ' + this.guesses +
                ' раз, чтобы потопить все ' + model.numShips + ' целей !');
            this.gameFinish = true;
            this.botCourse = false;
            this.plCourse = false;
            //console.log(model);
            console.log(this.gameFinish);
        } else if (player.sunkShip === player.shipNum){
            view.displayMessage('Бот победил, выстрелив ' + model.shoots +
                ' раз, чтобы потопить все ' + player.shipNum + ' целей !');
            this.gameFinish = true;
            this.botCourse = false;
            this.plCourse = false;
            //console.log(model);
            console.log(this.gameFinish);
        }
    },
    processGu: function (guess) {
        var elem = document.getElementById(guess);
        if (elem.classList.contains('sunk') || elem.classList.contains('miss') || elem.classList.contains('hit')){
            view.displayMessage('Сюда стрелять нельзя !')
        }
        else if (!this.course()){
            view.displayMessage('Не твой ход !')
        } else if (this.gameFinish){
            view.displayMessage('Серьезно ? Игра окончена уже !')
        }
        else if (isNaN(guess)){
            var location = this.parseGu(guess);
            if (location){
                this.guesses++;
                var hit = model.fire(location);
                if (hit){
                    control.plCourse = true;
                    control.course();
                } else{
                    control.plCourse = false;
                    control.botCourse = true;
                    control.course();
                }
            }
        }
        else {
            var location = guess;
            this.guesses++;
            var hit = model.fire(location);
            if (hit) {
                control.plCourse = true;
                control.botCourse = false;
                control.course();
            } else {
                control.plCourse = false;
                control.botCourse = true;
                control.course();
            }
        }
        //console.log(control.plCourse)
    },
    parseGu: function (guess) {
        var alphabet = ['A', 'B', 'C', 'D', 'E', 'F','G','H','I','J'];

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
                return newGuess;
            }
        }
        return null;
    },
    course: function () {
        if (this.plCourse){
            view.displayCourse('Твой ход !');
            return true;
        }else {
            view.displayCourse('Ход соперника !');
            return false;
        }
    }
};


function init() {
    model.addLoc();
    model.addLocPl();
    player.plDispShip();
    control.course();
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
// window.onload = control.course;


//console.log(model.ships);
//console.log(player.plShips);
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

//  Добавить в методы создания кораблей еще 1 массив с 0 вначале
//  Также переписать в цикл резервы впереди и сзади корабля

// if (pos === 1){
//     reserved.push(row.toString() + (col - 1).toString());
//     reserved.push((row + 1).toString() + (col - 1).toString());
//     reserved.push((row - 1).toString() + (col - 1).toString());
//     reserved.push(row.toString() + (col + 3).toString());
//     reserved.push((row + 1).toString() + (col + 3).toString());
//     reserved.push((row - 1).toString() + (col + 3).toString());
// } else{
//     reserved.push((row - 1).toString() + col.toString());
//     reserved.push((row - 1).toString() + (col - 1).toString());
//     reserved.push((row - 1).toString() + (col + 1).toString());
//     reserved.push((row + 3).toString() + col.toString());
//     reserved.push((row + 3).toString() + (col - 1).toString());
//     reserved.push((row + 3).toString() + (col + 1).toString());
// }

// let stock = "1 lemon, 2 cabbages, and 101 eggs";
// function minusOne(match, amount, unit) {
//     amount = Number(amount) - 1;
//     if (amount == 1) { // остался только один, убрать 's'
//         unit = unit.slice(0, unit.length - 1);
//     } else if (amount == 0) {
//         amount = "no";
//     }
//     return amount + " " + unit;
// }
//
// console.log(stock.replace(/(\d+) (\w+)/g, minusOne));

// var reg = /ca[rt]/;
// console.log(reg.test('abract'));

window.setInterval(model.botShootCheck, 500);

// Убрать выстрелы бота в точки, куда уже стрелял
