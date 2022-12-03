const form=document.forms['form'];
const form_modal = document.forms['form_modal']; //hidden

Show();
function Show(){
    //sistemare con un endpoint Gateway relativo
fetch("https://d4r26b8dl1.execute-api.us-east-2.amazonaws.com/Dev/gettickets").then(onResponse).then(onJson);
}
function onResponse(response){
    //console.log(response);
    return response.json();
}

function onJson(json){
    
    const stampa_tutti = document.querySelector("#stampa_tutti");
    stampa_tutti.innerHTML = '';
    console.log(json);
    
    for(evento of json){
        const post = document.createElement("div");
        post.classList.add("post");
        const post_O = document.createElement("div");
        post_O.classList.add("post_O");
        const post_user_submitted_by = document.createElement("strong");
        post_user_submitted_by.classList.add("post_user_submitted_by");
        const post_id_note = document.createElement("strong"); //for querySelector
        post_id_note.classList.add("post_id_note");
        const post_titolo = document.createElement("em");
        post_titolo.classList.add("post_titolo");
        const post_text = document.createElement("em");
        post_text.classList.add("post_text");
        const post_data_published = document.createElement("em");
        post_data_published.classList.add("post_data_published");
        const post_data_solved = document.createElement("em");
        post_data_solved.classList.add("post_data_solved"); 
        const post_user_solved_by = document.createElement("strong");
        post_user_solved_by.classList.add("post_user_solved_by");
        const post_priority = document.createElement("em");
        post_priority.classList.add("post_priority");
        const post_opened = document.createElement("em");
        post_opened.classList.add("post_opened");
        const post_solution = document.createElement("em");
        post_solution.classList.add("post_solution");
        
        //questi solo in open tickets, li assegno nell'else
        /*
        const post_solved_by = document.createElement("input");
        post_solved_by.type = "text";
        post_solved_by.name="post_solved_by";
        post_solved_by.value="";
        
        const post_solution = document.createElement("textarea");
        post_solution.type = "text";
        post_solution.name="post_solution";
        post_solution.value="";
        */
      /*  post_solution.classList.add("post_solution");
        post_solved_by.classList.add("post_solved_by"); */

        post_user_submitted_by.textContent = evento.user_submitted_by;
        post_id_note.textContent = evento.id_note;
        post_titolo.textContent = evento.titolo;
        post_text.textContent = evento.text;
        post_data_published.textContent = evento.data_published;
        //data formatting
        var yymmdd = post_data_published.textContent.substr(0, 10); //YYYY-MM-DD
        var res = post_data_published.textContent.substr(11, 15);
        var hhmm = res.substr(0,5);
        post_data_published.textContent=(yymmdd + ', '+hhmm);
        //  da 2021-05-13T10:04:39.000Z a 2021-05-13, 10:04
        
        post_solution.textContent=evento.solution;

        post_user_solved_by.textContent = evento.user_solved_by;
        post_priority.textContent = evento.priority; //nope
        
        


        const box11 = document.createElement("div");
        box11.classList.add("box11");
        const box12 = document.createElement("div");
        box12.classList.add("box12");
        const box21 = document.createElement("div");
        box21.classList.add("box21");
        const boxx12 = document.createElement("div");
        boxx12.classList.add("boxx12");
        const box22 = document.createElement("div");
        box22.classList.add("box22");
        const box3 = document.createElement("div");
        box3.classList.add("box3");
        const box41 = document.createElement("div");
        box41.classList.add("box41");
        const box42 = document.createElement("div");
        box42.classList.add("box42");
        //opened
        const box43 = document.createElement("div");
        box43.classList.add("box43");
        //priority
        const box44 = document.createElement("div");
        box44.classList.add("box44");
        //solution
        const box45 = document.createElement("div");
        box45.classList.add("box45");

        const box1 = document.createElement("div");
        box1.classList.add("box1");
        const box2 = document.createElement("div");
        box2.classList.add("box2");
        const box4 = document.createElement("div");
        box4.classList.add("box4");
        //DA FARE ANCORA 5 PER SOLUTION  (vedi overflow-x: scroll in css) E 6 COME BOX CHE CONTIENE I BOX 4 E 5
        const box5 = document.createElement("div");
        box5.classList.add("box5");
        //vediamo se ne servono altri, l'idea è quella di appendere gli strumenti in diversi container

        //Contatorelike.addEventListener("click",onThumbnailClick);

        box11.appendChild(post_titolo);
        box12.appendChild(post_id_note);
        box21.appendChild(post_user_submitted_by);
        box22.appendChild(post_data_published);
        box3.appendChild(post_text);
        box44.appendChild(post_priority);
        
        
        //box5.appendChild(solution);
        // old //boxx3.appendChild(modalview);
        //box structure
        box1.appendChild(box11);
        box1.appendChild(box12);
        box2.appendChild(box21);
        box2.appendChild(box22);

        post_data_solved.textContent = evento.data_solved;
        var yymmdd = post_data_solved.textContent.substr(0, 10);
        var res = post_data_solved.textContent.substr(11, 15);
        var hhmm = res.substr(0,5);
        post_data_solved.textContent=(yymmdd + ', '+hhmm);

        
        if(post_data_solved.textContent != '0000-00-00, 00:00'){
            

            post_opened.textContent='SOLVED';
            post_opened.classList.remove("post_opened");
            post_opened.classList.add("post_solved");

            box43.appendChild(post_opened);
            box41.appendChild(post_user_solved_by);
            box42.appendChild(post_data_solved);
            box45.appendChild(post_solution);

            box4.appendChild(box43);
            box4.appendChild(box41);
            box4.appendChild(box42);

            post.appendChild(box1);
            post.appendChild(box2);
            post.appendChild(box3);
            post.appendChild(box4);
            post.appendChild(box45);

            stampa_tutti.appendChild(post);
        }else{
            post_opened.textContent='OPEN';
            box43.appendChild(post_opened);
            box4.appendChild(box43); //open
            box4.appendChild(box44); //priority


            box4.appendChild(post_id_note);

            
            //how do i select input values ? https://stackoverflow.com/a/67796287/8422732
            //i created a form which name is form inside "stampa_tutti"
            /*document.querySelector("form >  div").appendChild(post_solved_by);
            document.querySelector("form >  div").appendChild(post_solution);*/

                /*  SOLUTION WANNA BE   */

                const tomodal = document.createElement("button");
                tomodal.classList.add("to_modal_button");
                tomodal.textContent = "SOLVE";
                tomodal.addEventListener("click",onThumbnailClick);

                

                //box5.appendChild(tomodal);
                box4.appendChild(tomodal);

            post_O.appendChild(box1);
            post_O.appendChild(box2);
            post_O.appendChild(box3);
            post_O.appendChild(box4);
            //post_O.appendChild(box5);


            stampa_tutti.appendChild(post_O);
        }
        
        //console.log(post_data_solved.textContent);
        
    }
}

