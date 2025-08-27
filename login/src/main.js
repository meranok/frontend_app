import './style.css'

const loginPage = document.getElementById('login-page');
        const booksPage = document.getElementById('books-page');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const loginButton = document.getElementById('login-button');
        const logoutButton = document.getElementById('logout-button');
        const errorMessage = document.getElementById('error-message');
        const booksGrid = document.getElementById('books-grid');
        const messageBox = document.getElementById('message-box');

        // --- Global State ---
        // This variable holds the book object currently being viewed or purchased.
        let currentBook = null;

        // --- Book Data ---
        // An array of book objects containing all the necessary information to display and interact with.
        // Each object has properties for title, author, description, image, price, and a short story.
        const books = [
            {
                title: "The Silent Patient",
                author: "Alex Michaelides",
                description: "A sensational psychological thriller about a famous painter who shoots her husband and a psychotherapist who is determined to unravel what happened.",
                imageUrl: "https://placehold.co/400x600/bde0fe/000000?text=Book+1",
                price: "15.99",
                story: "In a world where words were treasures, a young painter named Alicia lost her voice. She had a secret, a story so heavy it could only be told in silence. A curious therapist, Theo, enters her life, not to fix her, but to read her silence, and in doing so, he begins to uncover the hidden language of her soul."
            },
            {
                title: "Where the Crawdads Sing",
                author: "Delia Owens",
                description: "A captivating mystery and coming-of-age story following a young girl who raises herself in the marshlands of North Carolina.",
                imageUrl: "https://placehold.co/400x600/a2d2ff/000000?text=Book+2",
                price: "14.50",
                story: "The marsh was her home, her family, and her teacher. A lonely girl known as 'Marsh Girl' watches the world from a distance. A body is found, and her solitary life is shattered as suspicion falls upon her. In a world of secrets, she must find her own truth, guided only by the whispering reeds and the singing of the crawdads."
            },
            {
                title: "The Alchemist",
                author: "Paulo Coelho",
                description: "An allegorical novel that tells the mystical story of a young shepherd boy named Santiago who dreams of traveling the world to find a treasure.",
                imageUrl: "https://placehold.co/400x600/cdb4db/000000?text=Book+3",
                price: "12.00",
                story: "A shepherd boy named Santiago dreams of a distant treasure in Egypt. Guided by omens and a deep sense of destiny, he embarks on a journey across the desert. Along the way, he learns that the true treasure is not what he seeks, but the journey itself, and the wisdom gained from following his heart."
            },
            {
                title: "Project Hail Mary",
                author: "Andy Weir",
                description: "A sci-fi novel about a lone survivor on a space mission to save humanity, but he can't remember who he is or his mission.",
                imageUrl: "https://placehold.co/400x600/ffc4d6/000000?text=Book+4",
                price: "18.75",
                story: "A man wakes up alone on a spaceship, millions of miles from home, with no memory of his name or mission. With humanity on the brink of extinction, he must piece together his identity and purpose, racing against time to save the world, one brilliant discovery at a time."
            },
            {
                title: "Dune",
                author: "Frank Herbert",
                description: "A landmark sci-fi epic set in the distant future on the desert planet Arrakis, the sole source of a valuable spice.",
                imageUrl: "https://placehold.co/400x600/fff1e6/000000?text=Book+5",
                price: "19.99",
                story: "In a galaxy controlled by noble houses, a young heir named Paul Atreides is thrust into a power struggle for control of the desert planet Arrakis. Home to gigantic sandworms and a valuable spice, this world holds the key to the empire's power. Paul must embrace his destiny to lead his people and transform the fate of the universe."
            },
            {
                title: "The Midnight Library",
                author: "Matt Haig",
                description: "A story about a woman who finds a library that exists between life and death, where every book is a chance to try a different life she could have lived.",
                imageUrl: "https://placehold.co/400x600/c7f9cc/000000?text=Book+6",
                price: "16.25",
                story: "Stuck in a state between life and death, Nora finds herself in a library filled with infinite books. Each book contains a different version of her life. She tries on various lives, from a rock star to a glaciologist, seeking the one that will make her happy, but she soon discovers that a happy life is not about choosing the right book, but about finding meaning in every chapter."
            },
            {
                title: "The Great Gatsby",
                author: "F. Scott Fitzgerald",
                description: "A classic novel exploring themes of decadence, idealism, and social upheaval in the Roaring Twenties.",
                imageUrl: "https://placehold.co/400x600/FFD9A0/000000?text=Book+7",
                price: "10.50",
                story: "In the lavish world of 1920s Long Island, the mysterious millionaire Jay Gatsby throws extravagant parties to win back the love of his life, Daisy Buchanan. As the story unfolds, narrator Nick Carraway witnesses the illusions of wealth and the tragic consequences of clinging to the past."
            },
            {
                title: "1984",
                author: "George Orwell",
                description: "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism.",
                imageUrl: "https://placehold.co/400x600/A0B2C3/000000?text=Book+8",
                price: "13.00",
                story: "Winston Smith lives in a world controlled by the omnipresent Big Brother, where thoughtcrime is the ultimate sin. He secretly rebels, but his forbidden love affair and defiance lead him on a perilous journey of discovery and resistance against a system that seeks to control every aspect of human life."
            },
            {
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                description: "A novel about a young girl's perspective on justice and racism in the American South.",
                imageUrl: "https://placehold.co/400x600/E3D4B6/000000?text=Book+9",
                price: "11.25",
                story: "Scout Finch, a young girl in the Depression-era South, learns about prejudice and courage through the trial of a Black man falsely accused of a crime. Her father, Atticus Finch, an honorable lawyer, defends him, teaching his children profound lessons about empathy and integrity."
            },
            {
                title: "Sapiens: A Brief History of Humankind",
                author: "Yuval Noah Harari",
                description: "A book that explores the history of humans, from the Stone Age to the modern era.",
                imageUrl: "https://placehold.co/400x600/A0D2E3/000000?text=Book+10",
                price: "22.50",
                story: "Harari takes us on an epic journey through the history of our species, from our emergence as insignificant apes to our rise as masters of the planet. He examines the cognitive, agricultural, and scientific revolutions that have shaped human existence, challenging our fundamental assumptions about what it means to be human."
            }
        ];

        // --- Utility Functions ---

        /**
         * Navigates between two main pages by adding/removing the 'active-page' class.
         * @param {HTMLElement} pageToShow - The page element to make visible.
         * @param {HTMLElement} pageToHide - The page element to hide.
         */
        function navigateTo(pageToShow, pageToHide) {
            pageToHide.classList.remove('active-page');
            pageToShow.classList.add('active-page');
        }

        /**
         * Shows a temporary message in a modal-like popup.
         * @param {string} message - The message to display.
         */
        function showTempMessage(message) {
            messageBox.innerHTML = `
                <div class="modal-content temp-message-content">
                    <p>${message}</p>
                </div>
            `;
            messageBox.classList.add('visible');
            // Hide the message after 2 seconds
            setTimeout(() => {
                messageBox.classList.remove('visible');
            }, 2000);
        }

        /**
         * Hides the main message box and restores body scrolling.
         */
        function hideMessageBox() {
            messageBox.classList.remove('visible');
            document.body.classList.remove('no-scroll');
        }

        /**
         * Renders and displays the book details modal.
         * @param {object} book - The book object to display details for.
         */
        function showBookDetails(book) {
            currentBook = book;
            // Add class to body to prevent scrolling when modal is open
            document.body.classList.add('no-scroll');
            // Set the modal content using the book object's data
            messageBox.innerHTML = `
                <div class="book-details-modal">
                    <div class="book-details-info">
                        <img src="${book.imageUrl}" alt="Cover of ${book.title}" class="book-image">
                        <h3 class="book-title">${book.title}</h3>
                        <p class="book-author">by <span class="author-name">${book.author}</span></p>
                        <p class="book-price">Price: $${book.price}</p>
                        <p class="book-description">${book.description}</p>
                        <p class="book-story">${book.story}</p>
                    </div>
                    <div class="modal-buttons">
                        <button id="buy-now-button" class="buy-button">Buy Now</button>
                        <button id="go-back-to-grid-button" class="go-back-button">Go Back</button>
                    </div>
                </div>
            `;
            messageBox.classList.add('visible');
        }

        /**
         * Renders and displays the purchase form modal.
         * @param {object} book - The book object to be purchased.
         */
        function showPurchaseOptions(book) {
            document.body.classList.add('no-scroll');
            messageBox.innerHTML = `
                <div class="purchase-form-modal">
                    <h3 class="modal-title">Purchasing: ${book.title}</h3>
                    <div class="card-details-form">
                        <div class="form-group">
                            <label for="cardholder-name">Cardholder Name:</label>
                            <input type="text" id="cardholder-name" placeholder="Full Name">
                        </div>
                        <div class="form-group">
                            <label for="card-number">Card Number:</label>
                            <input type="text" id="card-number" placeholder="16-Digit Card Number">
                        </div>
                        <div class="card-split">
                            <div class="form-group">
                                <label for="expiry-date">Expiry Date (MM/YY):</label>
                                <input type="text" id="expiry-date" placeholder="MM/YY">
                            </div>
                            <div class="form-group">
                                <label for="cvv">CVV:</label>
                                <input type="text" id="cvv" placeholder="CVV">
                            </div>
                        </div>
                    </div>
                    <div class="quantity-control">
                        <label>Number to order:</label>
                        <div class="quantity-control-buttons">
                            <button id="decrement-btn">-</button>
                            <span id="quantity-display">1</span>
                            <button id="increment-btn">+</button>
                        </div>
                    </div>
                    <div class="total-price">
                        <p>Total Price: <span id="total-price-display">$${(parseFloat(book.price) * 1).toFixed(2)}</span></p>
                    </div>
                    <div class="purchase-buttons">
                        <button id="confirm-purchase-button" class="buy-button">Confirm Purchase</button>
                        <button id="go-back-to-details-button" class="go-back-button">Go Back</button>
                    </div>
                </div>
            `;
            messageBox.classList.add('visible');
        }

        /**
         * Updates the total price display based on the current quantity and book price.
         */
        function updateTotalPrice() {
            const quantityDisplay = document.getElementById('quantity-display');
            const totalPriceDisplay = document.getElementById('total-price-display');
            if (quantityDisplay && totalPriceDisplay && currentBook) {
                const currentQuantity = parseInt(quantityDisplay.textContent, 10);
                const bookPrice = parseFloat(currentBook.price);
                const newTotal = (currentQuantity * bookPrice).toFixed(2);
                totalPriceDisplay.textContent = `$${newTotal}`;
            }
        }

        /**
         * Creates a single book card HTML element.
         * @param {object} book - The book object to create a card for.
         * @returns {HTMLElement} The created div element for the book card.
         */
        function createBookCard(book) {
            const card = document.createElement('div');
            card.className = "book-card";
            
            card.innerHTML = `
                <div class="book-card-content">
                    <img src="${book.imageUrl}" alt="Cover of ${book.title}">
                    <h3 class="book-card-title">${book.title}</h3>
                    <p class="book-card-author">by ${book.author}</p>
                </div>
                <button class="details-button" data-title="${book.title}">
                    Details
                </button>
            `;
            booksGrid.appendChild(card);
        }

        /**
         * Renders all books from the 'books' array into the books grid.
         */
        function renderBooks() {
            booksGrid.innerHTML = ''; // Clear existing cards
            books.forEach(book => createBookCard(book));
        }

        // --- Event Listeners ---

        // Listen for a click on the login button.
        loginButton.addEventListener('click', () => {
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            // Simple check to ensure both fields are not empty
            if (username && password) {
                errorMessage.classList.add('hidden'); 
                
                showTempMessage(`Welcome, ${username}!`);
                // Wait for the welcome message to be visible before navigating
                setTimeout(() => {
                    renderBooks(); 
                    navigateTo(booksPage, loginPage); 
                }, 1500); 
            } else {
                errorMessage.classList.remove('hidden'); 
            }
        });

        // Listen for a click on the logout button.
        logoutButton.addEventListener('click', () => {
            // Clear input fields and hide any error messages
            usernameInput.value = '';
            passwordInput.value = '';
            errorMessage.classList.add('hidden');
            // Navigate back to the login page
            navigateTo(loginPage, booksPage);
        });

        // Use event delegation on the document to handle clicks on dynamically created elements.
        document.addEventListener('click', (event) => {
            // Check if the clicked element is a 'Details' button
            if (event.target.classList.contains('details-button')) {
                const bookTitle = event.target.dataset.title;
                const book = books.find(b => b.title === bookTitle);
                if (book) {
                    showBookDetails(book);
                }
            }
            // Check if the clicked element is the 'Buy Now' button
            if (event.target.id === 'buy-now-button') {
                if (currentBook) {
                    showPurchaseOptions(currentBook);
                }
            }
            // Check if the clicked element is the quantity increment button
            if (event.target.id === 'increment-btn') {
                const quantityDisplay = document.getElementById('quantity-display');
                let currentQuantity = parseInt(quantityDisplay.textContent, 10);
                quantityDisplay.textContent = currentQuantity + 1;
                updateTotalPrice();
            }
            // Check if the clicked element is the quantity decrement button
            if (event.target.id === 'decrement-btn') {
                const quantityDisplay = document.getElementById('quantity-display');
                let currentQuantity = parseInt(quantityDisplay.textContent, 10);
                if (currentQuantity > 1) {
                    quantityDisplay.textContent = currentQuantity - 1;
                    updateTotalPrice();
                }
            }
            // Check if the clicked element is the 'Confirm Purchase' button
            if (event.target.id === 'confirm-purchase-button') {
                const quantity = document.getElementById('quantity-display').textContent;
                const cardNumber = document.getElementById('card-number').value;
                const cardholderName = document.getElementById('cardholder-name').value;
                
                if (cardNumber && cardholderName) {
                    const lastFourDigits = cardNumber.slice(-4);
                    showTempMessage(`Purchased ${quantity} of "${currentBook.title}" with card ending in ${lastFourDigits}!`);
                    setTimeout(() => {
                        hideMessageBox();
                    }, 1500);
                } else {
                    showTempMessage("Please enter all card details!");
                }
            }
            // Check if the clicked element is the 'Go Back to Grid' button
            if (event.target.id === 'go-back-to-grid-button') {
                hideMessageBox();
            }
            // Check if the clicked element is the 'Go Back to Details' button
            if (event.target.id === 'go-back-to-details-button') {
                if (currentBook) {
                    showBookDetails(currentBook);
                }
            }
        });
  
