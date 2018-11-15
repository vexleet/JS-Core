class LineManager {
    constructor(stops) {
        for (let stop of stops) {
            if (typeof stop.name !== 'string' || typeof stop.timeToNext !== 'number' ||
                stop.name === '' || stop.timeToNext < 0) {
                throw new Error('Invalid data')
            }
        }

        this.stops = stops;
        this.currentStop = stops[0];
        this.timeOnCourse = 0;
        this.delay = 0;
    }

    get atDepot() {
        if (this.currentStop === this.stops[this.stops.length - 1]) {
            return true;
        }
        return false;
    }

    get nextStopName() {
        let indexOfCurrentStop = this.stops.indexOf(this.currentStop);

        if (indexOfCurrentStop === this.stops.length - 1) {
            return "At depot";
        }
        else {
            return this.stops[indexOfCurrentStop + 1].name;
        }
    }

    get currentDelay() {
        return this.delay;
    }

    arriveAtStop(minutes) {
        if (minutes < 0) {
            throw new Error("Minutes cannot be negative");
        }
        if (this.currentStop === this.stops[this.stops.length - 1]) {
            throw new Error("Last stop reached");
        }

        this.timeOnCourse += minutes;
        this.delay += minutes - this.currentStop.timeToNext;

        let indexOfCurrentStop = this.stops.indexOf(this.currentStop);
        this.currentStop = this.stops[indexOfCurrentStop + 1];


        if (this.currentStop === this.stops[this.stops.length - 1]) {
            return false;
        }
        else {
            return true;
        }
    }

    toString() {
        let indexOfCurrentStop = this.stops.indexOf(this.currentStop);

        let result = "Line sumary" +
            `\n${indexOfCurrentStop + 1 !== this.stops.length ? '- Next stop: ' + this.stops[indexOfCurrentStop + 1].name : "- Course completed"}` +
            `\n- Stops covered: ${indexOfCurrentStop}` +
            `\n- Time on course: ${this.timeOnCourse} minutes` +
            `\n- Delay: ${this.currentDelay} minutes`;

        return result;
    }
}


