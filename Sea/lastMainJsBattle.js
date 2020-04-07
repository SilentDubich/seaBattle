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

    mbShoots: 100,
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

    fireBotNew: function() {
        var row, col, loc, index, elem, rand;
        rand = Math.floor(Math.random() * (this.shootsLoc.length - 1));
        console.log('----- Начало выстрела -----');
        console.log(rand);
        console.log('Локация выстрела ' + this.shootsLoc[rand]);
        console.log('До выстрела: ');
        console.log(this.shootsLoc);
        for (var i = 0; i < player.shipNum; i++){
            index = player.plShips[i].locations.indexOf(this.shootsLoc[rand]);
            if (index >= 0){
                player.plShips[i].hits[index] = 'hits';
                view.displayMessage('Бот попал !');
                view.displayBotHit(this.shootsLoc[rand]);
                console.log(index + ' Индекс выстрела');
                this.shoots++;
                console.log(new Date() + 'Попал бот ! ' + this.shootsLoc[rand]);
                this.shootsLoc.splice(rand, 1);
                if (this.isSunk(player.plShips[i])){
                    player.sunkShip++;
                    player.plShips[i].sunk = true;
                    view.displayMessage('Бот потопил твой корабль !');
                    //this.shootsLoc.splice(rand, 1);
                    for (var j = 0; j < player.plShips[i].reserve.length; j++){
                        if (player.plShips[i].reserve[j].length === 3){
                            view.displaySunk(player.plShips[i].reserve[j]);
                            var res = this.shootsLoc.indexOf(player.plShips[i].reserve[j]);
                            if (res >= 0){
                                console.log('res = ' + res);
                                this.shootsLoc.splice(res, 1);
                            }else{
                                console.log('res ' + res);
                            }
                        }
                    }
                    console.log('После выстрела: ');
                    console.log(this.shootsLoc);
                    control.finish();
                }
                console.log('После выстрела: ');
                console.log(this.shootsLoc);
                return {
                    bool: true,
                    row: row,
                    col: col,
                };
            }
        }
        view.displayMessage('Бот промазал !');
        console.log(new Date() + 'Промах бота ! ' + this.shootsLoc[rand]);
        view.displayMiss(this.shootsLoc[rand]);
        this.shootsLoc.splice(rand, 1);
        console.log('После выстрела: ');
        console.log(this.shootsLoc);
        console.log('----- Конец выстрела -----');
        this.shoots++;
        control.botCourse = false;
        this.botShootCheck();
        return false;
    },

    fireBot: function() {
        var row, col, loc, index,elem;
        row = Math.floor(Math.random() * this.board);
        col = Math.floor(Math.random() * this.board);
        loc = '0' + row.toString() + col.toString();

        //if ( предыдущий выстрел)
        for (var i = 0; i < player.shipNum; i++){
            index = player.plShips[i].locations.indexOf(loc);
            elem = document.getElementById(loc);
            if(elem.classList.contains('sunk') || elem.classList.contains('miss') || elem.classList.contains('x')){
                return null;
            }
            else if (index >= 0){
                player.plShips[i].hits[index] = 'hits';
                view.displayMessage('Бот попал !');
                view.displayBotHit(loc);
                this.shoots++;
                console.log(new Date() + 'Попал бот ! ' + loc);
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
                //window.setTimeout(this.shootBotAg,1000, row, col);
                return {
                    bool: true,
                    row: row,
                    col: col,
                };
            }
        }
        view.displayMessage('Бот промазал !');
        console.log(new Date() + 'Промах бота ! ' + loc);
        view.displayMiss(loc);
        this.shoots++;
        control.botCourse = false;
        this.botShootCheck();
        return false;
    },


    // shootBotAg: function(row, col) {
    //     var nearbyLoc = [];
    //     var index, elem, agShoot;
    //     nearbyLoc.push('0' + (row + 1).toString() + col.toString());
    //     nearbyLoc.push('0' + (row - 1).toString() + col.toString());
    //     nearbyLoc.push('0' + row.toString() + (col + 1).toString());
    //     nearbyLoc.push('0' + row.toString() + (col - 1).toString());
    //     agShoot = Math.floor(Math.random() * nearbyLoc.length);
    //     console.log(nearbyLoc);
    //     for (var i = 0; i < player.shipNum; i++) {
    //         index = player.plShips[i].locations.indexOf(nearbyLoc[agShoot]);
    //         elem = document.getElementById(nearbyLoc[agShoot]);
    //         if (index >= 0 && nearbyLoc[agShoot].length === 3 && player.plShips[i].sunk === false) {
    //             player.plShips[i].hits[index] = 'hits';
    //             view.displayMessage('Бот попал !');
    //             view.displayBotHit(nearbyLoc[agShoot]);
    //             this.shoots++;
    //             console.log(new Date() + 'Попал бот ! ' + nearbyLoc[agShoot]);
    //             if (model.isSunk(player.plShips[i])){
    //                 player.sunkShip++;
    //                 player.plShips[i].sunk = true;
    //                 view.displayMessage('Бот потопил твой корабль !');
    //                 for (var j = 0; j < player.plShips[i].reserve.length; j++){
    //                     if (player.plShips[i].reserve[j].length === 3){
    //                         view.displaySunk(player.plShips[i].reserve[j]);
    //                     }
    //                 }
    //                 control.finish();
    //                 model.botShootCheck();
    //                 return true;
    //             }
    //             control.botCourse = false;
    //             model.botShootCheck();
    //         }
    //     }
    //     view.displayMessage('Бот промазал !');
    //     console.log(new Date() + 'Промах бота ! ' + nearbyLoc[agShoot]);
    //     view.displayMiss(nearbyLoc[agShoot]);
    //     this.shoots++;
    //     control.botCourse = false;
    //     model.botShootCheck();
    //     return false;

    //////////////////////////////////////////////////////////////////////
    //for (var i = 0; i < player.plShips; i++) {
    //     if (player.plShips[i].sunk === false){
    //         // do {
    //         //     agShoot = Math.floor(Math.random() * nearbyLoc.length);
    //         //     elem = document.getElementById(nearbyLoc[agShoot]);
    //         // }while(elem.classList.contains('sunk') || elem.classList.contains('x') || elem.classList.contains('miss') || nearbyLoc[agShoot].length > 3);
    //         // console.log(nearbyLoc[agShoot]);
    //     } else {
    //         console.log('Потоплен')
    //     }
    //
    //     index = player.plShips[i].locations.indexOf(nearbyLoc[]);
    // }
    // console.log(nearbyLoc[agShoot]);
    // control.botCourse = false;
    // model.botShootCheck();
    // },


    botShootCheck: function () {
        if (control.botCourse){
            model.fireBotNew();
        } else{
            control.plCourse = true;
            control.course();
        }
    },

    // botShootCheck:function (){
    //     do {
    //         model.shootBotAg();
    //     }while (control.botCourse);
    //     control.plCourse = true;
    //     control.course();
    // },

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
            console.log(model);
            console.log(player);
            console.log(this.gameFinish);
        } else if (player.sunkShip === player.shipNum){
            view.displayMessage('Бот победил, выстрелив ' + model.shoots +
                ' раз, чтобы потопить все ' + player.shipNum + ' целей !');
            this.gameFinish = true;
            this.botCourse = false;
            this.plCourse = false;
            console.log(model);
            console.log(player);
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
                //window.setTimeout(model.botShootCheck,1000);
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
    window.setInterval(model.botShootCheck, 1000);
    // var fireButton = document.getElementById("fireButton");
    // fireButton.onclick = handleFireButton;
    // // поработаем с Enter
    // var guessInput = document.getElementById('guessInput');
    // guessInput.onkeypress = handleKeyPress;
    document.onclick = function(e) { // составляем возможность топить корабли по кликам по клетке
        var name = e.target.id;
        if (name.length === 2){
            control.processGu(name);
        }
        // console.log(name);
    };
    // document.onmousedown = function(e) {
    //     var button = e.target.id;
    //     //console.log(button);
    //     if (button === 'first'){
    //         var count = document.getElementById('number1');
    //         if (count.textContent > 0){
    //             console.log(count.textContent);
    //             count.innerHTML = Number(count.textContent) - 1;
    //         } else{
    //             var info = document.getElementById('info1');
    //             info.innerHTML = 'У тебя закончились данные корабли'
    //         }
    //     }
    //     if (button === 'second'){
    //         var count = document.getElementById('number2');
    //         if (count.textContent > 0){
    //             console.log(count.textContent);
    //             count.innerHTML = Number(count.textContent) - 1;
    //         } else{
    //             var info = document.getElementById('info2');
    //             info.innerHTML = 'У тебя закончились данные корабли'
    //         }
    //     }
    //     if (button === 'third'){
    //         var count = document.getElementById('number3');
    //         if (count.textContent > 0){
    //             console.log(count.textContent);
    //             count.innerHTML = Number(count.textContent) - 1;
    //         } else{
    //             var info = document.getElementById('info3');
    //             info.innerHTML = 'У тебя закончились данные корабли'
    //         }
    //     }
    //     if (button === 'four'){
    //         var count = document.getElementById('number4');
    //         if (count.textContent > 0){
    //             console.log(count.textContent);
    //             count.innerHTML = Number(count.textContent) - 1;
    //         } else{
    //             var info = document.getElementById('info4');
    //             info.innerHTML = 'У тебя закончились данные корабли'
    //         }
    //     }
    // };

    // var DragManager = new function() {
    //
    //
    //     var dragObject = {};
    //
    //     var self = this;
    //
    //     function onMouseDown(e) {
    //
    //         if (e.which !== 1) return;
    //
    //         var elem = e.target.closest('.move');
    //         if (!elem) return;
    //
    //         dragObject.elem = elem;
    //
    //         // запомним, что элемент нажат на текущих координатах pageX/pageY
    //         dragObject.downX = e.pageX;
    //         dragObject.downY = e.pageY;
    //
    //         return false;
    //     }
    //
    //     function onMouseMove(e) {
    //         if (!dragObject.elem) return; // элемент не зажат
    //
    //         if (!dragObject.avatar) { // если перенос не начат...
    //             var moveX = e.pageX - dragObject.downX;
    //             var moveY = e.pageY - dragObject.downY;
    //
    //             // если мышь передвинулась в нажатом состоянии недостаточно далеко
    //             if (Math.abs(moveX) < 10 && Math.abs(moveY) < 10) {
    //                 return;
    //             }
    //
    //             // начинаем перенос
    //             dragObject.avatar = createAvatar(e); // создать аватар
    //             if (!dragObject.avatar) { // отмена переноса, нельзя "захватить" за эту часть элемента
    //                 dragObject = {};
    //                 return;
    //             }
    //
    //             // аватар создан успешно
    //             // создать вспомогательные свойства shiftX/shiftY
    //             var coords = getCoords(dragObject.avatar);
    //             dragObject.shiftX = dragObject.downX - coords.left;
    //             dragObject.shiftY = dragObject.downY - coords.top;
    //
    //             startDrag(e); // отобразить начало переноса
    //         }
    //
    //         // отобразить перенос объекта при каждом движении мыши
    //         dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
    //         dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';
    //
    //         return false;
    //     }
    //
    //     function onMouseUp(e) {
    //         if (dragObject.avatar) { // если перенос идет
    //             finishDrag(e);
    //         }
    //
    //         // перенос либо не начинался, либо завершился
    //         // в любом случае очистим "состояние переноса" dragObject
    //         dragObject = {};
    //     }
    //
    //     function finishDrag(e) {
    //         var dropElem = findDroppable(e);
    //
    //         if (!dropElem) {
    //             self.onDragCancel(dragObject);
    //         } else {
    //             self.onDragEnd(dragObject, dropElem);
    //         }
    //     }
    //
    //     function createAvatar(e) {
    //
    //         // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
    //         var avatar = dragObject.elem;
    //         var old = {
    //             parent: avatar.parentNode,
    //             nextSibling: avatar.nextSibling,
    //             position: avatar.position || '',
    //             left: avatar.left || '',
    //             top: avatar.top || '',
    //             zIndex: avatar.zIndex || ''
    //         };
    //
    //         // функция для отмены переноса
    //         avatar.rollback = function() {
    //             old.parent.insertBefore(avatar, old.nextSibling);
    //             avatar.style.position = old.position;
    //             avatar.style.left = old.left;
    //             avatar.style.top = old.top;
    //             avatar.style.zIndex = old.zIndex
    //         };
    //
    //         return avatar;
    //     }
    //
    //     function startDrag(e) {
    //         var avatar = dragObject.avatar;
    //
    //         // инициировать начало переноса
    //         document.body.appendChild(avatar);
    //         avatar.style.zIndex = 9999;
    //         avatar.style.position = 'absolute';
    //     }
    //
    //     function findDroppable(event) {
    //         // спрячем переносимый элемент
    //         dragObject.avatar.hidden = true;
    //
    //         // получить самый вложенный элемент под курсором мыши
    //         var elem = document.elementFromPoint(event.clientX, event.clientY);
    //
    //         // показать переносимый элемент обратно
    //         dragObject.avatar.hidden = false;
    //
    //         if (elem == null) {
    //             // такое возможно, если курсор мыши "вылетел" за границу окна
    //             return null;
    //         }
    //
    //         return elem.closest('.move');
    //     }
    //
    //     document.onmousemove = onMouseMove;
    //     document.onmouseup = onMouseUp;
    //     document.onmousedown = onMouseDown;
    //
    //     this.onDragEnd = function(dragObject, dropElem) {
    //
    //         // скрыть/удалить переносимый объект
    //         dragObject.elem.hidden = true;
    //
    //         // успешный перенос, показать улыбку классом computer-smile
    //         dropElem.className = 'hit';
    //     };
    //
    //     this.onDragCancel = function(dragObject) {
    //         // откат переноса
    //         dragObject.avatar.rollback();
    //     };
    //
    // };
    //
    //
    // function getCoords(elem) { // кроме IE8-
    //     var box = elem.getBoundingClientRect();
    //
    //     return {
    //         top: box.top + pageYOffset,
    //         left: box.left + pageXOffset
    //     };
    //
    // }


}

