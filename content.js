let script = document.createElement('script');
document.head.appendChild(script);

script.onload = function() {
  let url = chrome.runtime.getURL("words/words.json");
  
  const event = new CustomEvent('customEvent', {detail: url});
  document.dispatchEvent(event);
}


script.src = chrome.runtime.getURL("example.js");