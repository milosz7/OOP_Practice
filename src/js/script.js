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

const ratingScale = {
  low: 6,
  medium: 8,
  high: 9,
};

const classList = {
  product: {
    favorite: 'favorite',
    hidden: 'hidden',
  },   
};

const templates = {
  bookProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
};

class BooksList {
  constructor() {
    const thisBookList = this;
    thisBookList.data = dataSource.books;
    thisBookList.products = [];
    thisBookList.favorites = [];
    thisBookList.filters = [];
    thisBookList.initProductData();
    thisBookList.getElements();
    thisBookList.renderProducts();
    thisBookList.initActions();
  }

  initProductData() {
    const thisBookList = this;
    for (let book in thisBookList.data) {
      const bookProduct = new BookProduct(thisBookList.data[book]);
      thisBookList.products.push(bookProduct);
    }
  }

  getElements() {
    const thisBookList = this;
    thisBookList.dom = {
      wrapper: document.querySelector(select.containerOf.booksList),
      inputs: document.querySelectorAll(select.formControls.inputs), 
    };
  }

  renderProducts() {
    const thisBookList = this;
    for (let bookProduct of thisBookList.products) {
      const bookHTML = templates.bookProduct(bookProduct.data);
      bookProduct.element = utils.createDOMFromHTML(bookHTML);
      thisBookList.dom.wrapper.appendChild(bookProduct.element);
      bookProduct.getElements();
    }
  }

  initActions() {
    const thisBookList = this;
    thisBookList.dom.wrapper.addEventListener('click', function(e) {
      e.preventDefault();
    });
    thisBookList.dom.wrapper.addEventListener('dblclick', function(e) {
      if (e.target.closest(select.menuProduct.bookImage)) {
        thisBookList.addToFavs(e.target.closest(select.menuProduct.bookImage));
      }});
    for (let input of thisBookList.dom.inputs) {
      input.addEventListener('change', function() {
        thisBookList.filter();
      });
    }
  }
  
  addToFavs(element) {
    const thisBookList = this;
    const elementID = parseInt(element.getAttribute('data-id'), 10);
    if (thisBookList.favorites.indexOf(elementID) === -1) {
      thisBookList.favorites.push(elementID);
      element.classList.add(classList.product.favorite);
    } else {
      const toRemove = thisBookList.favorites.indexOf(elementID);
      thisBookList.favorites.splice(toRemove, 1);
      element.classList.remove(classList.product.favorite);
    }
  }

  filter() {
    const thisBookList = this;
    for (let input of thisBookList.dom.inputs) {
      if(input.checked === true && thisBookList.filters.indexOf(input.value) === -1) {
        thisBookList.filters.push(input.value);
      } else if (input.checked === false && thisBookList.filters.indexOf(input.value) !== -1) {
        const toRemove = thisBookList.filters.indexOf(input.value);
        thisBookList.filters.splice(toRemove, 1);
      }
    }
    for (let bookProduct of thisBookList.products) {
      bookProduct.dom.wrapper.classList.remove(classList.product.hidden);
    }
    for (let filter of thisBookList.filters) {
      for (let bookProduct of thisBookList.products) {
        const detailToCheck = bookProduct.data.details[filter];
        if(detailToCheck === false) {
          bookProduct.dom.wrapper.classList.add(classList.product.hidden);
        }
      }
    }
  }
}

class BookProduct {
  constructor(bookData) {
    const thisBookProduct = this;
    thisBookProduct.data = bookData;
    thisBookProduct.generateRating();
  }

  generateRating() {
    const thisBookProduct = this;
    const rating = thisBookProduct.data.rating;
    const ratingBarWidth = (rating / 10 * 100) + '%';
    if (rating < ratingScale.low) {
      thisBookProduct.data.ratingBg = styles.ratingLow;
    } else if (rating > ratingScale.low && rating <= ratingScale.medium) {
      thisBookProduct.data.ratingBg = styles.ratingMed;
    } else if (rating > ratingScale.medium && rating <= ratingScale.high) {
      thisBookProduct.data.ratingBg = styles.ratingMedHigh;
    } else {
      thisBookProduct.data.ratingBg = styles.ratingHigh;
    }
    thisBookProduct.data.width = ratingBarWidth;
  }

  getElements() {
    const thisBookProduct = this;
    thisBookProduct.dom = {
      wrapper: thisBookProduct.element.querySelector(select.menuProduct.bookImage),
    };
  }
}

const app = new BooksList();

console.log(app);
