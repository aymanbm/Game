document.querySelector(".control-buttons span").onclick= function(){

    var YourName = prompt("What's your name?");

    if (YourName == null || YourName == "") {

        //if there is no name show unknown
        document.querySelector(".container-info .name span").innerHTML= "Unknown";
    }else {

        //if there is a name show it 
        document.querySelector(".container-info .name span").innerHTML= YourName;

    }
    document.getElementById('All-Game').play();

    LoseTheGame();
    // remove splash screen
    document.querySelector(".control-buttons").remove();
    create_tr()
    


}
// Effect duration
let duration = 1000;

// Select blocks cantainer
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range of Keys
// !!! Array(10) : array.length = 10
// let orderRange = [...Array(blocks.length).keys()];


let orderRange = Array.from(Array(blocks.length).keys());

// Set the shuffle
shuffle(orderRange);

// Add Order Css Property to Game Blocks
blocks.forEach((block,index) => {

    // Add CSS Order Property
    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener("click",function(){

        // Trigger The Flip Block 
        flipBlock(block);

        //finish the game
        finishTheGame();
        

    });
});



// Flip Block Function
function flipBlock(selectBlock){

    // Add Class is-flipped
    selectBlock.classList.add('is-flipped');

    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

    // If there is two selected Card
    if (allFlippedBlocks.length === 2) {

        // Stop Clicking Function
        stopClicking();

        // Matched Function  
        checkMatchedBlocks(allFlippedBlocks[0] ,allFlippedBlocks[1]);
    }
}

// Stop Clicking Function
function stopClicking() {

    // Add Class no-clicking on Main Container
    blocksContainer.classList.add("no-clicking");

    // Set Timeout
    setTimeout(() => {

    // Remove Class no-clicking
    blocksContainer.classList.remove("no-clicking");

    },duration);
}


// Checked Match Block
function checkMatchedBlocks(firstBlock,secondBlock){

    let triesElement = document.querySelector('.tries span');

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        // Sound Of a Successed try
        document.getElementById('success').play();

    }else {
        
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        // Sound Of a Failed try
        document.getElementById('Fail').play();


        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        },duration);
    }

}

//The Sounf After Finishing The Game
function finishTheGame(){
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("has-match"));

    // If The Game Is Finished Play This Sound
    if (allFlippedBlocks.length === 20) {

        document.getElementById('Finish-TheGame').play();
        alert("congrtla")
        console.log("hahahahha")
        

    }
    
    
}

// If time out you lose the game
function LoseTheGame(){
    setTimeout(() => {
        
        document.getElementById('lose-theGame').play();

    },60000)
}

// Shuffle Function

function shuffle(array){

    // Setting Vars
    let current = array.length,
    temp,
    random;

    while (current > 0) {
        // Get Random Number
        random = Math.floor(Math.random()*current);

        // Decrease Length By One 
        current--;

        // [1] Save Current Element In Var Called temp
        temp = array[current];

        // [2] Current Element = Random Element
        array[current] = array[random];

        // [3] Random Element =  The Elemnt Inside temp
        array[random] = temp;
    }

    return array;

}


// Local Storage
function create_tr(){
    let table = document.getElementById("table");
    let create_tr = document.createElement("tr");
    let td1 = document.createElement("td")
    let div = document.createElement("div");
    let triesElement = document.querySelector('.tries span').textContent;
    create_tr.appendChild(td1).innerHTML=YourName;
    create_tr.appendChild(td2).innerHTML=triesElement;
    table.append(create_tr);
}


