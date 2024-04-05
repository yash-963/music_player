// DAta
const songsList = [{ id: 1, name: "Blue Eyes", artist: "Honey Singh", image: "media/thumbnail/blue_eyes.png", genre: "Hip Hop", source: "media/source/blue_eyes.mp3" }, { id: 2, name: "Aam Jahe Munde", artist: "Parmish Verma", image: "media/thumbnail/aam_jahe.png", genre: "Hip Hop", source: "media/source/aam_jahe.mp3" }, { id: 3, name: "TU HAI KAHAN", artist: "AUR", image: "media/thumbnail/tu_hai_kha.png", genre: "lofi", source: "media/source/tu_hai_kha.mp3" }]


// fetching elements
const toggleBUtton = document.querySelector("#toggle")
const mainBox = document.querySelector("main")
const selectMainBox = document.querySelector("select")
const contentBoxes = document.querySelectorAll(".bg1")
const selectDiv = document.querySelector("#filterSongs")
const showSongsDiv = document.querySelector(".showSongs")
const color1 = document.querySelector(".color1")
const thumbnail = document.querySelector(".thumbnail")
const songName = document.querySelector(".songName")
const artist = document.querySelector(".artist")
const banner = document.querySelector(".banner")
const audioDiv = document.querySelector(".audioDiv")
const nextButton = document.querySelector("#nextButton")
const previousButton = document.querySelector("#previousButton")
const playlistInput = document.querySelector(".playlistInput")
const allPLaylist = document.querySelector(".allPLaylist")
const current = document.querySelector(".current")
const addToPlaylist = document.querySelector("#addToPlaylist")


// variabells
let filterGenre = [];
let currentId = 1;
let allPlaylistsName = [];
let playListWithSong = [];
let currentPlaylist = "";
// let currentPlayListId = 0;

// functions call on load
addingOptions();
showSongs();
renderCurrentSong();






// event listiners
toggleBUtton.addEventListener('click', toggleTheme)
nextButton.addEventListener('click', playNextSong)
previousButton.addEventListener('click', playPrevSong)
addToPlaylist.addEventListener("click", addSongsToPlaylist)


// functions

// toogle theme
function toggleTheme() {
    if (toggleBUtton.checked) {
        darkTheme();
    }
    else {
        lightTheme();
    }
}

function darkTheme() {
    mainBox.style.background = "#6f6c6ce0"
    contentBoxes.forEach((elem) => {
        elem.style.background = "#56595a"
    })
    selectMainBox.style.background = "#9191e2"
    color1.style.color = "#fff"
    const song = document.querySelectorAll(".song")
    song.forEach((elem) => {
        elem.style.background = "#395e7c"
    })
    banner.style.background = "#747484"
    const playListSong = document.querySelectorAll(".playListSong")
    playListSong.forEach((elem) => {
        elem.style.background = "#395e7c"
        elem.style.color = "#fff"
    })
    const playListName = document.querySelectorAll(".playListName")
    playListName.forEach((elem) => {
        elem.style.background = "#395e7c"
        elem.style.color = "#fff"
    })

}

function lightTheme() {
    mainBox.style.background = "#e7dfdfe0"
    selectMainBox.style.background = "#7676af"
    contentBoxes.forEach((elem) => {
        elem.style.background = "skyblue"
    })
    color1.style.color = "#000"
    const song = document.querySelectorAll(".song")
    song.forEach((elem) => {
        elem.style.background = "#2196F3"
    })
    banner.style.background = "#4343b9"
    const playListSong = document.querySelectorAll(".playListSong")
    playListSong.forEach((elem) => {
        elem.style.background = "#2196F3"
        elem.style.color = "#000"

    })
    const playListName = document.querySelectorAll(".playListName")
    playListName.forEach((elem) => {
        elem.style.background = "#2196F3"
        elem.style.color = "#000"

    })

}

// adding songs list

// adding filter name

function addingOptions() {
    let filterGenre1 = []
    songsList.forEach((elem) => {
        filterGenre1.push(elem.genre)
    })
    let setfilterGenre = new Set(filterGenre1)
    filterGenre = Array.from(setfilterGenre)
    for (let i of filterGenre) {
        const option = document.createElement("option");
        option.className = "filterOption";
        option.textContent = i
        option.value = i
        selectDiv.append(option)
    }
}

