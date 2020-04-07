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
        miss.setAttribute('class', 'miss')
    },
    // displaySunk: function(ship){
    //     if(model.isSunk(ship)){
    //         view.displayMessage('Потопил !')
    //     }
    // }

};

// view.displayMessage('some message');
// view.displayHit(40);
// view.displayMiss(45);

var model = {
    board: 7,
    numShips: 3,
    shipSize: 3,
    shipSunk: 0,
    gameFinish: false,
    ships:[
        ship1 = {
            location: ['10', '20', '30'],
            hits:[],
            sunk:false
        },
        ship2 = {
            location: ['32', '33', '34'],
            hits:[],
            sunk:false
        },
        ship3 = {
            location: ['63', '64', '65'],
            hits:[],
            sunk:false
        }
        ],
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i].location.indexOf(guess);
            // console.log(ship);
            if (ship >= 0){
                this.ships[i].hits[ship] = 'hits';
                view.displayMessage('Попал !');
                view.displayHit(guess);
                if (this.isSunk(ship)){
                    this.shipSunk++;
                    this.ships[i].sunk = true;
                    view.displayMessage('Потопил !');

                    // if (this.shipSunk ==  this.shipSize){
                    //
                    // if (this.shipSunk === this.numShips){
                    //     view.displayMessage('Ты победил !');
                    // }
                    // }
                }if (this.shipSunk == this.numShips){
                    view.displayMessage('Ты победил !');
                }
                // console.log(this.ships[i].hits);
                // console.log(this.ships[i]);
                return true;
            }

            }
        view.displayMessage('Промах !');
        view.displayMiss(guess);
        return false;
        },
    isSunk: function (ship) {
        for (i = 0; i < this.shipSize.length; i++){
            if (this.ships.hits[ship] !== 'hits'){
                return false;
            }
        }
        return true;
    },
    finish: function () {
        if (this.shipSunk == this.numShips){
            view.displayMessage('Ты победил!');
            this.gameFinish = true;
        }
    }

};


model.fire('63');
// model.fire('64');
// model.fire('65');
// // model.fire('60');
// model.fire('10');
// model.fire('20');
// model.fire('30');
// model.fire('32');
// model.fire('33');
// model.fire('34');
model.finish();
console.log(model.ships);
console.log(model.gameFinish);
console.log(model.shipSunk);
console.log(model.shipSize.length);
// model.fire('64');
// model.fire('65');
// model.fire('05');
// // model.fire(11);
//
// console.log(model.ships[0]);
// console.log(model.ships[1]);
// console.log(model.ships[2]);



// for ( var j = 0; j < ship.location[j]; j++){
//     if (ship.location[j] == guess ){
//         ship.hits.push('hit');
//         console.log(ship.hits);
//         view.displayHit(guess);
//         view.displayMessage('Попал !');
//     } else{
//         console.log('Промах !');
//         view.displayMiss(guess);
//         view.displayMessage('Промах !');
//     }
// }
// view.displayHit(guess);
// view.displayMessage('Попал !');
// // this.isSunk(ship);
// }
// ship.hits.push('hit');
//
// if (this.isSunk(ship) !== true){            // var ship = this.ships[i];
//             // var location = ship.location;