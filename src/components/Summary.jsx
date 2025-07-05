
import { GoogleGenAI } from "@google/genai";
import { useState, useEffect } from "react";
import Loader from "./Loader";

function Summary({ file }) {

    // console.log(file);
    const ai = new GoogleGenAI({ apiKey: "AIzaSyCWO4c1oDCnn_WLRwl-QyKNFgw3N-2qj2E" });
    const [summary, setSummary] = useState("");
    const [status, setStatus] = useState("idle");

    async function getSummary() {
        setStatus("loading");

        try {
            const contents = [
                {
                    text: `
                Summarize the document in one short paragraph(less than 200 words) 
                Use just plain text with no markdowns or html tags ` },
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
            setStatus("success");
            setSummary(response.text);

        } catch (error) {
            setStatus("error");
        }

    }

    useEffect(() => {
        if (status === "idle") {
            getSummary();
        }
    }, [status]);

    return (
        <section className="summary">

            <img src={file.imageURL} alt="Preview Image" />
            <h2>Summary</h2>
            {
                status === 'loading' ?
                    <Loader /> :
                    status === 'success' ?
                        <p>{summary}</p> :
                        status === 'error' ?
                            <p className="error">An error occurred while generating the summary. Please try again.</p> :
                            ''
            }

        </section>
    )
}

export default Summary