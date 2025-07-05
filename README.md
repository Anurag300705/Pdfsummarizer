# DocInsight

DocInsight is a React application that enables users to upload PDF documents or images and interact with them using AI-powered summarization and chat features. The app leverages Google Gemini AI to generate concise summaries and answer questions about the uploaded files.

---

## Features

- **File Upload:** Upload PDF or image files for processing.
- **AI Summarization:** Get a concise summary of your document or image.
- **Chatbot:** Ask questions about the uploaded file and receive AI-generated responses.
- **Loader Animation:** Visual feedback during AI processing.

---

## Components Overview

### [`Header`](src/components/Header.jsx)
- **Purpose:** Renders the application title and a brief description at the top of the page.
- **Usage:** Always displayed at the top of the main container.
- **Props:** None.
- **Details:**  
  Displays the app name ("DocInsight") and a tagline. Also includes a horizontal rule for separation.

---

### [`FileUpload`](src/components/FileUpload.jsx)
- **Purpose:** Allows users to select and upload a PDF or image file.
- **Usage:** Displayed when no file has been uploaded yet.
- **Props:**  
  - `setFile`: Function to update the parent state with the uploaded file's data.
- **Details:**  
  - Accepts `.pdf`, `.jpeg`, `.jp`, and `.png` files.
  - Converts the selected file to a base64 string using the `Buffer` class.
  - Sets a preview image:  
    - For PDFs, uses a default icon (`/document-icon.png`).  
    - For images, generates a preview URL.
  - Passes an object containing the file's MIME type, base64 data, and preview image URL to the parent.

---

### [`Summary`](src/components/Summary.jsx)
- **Purpose:** Generates and displays a short summary of the uploaded file using Google Gemini AI.
- **Usage:** Displayed after a file is uploaded.
- **Props:**  
  - `file`: Object containing `type`, `file` (base64), and `imageURL`.
- **Details:**  
  - Sends the file and a prompt to Gemini AI to generate a summary (less than 200 words, plain text).
  - Shows a loader while waiting for the AI response.
  - Handles and displays errors if summarization fails.
  - Displays the preview image and the generated summary.

---

### [`Chat`](src/components/Chat.jsx)
- **Purpose:** Provides a chat interface for users to ask questions about the uploaded file.
- **Usage:** Displayed after a file is uploaded, below the summary.
- **Props:**  
  - `file`: Object containing `type`, `file` (base64), and `imageURL`.
- **Details:**  
  - Maintains a chat history (user and AI messages).
  - Sends the user's question, chat history, and file to Gemini AI for context-aware answers.
  - Displays each message with different styling for user, AI, and error messages.
  - Shows a text input and send button for user interaction.
  - Handles and displays errors if the AI response fails.

---

### [`Loader`](src/components/Loader.jsx)
- **Purpose:** Displays an animated loader during AI operations.
- **Usage:** Used in both `Summary` and `Chat` components while waiting for AI responses.
- **Props:** None.
- **Details:**  
  - Uses a simple CSS animation to indicate loading state.

---

## Application Flow

1. **Header** is always visible at the top.
2. **FileUpload** is shown initially. After a file is selected, its data is passed up and the upload section is replaced.
3. **Summary** is displayed, showing a preview and the AI-generated summary of the uploaded file.
4. **Chat** is displayed below the summary, allowing users to ask questions about the file.
5. **Loader** appears in `Summary` and `Chat` while waiting for AI responses.

---

## Usage

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Set up your API key:**
   - Add your Google Gemini API key:
     ```

3. **Run the development server:**
   ```
   npm run dev
   ```

4. **Open the app:**
   - Visit [http://localhost:5173](http://localhost:5173) in your browser.

5. **Workflow:**
   - Upload a PDF or image file using the file input.
   - View the AI-generated summary.
   - Use the chat interface to ask questions about the uploaded file.

---

## File Structure

- [`src/App.jsx`](src/App.jsx): Main application logic and component composition.
- [`src/components/`](src/components/): Contains all UI and logic components.
- [`public/`](public/): Static assets (e.g., icons).

---

## Notes

- Only PDF and common image formats are supported.
- The AI features require a valid Google Gemini API key.
- The `.env` file should be kept secret and is excluded from version control via `.gitignore`.

---

Feel free to explore and modify the components to suit
