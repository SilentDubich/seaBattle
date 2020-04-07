// Здесь наше представление
var view = {
    displayMessage: function(msg){
        var messageArea = document.querySelector('#messageArea');
        messageArea.innerHTML = msg;
    },

    displayHit: function(location){
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },

    displayMiss: function(location){
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};

// Здесь наша модель поведения игры

var model = {
    boardSize: 7,  // размер игрового поля
    numShips: 3,   // количество кораблей в игре
    shipLength: 3, // длина корабля в клетках
    shipsSunk: 0,  // количество потопленных кораблей

    ships: [
        ship1 = { location: ['10', '20', '30'], hits: ['', '', ''] },
        ship2 = { location: ['32', '33', '34'], hits: ['', '', ''] },
        ship3 = { location: ['63', '64', '65'], hits: ['', '', ''] }
    ],

    fire: function(guess){ // получает координаты выстрела
        for(var i =0; i < this.numShips; i++){
            var ship = this.ships[i];

            /*location = ship.location; // Избавляемся от временной переменной!
            var index = location.indexOf(guess);*/

            var index = ship.location.indexOf(guess);
            if(index >= 0){
                ship.hits[index] = 'hit';
                view.displayHit(guess);
                view.displayMessage("HIT!!!");
                if(this.isSunk(ship)){
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed!");
        return false;
    },

    isSunk: function(ship){
        for(var i = 0; i < this.shipLength; i++){
            if(ship.hits[i] !== "hit"){
                return false;
            }
        }
        return true;
    }
};

model.fire("10");
model.fire("20");
model.fire("30");
model.fire("65");
model.fire("43");
console.log(model.shipsSunk);
model.gun = true;
console.log(model);