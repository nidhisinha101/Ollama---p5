// Step 1:
// Download Ollama: https://ollama.com/

// Step 2:
// Launch Ollama and follow its instructions.

// Step 3:
// Find a model of your choice in Ollama library: https://ollama.com/library/

// Step 4:
// Copy the code within the model page (such as llama3.1) and run it in your terminal (it may take a while to download): https://ollama.com/library/llama3.1
// ollama run llama3.1

// Step 5:
// Change model name in this sketch to match the model you just downloaded in the previous step
// mode: "llama3.1"

// Step 6:
// Download this sketch (you might need to save this sketch to your own account before you can download it) and run this sketch locally.
// Instructions on how to run your sketch locally: https://github.com/processing/p5.js/wiki/Local-server

// References:
// https://www.jsdelivr.com/package/npm/ollama-js-client

const Ollama = window.OllamaJS;

const ollama = new Ollama({
  model: "gemma3:270m",
  url: "http://127.0.0.1:11434/api/"
});

let activeResponse = "";
let responseDone = true;
let activeResponseElement;

let inputField;
let sendButton;

function setup() {
  // noCanvas();
  createCanvas(600, 400);
  createElement("h1", "Ollama Chat Example with Context");
  createP(
    "This is a code example for chatting with a large language model with a chat interface while keeping the context."
  );
  createP(
    "<strong>Note: this sketch must be run <a target='_blank' href='https://github.com/processing/p5.js/wiki/Local-server'>locally</a> in conjunction with <a target='_blank' href='https://ollama.com/'>Ollama</a>.</strong>"
  );
  inputField = createInput("What is p5.js?");
  sendButton = createButton("Confirm");
  sendButton.mousePressed(addPrompt);
}

function addPrompt() {
  if (responseDone) {
    responseDone = false;
    const activePrompt = inputField.value();
    createP("User: " + activePrompt);
    activeResponseElement = createP();
    activeResponse = "Assistant: ";

    ollama.chat(
      [
        {
          role: "system",
          //   content:
          //     "You are a sad boy that has lost his toy. I have your toy and you want it back. Agressively and persistently demand your toy back, but also reluctantly answer questions. Also, there is a frog in the room with you and his croaking is really bothering you."
          // },
          content: "Respond in brainrot language"
        },
        { role: "assistant", content: "Hello, I am your AI friend." },
        { role: "user", content: activePrompt }
      ],
      (error, response) => {
        if (error) {
          console.error(error);
        } else {
          // console.log(response);
          activeResponse += response.message.content;
          responseDone = response.done;
          activeResponseElement.html(activeResponse);
        }
      }
    );
  }
}

function draw() {
  if (activeResponse) {
    circle(width / 2, height / 2, 50); // Placeholder for any visual feedback, like a loading circle
  }
}
