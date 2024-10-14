import { useCallback } from "react";

const ApiCall = () => {
    const CHATGPT_API_KEY = "your_openai_api_key_here";

    const GenBusinessIdea = useCallback(async (prompt) => {
        const CHATGPT_API_URL = "https://api.openai.com/v1/chat/completions";

        try {
            // const data = {
            //     model: "gpt-3.5-turbo",
            //     messages: [
            //         { role: "system", content: "You are a helpful assistant that generates business ideas." },
            //         { role: "user", content: `Generate a thorough business idea based on the following prompt:\n\n${prompt}` },
            //     ],
            //     max_tokens: 150, 
            //     temperature: 0.7,
            // };

            // const response = await fetch(CHATGPT_API_URL, {
            //     method: "POST",
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${CHATGPT_API_KEY}`,
            //     },
            //     body: JSON.stringify(data),
            // });

            // if (!response.ok) {
            //     console.error("API request failed:", response.statusText);
            //     return null; 
            // }

            // const respo = await response.json();
            // return respo.choices[0].message.content.trim();
            if(!prompt){
                return null
            }
             return prompt
        } catch (error) {
            console.error("Error occurred during API request:", error);
            return null; 
        }
    }, []);

    return { GenBusinessIdea };
}

export default ApiCall;
