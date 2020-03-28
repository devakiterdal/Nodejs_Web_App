if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw_cached.js')
            .then((reg) => console.log(" service worker registered", reg))
            .catch((err) => console.log("service worker not registered", err));
    });

}