// function handleFireButton(){
//     var guessInput = document.getElementById('guessInput');
//     var guess = guessInput.value;
//     control.processGu(guess);
//
//     guessInput.value = "";
// }
//
// function handleKeyPress(e){
//     var fireButton = document.getElementById("fireButton");
//     if(e.keyCode === 13){
//         fireButton.click();
//         return false;
//     }
//
// }

window.onload = init;
// window.onload = control.course;


//console.log(model.ships);
//console.log(player.plShips);
// console.log(model.gameFinish);
// console.log(model.shipSunk);
//console.log(model);

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



// в методе firebot добавить проверку на истинность предыдущего попадания
// если истинно, то возьми методы проверки из botshootag
// если ложь пусть происходит обычный выстрел
// при этом оставь вызов через интервал

// Начать делать ручную расстановку кораблей
// добавить под таблицами счетчик доступных кораблей и их иконки
//

// исправить метод на повторный выстрел
// стреляет в запрещенные точки
// также подправить его на случай потопленности корабля при первом выстреле

//     var shoot = this.fireBot();
//         if (shoot.bool) {
//             var row = shoot.row;
//             var col = shoot.col;
//             var nearbyLoc = [];
//             var index;
//             nearbyLoc.push('0' + (row + 1).toString() + col.toString());
//             nearbyLoc.push('0' + (row - 1).toString() + col.toString());
//             nearbyLoc.push('0' + row.toString() + (col + 1).toString());
//             nearbyLoc.push('0' + row.toString() + (col - 1).toString());
//             console.log(nearbyLoc);
//             var rand = Math.floor(Math.random() * nearbyLoc.length);
//             for (var i = 0; i < 4; i++) {
//                 var elem = document.getElementById(nearbyLoc[i]);
//                 if (!elem.classList.contains('sunk') || !elem.classList.contains('miss') || !elem.classList.contains('x') && nearbyLoc[rand].length === 3) {
//                     for (var k = 0; k < player.shipNum; k++) {
//                         index = player.plShips[k].locations.indexOf(nearbyLoc[i]);
//                         if (index >= 0) {
//                             player.plShips[k].hits[index] = 'hits';
//                             view.displayMessage(new Date() + 'Бот попал !');
//                             view.displayBotHit(nearbyLoc[i]);
//                             this.shoots++;
//                             console.log('Попал бот ! ' + nearbyLoc[rand]);
//                             if (this.isSunk(player.plShips[k])) {
//                                 player.sunkShip++;
//                                 player.plShips[k].sunk = true;
//                                 view.displayMessage('Бот потопил твой корабль !');
//                                 for (var j = 0; j < player.plShips[k].reserve.length; j++) {
//                                     if (player.plShips[k].reserve[j].length === 3) {
//                                         view.displaySunk(player.plShips[k].reserve[j]);
//                                     }
//                                 }
//                                 control.finish();
//                             }
//                         }
//                     }
//                 }
//             }
//             view.displayMessage('Бот промазал !');
//             console.log(new Date() + 'Промах бота ! ' + nearbyLoc[i]);
//             view.displayMiss(nearbyLoc[i]);
//             this.shoots++;
//             control.botCourse = false;
//             return false;
//         }


// Убрать проверку на ход бота
// Вызывать метод выстрела бота при промахе
// В случай попадания бота вызывать метод повторных выстрелов
// Написать скрипт стрельбы в соседние клетки и в случай попадания стрелять в соседнюю
// Попробовать для этого использовать do while
// В случай промахов бота в обоих случаях и промахе игрока переключать ходы и возвращать метод botshootcheck





