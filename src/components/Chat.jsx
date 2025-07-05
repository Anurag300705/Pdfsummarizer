import { GoogleGenAI } from "@google/genai";
import "./Chat.css";
import { useState } from 'react';

const API_KEY = import.meta.env.VITE_API_KEY;



function Chat({ file }) {
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    async function handleSendMessage() {
        if (input.length) {
            let chatMessages = [...messages, { role: "user", text: input }];
            setInput(""); // Clear input field after sending
            setMessages(chatMessages);

            try {
                const contents = [
                    {
                        text: `
                    Answer this question about the attached document: ${input}
                    Answer as a chatbot with short messages and text only(no markdowns, tags or symbols)
                    chat history: ${JSON.stringify(messages)} `
                    },
                    {
                        inlineData: {
                            mimeType: file.type,
                            data: file.file,
                        }
                    }
                ];

                const response = await ai.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents: contents
                });

                const modelText = response.candidates?.[0]?.content?.parts?.[0]?.text || "No response from model.";
                chatMessages = [...chatMessages, { role: "model", text: modelText }];
                setMessages(chatMessages); // Update messages with the model's response


            } catch (error) {
                chatMessages = [...chatMessages, { role: "error", text: "An error occurred while generating the response. Please try again." }];
                setMessages(chatMessages);
                console.log("error");
            }

        }
    }

    return (
        <section className="chat-window">
            <h2>Chat</h2>
            {
                messages.length ?
                    <div className="chat">
                        {
                            messages.map((msg) => (
                                <div className={msg.role} key={msg.text}>
                                    <p>{msg.text}</p>
                                </div>
                            ))
                        }
                    </div> :
                    ''
            }

            <div className="input-area">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)} // Update input state
                    type="text"
                    placeholder="Ask any question about the document or image you uploaded."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </section>
    )
}

export default Chat