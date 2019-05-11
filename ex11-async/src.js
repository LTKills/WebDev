// Store reference to the spinner and spinner container, create a rotate counter and null startTime
// and create an uninitialized variable to store a requestAnimationFrame() call in,
const spinner = document.querySelector('.spinner p');
const spinnerContainer = document.querySelector('.spinner');
let rotateCount = 0;
let startTime = null;
let rAF;

var TESTING = false


// Store references to the start button and the result paragraph
const btn = document.querySelector('button');
const result = document.querySelector('.result');


function random(min,max) {
    // function to generate random number
    var num = Math.floor(Math.random()*(max-min)) + min;
    return num;
}


function moveRight(id) {
    var pp = document.getElementById(id);
    var right = parseInt(pp.style.left) || 0;

    right += 100 // speed;  // move
    pp.style.left = right + "px";
    alert("Hi")

    //var move = setTimeout(function() {
    //	moveRight(id);
    //}, 50);

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
    draw();
    // Show the spinner and hide the button
    spinnerContainer.style.display = 'block';
    btn.style.display = 'none';
    // run the setEndgame() function after a random number of seconds between 5 and 10
    if (TESTING) {
        setTimeout(setEndgame, random(5000,10000));
    } else {
        setTimeout(setEndgame, random(1000,2000));
    }
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
	    result.textContent = 'Player 1 won!!';
	    moveRight('yellowCar');
	} else if(e.key === "l") {
	    result.textContent = 'Player 2 won!!';
	}

	document.removeEventListener('keydown', keyHandler);
	setTimeout(reset, 5000);
    };
}
