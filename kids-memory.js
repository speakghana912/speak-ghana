// Kids Memory Game - "Which One Is Missing?"
// Add this to your kids-teens.html page

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONFIGURATION - YOUR MAILERLITE API KEY =====
    const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjcwN2UyMWMxNmYyMjYyZGZjYTQ4ZWYzNWU0NDY5OGNhNzVkOWQxYTZmNWQ0YjlkNTIwM2JlY2M2NzQ0NWFkMTUyMWRmZjY1ODY3NDU1ZWIiLCJpYXQiOjE3NzM4MzA2ODUuNjQ0NjE3LCJuYmYiOjE3NzM4MzA2ODUuNjQ0NjE5LCJleHAiOjQ5Mjk1MDQyODUuNjM3OTc5LCJzdWIiOiIyMjE3MjQ2Iiwic2NvcGVzIjpbXX0.NukFhsIIW5aLhITNpa08eSMIAi7em6HnFp9Z7xf_9OIbuLaSX9mIxl8MDwgzYMfgh_McPwrChF5qTLsqmB_umHxbSe7H9_e8lkFU9h6wu56X94dFIB8mMm6e7YDqfM_COgyFD8iyp9SufBg9zAsEU84t8sLmXbhU9LkS8Xn8GIu69SOQcyeWyOxfuKTWHDpjSDbJ1aspmieDeOt6fk5ZrFGv7O2JxAe__IKkEdgzbxOMF3THiCy9owYSUGVxpoTXjGs1ULmvhNDDi5izxKkGHU-XYbr8HSGFlye4PY9zs7xX5vhMbS5NOgsFVHRdCf9WRCCGvqSPSl_G_-4_waAua3z8QuiIDEgugyqudefRdM6QyvWp5uRzh7WGH8TmR8VmWG8Vle2yYPpMC-BpWoDDPDEKKgUYCZJG1edHpbA-ECsTF9HvdS4OFS04Igq0BCSOhcW9STA8JZdm4bplPNacLsh7ZQOK7bde-bDSoI2xfU8eb1mntPNgRJadlxCvBYaNOV0q477iJG3kR8nY4Rpq5_vG6JtCsHNFfqR520JrhJW4rvV8Cr2iMN7qMzGheqm2ouqOfvRGV0FDkCsWq_uM3B6BmBCBpF7q_n9YY0c_uQy2JCu6M-gXh4z2XsOiMomCHzZPzpzpO78GGRZ5Te-OFTpXvEFVCjf9Q93BrvD-hVs';

    // ===== MAILERLITE GROUP ID FOR KIDS =====
    const KIDS_GROUP_ID = '182277545531541431'; // Twi Kids group
    
    // =========================================

    // Animals for memory game
    const allAnimals = [
        { emoji: "🐶", twi: "kraman", english: "dog" },
        { emoji: "🐱", twi: "agyinamoa", english: "cat" },
        { emoji: "🐔", twi: "akokɔ", english: "chicken" },
        { emoji: "🐮", twi: "nantwie", english: "cow" },
        { emoji: "🐑", twi: "odwan", english: "sheep" },
        { emoji: "🐘", twi: "sonon", english: "elephant" }
    ];

    let currentRound = 0;
    let score = 0;
    let totalRounds = 5;
    let currentAnimals = [];

    // Create game container
    function createGameContainer() {
        const gameSection = document.getElementById('kids-memory');
        if (!gameSection) return;

        gameSection.innerHTML = `
            <div class="game-container" style="background: linear-gradient(135deg, #FCE7F3, #FBCFE8); border-radius: 50px; padding: 3rem; margin: 3rem 0; border: 5px solid var(--gold); box-shadow: 0 20px 40px var(--shadow);">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <span style="font-size: 5rem;">🧠</span>
                    <h3 style="color: var(--green); font-size: 2.5rem; margin: 1rem 0;">Memory Challenge!</h3>
                    <p style="color: var(--gray); font-size: 1.3rem;">Which animal is missing? 🤔</p>
                </div>
                
                <div id="game-start" style="text-align: center;">
                    <button id="start-game-btn" class="btn btn-primary" style="font-size: 1.5rem; padding: 1.2rem 4rem; background: var(--green);">Start Game →</button>
                </div>
                
                <div id="game-content" style="display: none;"></div>
                <div id="game-email" style="display: none;"></div>
                <div id="game-results" style="display: none;"></div>
            </div>
        `;

        document.getElementById('start-game-btn').addEventListener('click', startGame);
    }

    // Start the game
    function startGame() {
        currentRound = 0;
        score = 0;
        
        document.getElementById('game-start').style.display = 'none';
        document.getElementById('game-content').style.display = 'block';
        
        nextRound();
    }

    // Set up next round
    function nextRound() {
        if (currentRound >= totalRounds) {
            showEmailForm();
            return;
        }

        // Pick 4 random animals
        const shuffled = [...allAnimals].sort(() => 0.5 - Math.random());
        currentAnimals = shuffled.slice(0, 4);
        
        // Remove one animal
        const missingIndex = Math.floor(Math.random() * 4);
        const missingAnimal = currentAnimals[missingIndex];
        const displayedAnimals = currentAnimals.filter((_, i) => i !== missingIndex);

        showMemoryRound(displayedAnimals, missingAnimal);
    }

    // Show memory round
    function showMemoryRound(displayed, missing) {
        const gameContent = document.getElementById('game-content');
        
        // Create animals display
        let animalsHtml = '';
        displayed.forEach(animal => {
            animalsHtml += `
                <div style="background: white; border-radius: 30px; padding: 1.5rem; text-align: center; border: 4px solid var(--gold); box-shadow: 0 10px 20px var(--shadow);">
                    <div style="font-size: 4rem;">${animal.emoji}</div>
                    <div style="font-size: 1rem; color: var(--gray); margin-top: 0.5rem;">${animal.english}</div>
                </div>
            `;
        });

        // Create options (including the missing one)
        let optionsHtml = '';
        const options = [missing, ...displayed].sort(() => 0.5 - Math.random());
        
        options.forEach((animal, index) => {
            optionsHtml += `
                <div style="margin: 0.5rem;">
                    <button class="memory-option" data-twi="${animal.twi}" style="width: 100%; padding: 1.2rem; border-radius: 60px; border: 4px solid white; background: var(--cream); font-size: 1.5rem; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 1rem;"
                            onmouseover="this.style.transform='scale(1.05)'; this.style.borderColor='var(--gold)'; this.style.background='white';"
                            onmouseout="this.style.transform='scale(1)'; this.style.borderColor='white'; this.style.background='var(--cream)';">
                        <span style="font-size: 2rem;">${animal.emoji}</span>
                        <span style="font-size: 1.2rem; color: var(--green);">${animal.twi}</span>
                    </button>
                </div>
            `;
        });

        gameContent.innerHTML = `
            <div>
                <!-- Round counter -->
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                    <div style="background: white; height: 20px; border-radius: 30px; flex-grow: 1; overflow: hidden; border: 2px solid var(--gold);">
                        <div style="background: var(--green); width: ${(currentRound / totalRounds) * 100}%; height: 100%;"></div>
                    </div>
                    <span style="color: var(--green); font-weight: 700; background: white; padding: 0.5rem 1.5rem; border-radius: 50px; border: 2px solid var(--gold);">
                        Round ${currentRound + 1}/${totalRounds}
                    </span>
                </div>
                
                <!-- Memory section -->
                <div style="background: white; border-radius: 40px; padding: 2rem; margin-bottom: 2rem;">
                    <p style="font-size: 1.3rem; color: var(--gray); text-align: center; margin-bottom: 1rem;">👀 Look at these animals...</p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                        ${animalsHtml}
                    </div>
                </div>
                
                <!-- Question -->
                <div style="text-align: center; margin: 2rem 0;">
                    <h4 style="font-size: 2rem; color: var(--green); margin-bottom: 1rem;">
                        Which one is missing?
                    </h4>
                </div>
                
                <!-- Options -->
                <div id="options-container">
                    ${optionsHtml}
                </div>
            </div>
        `;

        // Add click handlers
        document.querySelectorAll('.memory-option').forEach(btn => {
            btn.addEventListener('click', function() {
                const selectedTwi = this.dataset.twi;
                
                if (selectedTwi === missing.twi) {
                    // Correct!
                    score++;
                    this.style.background = 'var(--green)';
                    this.style.color = 'white';
                    this.innerHTML = '<span style="font-size: 2rem;">✓</span> <span>Correct!</span>';
                    
                    setTimeout(() => {
                        currentRound++;
                        nextRound();
                    }, 1000);
                } else {
                    // Wrong
                    this.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 500);
                }
            });
        });
    }

    // Show email form for parent
    function showEmailForm() {
        document.getElementById('game-content').style.display = 'none';
        const emailDiv = document.getElementById('game-email');
        emailDiv.style.display = 'block';

        emailDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem; background: white; border-radius: 50px;">
                <span style="font-size: 6rem;">🧠</span>
                <h3 style="color: var(--green); font-size: 3rem; margin: 1rem 0;">Great memory!</h3>
                <p style="color: var(--gray); font-size: 1.5rem; margin-bottom: 2rem;">You got ${score}/${totalRounds} correct! 🎉</p>
                
                <div style="background: linear-gradient(135deg, #FCE7F3, #FBCFE8); border-radius: 40px; padding: 2rem; margin-bottom: 2rem;">
                    <p style="font-size: 1.3rem;">📧 Parent, enter your email for more memory games and brain puzzles!</p>
                </div>
                
                <form id="game-email-form" style="max-width: 500px; margin: 0 auto;">
                    <div style="margin-bottom: 1.5rem;">
                        <input type="email" id="game-email-input" placeholder="parent@email.com" required 
                               style="width: 100%; padding: 1.2rem 2rem; border: 3px solid var(--cream); border-radius: 60px; font-size: 1.2rem;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <input type="text" id="game-name-input" placeholder="Your child's name (optional)" 
                               style="width: 100%; padding: 1.2rem 2rem; border: 3px solid var(--cream); border-radius: 60px; font-size: 1.2rem;">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1.2rem; font-size: 1.5rem;">Get More Games →</button>
                </form>
            </div>
        `;

        document.getElementById('game-email-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('game-email-input').value;
            const childName = document.getElementById('game-name-input').value;
            
            gtag('event', 'kids_memory_game_completed', {
                'event_category': 'kids',
                'event_label': 'memory_game',
                'value': score
            });

            showResults(email, childName);
            addToMailerLite(email, childName, score);
        });
    }

    // Send to MailerLite
    function addToMailerLite(email, childName, score) {
        const subscriberData = {
            email: email,
            fields: {
                name: childName || 'Memory Game Parent',
                child_name: childName || '',
                game_type: 'Memory Game',
                game_score: score.toString()
            },
            groups: [KIDS_GROUP_ID],
            status: 'active'
        };

        fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${MAILERLITE_API_KEY}`
            },
            body: JSON.stringify(subscriberData)
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
    }

    // Show results
    function showResults(email, childName) {
        document.getElementById('game-email').style.display = 'none';
        const resultsDiv = document.getElementById('game-results');
        resultsDiv.style.display = 'block';

        resultsDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem; background: white; border-radius: 50px;">
                <span style="font-size: 6rem;">🧠</span>
                <h3 style="color: var(--green); font-size: 3rem; margin: 1rem 0;">Awesome memory!</h3>
                <p style="font-size: 2rem; color: var(--gold); margin-bottom: 1rem;">${score}/${totalRounds}</p>
                
                <div style="background: linear-gradient(135deg, #FCE7F3, #FBCFE8); border-radius: 40px; padding: 2rem; margin: 2rem 0;">
                    <p style="font-size: 1.3rem;">🎁 Check your email for more brain games!</p>
                    <p style="font-size: 1rem; color: var(--gray); margin-top: 1rem;">✓ Sent to: ${email}</p>
                </div>
                
                <button id="play-again-btn" class="btn btn-primary" style="font-size: 1.3rem; padding: 1rem 3rem;">Play Again! 🔄</button>
            </div>
        `;

        document.getElementById('play-again-btn').addEventListener('click', function() {
            document.getElementById('game-results').style.display = 'none';
            document.getElementById('game-start').style.display = 'block';
            currentRound = 0;
            score = 0;
        });
    }

    // Add shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);

    createGameContainer();
});