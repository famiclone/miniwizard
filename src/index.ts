import App from "./app";

declare global {
  interface Window { app: any; }
}

const app = new App();
window.app = app;
