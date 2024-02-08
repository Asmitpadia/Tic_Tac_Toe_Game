let btn  = document.querySelector("#sliderButton");
btn.addEventListener("click",()=>{
    document.querySelector("#opt1").classList.toggle("active2");
    document.querySelector("#opt2").classList.toggle("activeO")
});
const button = document.querySelectorAll(".btn");
let turn = true;
let boxes = document.querySelectorAll(".box");
let gameMode;
Array.from(button).forEach((opt)=>{
    opt.addEventListener("click",(e)=>{
        document.querySelector("#homepage").classList.add("none");
        document.querySelector("#game").classList.remove("none");
        gameMode = opt.getAttribute("id")
        if(gameMode === "player"){
            if(isMode){
                Array.from(boxes).forEach((box)=>{
                        box.addEventListener("click",()=>{
                            if(turn === true){
                                box.innerHTML = "X";
                                turn = false;
                                box.classList.add("yellow")
                            }else{
                                box.innerHTML = "O";
                                turn = true;
                                box.classList.add("green")
                            }
                            checkWinner()
                            changeTurn()
                            box.disabled = true;
                        })
                });
                console.log("player added");
            }
        }else if(gameMode === "ai"){
            Array.from(boxes).forEach((box)=>{
                box.addEventListener("click",()=>{
                    box.innerHTML = "X";
                    box.classList.add("yellow");
                    AI()
                    checkWinner()
                    changeTurn()
                    box.disabled = true;
                })
            })
        }
    })
})
let winnningPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const checkWinner = ()=>{
    for(patterns of winnningPattern){
        if(boxes[patterns[0]].innerHTML != "" && boxes[patterns[0]].innerHTML === boxes[patterns[1]].innerHTML && boxes[patterns[1]].innerHTML === boxes[patterns[2]].innerHTML){
            console.log("winner declared ");
            for(box of boxes){
                box.disabled = true;
            }
            document.querySelector("#winner").classList.add("boxActive");
            document.querySelector("#winner").classList.remove("boxInactive");
            document.querySelector("#text").innerHTML = boxes[patterns[0]].innerHTML + " Takes The Round";
        }else{
            checkTie()
        }
    }
    changeTurn()
};
const checkTie = ()=>{
    let arr = []
    for(box of boxes){
        if(box.innerHTML !== ""){
            arr.push(box)
        }
    }
    if(arr.length === 9){
        document.querySelector("#winner").classList.add("boxActive");
        document.querySelector("#winner").classList.remove("boxInactive");
        document.querySelector("#text").innerHTML = "Oh! No Its a Tie";
    }
}
let turnText = document.querySelector("#turnSpan");
const changeTurn = ()=>{
    if(turn === true){
        turnText.innerHTML = "X";
    }else{
        turnText.innerHTML = "O";
    }
};
const AI = ()=>{
    let arr = [];
    console.log("AI added");
    for(box of boxes){
        if(box.textContent.trim() === ""){
            arr.push(box)
        }
    }
    artificialIntelligence(arr)
}
const artificialIntelligence = (e)=>{
    if(e.length === 0){
    }else{
        let choice = Math.floor(Math.random() * (e.length - 1))
        e[choice].innerHTML = "O";
        e[choice].classList.add("green")
    }
}
const reset = ()=>{
    for(box of boxes){
        box.innerHTML = "";
        box.disabled = false;
        turn = true;
        box.classList.remove("green");
        box.classList.remove("yellow")
    }
}
let resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click",()=>{
    reset()
})
let nextRound = document.querySelector("#next-round");
nextRound.addEventListener("click",()=>{
    reset();
    document.querySelector("#winner").classList.add("boxInactive")
})
const quit = ()=>{
    document.querySelector("#game").classList.add("none")
    document.querySelector("#homepage").classList.remove("none")
};
let quitBtn = document.querySelector("#quit");
let isMode = true;
quitBtn.addEventListener("click",()=>{
    document.querySelector("#winner").classList.add("boxInactive");
    location.reload()
})