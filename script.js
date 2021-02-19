// constants for each parameter from html to be updated
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const facebookButton = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let errorLoadingQuoteCount = 0;

const showLoaderSpinner = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const hideLoaderSpinner = () => {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true
    }
}

// get quote from API
async function getQuoteFromApi() {
    showLoaderSpinner();
    const proxyUrl = 'https://cors.bridged.cc/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';   
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);
        //  if author is blank, add 'Unknown'
        if (data.quoteAuthor === '' 
            ? authorText.innerText = 'Author Unknown'
            : authorText.innerText = data.quoteAuthor)
        // reduce font sizefor long quote
        if (data.quoteText.length > 90
            ? quoteText.classList.add('long-quote')
            : quoteText.classList.remove('long-quote'));        
        quoteText.innerText = data.quoteText   
        // stop loader and show the quote
        hideLoaderSpinner();       
        errorLoadingQuoteCount = 0;  
        console.log(errorLoadingQuoteCount);
    }   catch (error) {  
            errorLoadingQuoteCount += 1;          
            if (errorLoadingQuoteCount === 20
            ? alert('can not load the quote from the server')
            : getQuoteFromApi());        
        }
}

const facebookQuotePlacer = () => {
    FB.ui({      
      display: 'popup',
      method: 'share',
      quote: 'say this',
      href: 'https://martinkuracka.github.io/Quote-generator/?text=${quoteText}',
    }, function(response){});    
  }


// Event Listeners
newQuoteBtn.addEventListener('click', getQuoteFromApi);
facebookButton.addEventListener('click', facebookQuotePlacer);

// On load
getQuoteFromApi();