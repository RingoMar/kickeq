var volumeIncrement = 5;

function hasAudio(video) {
  return (
    video.mozHasAudio ||
    (video.webkitAudioDecodedByteCount &&
      video.webkitAudioDecodedByteCount > 0) ||
    (video.audioTracks && video.audioTracks.length > 0)
  );
}

function rinScroll(element, video) {
  if (!hasAudio(video)) return;

  let direction = (event.deltaY / 100) * -1;

  if (video.muted) {
    video.muted = false;
    video.volume = 0.1;
  } else if (direction === -1) {
    let volume = video.volume * 100 + direction * volumeIncrement;
    video.volume = Math.max(0, volume / 100); // Ensure volume doesn't go below 0
  } else {
    let volume = video.volume * 100 + direction * volumeIncrement;
    video.volume = Math.min(1, volume / 100); // Ensure volume doesn't go above 1
  }


  let volPercent = Math.round(video.volume * 100);
  let volumeSliderDiv = document.querySelector("div.vjs-volume-level");
  if (volumeSliderDiv !== null) {
    volumeSliderDiv.style.height = volPercent + "%";
  }
}

const onScroll = (event) => {
  let elements = document.elementsFromPoint(event.clientX, event.clientY);
  for (let element of elements) {
    if (element.tagName === "VIDEO") {
      event.preventDefault();
      rinScroll(element, element);
    }
  }
};

document.addEventListener("wheel", onScroll, { passive: false });
