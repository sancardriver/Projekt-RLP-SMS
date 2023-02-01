function invokeServiceWorkerUpdateFlow(registration) {
    const toastLiveExample = document.getElementById("updateAvailableToast");
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
    const reloadButton = document.getElementById("reloadButton");
    reloadButton.addEventListener("click", () => {
        if (registration.waiting) {
            // Den wartenden Service Worker wissen lassen, dass er aktiv werden soll
            registration.waiting.postMessage("SKIP_WAITING");
        }
    });
}
// Prüfen, ob der Browser serviceWorker überhaupt unterstützt
if ("serviceWorker" in navigator) {
    // Warten bis die Seite geladen ist
    window.addEventListener("load", async () => {
        // Den Service Worker, aus der angegebenen Datei, registrieren
        const registration = await navigator.serviceWorker.register("service-worker.js");

        // ensure the case when the updatefound event was missed is also handled
        // by re-invoking the prompt when there's a waiting Service Worker
        if (registration.waiting) {
            invokeServiceWorkerUpdateFlow(registration);
        }

        // detect Service Worker update available and wait for it to become installed
        registration.addEventListener("updatefound", () => {
            if (registration.installing) {
                console.log("Test 1");
                // wait until the new Service worker is actually installed (ready to take over)
                registration.installing.addEventListener("statechange", () => {
                    console.log("Test 2");
                    if (registration.waiting) {
                        console.log("Test 3");
                        // if there's an existing controller (previous Service Worker), show the prompt
                        if (navigator.serviceWorker.controller) {
                            console.log("Test 4");
                            invokeServiceWorkerUpdateFlow(registration);
                        } else {
                            console.log("Test 5");
                            // otherwise it's the first install, nothing to do
                            console.log("Service Worker initialized for the first time");
                        }
                    }
                });
            }
        });
        let refreshing = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
            if (!refreshing) {
                window.location.reload();
                refreshing = true;
            }
        });
    });
}
