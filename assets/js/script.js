var today = moment();
var storedSchedule=[];


//store data to local storage
function storeevent(){
    //console.debug("try");

    //check with confirm button
    if (confirm("Please confirm to save") === false){

        return;
    }

 
    var tempslot =this.id.substring(5);
    console.debug(this.id);
    console.debug(tempslot);
    console.debug('#text_'+ tempslot);
    var eventdetail = $('#text_'+ tempslot).val();
    console.debug(eventdetail);
    
    //check if it is null string
    if(eventdetail=== ""){
        alert('Please enter the event details');
        $("#ApptSave").hide();
        $("#ApptDeleted").hide();
        return;
    }

    tempSchedule = {
        timeslot: tempslot,
        event : eventdetail
    }


    //check if there is another event in that timeslot
    storedSchedule = JSON.parse(localStorage.getItem("StoredSchedule"));
    console.debug(storedSchedule);  
    for (i=0; i<storedSchedule.length; i++) {
        if (storedSchedule[i].timeslot === tempslot)
        {
            storedSchedule[i].event= eventdetail;
            localStorage.setItem("StoredSchedule", JSON.stringify(storedSchedule));
            showevent();
            $("#ApptSave").show();
            $("#ApptDeleted").hide();
            return;
        }
    }
    

    console.debug(tempSchedule);
    storedSchedule.push(tempSchedule);
    
    console.debug(storedSchedule);

    localStorage.setItem("StoredSchedule", JSON.stringify(storedSchedule));
    showevent();
    $("#ApptSave").show();
    $("#ApptDeleted").hide();


}


//delete event
function deleteevent(){

    if (confirm("Please confirm to delete") === false){
        return;
    }
    console.debug("deleted")
    var tempslot =this.id.substring(7);
    console.debug(this.id);
    console.debug(tempslot);


    //get the storedSchedule detail from local storage
    storedSchedule = JSON.parse(localStorage.getItem("StoredSchedule"));
    console.debug(storedSchedule);  
    
    if(!Array.isArray(storedSchedule)) {
        storedSchedule = [];  
        return;
    } 
    
    // deleted the event from the storedschedule array and store it in local storage and textarea
    for (i=0; i<storedSchedule.length; i++){
        if(storedSchedule[i].timeslot === tempslot){
            var tSTemp = storedSchedule[i].timeslot;
            console.debug(storedSchedule[i].event);
            console.debug(tSTemp); 
            storedSchedule.splice(i,1);
            console.debug(storedSchedule);
            localStorage.setItem("StoredSchedule", JSON.stringify(storedSchedule));
            $("#text_"+tSTemp).val("");
            $("#ApptDeleted").show();
            $("#ApptSave").hide();
            break;
        }
           
    
    }

    


}


function showevent(){
        //get stored schedule details and display on the schedule
        storedSchedule = JSON.parse(localStorage.getItem("StoredSchedule"));
        console.debug(storedSchedule);  
    
        if(!Array.isArray(storedSchedule)) storedSchedule = [];
    
        console.debug(storedSchedule);     
    
        for (i=0; i<storedSchedule.length; i++){
            var tSTemp = storedSchedule[i].timeslot;
            console.debug(storedSchedule[i].event);
            console.debug(tSTemp);
    
            var temp = $('#text_'+tSTemp);
            temp.val(storedSchedule[i].event);
    
        }

        //check the current time and change the background color of the schedule
        var now = moment();
        var todayString = now.format('YYYY-MM-DD');
        $('[id^=timeslot_]').each(function(index){
            var timeslotTime = moment(todayString + ' ' + this.id.substring(9), 'YYYY-MM-DD hhmm');
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
    

}

//set today time and compare the current to classify the past, current and future time slot
function init(){
    
    //show today date
    $("#currentDay").text(today.format("MMM Do, YYYY"));
    showevent();




   /* console.debug(ThisScore);    

    storedScore.push(ThisScore);  
    
    console.debug(storedScore);
    localStorage.setItem("StoredScore", JSON.stringify(storedScore));
*/
}

init();
$('[id^=save_]').click(storeevent);

$('[id^=delete_]').click(deleteevent);
