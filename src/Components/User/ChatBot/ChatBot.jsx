import React from 'react'

const ChatBot = () => {
    const query = async() => {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/codellama/CodeLlama-34b-Instruct-hf",
            {
                headers: { Authorization: "Bearer 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",
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({"inputs": "Virat kohli performance in points"}),
            }
        );
        const result = await response.json();
        console.log(result);
    }

    return (
        <div>
            <button onClick={query}>Click</button>
        </div>
    )
}

export default ChatBot