function onThumbnailClick(event){
    const box_solution = event.currentTarget.parentNode.querySelector("strong").textContent; //if i put solve button outside box 4 it cant retrieve the id
    //box_solution.classList.add("box_solution"); //per hidden, così non si vede l'id che mi serve solo per passarlo alla query per fare update
    box_solution_var=box_solution;

    document.body.classList.add("no_scroll");
    modalview.style.top = window.pageYOffset + 'px';

    const modal_box = document.createElement("div");
    modal_box.classList.add("modal_box"); //CSS flex 

    const POST = document.createElement("h4");
    POST.textContent = "Describe your solution at the best - the more you coworkers understand the process behind resolution, the more they improve!";
    
    const goback  = document.createElement("button");
    goback.classList.add("goback");
    goback.textContent = "Go back";
    goback.addEventListener("click",onModalClick);

    form_modal.addEventListener("submit",post);

    modal_box.appendChild(POST);
    modal_box.appendChild(form_modal);
    modal_box.appendChild(goback);

    modalview.appendChild(modal_box);
    modalview.classList.remove("hidden");
    form_modal.classList.remove("hidden");

}
function onModalClick(){
    document.body.classList.remove("no_scroll");
    modalview.classList.add("hidden");
    modalview.innerHTML = "";
} 

function post(event){
    event.preventDefault();
    const solved_by=form_modal.post_solved_by.value;
    const solution=form_modal.post_solution.value;

    console.log(solved_by + box_solution_var+solution );

    fetch("https://d4r26b8dl1.execute-api.us-east-2.amazonaws.com/Dev/solvetickets?solved_by="+solved_by+"&solution="+solution+"&box_solution_var="+box_solution_var).then(onResponseP); 
    //box_sol_var is for the id, which i have to pass from 1 function to another
    //onModalClick();
    //Show();
}

function onResponseP(response){
    console.log(response);
    alert("Your solution was posted!");
    onModalClick();
    Show();
    
}
const albumview = document.querySelector("#album_view");
const modalview=document.querySelector("#modal_view"); //modalview


var box_solution_var;