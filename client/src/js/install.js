const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Update UI to show the install button
  butInstall.classList.remove('hidden');
});

butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    // Clear the deferredPrompt variable
    deferredPrompt = null;
    // Hide the install button
    butInstall.classList.add('hidden');
  }
});

window.addEventListener('appinstalled', (event) => {
  console.log('PWA installed');
  // Perform any additional actions after installation, if needed
});
