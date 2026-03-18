// Kids Animal Match Game - Drag and Drop
// Match animals to their Twi names
// Add this to your kids-teens.html page

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONFIGURATION - YOUR MAILERLITE API KEY =====
    const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjcwN2UyMWMxNmYyMjYyZGZjYTQ4ZWYzNWU0NDY5OGNhNzVkOWQxYTZmNWQ0YjlkNTIwM2JlY2M2NzQ0NWFkMTUyMWRmZjY1ODY3NDU1ZWIiLCJpYXQiOjE3NzM4MzA2ODUuNjQ0NjE3LCJuYmYiOjE3NzM4MzA2ODUuNjQ0NjE5LCJleHAiOjQ5Mjk1MDQyODUuNjM3OTc5LCJzdWIiOiIyMjE3MjQ2Iiwic2NvcGVzIjpbXX0.NukFhsIIW5aLhITNpa08eSMIAi7em6HnFp9Z7xf_9OIbuLaSX9mIxl8MDwgzYMfgh_McPwrChF5qTLsqmB_umHxbSe7H9_e8lkFU9h6wu56X94dFIB8mMm6e7YDqfM_COgyFD8iyp9SufBg9zAsEU84t8sLmXbhU9LkS8Xn8GIu69SOQcyeWyOxfuKTWHDpjSDbJ1aspmieDeOt6fk5ZrFGv7O2JxAe__IKkEdgzbxOMF3THiCy9owYSUGVxpoTXjGs1ULmvhNDDi5izxKkGHU-XYbr8HSGFlye4PY9zs7xX5vhMbS5NOgsFVHRdCf9WRCCGvqSPSl_G_-4_waAua3z8QuiIDEgugyqudefRdM6QyvWp5uRzh7WGH8TmR8VmWG8Vle2yYPpMC-BpWoDDPDEKKgUYCZJG1edHpbA-ECsTF9HvdS4OFS04Igq0BCSOhcW9STA8JZdm4bplPNacLsh7ZQOK7bde-bDSoI2xfU8eb1mntPNgRJadlxCvBYaNOV0q477iJG3kR8nY4Rpq5_vG6JtCsHNFfqR520JrhJW4rvV8Cr2iMN7qMzGheqm2ouqOfvRGV0FDkCsWq_uM3B6BmBCBpF7q_n9YY0c_uQy2JCu6M-gXh4z2XsOiMomCHzZPzpzpO78GGRZ5Te-OFTpXvEFVCjf9Q93BrvD-hVs';

    // ===== MAILERLITE GROUP ID FOR KIDS =====
    const KIDS_GROUP_ID = '182277545531541431'; // Twi Kids group
    
    // =========================================

    // Animals data
    const animals = [
        { emoji: "🐶", english: "Dog", twi: "kraman", sound: "woof woof" },
        { emoji: "🐱", english: "Cat", twi: "agyinamoa", sound: "meow" },
        { emoji: "🐔", english: "Chicken", twi: "akokɔ", sound: "cluck cluck" },
        { emoji: "🐮", english: "Cow", twi: "nantwie", sound: "moo" },
        { emoji: "🐑", english: "Sheep", twi: "odwan", sound: "baa baa" },
        { emoji: "🐘", english: "Elephant", twi: "sonon", sound: "trumpet" }
    ];

    let matchedPairs = 0;
    let selectedAnimal = null;
    let gameCompleted = false;
    let attempts = 0;

    // Shuffle array for random order
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Create game container
    function createGameContainer() {
        const gameSection = document.getElementById('kids-animal-match');
        if (!gameSection) return;

        gameSection.innerHTML = `
            <div class="game-container" style="background: linear-gradient(135deg, #C4E0F9, #B5EAD7); border-radius: 50px; padding: 3rem; margin: 3rem 0; border: 5px solid var(--gold); box-shadow: 0 20px 40px var(--shadow);">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <span style="font-size: 5rem;">🐾</span>
                    <h3 style="color: var(--green); font-size: 2.5rem; margin: 1rem 0;">Animal Match Game!</h3>
                    <p style="color: var(--gray); font-size: 1.3rem;">Match each animal to its Twi name 🐶🐱🐔</p>
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
        matchedPairs = 0;
        selectedAnimal = null;
        gameCompleted = false;
        attempts = 0;
        
        document.getElementById('game-start').style.display = 'none';
        document.getElementById('game-content').style.display = 'block';
        
        showGame();
    }

    // Show the game board
    function showGame() {
        const gameContent = document.getElementById('game-content');
        
        // Create shuffled animals and names
        const shuffledAnimals = shuffleArray([...animals]);
        const shuffledNames = shuffleArray([...animals]);
        
        let animalsHtml = '';
        let namesHtml = '';

        shuffledAnimals.forEach((animal, index) => {
            animalsHtml += `
                <div class="animal-card" data-animal="${animal.twi}" data-index="${index}" style="background: white; border-radius: 30px; padding: 1.5rem; text-align: center; cursor: pointer; border: 4px solid var(--cream); transition: all 0.3s; box-shadow: 0 10px 20px var(--shadow);" 
                     onclick="document.dispatchEvent(new CustomEvent('animalClick', {detail: '${animal.twi}'}))"
                     onmouseover="this.style.borderColor='var(--green)'; this.style.transform='scale(1.05)';"
                     onmouseout="this.style.borderColor='var(--cream)'; this.style.transform='scale(1)';">
                    <div style="font-size: 4rem; margin-bottom: 0.5rem;">${animal.emoji}</div>
                    <div style="font-size: 1.2rem; color: var(--gray);">${animal.english}</div>
                    <div style="font-size: 0.9rem; color: var(--gold); margin-top: 0.5rem;">${animal.sound}</div>
                </div>
            `;
        });

        shuffledNames.forEach((animal, index) => {
            namesHtml += `
                <div class="name-card" data-name="${animal.twi}" data-index="${index}" style="background: var(--cream); border-radius: 30px; padding: 1.5rem; text-align: center; cursor: pointer; border: 4px solid var(--cream); transition: all 0.3s; box-shadow: 0 10px 20px var(--shadow);"
                     onclick="document.dispatchEvent(new CustomEvent('nameClick', {detail: '${animal.twi}'}))"
                     onmouseover="this.style.borderColor='var(--gold)'; this.style.transform='scale(1.05)';"
                     onmouseout="this.style.borderColor='var(--cream)'; this.style.transform='scale(1)';">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--green); margin-bottom: 0.5rem;">${animal.twi}</div>
                    <div style="font-size: 1rem; color: var(--gray);">means ${animal.english}</div>
                </div>
            `;
        });

        gameContent.innerHTML = `
            <div>
                <!-- Score and progress -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; background: white; padding: 1rem 2rem; border-radius: 60px;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 2rem;">⭐</span>
                        <span style="font-size: 1.5rem; font-weight: 700; color: var(--green);">${matchedPairs}/${animals.length}</span>
                    </div>
                    <div style="font-size: 1.2rem; color: var(--gray);">
                        ${attempts} ${attempts === 1 ? 'try' : 'tries'}
                    </div>
                </div>

                <!-- Game instructions -->
                <div style="background: white; border-radius: 40px; padding: 1rem 2rem; margin-bottom: 2rem; text-align: center; border: 2px dashed var(--gold);">
                    <p style="font-size: 1.2rem; color: var(--black);">
                        👆 Click an animal, then click its Twi name!
                    </p>
                </div>

                <!-- Animals grid -->
                <h4 style="color: var(--green); font-size: 1.5rem; margin-bottom: 1rem;">Animals:</h4>
                <div id="animals-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
                    ${animalsHtml}
                </div>

                <!-- Names grid -->
                <h4 style="color: var(--green); font-size: 1.5rem; margin-bottom: 1rem;">Twi Names:</h4>
                <div id="names-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;">
                    ${namesHtml}
                </div>

                <!-- Reset button -->
                <div style="text-align: center; margin-top: 2rem;">
                    <button id="reset-game-btn" class="btn btn-outline" style="font-size: 1.2rem; padding: 1rem 3rem;">🔄 New Game</button>
                </div>
            </div>
        `;

        // Add click handlers for animals and names
        const animalCards = document.querySelectorAll('.animal-card');
        const nameCards = document.querySelectorAll('.name-card');

        animalCards.forEach(card => {
            card.addEventListener('click', function() {
                if (gameCompleted) return;
                
                // Remove selected class from all animals
                animalCards.forEach(c => {
                    c.style.borderColor = 'var(--cream)';
                    c.style.transform = 'scale(1)';
                });
                
                // Add selected class to this animal
                this.style.borderColor = 'var(--green)';
                this.style.transform = 'scale(1.05)';
                
                selectedAnimal = this.dataset.animal;
            });
        });

        nameCards.forEach(card => {
            card.addEventListener('click', function() {
                if (gameCompleted || !selectedAnimal) return;
                
                attempts++;
                
                if (this.dataset.name === selectedAnimal) {
                    // Correct match!
                    this.style.opacity = '0.5';
                    this.style.pointerEvents = 'none';
                    
                    // Find and disable the matching animal
                    animalCards.forEach(animalCard => {
                        if (animalCard.dataset.animal === selectedAnimal) {
                            animalCard.style.opacity = '0.5';
                            animalCard.style.pointerEvents = 'none';
                            animalCard.style.borderColor = 'var(--green)';
                        }
                    });
                    
                    matchedPairs++;
                    
                    // Update score display
                    const scoreDisplay = document.querySelector('.game-container div[style*="justify-content: space-between"] span:last-child');
                    if (scoreDisplay) {
                        scoreDisplay.textContent = `${matchedPairs}/${animals.length}`;
                    }
                    
                    // Check if game is complete
                    if (matchedPairs === animals.length) {
                        gameCompleted = true;
                        setTimeout(() => {
                            showEmailForm();
                        }, 500);
                    }
                    
                    selectedAnimal = null;
                    
                    // Remove selection highlight
                    animalCards.forEach(c => {
                        c.style.borderColor = 'var(--cream)';
                    });
                } else {
                    // Wrong match - shake animation
                    this.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 500);
                }
            });
        });

        // Reset button
        document.getElementById('reset-game-btn').addEventListener('click', function() {
            showGame();
        });
    }

    // Show email form for parent
    function showEmailForm() {
        document.getElementById('game-content').style.display = 'none';
        const emailDiv = document.getElementById('game-email');
        emailDiv.style.display = 'block';

        emailDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem; background: white; border-radius: 50px;">
                <span style="font-size: 6rem;">🏆</span>
                <h3 style="color: var(--green); font-size: 3rem; margin: 1rem 0;">You did it!</h3>
                <p style="color: var(--gray); font-size: 1.5rem; margin-bottom: 2rem;">You matched all ${animals.length} animals! 🎉</p>
                
                <div style="background: var(--cream); border-radius: 40px; padding: 2rem; margin-bottom: 2rem;">
                    <p style="font-size: 1.3rem; margin-bottom: 1.5rem;">📧 Parent, enter your email for more free animal games and coloring pages!</p>
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
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1.2rem; font-size: 1.5rem;">Get Free Games →</button>
                </form>
                
                <p style="margin-top: 1.5rem; font-size: 1rem; color: var(--gray);">We'll send you printable animal coloring pages and new games!</p>
            </div>
        `;

        document.getElementById('game-email-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('game-email-input').value;
            const childName = document.getElementById('game-name-input').value;
            
            // Send to Google Analytics
            gtag('event', 'kids_animal_game_completed', {
                'event_category': 'kids',
                'event_label': 'animal_match_game',
                'value': attempts
            });

            // Show results immediately
            showResults(email, childName);
            
            // Send to MailerLite in the background
            addToMailerLite(email, childName, attempts);
        });
    }

    // Send to MailerLite
    function addToMailerLite(email, childName, attempts) {
        
        // Prepare subscriber data
        const subscriberData = {
            email: email,
            fields: {
                name: childName || 'Animal Game Parent',
                child_name: childName || '',
                game_type: 'Animal Match Game',
                game_attempts: attempts.toString()
            },
            groups: [KIDS_GROUP_ID],
            status: 'active'
        };

        // Send to MailerLite API
        fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${MAILERLITE_API_KEY}`
            },
            body: JSON.stringify(subscriberData)
        })
        .then(response => {
            if (!response.ok) {
                console.error('MailerLite API error:', response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Added to MailerLite:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Show results
    function showResults(email, childName) {
        document.getElementById('game-email').style.display = 'none';
        const resultsDiv = document.getElementById('game-results');
        resultsDiv.style.display = 'block';

        resultsDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem; background: white; border-radius: 50px;">
                <span style="font-size: 6rem;">🐾</span>
                <h3 style="color: var(--green); font-size: 3rem; margin: 1rem 0;">Thanks for playing!</h3>
                
                <div style="background: linear-gradient(135deg, #C4E0F9, #B5EAD7); border-radius: 40px; padding: 2rem; margin: 2rem 0;">
                    <p style="font-size: 1.3rem; color: var(--black);">🎁 Check your email for free animal coloring pages and new games!</p>
                    <p style="font-size: 1rem; color: var(--gray); margin-top: 1rem;">✓ Sent to: ${email}</p>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button id="play-again-btn" class="btn btn-primary" style="font-size: 1.3rem; padding: 1rem 3rem;">Play Again! 🔄</button>
                    <a href="kids-teens.html" class="btn btn-gold" style="font-size: 1.3rem; padding: 1rem 3rem;">More Kids Programs →</a>
                </div>
            </div>
        `;

        document.getElementById('play-again-btn').addEventListener('click', function() {
            document.getElementById('game-results').style.display = 'none';
            document.getElementById('game-start').style.display = 'block';
            matchedPairs = 0;
            selectedAnimal = null;
            gameCompleted = false;
            attempts = 0;
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

    // Initialize game on the page
    createGameContainer();
});