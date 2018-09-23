function calcTriangleArea(side1, side2, side3){
    let s = (side1 + side2 + side3) / 2;

    let result = Math.sqrt(s*(s - side1)*(s - side2)*(s-side3));

    console.log(result);
}

calcTriangleArea(2, 3.5, 4);