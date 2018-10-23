(function() {
    return {
        add: function (vec1, vec2) {
            let x1 = vec1[0];
            let y1 = vec1[1];
            let x2 = vec2[0];
            let y2 = vec2[1];

            return [x1 + x2, y1 + y2];
        },
        
        multiply: function (vec1, scalar) {
            let x1 = vec1[0];
            let y1 = vec1[1];

            return [x1 * scalar, y1 * scalar];
        },
        
        length: function (vec1) {
            let x1 = vec1[0];
            let y1 = vec1[1];

            return Math.sqrt(((x1 * x1) + (y1 * y1)));
        },

        dot: function (vec1, vec2) {
            let x1 = vec1[0];
            let y1 = vec1[1];
            let x2 = vec2[0];
            let y2 = vec2[1];

            return (x1 * x2) + (y1 * y2);
        },

        cross: function (vec1, vec2) {
            let x1 = vec1[0];
            let y1 = vec1[1];
            let x2 = vec2[0];
            let y2 = vec2[1];

            return (x1 * y2) - (y1 * x2);
        }
    }
}());