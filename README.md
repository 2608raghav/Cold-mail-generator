# Cold-Mail-Generator 📧

An AI-powered web application that scrapes job descriptions from URLs and automatically generates professional, personalized cold emails. This project translates the mechanism of a Python-based generator into a full-stack Node.js application.

## 🚀 Features
- **Web Scraping**: Extracts job details directly from career pages using Axios and Cheerio.
- **LLM Integration**: Uses Groq's Llama-3-70b model for high-quality email generation.
- **Modern Tech Stack**: Built with Node.js, Express, and a clean HTML/CSS frontend.

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3 (Inter font), JavaScript (Fetch API)
- **Backend**: Node.js, Express.js
- **AI**: LangChain, Groq API (Llama 3.3 70b)
- **Scraping**: Axios, Cheerio

## 📋 Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A **Groq API Key** (Get one at [console.groq.com](https://console.groq.com/)).

## 🔧 Installation

1. **Clone the repository**:
   ```bash
   git clone (https://github.com/2608raghav/Cold-mail-generator.git)
   cd cold-mail-generator
2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure API Key**:
    Open `server.js` and replace the placeholder with your Groq API Key:
    ```javascript
    apiKey: "YOUR_GROQ_API_KEY"
    ```

### 🏃 Running the App

1.  **Start the server**:
    ```bash
    node server.js
    ```

2.  **Open the browser**:
    Navigate to `http://localhost:3000`

3.  **Generate**:
    Paste a job description URL (e.g., from Nike or Airbnb) and click **Generate Cold Email**.

### 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
   
