const form=document.forms['form'];
form.addEventListener('submit',create);

function create(event){
    event.preventDefault();
    const priority = document.createElement("em");
    if(form.priority.value=="HIGH"){
        priority.textContent='High Priority';
    }else  {
        priority.textContent='Low Priority';
    }
    console.log(form.ticket_title.value);
    console.log(form.ticket_text.value);
    console.log(form.submitted_by.value);
    console.log(priority.textContent);


    fetch("https://d4r26b8dl1.execute-api.us-east-2.amazonaws.com/Dev/createticket?ticket_title="+form.ticket_title.value+"&ticket_text="+form.ticket_text.value+"&submitted_by="+form.submitted_by.value+"&priority="+priority.textContent).then(onResponse);//.then(onJson);

    alert("Your ticket has been published!");
}
function onResponse(response){
    console.log(response);
    

}