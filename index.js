async function mistralChat(prompt) {
   const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer Insæt API key",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "ministral-8b-2410",
            messages: [
                {role: "system", content: "You are a concise assistant."},
                {role: "user", content: prompt}
            ],
            temperature: 0.7,
            max_tokens: 512
        })
    })
    const data = await response.json();
    return data.choices[0].message.content;
}

const button = document.querySelector(".button");

button.addEventListener("click", async function (event) {
    event.preventDefault();
    console.log("hej!")
    const fname = document.querySelector(".fname").value;
    const bdate = document.querySelector(".bdate").value;
    const budget = document.querySelector(".budget").value;

    let interestType = "";
    if (document.querySelector(".runclass").checked) interestType = "Løb & træning";
    else if (document.querySelector(".foodclass").checked) interestType = "Madlavning & bagning";
    else if (document.querySelector(".gamingclass").checked) interestType = "Gaming";
    else if (document.querySelector(".musicclass").checked) interestType = "Musik";
    else if (document.querySelector(".creativeclass").checked) interestType = "Kreativitet";
    else if (document.querySelector(".photoclass").checked) interestType = "Fotografi";
    else if (document.querySelector(".fashionclass").checked) interestType = "Mode & styling";



    // Vis “loading”
    const outputDiv = document.querySelector(".resultBox")
    outputDiv.innerHTML = "Genererer ønskeliste... 🎁";

// Lav en prompt
    const prompt = `
You are a creative, humorous, slightly roasting gift-expert.
Your job is to produce highly specific, well-written Danish gift ideas with no spelling mistakes.

INPUT:
Name: ${fname}
Birthdate: ${bdate}
Budget: ${budget}
Interest: ${interestType}

TASK:
Create 5–7 highly specific gift ideas that:
- Fit the person's interest and budget
- Are written in Danish
- Use a cozy, playful tone with gentle teasing (never rude)
- Are written in second person (“du”)
- Include 1–2 fitting emojis per item
- Feel personal and detailed
- Each idea must include a gentle, playful roast about their habits or personality.

FORMAT INSTRUCTIONS:
Return ONLY HTML with the following structure:

<ul>
<li>
<span style="font-weight:bold; font-size:1em;">Gift title</span><br>
<span style="font-size:0.95em;">Detailed explanation</span>
</li>
<br>
... repeat ...
</ul>

RULES:
- No extra commentary outside the HTML.
- No meta-text.
- No spelling errors.
- No apologies or disclaimers.
`;


    const result = await mistralChat (prompt);
    outputDiv.innerHTML = result;

})
