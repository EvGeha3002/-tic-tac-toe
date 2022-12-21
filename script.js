const countOfBtns = document.querySelectorAll(".play-zone button").length;
const buttons = document.querySelectorAll(".play-zone button");
var botOn = false;
var gameIsGoing = false;
var currentMove = 1;
const winArray = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 4, 6],
    [2, 5, 8],
    [1, 4, 7],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
];
$(".button").click(function(){
    
    if(gameIsGoing === false)
    {       
        fieldReset();
        gameIsGoing = true;
    }
    $("#show-current-move span").text("Current move: " + (currentMove + 1)); 
    var target = $(this);
    if(target.text() === '')
    {
        if(currentMove % 2 === 0)
        {
            changeText("O");
        }
        else
        {
            changeText("X");
        }
        currentMove += 1;
        if(botOn === true)
        {
            setTimeout(function(){botLogic();}, 400);            
        }
        if(currentMove >= 10 && gameIsGoing === true)
        {
            draw();   
        }
        return;
        function changeText(p)
        {
            target.text(p);          
            if(hasWon(p) === true)
            {
                historyAppend("Игрок " + p + " выиграл!");                    
            }
        }
    }
    else
    {       
        alert("Это поле занято!");
    }   
});
function botLogic()
{
    
    if(currentMove >= 10 || gameIsGoing === false)
    {
        return;          
    }
    $("#show-current-move span").text("Current move: " + (currentMove + 1)); 
    var fieldIsEmpty = false;
    var btnId;
    var prevP = currentMove % 2 === 0 ? "X" : "O";
    var currP = currentMove % 2 === 0 ? "O" : "X";
    for(var i = 0; i < winArray.length; i++)
    {
        if(fieldIsEmpty === true)
        {
            break;
        }
        var count = 0;
        for(var j = 0; j < winArray[i].length; j++)
        {
               if(buttons[winArray[i][j]].textContent === currP)
            {
                count++;
            }
            if(count === 2)
            {
                for(var z = 0; z < winArray[i].length; z++)
                {
                    if(buttons[winArray[i][z]].textContent === '')
                    {
                        btnId = winArray[i][z];
                        fieldIsEmpty = true;
                        break;
                    }
                }
            }
        }
    } 
    for(var i = 0; i < winArray.length; i++)
    {
        if(fieldIsEmpty === true)
        {
            break;
        }
        var count = 0;
        for(var j = 0; j < winArray[i].length; j++)
        {
            if(buttons[winArray[i][j]].textContent === prevP)
            {
                count++;
            }
            if(count === 2)
            {
                for(var z = 0; z < winArray[i].length; z++)
                {
                    if(buttons[winArray[i][z]].textContent === '')
                    {
                        btnId = winArray[i][z];
                        fieldIsEmpty = true;
                        break;
                    }
                }
            }
        }
    } 
    while(fieldIsEmpty === false)
    {
        btnId = Math.floor(Math.random() * countOfBtns);
        if(buttons[btnId].textContent === '')
        {
            fieldIsEmpty = true;
        }
    }
    if(currentMove % 2 === 0)
    {
        buttons[btnId].textContent = 'O';         
        if(hasWon("O") === true)
        {
            historyAppend("Бот выиграл!");
            return;                        
        }
    }
    else
    {
        buttons[btnId].textContent = 'X'; 
        if(hasWon("X") === true)
        {            
            historyAppend("Бот выиграл!");
            return;       
        }
    }    
    currentMove += 1;
    if(currentMove >= 10 && gameIsGoing === true)
    {
        draw();     
    }
    return;
};
function hasWon(p)
{
    for(var i = 0; i < winArray.length; i++)
    {
        var count = 0;
        for(var j = 0; j < winArray[i].length; j++)
        {
            if(buttons[winArray[i][j]].textContent === p)
            {
                count++;
            }
            if(count === 3)
            {
                if(p === "X")
                {
                    for(var z = 0; z < winArray[i].length; z++)
                    {
                        buttons[winArray[i][z]].style.backgroundColor = "rgb(255, 183, 183)";
                    }
                }
                else
                {
                    for(var z = 0; z < winArray[i].length; z++)
                    {
                        buttons[winArray[i][z]].style.backgroundColor = "rgb(255, 248, 157)";
                    }
                }
                gameIsGoing = false;
                return true;
            }
        }       
    }
    return false;
};
function draw(){
    gameIsGoing = false;
    for(var i = 0 ; i < countOfBtns; i++)
    {
        buttons[i].style.backgroundColor = "rgb(139, 255, 164)";
    }
    historyAppend("Ничья!");  
};
$("#bot-on-off").click(function(){
    if(gameIsGoing === false)
    {
        botOn = !botOn;
        if(botOn === true)
        {
            $(this).text("Bot: on");
            $(this).css("color", "red");
            var val = Math.floor(Math.random() * 4);
            if(val % 2 === 0)
            {
                if(gameIsGoing === false)
                {
                    fieldReset();
                }
                gameIsGoing = true;
                botLogic();
            }
        }
        else
        {
            $(this).text("Bot: off");
            $(this).css("color", "blue");
        }        
    }
    else
    {
        alert("Сначала нужно доиграть!");
    }   
});
$("#rst-btn").click(function(){
    fieldReset();
});
function fieldReset()
{
    $("#show-current-move span").text("Current move: undefined");  
    gameIsGoing = false;
    currentMove = 1;
    for(var i = 0 ; i < countOfBtns; i++)
    {
        buttons[i].style.backgroundColor = "white";
        buttons[i].textContent = '';  
    }
};
function historyAppend(str){
    $(".history > ul").append($("<li>").html(str));
};
$("#rst-history-btn").click(function(){
    document.querySelector(".history > ul").replaceChildren();
});
