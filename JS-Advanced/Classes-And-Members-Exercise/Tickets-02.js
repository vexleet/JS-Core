function solve(destinations, sortBy) {
    class Ticket{
        constructor(destination, price, status){
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }
    }

    let result = [];

    for(let i = 0; i < destinations.length; i++){
        let [destinationName, price, status] = destinations[i].split("|");

        result.push(new Ticket(destinationName, price, status));
    }

    switch (sortBy) {
        case("destination"):
            result.sort((a, b) => a.destination.localeCompare(b.destination));
            break;
        case("price"):
            result.sort((a, b) => a.price - b.price);
            break;
        case("status"):
            result.sort((a, b) => a.status.localeCompare(b.status));
            break;
    }

    return result;
}

solve(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'status'
)