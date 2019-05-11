// Store reference to the spinner and spinner container, create a rotate counter and null startTime
// and create an uninitialized variable to store a requestAnimationFrame() call in,
const spinner = document.querySelector('.spinner p');
const spinnerContainer = document.querySelector('.spinner');
let rotateCount = 0;
let startTime = null;
let rAF;
var TESTING = false
var END_GAME = false


// Store references to the start button and the result paragraph
const btn = document.querySelector('button');
const result = document.querySelector('.result');


function random(min,max) {
    // function to generate random number
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
}


function moveRight(id, player_name) {
    var pp = document.getElementById(id);
    var right = parseInt(pp.style.left);

    if (TESTING) {
	right += Math.round(window.innerWidth)
    } else {
	right += Math.round(window.innerWidth / 10)
    }
    pp.style.left = right + "px";

    if (right >= window.innerWidth) {
    	document.getElementById("winner").innerHTML = "Congratulations " + player_name
    	document.getElementById("gameOver").innerHTML = "Good game!"
    	document.getElementById("mainButton").innerHTML = "Play again"
	END_GAME = true
    }
}


function draw(timestamp) {
    // Create a draw() function
    if(!startTime) {
	startTime = timestamp;
    }

    let rotateCount = (timestamp - startTime) / 3;

    // Set the rotation of the div to be equal to rotateCount degrees
    spinner.style.transform = 'rotate(' + rotateCount + 'deg)';

    // If rotateCount gets to 360, set it back to 0
    if(rotateCount > 359) {
	rotateCount -= 360;
    }
    // Call the next frame in the animation
    rAF = requestAnimationFrame(draw);
}



// Initially hide the spinner and results
result.style.display = 'none';
spinnerContainer.style.display = 'none';


function reset() {
    // Reset the game to its initial state on restart
    btn.style.display = 'block';
    result.textContent = '';
    result.style.display = 'none';
    }


// Start the game when the button is pressed
btn.addEventListener('click', start);


function start() {
    // Start the spinner spinning
    if (END_GAME) {
    	document.getElementById("winner").innerHTML = ""
    	document.getElementById("gameOver").innerHTML = ""
    	document.getElementById("mainButton").innerHTML = "Start Game"
	document.getElementById("blueCar").style.left = 0 + "px";
	document.getElementById("yellowCar").style.left = 0 + "px";
	END_GAME = false
    }

    draw();
    // Show the spinner and hide the button
    spinnerContainer.style.display = 'block';
    btn.style.display = 'none';

    // run the setEndgame() function after a random number of seconds between 1 and 2
    setTimeout(setEndgame, random(1000,2000));
}


function setEndgame() {
    // Function to allow players to take their turn when the time is right
    cancelAnimationFrame(rAF);
    spinnerContainer.style.display = 'none';
    result.style.display = 'block';
    result.textContent = 'PLAYERS GO!!';

    document.addEventListener('keydown', keyHandler);

    function keyHandler(e) {
	console.log(e.key);
	if(e.key === "a") {
	    result.textContent = 'Player 1 won this round';
	    moveRight('yellowCar', 'Player 1');
	} else if(e.key === "l") {
	    result.textContent = 'Player 2 won this round!!';
	    moveRight('blueCar', 'Player 2');
	}

	document.removeEventListener('keydown', keyHandler);
	setTimeout(reset, 500);
    };
}

