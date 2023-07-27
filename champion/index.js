// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://mobile-app-9ee32-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const championMessageInDB = ref(database, "champion")

const textareaFieldEl = document.getElementById("input-text")
const publishButtonEl = document.getElementById("Publish-button")
let endorsementsMessages= document.getElementById("message-list")


publishButtonEl.addEventListener("click", function() {
    let inputTextValue = textareaFieldEl .value
    
    push(championMessageInDB, inputTextValue)
    
    clearInputFieldEl()
})

onValue(championMessageInDB, function(snapshot) {
    if (snapshot.exists()) {
        let messageArray = Object.entries(snapshot.val())
    
        clearInputFieldEl()
        
        for (let i = 0; i < messageArray.length; i++) {
            let currentMessage = messageArray[i]
            let currentMessageID = currentMessage[0]
            let currentItemValue = currentMessage[1]
            
            appendEndorsementMessage(currentMessage)
        }    
    } else {
        endorsementsMessages.innerHTML = ""
    }
})

// function clearMessageEl() {
//     shoppingListEl.innerHTML = ""
// }

function clearInputFieldEl() {
    textareaFieldEl.value = ""
}

//creating endorsements field from innerHTML
function appendEndorsementMessage(message) {
    let messageID = message[0]
    let messageValue = message[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = messageValue 
    
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfmessageInDB = ref(database, `champion/${messageID}`)
        
        remove(exactLocationOfmessageInDB)
    })
    
    endorsementsMessages.append(newEl)
}