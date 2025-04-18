

// queryselector queryselectorall
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnShowModal = document.querySelectorAll('.show-modal');
// console.log(btnShowModal);


// classList

const toggleModal= function(){
    modal.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
};

const closeModal= function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for (let i=0; i<btnShowModal.length ; i++){
   btnShowModal[i].addEventListener('click',toggleModal)
}

btnCloseModal.addEventListener('click',closeModal);
overlay.addEventListener('click',closeModal);

document.addEventListener("keydown",function(e){
    console.log(e.key);
    if(e.key === 'Escape' && !modal.classList.contains('hidden')){
            closeModal()
    }
})



