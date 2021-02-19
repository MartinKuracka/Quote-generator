// constants for each parameter from html to be updated
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const facebookButton = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loading
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
const complete = () => {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true
    }
}


// get quote from API
async function getQuote() {
    loading();
    const proxyUrl = 'https://cors.bridged.cc/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';   
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);
        //  if author is blank, add 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown'
        }else authorText.innerText = data.quoteAuthor;
        // reduce font sizefor long quote
        if (data.quoteText.length > 80) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText   
        // stop loader and show the quote
        complete();        
      } catch (error) {         
        getQuote();
    }
}

// facebookQuotePLacer = () => {
//     const quote = quoteText.innerText;
//     const author = authorText.innerText;
//     const fbUrl = 
// }

const facebookQuotePLacer = () => {
    console.log('shared');
    FB.ui({      
      display: 'popup',
      method: 'share',
      href: 'https://developers.facebook.com/docs/',
    }, function(response){});    
  }


// event Listeners
newQuoteBtn.addEventListener('click', getQuote);
facebookButton.addEventListener('click', facebookQuotePLacer);


// On load
getQuote();