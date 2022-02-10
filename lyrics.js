const inputValue = document.getElementById("input_value");
const resultdata = document.getElementById("result");
const apiUrl = "https://api.lyrics.ovh";

form.addEventListener('submit', event => {
    event.preventDefault();
    const searchValue = inputValue.value.trim();
    console.log(searchValue);
    if (!searchValue) {
        alert("Enter song name")
    }
    else {
        startSearching(searchValue);
    }
})

//fetching data
async function startSearching(searchValue) {
    const searchResponse = await fetch(`${apiUrl}/suggest/${searchValue}`);
    const data = await searchResponse.json();
    display(data);
}

// data display function
function display(data) {
    resultdata.innerHTML = `
        <ul class = "songs">
           ${data.data.
            map(song => `<li>
                           <div>
                              <strong >${song.artist.name}</strong>- ${song.title}
                           </div>
                           <div>
                            <span data-artist= "${song.artist.name}" data-songTitle = "${song.title}">Get Lyrics</span>
                            </div> 
                        </li>`
            ).join('')
        }
        </ul>`;
}

// function for getlyrics
resultdata.addEventListener('click', e => {
    const clickedElement = e.target;
    console.log(e.target);

    if (clickedElement.tagName === 'SPAN') {
        const artist = clickedElement.getAttribute("data-artist")
        const songTitle = clickedElement.getAttribute("data-songTitle")
        getLyrics(artist, songTitle);
    }
})
async function getLyrics(artist, songTitle) {
    const response = await fetch(`${apiUrl}/v1/${artist}/${songTitle}`)
    const songLyrics = await response.json();
    console.log(songLyrics);
    const lyrics = songLyrics.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    resultdata.innerHTML = `<h2><strong>${artist}</strong>-${songTitle}</h2><p>${lyrics}</p>`
}