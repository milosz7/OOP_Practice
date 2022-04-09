const select = {
  templateOf: {
    bookProduct: '#template-book',
  },
  containerOf: {
    booksList: '.books-list',
    form: '.filters'
  },
  menuProduct: {
    bookImage: '.book__image',
    ratingBar: '.book__rating__fill'
  },
  formControls: {
    inputs: '[name="filter"]'
  }
};

const styles = {
  ratingLow: 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)',
  ratingMed: 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)',
  ratingMedHigh: 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)',
  ratingHigh: 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)',
};

const classList = {
  product: {
    favorite: 'favorite',
  },   
};

const templates = {
  bookProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
};

const favBooks = [];
const bookContainer = document.querySelector(select.containerOf.booksList);
const filters = [];

const generateProducts = function() {
  for (let book in dataSource.books) {
    generateRating(dataSource.books[book]);
    const bookHTML = templates.bookProduct(dataSource.books[book]);
    console.log(bookHTML);
    const bookElement = utils.createDOMFromHTML(bookHTML);
    bookContainer.appendChild(bookElement);
  }
};

const generateRating = function(book) {
  const rating = book.rating;
  const ratingBarWidth = (rating / 10 * 100) + '%';
  if (rating < 6) {
    book.ratingBg = styles.ratingLow;
  } else if (rating > 6 && rating <= 8) {
    book.ratingBg = styles.ratingMed;
  } else if (rating > 8 && rating <= 9) {
    book.ratingBg = styles.ratingMedHigh;
  } else {
    book.ratingBg = styles.ratingHigh;
  }
  book.width = ratingBarWidth;
};

const initActions = function() {
  bookContainer.addEventListener('click', function(evt) {
    evt.preventDefault();
  });
  bookContainer.addEventListener('dblclick', function(evt) {
    if (evt.target.closest(select.menuProduct.bookImage)) {
      addToFavs(evt.target.closest(select.menuProduct.bookImage));
    } 
  });
  const inputs = document.querySelectorAll(select.formControls.inputs);
  for (let input of inputs) {
    input.addEventListener('change', function() {
      filter();
    });
  }
};

const addToFavs = function(element) {
  const elementID = parseInt(element.getAttribute('data-id'), 10);
  if (favBooks.indexOf(elementID) === -1) {
    favBooks.push(elementID);
    element.classList.add(classList.product.favorite);
  } else {
    const toRemove = favBooks.indexOf(elementID);
    favBooks.splice(toRemove ,1);
    element.classList.remove(classList.product.favorite);
  }
};

const filter = function() {
  const inputs = document.querySelectorAll(select.formControls.inputs);
  const booksToFilter = document.querySelectorAll(select.menuProduct.bookImage);
  for (let input of inputs) {
    if (input.checked === true && filters.indexOf(input.value) === -1) {
      filters.push(input.value);
    } else if (input.checked === false && filters.indexOf(input.value) !== -1) {
      const toRemove = filters.indexOf(input.value);
      filters.splice(toRemove, 1);
    }
  }
  for (let books of booksToFilter) {
    books.classList.remove('hidden');
  }
  for (let filter of filters) {
    for (let book in dataSource.books) {
      const detailToCheck = dataSource.books[book].details[filter];
      if (detailToCheck === false) {
        booksToFilter[book].classList.add('hidden');
      }
    }
  }
};

generateProducts();
initActions();
