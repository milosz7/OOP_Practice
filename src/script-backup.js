const select = {
  templateOf: {
    bookProduct: '#template-book',
  },
  containerOf: {
    booksList: '.books-list',
  },
  menuProduct: {
    bookImage: '.book__image',
  },
};

const templates = {
  bookProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
};

// class BooksList {
//   constructor() {
//     const thisBooklist = this;
//     thisBooklist.container = document.querySelector(select.containerOf.booksList);
//   }
// }

class Product {
  constructor(data) {
    const thisProduct = this;
    thisProduct.data = data;
    console.log(thisProduct);
    thisProduct.generateProducts();
    thisProduct.getElements();
    thisProduct.initActions();
  }

  getElements() {
    const thisProduct = this;
    thisProduct.dom = {
      bookImage: thisProduct.element.querySelector(select.menuProduct.bookImage),
    };
  }

  generateProducts() {
    const thisProduct = this;
    const bookHTML = templates.bookProduct(thisProduct.data);
    thisProduct.element = utils.createDOMFromHTML(bookHTML);
    bookContainer.appendChild(thisProduct.element);
  }

  initActions() {
    const thisProduct = this;
    thisProduct.dom.bookImage.addEventListener('click', function(evt) {
      evt.preventDefault();
    });
    thisProduct.dom.bookImage.addEventListener('dblclick', function(evt){
      evt.preventDefault();
      thisProduct.addToFavs();
    });
  }

  addToFavs() {
    const thisProduct = this;
    console.log(this.data.id);
    if (favBooks.indexOf(thisProduct.data.id) === -1) {
      favBooks.push(thisProduct.data.id);
      thisProduct.dom.bookImage.classList.add('favorite');
    } else {
      const toRemove = favBooks.indexOf(thisProduct.data.id);
      favBooks.splice(toRemove, 1);
      thisProduct.dom.bookImage.classList.remove('favorite');
    }
    
    console.log(favBooks);
  }
}

const website = {
  init() {
    const thisWebsite = this;
    thisWebsite.initData();
    thisWebsite.initProducts();
  },
  initData() {
    const thisWebsite = this;
    thisWebsite.data = dataSource.books;
    console.log(thisWebsite.data);
  },
  initProducts() {
    const thisWebsite = this;
    for (let book in thisWebsite.data) {
      new Product(thisWebsite.data[book]);
    }
  }
};
const favBooks = [];
const bookContainer = document.querySelector(select.containerOf.booksList);
const initActions = function() {
  bookContainer.addEventListener('dblclick', function(evt) {
    if (evt.target.closest(select.menuProduct.bookImage)) {

    }
  });
}

const addToFavs = function() {
  const thisProduct = this;
  console.log(this.data.id);
  if (favBooks.indexOf(thisProduct.data.id) === -1) {
    favBooks.push(thisProduct.data.id);
    thisProduct.dom.bookImage.classList.add('favorite');
  } else {
    const toRemove = favBooks.indexOf(thisProduct.data.id);
    favBooks.splice(toRemove, 1);
    thisProduct.dom.bookImage.classList.remove('favorite');
  }
  
//   console.log(favBooks);
// }
website.init();
initActions();

