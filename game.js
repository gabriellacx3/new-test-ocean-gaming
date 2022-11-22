import * as sprites from "sprites.js"

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var font = new FontFace('segoeui', 'url(images/segoeui.ttf)')
await font.load()
document.fonts.add(font);
var speed = 7;
var panel = 0; // 0 = Main menu, 1 = in game, 2 = game over screen, 3 = instructions
var runTime = 0;
var pickedUp = 0;
var delay = 60; // spawn delay
var aPressed = false;
var dPressed = false;
var wPressed = false;
var sPressed = false;

var buttons = []
var trash = []
buttons.push(new sprites.Button(document.getElementById("button"), "Play", canvas.width / 2 - 50, canvas.height / 2 + 50, 100, 50, function() {
    panel = 1
    reset()
}))
buttons.push(new sprites.Button(document.getElementById("button"), "How to Play", canvas.width / 2 - 65, canvas.height / 2 + 125, 130, 50, function() {
    panel = 3
}))
var mainMenu = new sprites.Button(document.getElementById("button"), "Main Menu", canvas.width / 2 - 65, canvas.height - 100, 130, 50, function() {
    panel = 0
})
var player = new sprites.Player(document.getElementById("player"), canvas.width/2, canvas.height/2, 50, 50)

function reset() {
    speed = 7
    runTime = 0
    pickedUp = 0
    delay = 60
    trash = [];
    player = new sprites.Player(document.getElementById("player"), canvas.width/2, canvas.height/2, 50, 50)
    aPressed = false;
    dPressed = false;
    wPressed = false;
    sPressed = false;
}

