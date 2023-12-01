// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "I don't care", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Demons", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Thunder", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Believer", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Natural", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Dark Horse", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Wavin' Flag", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Cheap Thrills", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "ME!", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Blank Space", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 
// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        songItems[songIndex].style.backgroundColor = "#1ED760";
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
      element.classList.remove('fa-pause-circle');
      element.classList.add('fa-play-circle');
    });
  };

  let isFunctionEnabled = false;
  let currentSongIndex = 0;
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      const isPlaying = !audioElement.paused; // Check if the audio is currently playing
      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-pause-circle');
      document.querySelectorAll('.songItem').forEach(songItem => {
        songItem.classList.remove('selectedSong');
      });
      e.target.closest('.songItem').classList.add('selectedSong');
      if (isPlaying && songIndex === currentSongIndex) {
        // If the clicked song is the currently playing song, pause it
        audioElement.pause();
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        
      } else {
        // If the clicked song is not the currently playing song or the audio is paused, play it
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
      }
    });
  });
  
  // Update the currentSongIndex whenever a song is played
  audioElement.addEventListener('play', () => {
    currentSongIndex = songIndex;
  });
  
  // Update the currentSongIndex whenever a song is paused
  audioElement.addEventListener('pause', () => {
    currentSongIndex = -1;
  });
  
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    songItems[songIndex].style.backgroundColor = "#1ED760";
    if(songIndex<=9){
        if(songIndex===0){
            songItems[songIndex+9].style.backgroundColor = "white";
        }
        songItems[songIndex-1].style.backgroundColor = "white";
    }
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    songItems[songIndex].style.backgroundColor = "#1ED760";
    if(songIndex<=9){
        songItems[songIndex+1].style.backgroundColor = "white";
    }
})