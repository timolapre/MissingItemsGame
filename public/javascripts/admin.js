function getAllPlayers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            var allplayers = $("#allplayers");
            allplayers.html('');
            for (i = 0; i < response.length; i++) {
                addElements(allplayers, [response[i].name]);
            }
        }
    };
    xhttp.open("GET", "/api/players", true);
    xhttp.send();
}

function getAllWinners() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            var allplayers = $("#allplayers");
            allplayers.html('');
            for (i = 0; i < response.length; i++) {
                addElements(allplayers, [response[i].name, response[i].points]);
            }
        }
    };
    xhttp.open("GET", "/api/winners", true);
    xhttp.send();
}

function getAllAnswers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            var allplayers = $("#allanswers");
            allplayers.html('');
            for (i = 0; i < response.length; i++) {
                addElements(allplayers, [response[i].name, response[i].answer], response[i].id);
            }
        }
    };
    xhttp.open("GET", "/api/players", true);
    xhttp.send();
}

function clearPlayers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            getAllPlayers();
        }
    };
    xhttp.open("POST", "/api/clearplayers", true);
    xhttp.send();
}

function addElements(element, array, playerid) {
    var div = $('<div></div>');
    div.addClass("singleElement");

    if (playerid) {
        div.append("<button class='floatr btn btn-primary marginl' onclick='addPoint(" + playerid + ")'><b>+</b></button> <button class='floatr btn btn-primary marginl' onclick='removePoint(" + playerid + ")'><b>-</b></button> <p class='floatr marginl' id='player" + playerid + "'>0</p>");
    }

    for (var i = 0; i < array.length; i++) {
        console.log(array[i])
        div.append("<p>" + array[i] + "</p>")
    }

    element.append(div);
}

function addPoint(player) {
    var el = $('#player' + player);
    var points = parseInt(el.html());
    points++;
    el.html(points);
}

function removePoint(player) {
    var el = $('#player' + player);
    var points = parseInt(el.html());
    points--;
    el.html(points);
}

function goToPage(page, add) {
    var level = getLevel();
    if (level) {
        if (add) {
            level = parseInt(level) + add;
        }
    } else {
        level = 1;
    }
    window.location.href = "/admin/" + page + "?level=" + level;
}

function changeImage(removed) {
    var image = document.getElementById('gameimg');
    if (getLevel() == 6) {
        goToPage('winners');
    }
    if (removed) {
        image.src = "../images/" + getLevel() + "r.png"
    } else {
        image.src = "../images/" + getLevel() + ".png"
    }
}

function getLevel() {
    var url_string = window.location.href
    var url = new URL(url_string);
    var level = url.searchParams.get("level");
    console.log(level);
    return level;
}

function setTimer(timeLeft) {
    var elem = document.getElementById('countdowntimer');

    var timerId = setInterval(countdown, 1000);

    var url = window.location.href.split('/');
    console.log(url);
    var url2 = url[4].split('?')[0];
    console.log(url2);
    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
            if (url2 == 'game') {
                goToPage('game2');
            } else {
                goToPage('answers');
            }
        } else {
            elem.innerHTML = timeLeft + ' seconden';
            timeLeft--;
        }
    }
}

function setAnswer() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            $('#answerlist').html("Verwijderde objecten: &ensp; &ensp; &ensp; " + response[0].answer);
        }
    };
    xhttp.open("GET", "/api/gameinfo?level=" + getLevel(), true);
    xhttp.send();
}


function addPoints() {
    var elements = $(".singleElement");
    for (var i = 0; i < elements.length; i++) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log('succes');
            }
        };
        xhttp.open("POST", "/api/addpoints", true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        var id = parseInt(i) + 1;
        xhttp.send("playerid=" + id + "&addpoints=" + $("#player" + id).html());
    }
}

function getMissingCount() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            $('#missingcount').html("Verwijderde objecten: " + response[0].amount);
        }
    };
    xhttp.open("GET", "/api/gameinfo?level=" + getLevel(), true);
    xhttp.send();
}