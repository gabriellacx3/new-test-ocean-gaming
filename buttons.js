const tabs = document.querySelectorAll('[data-tab-content]')
var gameButton = document.getElementById("game-button");
var backButton = document.getElementById("back-button")

gameButton.onclick = function() {
    tabs.forEach(tab => {
        tab.classList.remove('active')
    });
    document.querySelector('#game').classList.add('active');
}
backButton.onclick = function() {
    tabs.forEach(tab => {
        tab.classList.remove('active')
    });
    document.querySelector('#info').classList.add('active');
}
