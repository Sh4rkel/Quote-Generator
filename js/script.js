const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const facebookButton = document.getElementById("facebook");
const linkedinButton = document.getElementById("linkedin");
const redditButton = document.getElementById("reddit");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //Check if Author is blanck and replace it with 'unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.lenght > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //  Catch Error Here
  }
}

// Tweet
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);

// Facebook Share
function facebookQuote() {
  const facebookUrl = `https://ro-ro.facebook.com/?dialog=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(facebookUrl, "_blank");
}

//Event Listeners
newQuoteButton.addEventListener("click", newQuote);
facebookButton.addEventListener("click", facebookQuote);

// LinkedIn Share
function linkedinQuote() {
  const linkedinUrl = `https://www.linkedin.com/submit?post=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(linkedinUrl, "_blank");
}

//Event Listeners
newQuoteButton.addEventListener("click", newQuote);
linkedinButton.addEventListener("click", linkedinQuote);

// Reddit Share
function redditQuote() {
  const redditUrl = `http://www.reddit.com/submit?text=${quoteText.textContent} - ${authorText.textContent}/post-to-reddit-via-url&title=Post%20to%20Reddit%20via%20URL`;
  window.open(redditUrl, "_blank");
}

//Event Listeners
newQuoteButton.addEventListener("click", newQuote);
redditButton.addEventListener("click", redditQuote);

// On Load
getQuotes();
