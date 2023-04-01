// // Get the character bar element and all the character names within it
// const characterBar = document.querySelector("#character-bar");
// const characterNames = characterBar.querySelectorAll("span");

// // Get the detailed info element and its child elements that we want to update
// const detailedInfo = document.querySelector("#detailed-info");
// const nameElement = detailedInfo.querySelector("#name");
// const imageElement = detailedInfo.querySelector("#image");
// const voteCountElement = detailedInfo.querySelector("#vote-count");
// const votesForm = detailedInfo.querySelector("#votes-form");
// const resetBtn = detailedInfo.querySelector("#reset-btn");

// // Create an array to store information about each character
// // const characters = [
// //   { 
// //     name: "Mr. Cute", 
// //     imageUrl: "assets/Mr. cute.gif", 
// //     votes: 0 
// //   },
// //   { 
// //     name: "Mr . Monkey", 
// //     imageUrl: "assets/mr. monkey.gif", 
// //     votes: 0 
// //   },
// //   { name: "Mx. Monkey", 
// //     imageUrl: "assets/mx monkey.jpg", 
// //     votes: 0 
// //   },
// //   { name: "Ms. Zebra", 
// //     imageUrl: "assets/Ms. zebra.gif", 
// //     votes: 0
// //   },
// //   { name: "Dr. Lion", 
// //     imageUrl: "assets/Dr. lion.gif", 
// //     votes: 0 
// //   },
// //   { name: "Mme. Panda", 
// //     imageUrl: "assets/Mme panda.webp", 
// //     votes: 0 
// //   },
// // ];

// // Add a click event listener to each character name in the character bar
// characterNames.forEach((name, index) => {
//   name.addEventListener("click", () => {
//     // Update the detailed info elements with information about the clicked character
//     const character = characters[index];
//     nameElement.textContent = character.name;
//     imageElement.src = character.imageUrl;
//     imageElement.alt = character.name;
//     voteCountElement.textContent = character.votes;

//     // Reset the votes form input and add a submit event listener
//     votesForm.reset();
//     votesForm.addEventListener("submit", (event) => {
//       event.preventDefault();
//       const votesInput = votesForm.querySelector("#votes");
//       const votes = parseInt(votesInput.value);
//       character.votes += votes;
//       voteCountElement.textContent = character.votes;
//       votesForm.reset();
//     });

//     // Add a click event listener to the reset button
//     resetBtn.addEventListener("click", () => {
//       character.votes = 0;
//       voteCountElement.textContent = character.votes;
//     });
//   });
// });

// The above code is a vanilla javascript which I was practising with.
// the difference with the code below is that it does not fetc data from the server (db.json)



// Define DOM elements
const characterBar = document.getElementById('character-bar');
const characterInfo = document.querySelector('.characterInfo');
const nameElement = document.getElementById('name');
const imageElement = document.getElementById('image');
const voteCountElement = document.getElementById('vote-count');
const votesForm = document.getElementById('votes-form');
const resetButton = document.getElementById('reset-btn');

// Fetch character data from db.json
fetch('http://localhost:3000/characters')
  .then(response => response.json())
  .then(characters => {
    // Populate character names in character bar
    characters.forEach(character => {
      const span = document.createElement('span');
      span.textContent = character.name;
      span.addEventListener('click', () => displayCharacterInfo(character));
      characterBar.appendChild(span);
    });

    // Display the first character in character info section by default
    displayCharacterInfo(characters[0]);
  })
  .catch(error => {
    console.error('Error fetching character data:', error);
  });

// Display detailed information about a selected character
function displayCharacterInfo(character) {
  nameElement.textContent = character.name;
  imageElement.src = character.image;
  voteCountElement.textContent = character.votes;

  // Update votes when the form is submitted
  votesForm.addEventListener('submit', event => {
    event.preventDefault();
    const votesInput = document.getElementById('votes');
    const votes = parseInt(votesInput.value);
    character.votes += votes;
    voteCountElement.textContent = character.votes;
    votesInput.value = '';
  });

  // Reset votes when the reset button is clicked
  resetButton.addEventListener('click', () => {
    character.votes = 0;
    voteCountElement.textContent = character.votes;
  });
 
}
