/*
Referred to:
http://tiny.cc/ArcadeGameCloneProject
JavaScript for Kids by Nick Morgan
RyanB walkthrough video:
https://www.youtube.com/watch?v=JcQYGbg0IkQ&t=5s
For modal: sweetalert2
https://sweetalert2.github.io/
https://sweetalert.js.org/
*/

// Enemies our player must avoid
//add in x,y to position enemy in diff spots
//add speed to be able to cntl each bug speed
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //this.x = 0; //--changing to get bugs own space
    this.x = x;
    //this.y = 58;//center at 0 bug is in the water
    this.y = y + 58;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //check to see if enemy is passed boundary
    if(this.x < 502) {
        //move 
        //mult the speed by the dt parameter on the x axis 
        //increment x by speed * dt
        this.x += this.speed * dt;
    }
        else {
            //Reset back to start, need to 'walk' on 
            this.x = -101;
        }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
//in engine.js** col(5) * 101 = canvas width 505 (line 140)
        this.horz = 101;
//engine.js** row(6) * 83 = canvas height 606
        this.vert = 83;
        this.sprite = 'images/char-princess-girl.png';
//startX places player 2 blocks to rt on x axis(col/horz)
        this.startX = this.horz * 2;
//startY places player 5 blocks down from top row/top left 0,0    
//this.startY = (this.vert * 5) - 35; **NEED TO CHANGE TO GET to collide
        this.startY = (this.vert * 4) + 58;
//sets player back to bottom middle with above calc -- use for reset
        this.x = this.startX;
        this.y = this.startY;
//setting winGame to get game animations to stop moving when game over
        this.winGame = false;
 }

//a new method for hero class update position 
    update() {
    //check collision here
        this.checkCollision();
        if (this.y <= 0) {
    //setting to stop animation after win, if statement set in engine.js
            this.winGame = true;        
            gmModal();
        }
    }

    //modified and help from:
    //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection  
    //https://stackoverflow.com/questions/2440377/javascript-collision-detection
    checkCollision() {
        //check for collisions with enemies
        for (var i = 0; i < allEnemies.length; i++) {
            if (this.x < allEnemies[i].x + 60 && this.x + 60 > allEnemies[i].x &&
                this.y < allEnemies[i].y + 60 && this.y + 60 > allEnemies[i].y) {
                this.resetPlayer();//goes bk to start
            }
        }
    } 
    //reset player back to start   
    resetPlayer() {
        //setting x and y to starting position for player
        this.x = this.startX;
        this.y = this.startY;
    }
    //render: renders the image of the user..Following enemies 
    render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//handleInput method: allows users to use arrow keys
/*
 *see below in keypress fx handleInput
 *update hero's x and y property according to input    
 *@param {string} input - direction to travel
 *
 */
 handleInput(input) {
    switch(input) {
        case 'left':
/*
 *this.x -= 101; adding (-) makes it go left, without it,
 *it does not move correctly, it jumps to the top
 *(+) sign has it going to the right
 *Vise Versa if - is on down, it will go up 
 */

 //adding if statement for boundary so will not go off pg
        if (this.x > 0) {
            this.x -= 101;
        }
            break;
        case 'up':
            if (this.y > 0) {
            this.y -= 83;
        }
            break;
        case 'right':
            if (this.x < 305) {
            this.x += 101;
        }
            break;
        case 'down':
            if (this.y < 306)
            this.y += 83;
            break;

    }
}

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
//enemy object for bugs
//to get bugs to show need to set unique x and y properties
//because they are on top of each other. Also need to go into
//var Enemy and set x and y parameters function(x,y)
//add speed at end of x/y parameters
const bug1 = new Enemy(-101, 0, 150);
const bug2 = new Enemy(-101, 75, 125);
const bug3 = new Enemy(-101, 170, 200);
//const bug4 = new Enemy(-101, 125, 100);//made browser crash so took out for now
const allEnemies = [];
//to push bugs into array -- took out bug4 for now
allEnemies.push(bug1,bug2,bug3);
console.log(allEnemies);

//gm over modal from sweetalerts2 
function gmModal() {
    swal({
        title: 'Game Over',
        text: 'You Win! ',
        type: 'success',
        showConfirmButton: true, 
        confirmButtonText: 'Play again'  
      }).then(function(isConfirm){
          location.reload();
      })
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/*
Need to add on: 
 *  -gems
 *  -scoring for gems
 *  -include score into gameOver modal
 *  -possibly additonal character choice
 */    

