async function mistralChat(prompt) {
   const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer jg142LQjxmwWcf1uS9El9LVSK5DVV8Q8",
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
    const lname = document.querySelector(".lname").value;
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
    outputDiv.textContent = "Genererer ønskeliste... 🎁";

// Lav en prompt
    const prompt = `
Lav en ønskeliste baseret på disse oplysninger:

Navn: ${fname} ${lname}
Fødselsdato: ${bdate}
Budget: ${budget}
Interesse: ${interestType}

Lav 5-7 gaveidéer til jul og fødselsdag. 
Skriv i et hyggeligt og humoristisk sprog.

Du må gerne skrive det op i punktform for hvert ønske. 
ønske 1 overskrift: h3 i html

ønske 2 overskrift: h3 i html

fortsæt som dette

`;

    const result = await mistralChat (prompt);
    outputDiv.textContent = result;

})
