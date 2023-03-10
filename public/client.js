const socket = io();

const messageBox = document.querySelector('.message__area');
const textfield = document.getElementById('user_message');
const title = document.getElementById('title');

let name ;

do{
    name = prompt("enter your Name");
    title.innerText = name;
}while(!name);

textfield.addEventListener('keyup',(e)=>{
    if(e.key === "Enter"){
        var msg = textfield.value.trim();
        textfield.value = "";

        console.log(msg);
        sendMessage(msg);
    }
})

function sendMessage(msg){
    let message = {
        name : name,
        message : msg
    }
    console.log(message);

    appendMessage(message,'incoming');
    socket.emit('message',message);
    scrollTodown()
}

function appendMessage(message,type){

    let makeDiv = document.createElement('div');
    makeDiv.classList.add('message',type);

    let content = `
    <p>${message.name}</p>
        <h4>${message.message}</h4>
    `;

    makeDiv.innerHTML = content;

    messageBox.appendChild(makeDiv);
    scrollTodown()
}

socket.on('message',(msg)=>{
    console.log("mg");
    appendMessage(msg,'outgoing');
})

function scrollTodown(){
    messageBox.scrollTop = messageBox.scrollHeight;
}