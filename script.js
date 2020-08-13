const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

//Get quote from API
async function getQuote(){
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);
        //if author is blank, add "unknow"
        if(data.quoteAuthor===''){
            quoteAuthor.innerText='unknow';
        }else{
            quoteAuthor.innerText = data.quoteAuthor;
        }

        //reducd the text size if the quote is long
        if(data.quoteText.length >120){
            console.log('hit1', data.quoteText.length);
            quoteText.classList.add('long-quote');
        }else{
            console.log("hit2", data.quoteText.length);
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;
    }catch(error){
        getQuote();
        console.log("error!", data);
    }
}

//Tweet Quote
function tweetQuote(){
    const quote=quoteText.innerText;
    const author=quoteAuthor.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuote();