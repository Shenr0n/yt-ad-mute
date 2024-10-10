(function() {
    let videoPlayer = document.querySelector('video');
    let adMuted = false;
    let userMuted = false;
    let isUserAction = false;

    // Observe changes in the video player
    const observer = new MutationObserver(() => {
        if (!videoPlayer) {
            videoPlayer = document.querySelector('video');
        }
        if (videoPlayer) {
            attachVolumeChangeListener(videoPlayer);
            handleAdState(videoPlayer);
        }
    });
    
    // Start observing the video player DOM
    observer.observe(document, { childList: true, subtree: true });

    window.addEventListener('load', ()=> {
        if (videoPlayer) {
            attachVolumeChangeListener(videoPlayer);
            handleAdState(videoPlayer);
        }
    });

    // Watch for changes specifically in ad-related elements
    const adObserver = new MutationObserver(() => {
        handleAdState(videoPlayer);
    });


    // Attach volume change event listener
    function attachVolumeChangeListener(videoPlayer) {
        videoPlayer.addEventListener('volumechange', () => {
            if (!adMuted) {
                if (!isUserAction) {
                    userMuted = videoPlayer.muted;
                }
                isUserAction = false;
            }
        });
    }

    // Check if an ad is playing
    function handleAdState(videoPlayer) {
        const adContainer = document.querySelector('.ad-showing');

        if (adContainer && !adMuted) {
            videoPlayer.muted = true;
            adMuted = true;
            //console.log('Ad detected. Now muting');
            adObserver.observe(adContainer, { attributes: true, childList: true, subtree: true });

        }
        if (!adContainer && adMuted){
            videoPlayer.muted = userMuted;
            adMuted = false;
            //console.log('No ad detected. Unmuting video');
            adObserver.disconnect();
        }
    }

    // Listen for manual user mute/unmute actions
    document.querySelector('.ytp-mute-button').addEventListener('click', () => {
        isUserAction = true;
        userMuted = videoPlayer.muted;
    });
})();
