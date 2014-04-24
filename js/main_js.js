var grid = [],
    allRows = [],
    temp = 0,
    winner = 0,
    check = true,
    swapping = false,
    i, j, k, btns;


function createBtns(){
    btns = $(".useful");
    if (btns){
        btns.remove();
    }

    // Create btns
    allRows = $(".row");
    k = 1;
    for (i = 4; i < 8; i++){
        for (j = 0; j < 4; j++){
            if ((i == 7)&&(j == 3 )){
                $(allRows[i]).append("<div class='gridCell useful empty'></div>")
            }
            else{
                $(allRows[i]).append("<div class='gridCell useful'><span>" + k + "</span></div>")
            }
            k++;
        }
    }

    btns = $(".useful"); //refresh the btns collection, because we create new

    // create matrix of btns and tags to identify them
    temp = 0;
    for (i = 0; i < 4; i++){
        grid
            [i] = [];
        for (j = 0; j < 4; j++){
            grid[i][j] = btns[temp];
            grid[i][j].Tag = temp;
            temp++;
        }
    }

    btns.on("click", function(){
        for (i = 0; i < 4, check == true; i++){
            for (j = 0; j < 4; j++){
                if (grid[i][j].Tag == $(this)[0].Tag){
                    if ((i != 3) && ((grid[i+1][j].Tag)) == 15) { //down
                        $(this).animate({top: "+=" + 121}, 150, function(){
                            if (!swapping){
                                checkWin();
                            }
                        });
                        temp = grid[i][j];
                        grid[i][j] = grid[i + 1][j];
                        grid[i + 1][j] = temp;
                        check = false;
                        break;
                    }
                    if ((i != 0) && (grid[i - 1][j].Tag == 15)) { //top
                        $(this).animate({top: "-=" + 121}, 150, function(){
                            if (!swapping){
                                checkWin();
                            }
                        });
                        temp = grid[i][j];
                        grid[i][j] = grid[i - 1][j];
                        grid[i - 1][j] = temp;
                        check = false;
                        break;
                    }
                    if ((j != 3) && ((grid[i][j + 1].Tag)) == 15) { //right
                        $(this).animate({left: "+=" + 121}, 150, function(){
                            if (!swapping){
                                checkWin();
                            }
                        });
                        temp = grid[i][j];
                        grid[i][j] = grid[i][j + 1];
                        grid[i][j + 1] = temp;
                        check = false;
                        break;
                    }
                    if ((j != 0) && (grid[i][j - 1].Tag == 15)) { //left
                        $(this).animate({left: "-=" + 121}, 150, function(){
                            if (!swapping){
                                checkWin();
                            }
                        });
                        temp = grid[i][j];
                        grid[i][j] = grid[i][j - 1];
                        grid[i][j - 1] = temp;
                        check = false;
                        break;
                    }
                }
            }
        }
        check = true;
    });
}

function checkWin(){
    temp = 0;
    winner = 0;
    check = true;
    for (i = 0; i < 4, check == true; i++){
        for (j = 0; j < 4; j++){
            if ((i == 3) && (j == 3)){
                check = false;
                break;
            }
            if (grid[i][j].Tag == temp){
                winner++;
                temp++;
            }   else {
                check = false;
                break;
            }

        }
    }
    if (winner == 15){
        winner = 0;
        return alert("gz u win");
    }   else    {
        check = true;
        return true;
    }
}

function swapBtns(repeat){
    swapping = true;
    row = 3; //from start empty btn has default value
    column = 3;
    console.log("row:", row, "column:", column);
    for (k = 0; k < repeat; k++){
        try {
            temp = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
            console.log(temp);
            switch (temp) {
                case 1:   //swap top
                    if (row != 0){
                        $(grid[row - 1][column]).trigger("click");
                        row--;
                        console.log("row", row, "column", column);
                        break;
                    }

                case 2:   //swap down
                    if(row != 3){
                        $(grid[row + 1][column]).trigger("click");
                        row++;
                        console.log("row", row, "column", column);
                        break;
                    }
                case 3:   //swap left
                    if(column != 0){
                        $(grid[row][column - 1]).trigger("click");
                        column--;
                        console.log("row", row, "column", column);
                        break;
                    }
                case 4:    //swap right
                    if(column != 3){
                        $(grid[row][column + 1]).trigger("click");
                        column++;
                        console.log("row", row, "column", column);
                    }
                    break;
            }
        }
        catch(error){
            console.log(error.name);
        }
    }
    swapping = false;
    return true;
}

$("#btnNewGame").on("click", function(event){
    event.preventDefault();
    createBtns();
    swapBtns(4);
});

/* //Optimized check
function checkWin(){
    temp = 14;
    for (i = 3; i < 0; i--){
        for (j = 3; j < 0; j--){
            if ((i == 3)&&(j == 3)){
                continue;
            }
            if (grid[i][j].Tag == temp){
                winner++;
                temp--;
            }
        }
    }
    if (winner == 14){
        alert("u win");
    }
}*/