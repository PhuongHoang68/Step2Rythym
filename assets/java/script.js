let searchInputEl = document.querySelector("#search-form");
//User text entry for Artist
let artistInput = document.getElementById("searchArtist");
//User text entry for Song name
let songInput = document.getElementById('searchSong');
let lyricsBtn = document.getElementById('lyrics');
let relatedArtistsArr = [];
//let client_id = 'RZW6cI7SahSMcoIvDUIzRqkb4LAhMSW4wDBfxbDsXS1CfTnLJTUZcWa1AlHD03Wp'
//let client_secret = 'jhWoIv7gioCmc_dEnUxtv0nJAELUdEsYj3xFv1uH_WFVTiHrcCopr3yD1tmedOcItu123BSyuXXsxB1TAml7aA'
let apiToken= 'K1i8ef3ZhUTwUfB_noiHI4Q6K6NjQXNx8oE8uKYp9iOiutPCcFPrvEm81n3ixg9h'
let url = window.location.href;


//local storage api token
window.localStorage.setItem('name', 'Obaseki Nosa');

//User info submit
function handleSubmit(event){
    event.preventDefault();
    const artistInput = document.getElementById('searchArtist').value;
    const songInput = document.getElementById('searchSong').value;
    fetchSongInfo(songInput);
   // redirect();
}

//get lyrics from Gnius
function fetchSongInfo (songInput) {
    // format the github api url and replace spaces with %20
    const cleanSongInput = songInput.replace(/\s/g, '%20');
    //var apiUrl = "https://api.genius.com/songs/${id}?=${ACCESS_TOKEN}"
    var apiUrl = `https://api.genius.com/search?q=${cleanSongInput}&access_token=K1i8ef3ZhUTwUfB_noiHI4Q6K6NjQXNx8oE8uKYp9iOiutPCcFPrvEm81n3ixg9h`;
    // make a get request to url

    console.log(apiUrl);

    //clears out old cards and previous arrays
    let relatedArtistsArr = [];
    $('.song-card').remove();
    fetch(apiUrl)
      .then((response) => {
        return response.json();})
        //this is where we target what we want
        .then((data) =>{//Recieved JSOn OBJ with all song data
            //move first 10 results into an array
            console.log(data);
            
            
            let hits = data.response.hits.length;
            for (let i = 0; i < hits; i++){
                relatedArtistsArr.push(data.response.hits[i].result)
            };
            // console.log(data);
            // console.log(hits);
            // console.log(relatedArtistsArr);
            localStorage.setItem('lyrics_url',relatedArtistsArr[0].url );
            console.log(data.response.hits[0].id);
            //Create cards with album art, artist name, full title, maybe link to lyrics when clicked?
            for(let i = 1; i < 4; i++){
            function displaySongCard() {

                let songCardContainer = document.getElementById('song-card-container');

                const songCard = document.createElement('div');
                songCard.classList.add('song-card', "column", "is-12","is-mobile");
    
                const albumArt = document.createElement('img');
                albumArt.classList.add('hover');
                albumArt.setAttribute('src', relatedArtistsArr[i].header_image_thumbnail_url);
                albumArt.onclick = function(){
                    let songInput = relatedArtistsArr[i].full_title;
                   fetchSongInfo(songInput);
                } 
                const songTitle = document.createElement('h3');
                songTitle.classList.add('song-title');
                songTitle.innerText = relatedArtistsArr[i].title;//put array obj data here
            
                const songArtist = document.createElement('h4');
                songArtist.classList.add('song-artist');
                songArtist.innerText = relatedArtistsArr[i].artist_names;//put array obj data here
            
                songCardContainer.appendChild(songCard);
                songCard.appendChild(songTitle);
                songCard.appendChild(songArtist);
                songCard.appendChild(albumArt);
            
                
                //return displaySongCard;
            }
            
            displaySongCard();
        }

            
            //setting that cover art url to a var
         let coverArt = (data.response.hits[0].result.header_image_url);//Cover art image
         let artistHeader = relatedArtistsArr[0].artist_names;
            //Adding Artist and Song Title to main result
            document.getElementById('artist-name').innerHTML = artistHeader
            document.getElementById('song-header').innerHTML = relatedArtistsArr[0].title;

         
            //adding cover art to single-page
            function addArt(){
                document.getElementById("cover_art").src = coverArt
            }
            addArt();
            





       
        //    console.log(data.response.hits[0].result.artist_names);//artist name
        //    console.log(data.response.hits[0].result.path);//lyrics url path
           console.log(data);//whole json data obj

        
        })
};
    

    
    

function redirect(){
    lyricsBtn.setAttribute ('class','column is-half is-offset-one-quarter is-loading button is-large is-rounded is-success is-responsive is-focused');

    let lyricsUrl = localStorage.getItem('lyrics_url');
    window.location.href = lyricsUrl;
}


      searchInputEl.addEventListener("submit", handleSubmit)
      lyricsBtn.addEventListener("click", redirect)