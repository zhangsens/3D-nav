"use s"
const body = document.querySelector("body");
const box = document.querySelector("#box");
var rotateX = rotateY = 0;
var scroll, speed;
var clientX, clientY;

function animation() {
    var x = rotateX + speed;
    var y = rotateY + speed;
    rotateX = x < 360 ? x : x - 360;
    rotateY = y < 360 ? y : y - 360;
    box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    scroll = requestAnimationFrame(animation);
    if (speed <= 0) {
        speed = 0;
        cancelAnimationFrame(scroll);
    } else {
        speed -= 1;
    }
}

function rolling() {
    speed = Math.random() * 50 + 50;
    requestAnimationFrame(animation);
}

rolling();
var roll = setInterval(rolling, 5000);

box.onmousedown = function(e) {
    clearInterval(roll);
    e.preventDefault();
    clientX = e.clientX;
    clientY = e.clientY;
}
body.onmousemove = function(e) {
    e.preventDefault();
    if (e.buttons == 1) {
        rotateX += clientY - e.clientY;
        rotateY += e.clientX - clientX;
        clientX = e.clientX;
        clientY = e.clientY;
        box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}
body.onmouseup = function(e) {
    e.preventDefault();
    roll = setInterval(rolling, 5000);
}