document.addEventListener("DOMContentLoaded", () => {
  const words = ["Students", "Learners", "Explorers", "Achievers"];
  let currentWordIndex = 0;
  const changingWordElement = document.getElementById("subtitle");

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function typeWord(word) {
    for (let i = 1; i <= word.length; i++) {
      changingWordElement.textContent = word.slice(0, i);
      await delay(100);
    }
  }

  async function deleteWord(word) {
    for (let i = word.length; i >= 0; i--) {
      changingWordElement.textContent = word.slice(0, i);
      await delay(80);
    }
  }

  async function animateWords() {
    while (true) {
      const word = words[currentWordIndex];
      await typeWord(word);
      await delay(1000);
      await deleteWord(word);
      await delay(300);
      currentWordIndex = (currentWordIndex + 1) % words.length;
    }
  }

  if (changingWordElement) {
    animateWords();
  } else {
    console.warn("Element with ID 'subtitle' not found.");
  }
});
document.getElementById("email-form").addEventListener("submit", async function(event) {
  event.preventDefault();

  const symbol = "AAPL"; 
 // const apiKey = "dd4aa53ee33642cdbae6c9bd2ddb5963"; // Replace with your Twelve Data key
  const apiUrl = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.code) {
      throw new Error(data.message);
    }

    const stockInfo = `Stock: ${data.name} (${data.symbol})\nPrice: $${data.close}\nChange: ${data.percent_change}%`;

    
    document.getElementById("email-message").value = stockInfo;

    
    emailjs.sendForm("service_gxva7bi", "template_pl02wv3", this)
      .then(function() {
        alert("Email sent with stock market info!");
      }, function(error) {
        console.error("FAILED...", error);
        alert("Something went wrong.");
      });

  } catch (error) {
    console.error("Error fetching stock data:", error);
    alert("Failed to fetch stock data.");
  }
});
