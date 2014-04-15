$(".useful").on("click", function(){
    $(this).animate({left: "+="+121}, 200)
});

var grid = [],
    temp = 1,
    i, j;

for (i = 0; i < 4; i++){
    grid[i] = [];
    for (j = 0; j < 4; j++){
        grid[i][j] = temp;
        temp++;
    }
}
console.log(grid);