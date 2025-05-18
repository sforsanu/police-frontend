import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import "./index.css";

// Add title to the document
document.title = "Police Report Analyzer - Excel Upload, PDF Generator, and Viewer";

// Add meta description
const metaDescription = document.createElement("meta");
metaDescription.name = "description";
metaDescription.content = "Upload, analyze accident reports, and generate personalized communications. Our AI-powered platform revolutionizes how law offices process police accident reports.";
document.head.appendChild(metaDescription);

// Add Open Graph tags for better social sharing
const ogTitle = document.createElement("meta");
ogTitle.setAttribute("property", "og:title");
ogTitle.content = "Police Report Analyzer - Excel Upload, PDF Generator, and Viewer";
document.head.appendChild(ogTitle);

const ogDescription = document.createElement("meta");
ogDescription.setAttribute("property", "og:description");
ogDescription.content = "Upload, analyze accident reports, and generate personalized communications. Our AI-powered platform revolutionizes how law offices process police accident reports.";
document.head.appendChild(ogDescription);

const ogType = document.createElement("meta");
ogType.setAttribute("property", "og:type");
ogType.content = "website";
document.head.appendChild(ogType);

// Robust OAuth hash handler: force reload if OAuth tokens are in the hash
if (
  window.location.hash.includes("access_token") ||
  window.location.hash.includes("refresh_token") ||
  window.location.hash.includes("code=")
) {
  // Remove the hash and reload the page to ensure cookies are set
  window.location.href = window.location.pathname + window.location.search;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
