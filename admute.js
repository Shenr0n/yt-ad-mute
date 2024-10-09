(function() {
    let videoPlayer = document.querySelector('video');
    let adMuted = false;
    let userMuted = false;

    // Observe changes in the video player
    const observer = new MutationObserver(() => {
        if (!videoPlayer) {
            videoPlayer = document.querySelector('video');
        }

        if (videoPlayer) {
            handleAdState(videoPlayer);
        }
    });

    // Start observing the video player DOM
    observer.observe(document, { childList: true, subtree: true });
    
    window.addEventListener('load', ()=> {
        if (videoPlayer) {
            handleAdState(videoPlayer);
        }
    })

    // Check if an ad is playing
    function handleAdState(videoPlayer) {
        const adContainer = document.querySelector('.ad-showing');

        if (adContainer && !adMuted) {
            videoPlayer.muted = true;
            adMuted = true;
            //console.log('Ad detected. Now muting');

        } else if (!adContainer && adMuted){
            videoPlayer.muted = userMuted;
            isMuted = false;
            //console.log('No ad detected. Unmuting video');
        }
    }

    // Event listener for when the video is muted/unmuted by the user
    videoPlayer.addEventListener('volumechange', () => {
        if(!adMuted){
            userMuted = videoPlayer.muted;
        }    
    });
})();
