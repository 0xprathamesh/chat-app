const socket = io()

let username;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message-area');
do {
   username = prompt('Please enter your name: ')
} while (!username)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})
const sendMessage = chat => {
    let msg = {
        user: username,
        message: chat.trim()
    }

    //Apend msg
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    //Send to server

    socket.emit('message', msg)
}

const appendMessage = (msg, type) => {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')


    let markup = ` 
        <h4>${msg.user}</h4>
        <p>${msg.message} </p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)

}
// Recieve Message

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}


