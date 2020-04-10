function getAnswer() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(this.responseText);
            if (response[0].answer) {
                document.getElementById("form").value = response[0].answer;
            }
        }
    };
    xhttp.open("GET", "/api/answer", true);
    xhttp.send();
}