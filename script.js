// constants for each parameter from html to be updated
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const facebookButton = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const audioElement = document.getElementById('audio');
const tellButton = document.getElementById('tell-button');
let errorLoadingQuoteCount = 0;
let quote = 'abc';

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
        console.log('froe there',data);
        //  if author is blank, add 'Unknown'
        if (data.quoteAuthor === ''
            ? authorText.innerText = 'Author Unknown'
            : authorText.innerText = data.quoteAuthor)
        // reduce font sizefor long quote
        if (data.quoteText.length > 90
            ? quoteText.classList.add('long-quote')
            : quoteText.classList.remove('long-quote'));
        quoteText.innerText = data.quoteText;
        quote = data.quoteText;
        // stop loader and show the quote
        hideLoaderSpinner();
        errorLoadingQuoteCount = 0;
        console.log(quote);
    }   catch (error) {
            errorLoadingQuoteCount += 1;
            if (errorLoadingQuoteCount === 20
            ? alert('can not load the quote from the server')
            : getQuoteFromApi());
        }
}

const tellTheQuote = (quote) => {
    VoiceRSS.speech({
        key: 'd4bb3b3e69504439b7518ca9b6f461c7',
        src: quote,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

const facebookQuotePlacer = () => {
    FB.ui({
      display: 'popup',
      method: 'share',
      quote: quoteText + ' - ' + authorText,
      href: 'https://martinkuracka.github.io/Quote-generator/',
    }, function(response){});
}


// Event Listeners
tellButton.addEventListener('click', () => tellTheQuote(quote));
newQuoteBtn.addEventListener('click', getQuoteFromApi);
facebookButton.addEventListener('click', facebookQuotePlacer);

// On load
getQuoteFromApi();