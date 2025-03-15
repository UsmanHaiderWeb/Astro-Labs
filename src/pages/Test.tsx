/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Slider } from '@/components/ui/slider';
import { Pause, Play } from 'lucide-react'
import * as React from 'react'
import WaveSurfer from "wavesurfer.js";

const Test = () => {
    const [playMusic, setPlayMusic] = React.useState<boolean>(false);
    const audio = React.useRef<HTMLAudioElement>(null);
    const slider = React.useRef<HTMLInputElement>(null);
    const [audioTrackValue, setAudioTrackValue] = React.useState<{ max: number; value: number }>(null);
    const waveformRef = React.useRef<HTMLDivElement | null>(null);
    const wavesurfer = React.useRef<WaveSurfer | null>(null);
    const [audioUrl, setAudioUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (waveformRef.current && audioUrl) {
            wavesurfer.current = WaveSurfer.create({
                container: waveformRef.current,
                // waveColor: "white",
                // progressColor: "purple",
                // cursorColor: "red",
                barWidth: 1,
                height: 100,
            });

            wavesurfer.current.load(audioUrl);
        }

        return () => wavesurfer.current?.destroy();
    }, [audioUrl]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
        }
    };

    return (
        <div>
            <button className="relative w-12 h-12 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 group" onClick={() => {
                if (playMusic) {
                    audio.current?.pause()
                    setPlayMusic(false);
                } else {
                    audio.current?.play()
                }
            }}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20(11)-3Ns8vjph0z3m2rYBOGiftW70XtXlla.png"
                        alt="Music Player"
                        width={24}
                        height={24}
                        className="brightness-200 transition-opacity duration-200 group-hover:opacity-0"
                    />
                    {playMusic ?
                        <Pause className="w-6 h-6 text-white absolute transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                        :
                        <Play className="w-6 h-6 text-white absolute transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                    }
                </div>
            </button>
            <audio ref={audio} id='footerAudioPlayer' src="/Bones.mp4" controls
                onEnded={() => {
                    console.log('working')
                    audio.current.src = '/Bones.mp4'
                    audio.current.play();
                }}
                onPlay={() => {
                    setPlayMusic(true);
                }}
                onPause={() => {
                    setPlayMusic(false);
                }}
                onVolumeChange={() => {
                    console.log('volume')
                }}
                onLoadedMetadata={(e: any) => {
                    console.log("e.target?.duration: ", e.target?.duration)
                    setAudioTrackValue(prev => ({ ...prev, max: Math.floor(e.target?.duration) }))
                }}
                onTimeUpdate={(e: React.ChangeEvent<HTMLAudioElement>) => {
                    setAudioTrackValue(prev => ({ ...prev, value: Math.floor(e.target?.currentTime) }))
                }}
            ></audio>
            <div className='mt-5'>
                <Slider
                    ref={slider}
                    min={0}
                    max={audioTrackValue?.max}
                    step={1}
                    value={[audioTrackValue?.value || 0]}
                    onClick={() => console.log('clicking')}
                    onValueChange={([val]) => {
                        console.log('working')
                        audio.current.currentTime = val;
                    }}
                />
                {slider.current?.value || 'Not working'}
            </div>
            <div>
                <input type="file" accept="audio/*" onChange={handleFileChange} />
                <div ref={waveformRef} className='pointer-events-none' />
            </div>
        </div>
    )
}

export default React.memo(Test)



