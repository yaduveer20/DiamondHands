'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const modalCloseButton = document.querySelector('.close-modal');
const modalOpenButtons = document.querySelectorAll('.open-modal');
const h1_Element = document.getElementById('hech1');


//remove modal and overlay and make them appear
function openModalOverlay(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

//add modal and overlay and make them disappear
function closeModalOverlay(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

//attaching event listener to all of the open modal buttons
//this for loop creates an event listener for all button elements in the modalOpenButtons list 
//and the execution continues to next line of codes 
for(let i = 0; i<modalOpenButtons.length; i++)
    modalOpenButtons[i].addEventListener('click',function(){
        h1_Element.textContent = `Hi, I'm modal ${i+1} 😍`;
        
        //removes hidden class from modal and thus modal is no longer hidden
        //f1
        //modal.classList.remove('hidden');

        //provides same functionality as f1
        //modal.style.display = 'block';

        //removes hidden class from overlay classlist and thus overlay is no longer hidden
        //overlay.classList.remove('hidden');

        openModalOverlay();
    });

//attaching event listener to the close-modal button

modalCloseButton.addEventListener('click',closeModalOverlay);

//attaching event list to overlay to close modal
overlay.addEventListener('click',closeModalOverlay);


//event listener for when Escape is pressed
//closes the modal window

document.addEventListener('keydown',function(event){
    if(event.key === 'Escape' && !modal.classList.contains('hidden')){
        closeModalOverlay();
    }
});
