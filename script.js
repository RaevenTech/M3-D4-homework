let books = [];
let booksInCartList = [];

const row = document.querySelector(".row");
const cart = document.querySelector(".cart-list");

window.onload = () => {
    fetch("https://striveschool-api.herokuapp.com/books")
        .then((response) => response.json())
        .then((receivedBooks) => {
            books = receivedBooks;
            displayBooks(receivedBooks);
        })
        .catch((err) => {
            console.log(err);
        });
};

function displayBooks(books) {
    row.innerHTML = books
        .map(
            (book, i) => `
                    <div class="card col-md-3">
                        <div class="img-container">
                            <img src="${book.img}" class="card-img-top" alt="..." />
                        </div>
                        <div class="card-body">
                            <h5 class="card-title" onClick="bookDetails(event, ${i})" data-toggle="modal" data-target="#exampleModal">${book.title}</h5>
                            <p class="card-text">
                                Price: ${book.price}
                            </p>
                            <button class="btn btn-dark btnAdd" onClick="btnAdd(event, ${i})">Drop in cart</button>
                            <button class="btn btn-secondary btnEdit" onClick="btnSkip(event)">Pass</button>
                        </div>
                    </div>
            `
        )
        .join("");
}

const btnSkip = (event) => {
    //event.parerntNode.removeChild(event.target);
    event.target.closest(".card").remove();
};

const btnAdd = (event, i) => {
    const currentCard = event.target.closest(".card");
    currentCard.classList.add("book-in-cart");
    booksInCartList.push(books[i]);
    bookToBuy(booksInCartList);
};

const bookToBuy = (books) => {
    cart.innerHTML = books
        .map(
            (book, i) => `
            
                    <div class="card card-cart">
                    <div class="img-container">
                    <img src="${book.img}" class="card-img-top" alt="..." />
                </div>
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">
                                Price: ${book.price}
                            </p>
                            <button class="btn btn-secondary" onClick="btnDeleteBookCart(event)">remove</button>
                        </div>
                    </div>
                
            `
        )
        .join("");
};

const btnDeleteBookCart = (event) => {
    event.target.closest(".card").remove();
    event.target.closest(".card").innerHTML;
};

const removeAll = () => {
    cart.innerHTML = "";
    booksInCartList = [];
};