/*
let songInfoArray = [];
let audio = document.querySelector("audio")
audio.src = songInfoArray[0].src;
audio.addEventListener("loadedmetadata", () => {
  document.querySelector(".seekbar").max = audio.duration
})

let songNumber = 0;
let playCounter = false;
let muteCounter = false;
let raf = null;


let clutter = "";
songInfoArray.forEach((i, idx) => {
  if (window.innerWidth >= 450){
    clutter += `<div class='w-[150px] lgtab:w-[25vw] tablet:w-[35vw] mini:w-[40vw] overflow-hidden px-[5px] mini:px-0' dataset="${idx}"><div class="relative w-full mini:w-[90%] mx-auto"><img src="${i.imgURl}" class='w-[140px] lgtab:w-[90%] tablet:w-[90%] mini:w-full tablet:h-[25vw] mini:h-[30vw] h-[140px] object-cover object-top rounded-xl' dataset="${idx}"><div class="whichisplaying pointer-events-none hidden absolute bottom-[10px] right-[10px] bg-green-600 rounded-full flex justify-center items-center h-[45px] w-[45px]"><i class="ri-google-play-fill text-[27px] transform-x-[3px]"></i></div></div><div class='mt-2 text-[19px] text-white mini:pl-5'>${i.songName}</div><p class='opacity-60 leading-[17px] text-white mini:pl-5'>${i.movieName}</p></div>`;
    document.querySelector(".songContainer").innerHTML = clutter;
  } else {
    clutter += `
    <div class="songList w-full flex justify-start items-center gap-x-3" dataset="${idx}">
      <div class="w-[80px] h-[80px] overflow-hidden pointer-events-none" >
        <img src="${i.imgURl}" class='w-[80px] h-[80px] object-cover object-top pointer-events-none' dataset="${idx}">
      </div>
      <div class="pointer-events-none">
        <div class="text-white pointer-events-none">${i.songName}</div>
        <p class="text-white pointer-events-none">${i.movieName}</p>
      </div>
    </div>
    `
    document.querySelector(".songContainer").innerHTML = clutter;
  }
});


function randomSongFunctioning(a) {
  audio.src = songInfoArray[Number(a.target.getAttribute("dataset"))].src;
  requestAnimationFrame(whilePlaying)
  audio.play();
  songNumber = Number(a.target.getAttribute("dataset"));
  document.querySelector(".songName").textContent = `${
    songInfoArray[Number(a.target.getAttribute("dataset"))].songName
  } / ${songInfoArray[Number(a.target.getAttribute("dataset"))].movieName}`;
  document.querySelector(
    ".play"
  ).innerHTML = `<i class="ri-pause-large-fill text-[30px] mini:text-[50px] mobile:text-[45px] micro:text-[40px] text-white"></i>`;
  playCounter = true;
  whichIsPlaying();
  if (window.innerWidth < 450) {
    document.querySelector("main").style.display = "none";
    document.querySelector("header").style.display = "block";
    document.querySelector(".mbsongIMG").src = songInfoArray[Number(a.target.getAttribute("dataset"))].imgURl
  }
}
function randomSong() {
  document.querySelectorAll(".songContainer img").forEach((i, idx) => {
    i.addEventListener("click", (target) => {
      if (window.innerWidth >= 450) {
        randomSongFunctioning(target)
      }
    });
  });
  document.querySelectorAll(".songContainer > .songList").forEach((i, idx) => {
    i.addEventListener("click", (target) => {
      if (window.innerWidth < 450){
        randomSongFunctioning(target)
      }
    });
  });
}
randomSong()

audio.addEventListener("ended", (i) => {
  songNumber = Number(songNumber) + 1;
  audio.src = songInfoArray[songNumber].src;
  requestAnimationFrame(whilePlaying)
  audio.play();
  playCounter = true;
  whichIsPlaying();
  document.querySelector(".mbsongIMG").src = songInfoArray[Number(songNumber)].imgURl
});



function secondsToMMSS(seconds) {
  let mm = Math.floor(seconds / 60);
  let ss = Math.round(seconds % 60);

  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  return mm + ":" + ss;
}




function settingDuration() {
  document.querySelector(".timeDuration").textContent = secondsToMMSS(audio.duration)
  document.querySelector('.seekbar').max = audio.duration
}

function settingCurrentTime() {
  document.querySelector(".currentTime").textContent = secondsToMMSS(audio.currentTime)
}

function SeekbarSliding() {
  document.querySelector(".seekbar").value = audio.currentTime
}

function whilePlaying() {
  if (audio.readyState > 0) {
    settingDuration()
    settingCurrentTime()
    SeekbarSliding()
    raf = requestAnimationFrame(whilePlaying)
  } else {
    audio.addEventListener("loadedmetadata", () => {
      settingDuration()
      settingCurrentTime()
      SeekbarSliding()
      raf = requestAnimationFrame(whilePlaying)
    })
  }
}

let seekbar = document.querySelector(".seekbar")

seekbar.addEventListener("input", () => {
  if (audio.readyState > 0) {
    document.querySelector(".currentTime").textContent = secondsToMMSS(seekbar.value)
    audio.currentTime = seekbar.value;
    // cancelAnimationFrame(raf)
  } else {
    audio.addEventListener("loadedmetadata", () => {
      document.querySelector(".currentTime").textContent = secondsToMMSS(seekbar.value)
      audio.currentTime = seekbar.value;
      // cancelAnimationFrame(raf)
    })
  }
})



document.querySelector(".previous").addEventListener("click", () => {
  if (songNumber > 0) {
    songNumber = Number(songNumber) - 1;
    audio.src = songInfoArray[songNumber].src;
    requestAnimationFrame(whilePlaying)
    audio.play();
    document.querySelector(
      ".songName"
    ).textContent = `${songInfoArray[songNumber].songName} / ${songInfoArray[songNumber].movieName}`;
    playCounter = true;
    document.querySelector(
      ".play"
    ).innerHTML = `<i class="ri-pause-large-fill text-[30px] mini:text-[50px] mobile:text-[45px] micro:text-[40px] text-white"></i>`;
    whichIsPlaying();
    document.querySelector(".mbsongIMG").src = songInfoArray[Number(songNumber)].imgURl
  }
});


document.querySelector(".next").addEventListener("click", () => {
  if (songNumber < songInfoArray.length - 1) {
    // document.querySelector(".previous").style.opacity = 1
    songNumber = Number(songNumber) + 1;
    audio.src = songInfoArray[songNumber].src;
    requestAnimationFrame(whilePlaying)
    audio.play();
    document.querySelector(
      ".songName"
    ).textContent = `${songInfoArray[songNumber].songName} / ${songInfoArray[songNumber].movieName}`;
    // if (songNumber == 0) {
    //     document.querySelector(".previous").style.opacity = 0.6
    // }
    playCounter = true;
    document.querySelector(
      ".play"
    ).innerHTML = `<i class="ri-pause-large-fill text-[30px] mini:text-[50px] mobile:text-[45px] micro:text-[40px] text-white"></i>`;
    whichIsPlaying();
    document.querySelector(".mbsongIMG").src = songInfoArray[Number(songNumber)].imgURl
  }
});

function play(a) {
  if (a) {
    audio.play();
    requestAnimationFrame(whilePlaying)
    document.querySelector(
      ".play"
    ).innerHTML = `<i class="ri-pause-large-fill text-[30px] mini:text-[50px] mobile:text-[45px] micro:text-[40px] text-white"></i>`;
  } else {
    audio.pause();
    cancelAnimationFrame(raf)
    document.querySelector(
      ".play"
    ).innerHTML = `<i class="ri-google-play-fill text-[30px] mini:text-[50px] mobile:text-[45px] micro:text-[40px] text-white"></i>`;
  }
}
document.querySelector(".play").addEventListener("click", () => {
  whichIsPlaying();
  play(!playCounter);
  playCounter = !playCounter;
});
function mute(a) {
  if (a) {
    audio.muted = true;
    document.querySelector(
      ".mute"
    ).innerHTML = `<i class="ri-volume-mute-line text-white"></i>`;
  } else {
    audio.muted = false;
    document.querySelector(
      ".mute"
    ).innerHTML = `<i class="ri-volume-up-line text-white"></i>`;
  }
}
document.querySelector(".mute").addEventListener("click", () => {
  mute(!muteCounter);
  muteCounter = !muteCounter;
});

function whichIsPlaying() {
  document.querySelectorAll(".whichisplaying").forEach((i, idx) => {
    if (idx == Number(songNumber)) {
      i.classList.remove("hidden");
    } else {
      i.classList.add("hidden");
    }
  });
}

document.querySelector("#volume").addEventListener("click", () => {
  audio.volume = document.querySelector("#volume").value;
});



function mobileMainContent() {
  gsap.set("main", {
    display: "none"
  })
  document.querySelector(".playlist").addEventListener("click", () => {
    document.querySelector("main").style.display = "block"
    document.querySelector("header").style.display = "none"
  })
  document.querySelector(".cancelPlaylist").addEventListener("click", () => {
    document.querySelector("main").style.display = "none"
    document.querySelector("header").style.display = "block"
  })
}
if (window.innerWidth < 450) {
  mobileMainContent()
}



gsap.to(".loader", {
  opacity: 0,
  delay: 3,
  duration:0.5
})
*/