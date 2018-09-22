function chessBoard(number){
    console.log("<div class=\"chessboard\">");

    for(let i = 0; i < number; i++){
        console.log("  <div>");

        for(let j = 0; j < number; j++){
            if((i + j) % 2 == 0){
                console.log("    <span class=\"black\"></span>");
            }
            else{
                console.log("    <span class=\"white\"></span>")
            }
        }

        console.log("  </div>");
    }

    console.log("</div>");
}

chessBoard(2)