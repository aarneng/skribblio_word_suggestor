function drawWordsOnDOM(matching_words) {
  let writeWordsHere = document.getElementById("words")
  let writeAmtHere = document.getElementById("words_amt")
  let buttonMoreLess = document.getElementById("buttonMoreLess")
  let n = 10
  let min = Math.min(n, matching_words.length)
  let max = matching_words.length

  writeAmtHere.innerText = "Here are the " + min + " word choises:"
  writeWordsHere.innerHTML = matching_words.slice(0, n).join("<br/>")

  let more = false

  if (matching_words.length > min) {
    buttonMoreLess.innerHTML = "<button> See more </button>"
    buttonMoreLess.addEventListener('click', event => {
      more = !more
      if (more) {
        writeAmtHere.innerText = "Here are the " + max + " word choises:"
        writeWordsHere.innerHTML = matching_words.join("<br/>")
        button.innerHTML = "<button> See less </button>"
      }
      else {
        writeAmtHere.innerText = "Here are the " + min + " word choises:"
        writeWordsHere.innerHTML = matching_words.slice(0, 10).join("<br/>")
        button.innerHTML = "<button> See more </button>"
      }
    });
  }
}


function get_matching_words(all_words, word_to_find) {
  if (!word_to_find) return []
  let amt_words = (word_to_find.match(/ /g) || []).length;
  let indiv_words = word_to_find.split(" ")
  let key = indiv_words[0].length
  indiv_words.shift()
  for (word of indiv_words) {
    key += "," + word.length
  }

  let possible_words = all_words[amt_words][key]

  let matching_words = []
  for (word of possible_words) {
    let match = true
    for (let i = 0; i < word_to_find.length; i++) {
      if (word_to_find[i] !== "_" && word_to_find[i] !== word[i]) {
        match = false
        break
      }
    }
    if (match) {
      matching_words.push(word)
    }
  }

  return matching_words
}


function listenToWordChange(words_json) {
  var target = document.getElementById("currentWord")

  var observer = new MutationObserver(function(mutations) {
    let word_to_find = target.innerText
    let matching_words = get_matching_words(words_json, word_to_find)
    if (matching_words.length == 1) {
      target.innerText = matching_words[0]
      return
    }
    drawWordsOnDOM(matching_words)
  });

  var config = { attributes: true, childList: true, characterData: true }

  observer.observe(target, config);
}


async function main(url) {

  let res = await fetch(url)
  let words_json = await res.json()
  url = window.location.href
  if (!url.includes("skribbl.io")) return

  let innerDiv = document.createElement( "div" )
  
  innerDiv.innerHTML = `
    <div style="background: white">
      <h1 style="color: blueviolet;">For the cheaters among us</h1>
    
      <div id="words_amt">
    
      </div>
      <div id="words">
    
      </div>
      <div id="buttonMoreLess">
    
      </div>
    </div>
    `
  document.body.appendChild(innerDiv)
  listenToWordChange(words_json)
}

document.addEventListener('customEvent', function (e)
{
  var url=e.detail;
  main(url)
});
