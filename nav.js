"use strict"
const body = document.querySelector("body");
const box = document.querySelector("#box");
var roll, speed;
var rotateX, rotateY, clientX, clientY, target;

function animation() {
    var x = rotateX + speed;
    var y = rotateY + speed;
    rotateX = x < 360 ? x : x - 360;
    rotateY = y < 360 ? y : y - 360;
    box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    roll = requestAnimationFrame(animation);
    if (speed <= 0) {
        speed = 0;
        cancelAnimationFrame(roll);
    }
}

speed = 2;
rotateX = rotateY = 0;
roll = requestAnimationFrame(animation);

box.onmousedown = function(e) {
    cancelAnimationFrame(roll);
    if (e.target != this) {
        target = 1;
        clientX = e.clientX;
        clientY = e.clientY;
    } else {
        clientX = clientY = undefined;
    }
}
body.onmousemove = function(e) {
    if (e.buttons == 1 && target && clientX && clientY) {
        e.preventDefault();
        rotateX += clientY - e.clientY;
        rotateY += e.clientX - clientX;
        clientX = e.clientX;
        clientY = e.clientY;
        box.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}
body.onmouseup = function(e) {
    if (target == 1) {
        roll = requestAnimationFrame(animation);
        target = 0;
    }
}