//let isSpeaking = false;
var audioContext;

// Function to initialize the AudioContext
function initAudioContext() {
    // Check if the AudioContext is already created
    if (!audioContext) {
        // Create a new AudioContext
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Your audio processing code here
        // For example:
        // var oscillator = audioContext.createOscillator();
        // oscillator.connect(audioContext.destination);
        // oscillator.start();

        var speech = new p5.Speech(voiceReady); // speech synthesis object
speech.started();

speech.setPitch(0.85)

speech.speak("SUCCESSFULLY SUBMITTED NEW POKEMON TO POKEDEX DATABASE");
    }
}

// Call the initialization function when the script starts
initAudioContext();
