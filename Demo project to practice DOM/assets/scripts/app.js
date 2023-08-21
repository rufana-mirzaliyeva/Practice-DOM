const addMovieModal = document.getElementById('add-modal');
const startAddMovie = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = document.querySelector('.btn--passive');
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');
const movies = [];


const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = 'block'
    } else {
        entryTextSection.style.display = 'none'
    }
};

const deleteMovie = movieId =>{
    let movieIndex = 0;
    for (const movie of movies){
        if(movie.id === movieId){
            break;
        }
        movieIndex++;
    }
    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
}

const deleteMovieHandler = (movieId) => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
   let confirmDeleteionButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeleteionButton.replaceWith(confirmDeleteionButton.cloneNode(true));

    confirmDeleteionButton = deleteMovieModal.querySelector('.btn--danger');
    //confirmDeleteionButton.removeEventListener('click', deleteMovie.bind(null, movieId));  //will not work
    cancelDeletionButton.removeEventListener('click',closeMovieDeletionModal);

    cancelDeletionButton.addEventListener('click',closeMovieDeletionModal);
    confirmDeleteionButton.addEventListener('click', deleteMovie.bind(null, movieId));  
  

}

const displayNewMovieElement = (id, title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
      <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
      </div>
      <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
      </div>
    `;
    newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id))
    const listRoot = document.getElementById('movie-list');
    listRoot.append(newMovieElement);
  };
  

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
}

const closeMovieModal = () => {
    addMovieModal.classList.remove('visible');
}

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
}

const clearMovieInput = () => {
    for (const usrInputs of userInputs) {
        usrInputs.value = '';
    }
}
const cancelAddMovie = () => {
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();

}

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === '' ||
        imageUrlValue.trim() === '' ||
        ratingValue.trim() === '' ||
        +ratingValue < 1 ||
        +ratingValue > 5
    ) {
        alert('Please enter valid values (rating between 1 and 5).')
        return;
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue

    };
    movies.push(newMovie);
    console.log(newMovie);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInput();
    displayNewMovieElement(
        newMovie.id, 
        newMovie.title, 
        newMovie.image, 
        newMovie.rating);
    updateUI();
};


const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInput();
}


startAddMovie.addEventListener('click', showMovieModal)
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovie);
confirmAddMovieBtn.addEventListener('click', addMovieHandler)