function draw() {
    if (!document.querySelector('#game').classList.contains('active')) {
        panel = 0
        reset()
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    if (panel == 0) {
        ctx.drawImage(document.getElementById("background"), 0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'white'
        ctx.font = 'italic 100px segoeui'
        ctx.fillText("CLEANUP", canvas.width/2, canvas.height/2)
        ctx.fillStyle = 'black'
        ctx.font = '20px segoeui'
        buttons.forEach(button => {
            button.draw(ctx);
        })
    }
    else if (panel == 1) {
        ctx.drawImage(document.getElementById("gameBackground"), 0, 0, canvas.width, canvas.height)
        runTime++;
        for(var i = 0; i < trash.length; i++) {
            trash[i].draw(ctx)
            if (player.canPickUp(trash[i])) {
                trash.splice(i, 1);
                pickedUp++;
            }
        }
        player.draw(ctx)

        if (runTime % delay == 0) {
            for (var i = 0; i < Math.round(Math.random() * 4 + 1); i++) {
                let x = Math.random() * (canvas.width - 50) + 25;
                let y = Math.random() * (canvas.height - 50) + 25;
                let radius = Math.random() * 10 + 15;
                trash.push(new sprites.Trash(document.getElementById("trash"), x, y, radius, radius))
            }
        }
        if (runTime % 600 == 0) {
            speed ++;
            delay = Math.floor(delay * 0.9 + 1);
        }

        //Player controls
        if (wPressed || sPressed) {
            if (wPressed) {
                if (!player.isColliding(canvas, 0, -speed))
                    player.setVY(-speed);
                else
                    player.setVY(0);
            }
            if (sPressed) {
                if (!player.isColliding(canvas, 0, speed))
                    player.setVY(speed);
                else
                    player.setVY(0);
            }
        } else
            player.setVY(player.getVY() * 0.5);
        if (aPressed || dPressed) {
            if (aPressed) {
                if (!player.isColliding(canvas, -speed, 0))
                    player.setVX(-speed);
                else
                    player.setVX(0);
            }
            if (dPressed) {
                if (!player.isColliding(canvas, speed, 0))
                    player.setVX(speed);
                else
                    player.setVX(0)
            }
        } else
            player.setVX(player.getVX() * 0.5);

        ctx.font = 'bold 30px sans-serif'
        ctx.textAlign = "left"
        let minutes = Math.floor(runTime / 3600);
        let seconds = Math.floor(runTime / 60) - minutes*60;
        ctx.fillStyle = 'black'
        ctx.fillText("Garbage Count: " + trash.length, 51, 51)
        ctx.fillText("Picked Up: " + pickedUp, 51, 81)
        ctx.fillText("Time elapsed: " + minutes + ":" + (seconds < 10 ? "0" + seconds : seconds), 51, 111)
        ctx.fillStyle = 'white'
        ctx.fillText("Garbage Count: " + trash.length, 50, 50)
        ctx.fillText("Picked Up: " + pickedUp, 50, 80)
        ctx.fillText("Time elapsed: " + minutes + ":" + (seconds < 10 ? "0" + seconds : seconds), 50, 110)
        
        if (trash.length >= 50) {
            panel = 2;
        }
    }
    else if (panel == 2) {
        ctx.drawImage(document.getElementById("background"), 0, 0, canvas.width, canvas.height)
        ctx.font = 'italic 100px segoeui'
        ctx.textAlign = "center"
        ctx.fillStyle = 'red'
        ctx.fillText("THE BEACH GOT", canvas.width/2, canvas.height/2 - 100)
        ctx.fillText("OVERPOLLUTED!", canvas.width/2, canvas.height/2)
        ctx.fillStyle = 'white'
        let minutes = Math.floor(runTime / 3600);
        let seconds = Math.floor(runTime / 60) - minutes*60;
        ctx.font = '40px segoeui'
        ctx.fillText("You picked up " + pickedUp + " pieces of trash", canvas.width/2, canvas.height/2 + 75)
        ctx.fillText("and lasted " + minutes + " minutes and " + seconds + " seconds.", canvas.width/2, canvas.height/2 + 115)
        ctx.font = '20px segoeui'
        ctx.fillStyle = 'black'
        mainMenu.draw(ctx)
    }
    else if (panel == 3) {
        ctx.drawImage(document.getElementById("background"), 0, 0, canvas.width, canvas.height)
        // "Plastic is entering our oceans more and more every day. Your local beach is no different, so you have been hired to clean the beach from any pollution.
        // Plastic appears randomly around the beach, and it's your job to spot it and remove it. Once the beach reaches a garbage count of 50,
        // the beach becomes too overpolluted to deal with. Also, your speed and the rate at which trash enters the beach gradually increases, so be quick."
        ctx.textAlign = "center"
        ctx.fillStyle = 'white'
        ctx.font = '30px segoeui'
        ctx.fillText("Plastic is entering our oceans more and more every day.", canvas.width/2, 100)
        ctx.fillText("Your local beach is no different, so you have been hired", canvas.width/2, 130)
        ctx.fillText("to clean the beach from any pollution. Plastic appears", canvas.width/2, 160)
        ctx.fillText("randomly around the beach, and it's your job to spot it", canvas.width/2, 190)
        ctx.fillText("and remove it. Once the beach reaches a garbage count of 50,", canvas.width/2, 220)
        ctx.fillText("the beach becomes too overpolluted to deal with. Also, your", canvas.width/2, 250)
        ctx.fillText("speed and the rate at which trash enters the beach gradually", canvas.width/2, 280)
        ctx.fillText("increases, so be quick.", canvas.width/2, 310)
        ctx.fillText("WASD = movement", canvas.width/2, 400);
        ctx.fillText("Good luck!", canvas.width/2, 520);
        ctx.font = '20px segoeui'
        ctx.fillStyle = 'black'
        mainMenu.draw(ctx)
    }
    
    ctx.closePath();
}
setInterval(draw, 1/60 * 1000);

canvas.addEventListener('click', function(event) {
    if (document.querySelector('#game').classList.contains('active')) {
        if (panel == 0) {
            buttons.forEach(button => {
                button.click(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
            })
        }
        else if (panel == 2 || panel == 3) {
            mainMenu.click(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop)
        }
    }
}, false)
document.addEventListener('keydown', function(event) {
    if (document.querySelector('#game').classList.contains('active')) {
        if (panel == 1) {
            if (event.key == "w")
                wPressed = true;
            if (event.key == "a")
                aPressed = true;
            if (event.key == "s")
                sPressed = true;
            if (event.key == "d")
                dPressed = true;
        }
    }
})
document.addEventListener('keyup', function(event) {
    if (document.querySelector('#game').classList.contains('active')) {
        if (panel == 1) {
            if (event.key == "w")
                wPressed = false;
            if (event.key == "a")
                aPressed = false;
            if (event.key == "s")
                sPressed = false;
            if (event.key == "d")
                dPressed = false;
        }
    }
})
