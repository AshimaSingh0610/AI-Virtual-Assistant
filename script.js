let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
// let voice = document.querySelector("#voice")
// Function to get available voices
function getVoices() {
    voices = window.speechSynthesis.getVoices();
    // Log available voices to console
    voices.forEach(voice => {
        console.log(voice.name, voice.lang);
    });
}

// Event listener to get voices when the window loads
window.addEventListener('load', () => {
    getVoices();
    wishMe();
});

function wishMe(){
    let day = new Date()
    let hours = day.getHours();
    if(hours>=0 && hours<=12){
        speak("Good Morning")
    }else if(hours>=12 && hours<=16 ){
        speak("Good Afternoon")
    }else{
        speak("Good Evening")
    }
}
// Listen for voices changed
window.speechSynthesis.onvoiceschanged = getVoices;

// Function to speak text
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;

    // Female voice selection
    let femaleVoice = voices.find(voice => voice.name === 'Google UK English Female');
    if (femaleVoice) {
        text_speak.voice = femaleVoice;
    } else {
        console.warn("Female voice not found, using default voice.");
    }

    window.speechSynthesis.speak(text_speak);
}


// function speak(text){
//      let text_speak = new SpeechSynthesisUtterance(text)
//      text_speak.rate=1
//      text_speak.pitch=1
//      text_speak.volume=1
//     //  text_speak.lang ="hi-IN"
//     //  text_speak.lang="en-GB"
    
//      window.speechSynthesis.speak(text_speak)
// }


// window.addEventListener('load',()=>{
//             wishMe()
//     })

let speechRecog = window.SpeechRecognition || window.webkitSpeechRecognition
let recog = new speechRecog()

recog.onresult=(event)=>{

    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText=transcript

    takeCommand(transcript.toLowerCase())
   
}

btn.addEventListener("click",()=>{
    recog.start()
    btn.style.display="none"
    voice.style.display="block"
})

function takeCommand(msg){

    btn.style.display="flex"
    voice.style.display="none"

    if(msg.includes("hello")||msg.includes("hey")||msg.includes("hi")){
        speak("Hello,How can I help you ?")
    }
    else if(msg.includes("who are you")){
        speak("I am a Virtual Assistant , created by Ashima Singh")
    }
    else if(msg.includes("open youtube")){
        speak("Opening Youtube")
        window.open("https://www.youtube.com/","_blank")
    }
    else if(msg.includes("open google")){
        speak("Opening Google")
        window.open("https://www.google.com/","_blank")
    }
    else if(msg.includes("open facebook")){
        speak("Opening Facebook")
        window.open("https://www.facebook.com/","_blank")
    }
    else if(msg.includes("open linkedin")){
        speak("Opening LinkedIn")
        window.open("https://www.linkedin.com/","_blank")
    }
    else if(msg.includes("open instagram")){
        speak("Opening Instagram")
        window.open("https://www.instagram.com/","_blank")
    }
    else if(msg.includes("open calculator")){
        speak("Opening Calculator")
        window.open("calculator://")
    }
    else if(msg.includes("open whatsapp")){
        speak("Opening Whatsapp")
        window.open("whatsapp://")
    }
    else if(msg.includes("open vscode")){
        speak("Opening VSCode")
        window.open("vscode://")
    }
    else if(msg.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
    else if(msg.includes("date")){
        let date = new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
    }
    else{
        let finalText="this is what i found on web regarding"+msg.replace("siya","")||msg.replace("sia","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${msg.replace("siya","")||msg.replace("sia","")}`,"_blank")
    }


}


