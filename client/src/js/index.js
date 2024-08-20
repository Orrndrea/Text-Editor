import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

// Function to load and show a spinner
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `;
  main.appendChild(spinner);
};

// Initialize the editor and handle potential errors
const initializeEditor = () => {
  try {
    const editor = new Editor();
    if (!editor) {
      loadSpinner();
    }
  } catch (error) {
    console.error('Failed to initialize editor:', error);
    loadSpinner();
  }
};

initializeEditor();

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register the service worker using Workbox
  const workboxSW = new Workbox('/service-worker.js');
  workboxSW.register().then(() => {
    console.log('Service Worker registered successfully.');
  }).catch((error) => {
    console.error('Service Worker registration failed:', error);
  });
} else {
  console.error('Service workers are not supported in this browser.');
}