function showSongs() {
    if (selectDiv.value == "all") {
        showSongsDiv.textContent = ""
        renderAllSongList();
    }
    else {
        showSongsDiv.textContent = ""
        renderSongs(selectDiv.value);
    }
}
function renderAllSongList() {
    for (let i of songsList) {
        const song = document.createElement("div")
        song.className = "song mt-3"
        song.textContent = i.name
        song.addEventListener("click", () => {
            playThisSong(i.id);
        })
        showSongsDiv.append(song)
    }
}
function renderSongs(value) {
    let filteredSongs = songsList.filter((elem) => {
        if (elem.genre == value) {
            return elem
        }
    })
    for (let i of filteredSongs) {
        const song = document.createElement("div")
        song.className = "song mt-3"
        song.textContent = i.name
        song.addEventListener("click", () => {
            playThisSong(i.id);
        })
        showSongsDiv.append(song)
    }
}

// rendering songs

function renderCurrentSong() {
    const currentSong = getCurrentSong(currentId)
    showCurrentSong(currentSong)
    playCurrentSong(currentSong);
}

function showCurrentSong(currentSong) {
    thumbnail.textContent = ""
    const image = document.createElement("img")
    image.src = currentSong.image
    image.className = "img-fluid"
    thumbnail.append(image)
    songName.textContent = currentSong.name
    artist.textContent = currentSong.artist

}

function getCurrentSong(id) {
    for (let i of songsList) {
        if (i.id == id) {
            return i
        }
    }
}
function playCurrentSong(currentSong) {
    audioDiv.textContent = ""
    const audio = document.createElement("audio");
    audio.src = currentSong.source;
    audio.controls = true;
    audio.className = "mt-3"
    audio.load();
    audio.play();
    audio.autoplay = true
    audioDiv.append(audio)
}

function playNextSong() {
    if (currentId >= songsList.length) {
        currentId = 1;
    }
    else {
        currentId++;
    }
    renderCurrentSong()
}
function playPrevSong() {
    if (currentId <= 1) {
        currentId = songsList.length;
    }
    else {
        currentId--;
    }
    renderCurrentSong()
}
function playThisSong(id) {
    currentId = id;
    renderCurrentSong();
}

// creating playlist
function createPlaylist() {
    const playListName = playlistInput.value.trim()
    if (playListName == "") {
        alert("write name")
    }
    else {
        allPlaylistsName.push(playListName)
        playListWithSong.push({ value: playListName, items: [] })
        renderPlaylists();
    }
}

function renderPlaylists() {
    allPLaylist.textContent = ""
    for (let i of allPlaylistsName) {
        const playListNameGiven = document.createElement("div")
        playListNameGiven.className = "playListName mt-2"
        playListNameGiven.textContent = i;
        playListNameGiven.addEventListener("click", () => {
            currentPlaylist = i
            renderPlaylistSong(i)
        })
        allPLaylist.append(playListNameGiven)
    }
    // const getAllElement = document.querySelectorAll(".playListName")
    // getAllElement[getAllElement.length - 1].click()
}
function renderPlaylistSong(value) {
    for (let i of playListWithSong) {
        if (i.value == value) {
            current.textContent = ""
            for (let j of i.items) {
                const playListSongInPLaylist = document.createElement("div");
                playListSongInPLaylist.className = "playListSong mt-2";
                playListSongInPLaylist.textContent = j.name;
                current.append(playListSongInPLaylist);
                // console.log(j)
            }
        }
    }
}

function addSongsToPlaylist() {
    if ((playListWithSong.length == 0)) {
        alert("first create playlist")
    }
    else if (currentPlaylist == "") {
        alert("please select playlist")
    }
    else {
        for (let i of playListWithSong) {
            if (i.value == currentPlaylist) {
                const currentSongPlaying = getCurrentSong(currentId)
                addSongInPlayList(currentSongPlaying, currentPlaylist);
                renderPlaylistSong(currentPlaylist);
                // renderPlaylistSong(currentSongPlaying)
                // console.log(currentSongPlaying)
            }
        }
    }

}
function addSongInPlayList(song, currentPlaylist) {
    for (let i of playListWithSong) {
        if (i.value == currentPlaylist) {
            i.items.push(song)
        }
    }
    // console.log(playListWithSong)
}