function createTemplate() {

    // Timer stuff

    // Credit: Mateusz Rybczonec

    const FULL_DASH_ARRAY = 283;
    const WARNING_THRESHOLD = 10;
    const ALERT_THRESHOLD = 5;

    const COLOR_CODES = {
    info: {
        color: "green"
    },
    warning: {
        color: "orange",
        threshold: WARNING_THRESHOLD
    },
    alert: {
        color: "red",
        threshold: ALERT_THRESHOLD
    }
    };

    //We can adjust the time here

    const TIME_LIMIT = 3600;
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timerInterval = null;
    let remainingPathColor = COLOR_CODES.info.color;

    document.getElementById("app").innerHTML = `
    <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
            id="base-timer-path-remaining"
            stroke-dasharray="283"
            class="base-timer__path-remaining ${remainingPathColor}"
            d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
            "
        ></path>
        </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(
        timeLeft
    )}</span>
    </div>
    `;

    startTimer();

    function onTimesUp() {
    clearInterval(timerInterval);
    }

    function startTimer() {
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
        );
        setCircleDasharray();
        setRemainingPathColor(timeLeft);

        if (timeLeft === 0) {
        onTimesUp();
        alert("Times up!");
        }
    }, 1000);
    }

    function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
    }

    function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
        document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
        document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
        document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
        document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
    }

    function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }

    function setCircleDasharray() {
    const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
    }

    // End of the timer stuff - Copyright and special thanks to Geoff Graham https://codepen.io/geoffgraham/pen/yLywVbW 

    //Our final form should show:
    // Current Status Update#[REPORT#]
    // Impact
    // [ISSUE]
    // What have we done so far
    // [ACTIONS1]
    // What are we currently doing
    // [ACTIONS2]

    //var cName = document.getElementById("custName").value;

    var select = document.getElementById('updateSelect');
    var value = select.options[select.selectedIndex].value;

    var cImpact = document.getElementById("custImpact").value;

    var cActions = document.getElementById("actionsTaken").value;
    var cDoing = document.getElementById("doing").value;


    // ------> This will most likely be used afterwards <--------

    // document.getElementById("temp").value = 
    // "Current Status Update #" + value + "\n" + 
    // "\nImpact:\n" + cImpact + "\n" + 
    // "\nWhat have we done so far?\n" + cActions + "\n" + 
    // "\nWhat are we currently doing?\n" + cDoing
    // ;

    // var copyText = document.getElementById("temp");

    // copyText.select();
    // copyText.setSelectionRange(0, 99999);
    // document.execCommand("copy");

    // console.log("Copy button was clicked. All actions worked accordingly!")
    // alert("Text copied successfully! Remember to either refresh or reset ;)");

    var winPrint = window.open('SlackStuff', '', 'left=0,top=0,width=450,height=400,toolbar=0,scrollbars=0,status=0');
    winPrint.document.write('<title>Slack Status Update</title>' + 
    '<strong>Current Status Update#' + value + '</strong>' +
    '<br><br><strong>Impact:</strong><br>' + cImpact + '<br><br><strong>What have we done so far?</strong><br>' + cActions +
    '<br><br><strong>What are we currently doing?</strong><br>' + cDoing +
    '<br><br><br><strong>/remind @noc-team "Time to post another slack update" in 60 minutes</strong>'
    
    );


}