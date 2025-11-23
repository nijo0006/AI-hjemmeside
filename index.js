// Funktion der sender en prompt til Mistral API'et
async function mistralChat(prompt) {

    // Kalder Mistral API'et med fetch
    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",               // Vi sender data til API'et
        headers: {
            "Authorization": "Bearer Insæt API key",
            // API-nøglen — giver adgang til modellen (fjern før det lægges i repositoriet!)
            "Content-Type": "application/json"
            // Fortæller serveren at vi sender JSON-data
        },
        body: JSON.stringify({
            model: "ministral-8b-2410",
            // Hvilken Mistral-model der skal bruges

            messages: [
                {role: "system", content: "You are a concise assistant."},
                // System-rolle: generelle instruktioner til modellen

                {role: "user", content: prompt}
                // Selve prompten du bygger senere
            ],

            temperature: 0.7,
            // Hvor kreative svarene må være — højere = mere kreative

            max_tokens: 512
            // Max længde på det genererede svar
        })
    })

    // Konverter API-svaret fra JSON
    const data = await response.json();

    // Returnér selve tekstindholdet modellen skrev
    return data.choices[0].message.content;
}



// Finder knappen i HTML
const button = document.querySelector(".button");


// Når der klikkes på knappen, sker dette:
button.addEventListener("click", async function (event) {
    event.preventDefault();
    // Stopper siden fra at reloade når knappen trykkes

    console.log("hej!")

    // Henter værdierne fra formularfelterne
    const fname = document.querySelector(".fname").value;
    const bdate = document.querySelector(".bdate").value;
    const budget = document.querySelector(".budget").value;

    // Tjekker hvilken interesse der er valgt
    let interestType = "";
    if (document.querySelector(".runclass").checked) interestType = "Løb & træning";
    else if (document.querySelector(".foodclass").checked) interestType = "Madlavning & bagning";
    else if (document.querySelector(".gamingclass").checked) interestType = "Gaming";
    else if (document.querySelector(".musicclass").checked) interestType = "Musik";
    else if (document.querySelector(".creativeclass").checked) interestType = "Kreativitet";
    else if (document.querySelector(".photoclass").checked) interestType = "Fotografi";
    else if (document.querySelector(".fashionclass").checked) interestType = "Mode & styling";


    // Viser en midlertidig “loading”-tekst
    const outputDiv = document.querySelector(".resultBox")
    outputDiv.innerHTML = "Genererer ønskeliste... 🎁";


    // Bygger den store prompt til AI'en
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


    // Sender prompten til Mistral API'et og venter på svar
    const result = await mistralChat(prompt);

    // Viser AI'ens HTML-output i din resultBox
    outputDiv.innerHTML = result;

})
