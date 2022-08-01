var today = moment();
var storedSchedule=[];


//store data
function storeevent(){
    console.debug("try");
    var tempslot =this.id.substring(5);
    console.debug(this.id);
    console.debug(tempslot);
    console.debug('#text_'+ tempslot);
    var eventdetail = $('#text_'+ tempslot).val();
    console.debug(eventdetail);
   // $(this).
    tempSchedule = {
        timeslot:'text_'+tempslot,
        event : eventdetail
    }

    console.debug(tempSchedule);
    storedSchedule.push(tempSchedule);
    
    console.debug(storedSchedule);

    localStorage.setItem("StoredSchedule", JSON.stringify(storedSchedule));


}



//set today time and compare the current to classify the past, current and future time slot
function init(){
    
    //show today date
    $("#currentDay").text(today.format("MMM Do, YYYY"));


    //get stored schedule details and display on the schedule
    storedSchedule = JSON.parse(localStorage.getItem("StoredSchedule"));
    console.debug(storedSchedule);  

    if(!Array.isArray(storedSchedule)) storedSchedule = [];


    /*storedSchedule[0]={
        timeslot:"text_1000",
        event:"wakeup"
    }
    console.debug(storedSchedule); 
    */
   /* var temp = document.querySelector("#text_0900");
    temp.textContent="try0";

    $("#text_1000").text = "AAA";*/
    

    for (i=0; i<storedSchedule.length; i++){
        var tSTemp = storedSchedule[i].timeslot;
        console.debug(storedSchedule[i].event);
        console.debug(tSTemp);

        var temp = $('#'+tSTemp);
        temp.val(storedSchedule[i].event);

    }

    //check the current time and change the background color of the schedule
    var now = moment();
    var todayString = now.format('YYYY-MM-DD');
    $('[id^=timeslot_]').each(function(index){
        var timeslotTime = moment(todayString + ' ' + this.id.substring(5), 'YYYY-MM-DD hhmm');
        var text = 'present';
        var timediff = timeslotTime.diff(now, 'minutes');
        if(timediff < -60){
            text = 'past';
        }else if(timediff > 0){
            text = 'future';
        }

        $(this).attr('class',text);
        console.log(timeslotTime.format('YYYY-MM-DD hh:mm') + ' is ' + text);
    });


   /* console.debug(ThisScore);    

    storedScore.push(ThisScore);  
    
    console.debug(storedScore);
    localStorage.setItem("StoredScore", JSON.stringify(storedScore));
*/
}

init();
$('[id^=save_]').click(storeevent);
