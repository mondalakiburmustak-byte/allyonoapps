const shareBtn = document.getElementById('shareBtn');
if (shareBtn) {
    shareBtn.addEventListener('click', function () {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: 'Check out this awesome site!',
                url: window.location.href
            });
        } else {
            alert('Sharing is not supported on this device/browser.');
        }
    });
}