let myFlag = false;

function createTemplate() {

    // Notifications and stuff

    function notifyMe() {
        if (Notification.permission !== 'granted')
         Notification.requestPermission();
        else {
         var notification = new Notification('Notification title', {
          icon: 'images/caticon.ico',
          body: 'Hey there! \nRemember to post an update for your Team!',
         });
         notification.onclick = function() {
          window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley');
             };
         }
    }

    setInterval(function() {notifyMe();}, 5000);

    //document.getElementById('updateSelect');
    //select.options[select.selectedIndex].value;

    document.getElementById("custImpact").innerHTML = localStorage.getItem("myImpact");
    document.getElementById("actionsTaken").innerHTML = localStorage.getItem("myActions");
    document.getElementById("doing").innerHTML = localStorage.getItem("myDoing");

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

    // This will use our localstorage

    localStorage.setItem("mySelect", select);
    localStorage.setItem("myValue", value);
    localStorage.setItem("myImpact", cImpact);
    localStorage.setItem("myActions", cActions);
    localStorage.setItem("myDoing", cDoing);

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
    winPrint.document.write('<title>Slack Status Update</title><strong>Current Status Update#' + value + '</strong>' +
    '<br><br><strong>Impact:</strong><br>' + cImpact + '<br><br><strong>What have we done so far?</strong><br>' + cActions +
    '<br><br><strong>What are we currently doing?</strong><br>' + cDoing +
    '<br><br><br>/remind @noc-team "Time to post another slack update" in 60 minutes'
    
    );


}

function pageLoads(){

    document.getElementById("custImpact").innerHTML = localStorage.getItem("myImpact");
    document.getElementById("actionsTaken").innerHTML = localStorage.getItem("myActions");
    document.getElementById("doing").innerHTML = localStorage.getItem("myDoing");

}