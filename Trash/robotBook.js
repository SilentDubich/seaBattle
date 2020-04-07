const roads = [

"Дом Алисы-Дом Боба",
    "Дом Алисы-Почта",
    "Дом Дарии-Дом Эрни",
    "Дом Эрни-дом Греты",
    "Дом Греты-Магазин",
    "Рынок-Почта",
    "Рынок-Ратуша",
    "Дом Алисы-Склад",
    "Дом Боба-Ратуша",
    "Дом Дарии-Ратуша",
    "Дом Греты-Ферма",
    "Рынок-Ферма",
    "Рынок-Магазин",
    "Магазин-Ратуша"
] ;


function buildGraph(edges) {

let graph = Object.create(null);

function addEdge(from, to) {

    if (graph[from] == null) {
        graph[from] = [to];
    } else {
        graph[from].push(to);
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }

}
return graph;
}

const roadGraph = buildGraph(roads);
console.log(roadGraph);

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }
    move(destination) {
    if (!roadGraph.includes(destination)) {
        return this;
    } else {
    let parcels = this.parcels.map(p => {
        if (p.place != this.place) return р;
        return {place: destination, address: p.address};
    }).filter(p => p.place != p.address);
    return new VillageState(destination, parcels);
        }
    }
}

let first = new VillageState(
    "Почта",
    [{place: "Почта", address: "Дом Алисы"}]
);
let next = first.move("Дoм Алисы");

console.log(next.place);
console.log(next.parcels);
console.log(first.place);