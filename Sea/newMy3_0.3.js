var view ={
    displayMessage: function (msg) {
        var messageDisplay = document.querySelector('#messageArea');
        messageDisplay.innerHTML = msg;
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
        messageDisplay.innerHTML = msg;
    },
    displayBotHit: function (location) {
        var hits = document.getElementById(location);
        hits.setAttribute('class', 'x');
    }
};


var model = {
    hit: false,
    shoots: 0,
    board: 10, // Размер поля
    numShips: 10, // Число кораблей
    // Длины кораблей
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
    shootsLoc: ['000', '001', '002', '003', '004', '005', '006', '007', '008', '009',
                '010', '011', '012', '013', '014', '015', '016', '017', '018', '019',
                '020', '021', '022', '023', '024', '025', '026', '027', '028', '029',
                '030', '031', '032', '033', '034', '035', '036', '037', '038', '039',
                '040', '041', '042', '043', '044', '045', '046', '047', '048', '049',
                '050', '051', '052', '053', '054', '055', '056', '057', '058', '059',
                '060', '061', '062', '063', '064', '065', '066', '067', '068', '069',
                '070', '071', '072', '073', '074', '075', '076', '077', '078', '079',
                '080', '081', '082', '083', '084', '085', '086', '087', '088', '089',
                '090', '091', '092', '093', '094', '095', '096', '097', '098', '099',
    ],
    again: false,
    moreShoots: false,
    mbShoots: 100,
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.locations.indexOf(guess);
            var elem;

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
                        elem = document.getElementById(ship.reserve[j]);
                        if (ship.reserve[j].length === 2 && !elem.classList.contains('hit')){
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

    fireBotNew: function(newRand, choice) {
        var index, rand, shoot, select;
        if (model.again){
            select = choice;
            rand = newRand;
            model.moreShoots = true;
        } else {
            rand = Math.floor(Math.random() * (model.shootsLoc.length - 1));
        }
        console.log(model.shootsLoc);
        shoot = model.shootsLoc[rand];
        for (var i = 0; i < player.shipNum; i++){
            index = player.plShips[i].locations.indexOf(model.shootsLoc[rand]);
            if (index >= 0){
                player.plShips[i].hits[index] = 'hits';
                view.displayMessage('Бот попал !');
                view.displayBotHit(model.shootsLoc[rand]);
                model.shoots++;
                model.shootsLoc.splice(rand, 1);
                if (model.isSunk(player.plShips[i])){
                    player.sunkShip++;
                    player.plShips[i].sunk = true;
                    view.displayMessage('Бот потопил твой корабль !');
                    //this.shootsLoc.splice(rand, 1);
                    for (var j = 0; j < player.plShips[i].reserve.length; j++){
                        var elem = document.getElementById(player.plShips[i].reserve[j]);
                        if (player.plShips[i].reserve[j].length === 3 && !elem.classList.contains('x')){
                            view.displaySunk(player.plShips[i].reserve[j]);
                            var res = model.shootsLoc.indexOf(player.plShips[i].reserve[j]);
                            if (res >= 0){
                                model.shootsLoc.splice(res, 1);
                            }
                        }
                    }
                    control.finish();
                }
                //model.shootsLoc.splice(rand, 1);
                if (model.isSunk(player.plShips[i])){
                    model.again = false;
                    window.setTimeout(model.botShootCheck, 1000);
                } else{
                    model.again = true;
                    window.setTimeout(model.secondShoot, 1000, rand, shoot, select);
                }
                return {
                    bool: true,
                };
            }
        }
        view.displayMessage('Бот промазал !');
        view.displayMiss(model.shootsLoc[rand]);
        model.shootsLoc.splice(rand, 1);
        model.shoots++;
        control.botCourse = false;
        model.again = false;
        model.moreShoots = false;
        model.botShootCheck();
        return false;
    },


    secondShoot: function(rand, shoot, select){
        var newRand, choice;
        var again = shoot.split('');
        var count = 0;
        //var shoot = rand;
        do {
            if (model.moreShoots){
                choice = select;
            } else {
                choice = Math.floor(Math.random() * 3);
            }
            if(count >= 100){
                newRand = model.shootsLoc[Math.floor(Math.random() * (model.shootsLoc.length - 1))];
            } else if (choice === 0 && count < 100){
                newRand = '0' + again[1] + (Number(again[2]) + 1).toString();
            } else if (choice === 1 && count < 100){
                newRand = '0' + again[1] + (Number(again[2]) - 1).toString();
            } else if (choice === 2 && count < 100){
                newRand = '0' + (Number(again[1]) + 1).toString() + again[2];
            } else if (choice === 3 && count < 100){
                newRand = '0' + (Number(again[1]) - 1).toString() + again[2];
            }
            count++;
        } while (model.shootsLoc.indexOf(newRand) < 0);
        var secondShoot = model.shootsLoc.indexOf(newRand);
        return window.setTimeout(model.fireBotNew, 1000, secondShoot, choice)

    },



    botShootCheck: function () {
        if (control.botCourse){
            model.fireBotNew();
        } else{
            control.plCourse = true;
            control.course();
        }
    },

    isSunk: function (ship){
        for(var i = 0; i < ship.hits.length; i++){
            if (ship.hits[i] !== "hits"){
                return false;
            }
        }
        return true;
    },

    posShip: function () {
        var locations;
        for (let i = this.numShips - 1; i >= 0; i--){
            do {
                locations = this.generateShip(this.ships[i].size, '')
            } while (this.locNearby(locations.loc));
            this.ships[i].locations = locations.loc;
            this.ships[i].reserve = locations.res;
        }
        console.log("Расположение кораблей ИИ : ");
        console.log(this.ships);
    },

    posShipPl: function (){
        var locations;
        for (let i = player.shipNum - 1; i >= 0; i--){
            do {
                locations = this.generateShip(player.plShips[i].size, '0')
            } while (this.locNearbyPl(locations.loc));
            player.plShips[i].locations = locations.loc;
            player.plShips[i].reserve = locations.res;
        }
        console.log("Расположение кораблей игрока : ");
        console.log(player.plShips);
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

// добавить необязательный параметр '0' для генерации игрока
//     generateShipPl: function (shipSize){
//         var plRow,plCol;
//         var pos = Math.floor(Math.random() * 2);
//         if (pos === 1) { // horizontal
//             plRow = Math.floor(Math.random() * this.board);
//             plCol = Math.floor(Math.random() * (this.board - shipSize));
//         } else { // vertical
//             plRow = Math.floor(Math.random() * (this.board - shipSize));
//             plCol = Math.floor(Math.random() * this.board);
//         }
//         var playerShip = [];
//         var playerReserved = [];
//         for (var i = 0; i < shipSize; i++) {
//             if (pos === 1) {
//                 playerShip.push('0' + plRow.toString() + (plCol + i).toString());
//                 playerReserved.push('0' + (plRow + 1).toString() + (plCol + i).toString());
//                 playerReserved.push('0' + (plRow - 1).toString() + (plCol + i).toString());
//             } else {
//                 playerShip.push('0' + (plRow + i).toString() + plCol.toString());
//                 playerReserved.push('0' + (plRow + i).toString() + (plCol + 1).toString());
//                 playerReserved.push('0' + (plRow + i).toString() + (plCol - 1).toString());
//             }
//         }
//         var plRowRes = plRow - 1;
//         var plColRes = plCol - 1;
//         for (var k = 0; k < 3; k++){
//             if (pos === 1){
//                 playerReserved.push('0' + (plRowRes + k).toString() + plColRes.toString());
//                 playerReserved.push('0' + (plRowRes + k).toString() + (plCol + shipSize));
//             } else{
//                 playerReserved.push('0' + plRowRes.toString() + (plColRes + k).toString());
//                 playerReserved.push('0' + (plRow + shipSize).toString() + (plColRes + k).toString());
//             }
//         }
//         var newReserved = playerReserved.concat(playerShip);
//         return {
//             plLoc : playerShip,
//             plRes : newReserved
//         };
//     },

    generateShip: function (shipSize, pl) {
        var row,col;
        var pos = Math.floor(Math.random() * 2);
        if (pos === 1) { // horizontal
            row = Math.floor(Math.random() * this.board);
            col = Math.floor(Math.random() * (this.board - shipSize));
        } else { // vertical
            row = Math.floor(Math.random() * (this.board - shipSize));
            col = Math.floor(Math.random() * this.board);
        }
        var newShipLocations = [];
        var reserved = [];
        for (var i = 0; i < shipSize; i++) {
            if (pos === 1) {
                newShipLocations.push(pl + row.toString() + (col + i).toString());
                reserved.push(pl + (row + 1).toString() + (col + i).toString());
                reserved.push(pl + (row - 1).toString() + (col + i).toString());
            } else {
                newShipLocations.push(pl + (row + i).toString() + col.toString());
                reserved.push(pl + (row + i).toString() + (col + 1).toString());
                reserved.push(pl + (row + i).toString() + (col - 1).toString());
            }
        }
        var rowRes = row - 1;
        var colRes = col - 1;
        for (var k = 0; k < 3; k++){
            if (pos === 1){
                reserved.push(pl + (rowRes + k).toString() + colRes.toString());
                reserved.push(pl + (rowRes + k).toString() + (col + shipSize));
            } else{
                reserved.push(pl + rowRes.toString() + (colRes + k).toString());
                reserved.push(pl + (row + shipSize).toString() + (colRes + k).toString());
            }
        }
        var newReserved = reserved.concat(newShipLocations);
        return {
            loc: newShipLocations,
            res: newReserved,
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
        } else if (player.sunkShip === player.shipNum){
            view.displayMessage('Бот победил, выстрелив ' + model.shoots +
                ' раз, чтобы потопить все ' + player.shipNum + ' целей !');
            this.gameFinish = true;
            this.botCourse = false;
            this.plCourse = false;
        }
    },
    processGu: function (guess) {
        var elem = document.getElementById(guess);
        if (elem.classList.contains('sunk') || elem.classList.contains('miss') || elem.classList.contains('hit')){
            view.displayMessage('Сюда стрелять нельзя !')
        }
        else if (!this.course() && !this.gameFinish){
            view.displayMessage('Не твой ход !')
        } else if (this.gameFinish){
            view.displayCourse('Серьезно ? Игра окончена уже !')
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
                    //model.botShootCheck();
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
                window.setTimeout(model.botShootCheck,1000);
            }
        }
        //console.log(control.plCourse)
    },

    course: function () {
        if (control.gameFinish){
            view.displayCourse('Игра окончена !');
            return null
        }
        else if (this.plCourse){
            view.displayCourse('Твой ход !');
            return true;
        }
        else if (!this.plCourse) {
            view.displayCourse('Ход соперника !');
            return false;
        }
    }
};


function init() {
    model.posShip();
    model.posShipPl();
    player.plDispShip();
    control.course();
    //window.setInterval(model.botShootCheck, 1000);
        document.onclick = function(e) { // составляем возможность топить корабли по кликам по клетке
            var name = e.target.id;
            if (name.length === 2){
                control.processGu(name);
            }
        };

}

window.onload = init;







