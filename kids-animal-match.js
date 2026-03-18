// Kids Animal Match Game - RANDOM VERSION with Sound Effects
document.addEventListener('DOMContentLoaded', function() {
    
    const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjcwN2UyMWMxNmYyMjYyZGZjYTQ4ZWYzNWU0NDY5OGNhNzVkOWQxYTZmNWQ0YjlkNTIwM2JlY2M2NzQ0NWFkMTUyMWRmZjY1ODY3NDU1ZWIiLCJpYXQiOjE3NzM4MzA2ODUuNjQ0NjE3LCJuYmYiOjE3NzM4MzA2ODUuNjQ0NjE5LCJleHAiOjQ5Mjk1MDQyODUuNjM3OTc5LCJzdWIiOiIyMjE3MjQ2Iiwic2NvcGVzIjpbXX0.NukFhsIIW5aLhITNpa08eSMIAi7em6HnFp9Z7xf_9OIbuLaSX9mIxl8MDwgzYMfgh_McPwrChF5qTLsqmB_umHxbSe7H9_e8lkFU9h6wu56X94dFIB8mMm6e7YDqfM_COgyFD8iyp9SufBg9zAsEU84t8sLmXbhU9LkS8Xn8GIu69SOQcyeWyOxfuKTWHDpjSDbJ1aspmieDeOt6fk5ZrFGv7O2JxAe__IKkEdgzbxOMF3THiCy9owYSUGVxpoTXjGs1ULmvhNDDi5izxKkGHU-XYbr8HSGFlye4PY9zs7xX5vhMbS5NOgsFVHRdCf9WRCCGvqSPSl_G_-4_waAua3z8QuiIDEgugyqudefRdM6QyvWp5uRzh7WGH8TmR8VmWG8Vle2yYPpMC-BpWoDDPDEKKgUYCZJG1edHpbA-ECsTF9HvdS4OFS04Igq0BCSOhcW9STA8JZdm4bplPNacLsh7ZQOK7bde-bDSoI2xfU8eb1mntPNgRJadlxCvBYaNOV0q477iJG3kR8nY4Rpq5_vG6JtCsHNFfqR520JrhJW4rvV8Cr2iMN7qMzGheqm2ouqOfvRGV0FDkCsWq_uM3B6BmBCBpF7q_n9YY0c_uQy2JCu6M-gXh4z2XsOiMomCHzZPzpzpO78GGRZ5Te-OFTpXvEFVCjf9Q93BrvD-hVs';
    const KIDS_GROUP_ID = '182277545531541431';

    // Animal pool - will randomize which ones appear
    const animalPool = [
        { emoji: "🐶", english: "Dog", twi: "kraman" },
        { emoji: "🐱", english: "Cat", twi: "agyinamoa" },
        { emoji: "🐔", english: "Chicken", twi: "akokɔ" },
        { emoji: "🐮", english: "Cow", twi: "nantwie" },
        { emoji: "🐑", english: "Sheep", twi: "odwan" },
        { emoji: "🐘", english: "Elephant", twi: "sonon" },
        { emoji: "🐒", english: "Monkey", twi: "kwakwa" },
        { emoji: "🐊", english: "Crocodile", twi: "denkyem" },
        { emoji: "🐠", english: "Fish", twi: "mpataa" }
    ];

    let animals = [];
    let matchedPairs = 0;
    let selectedAnimal = null;
    let gameCompleted = false;
    let attempts = 0;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startNewGame() {
        // Pick 6 random animals from the pool
        const shuffledPool = shuffleArray([...animalPool]);
        animals = shuffledPool.slice(0, 6);
        matchedPairs = 0;
        selectedAnimal = null;
        gameCompleted = false;
        attempts = 0;
    }

    function createGameContainer() {
        const gameSection = document.getElementById('kids-animal-match');
        if (!gameSection) return;

        gameSection.innerHTML = `
            <div class="game-container" style="background: linear-gradient(135deg, #C4E0F9, #B5EAD7); border-radius: 30px; padding: 1.5rem; margin: 2rem 0; border: 4px solid var(--gold);">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 3rem;">🐾</span>
                    <div>
                        <h3 style="color: var(--green); font-size: 1.8rem; margin: 0;">Animal Match!</h3>
                        <p style="color: var(--gray); font-size: 1rem;">Different animals every time!</p>
                    </div>
                </div>
                
                <div id="game-start" style="text-align: center;">
                    <button id="start-game-btn" class="btn btn-primary" style="padding: 0.8rem 2rem;">Start Game →</button>
                </div>
                
                <div id="game-content" style="display: none;"></div>
                <div id="game-email" style="display: none;"></div>
                <div id="game-results" style="display: none;"></div>
            </div>
        `;

        document.getElementById('start-game-btn').addEventListener('click', () => {
            startNewGame();
            startGame();
        });
    }

    function startGame() {
        document.getElementById('game-start').style.display = 'none';
        document.getElementById('game-content').style.display = 'block';
        showGame();
    }

    function showGame() {
        const gameContent = document.getElementById('game-content');
        
        const shuffledAnimals = shuffleArray([...animals]);
        const shuffledNames = shuffleArray([...animals]);
        
        let animalsHtml = '';
        let namesHtml = '';

        shuffledAnimals.forEach((animal, index) => {
            animalsHtml += `
                <div class="animal-card" data-animal="${animal.twi}" style="background: white; border-radius: 15px; padding: 0.8rem; text-align: center; cursor: pointer; border: 2px solid var(--cream); box-shadow: 0 2px 5px var(--shadow); margin-bottom: 0.5rem;">
                    <div style="font-size: 2rem;">${animal.emoji}</div>
                    <div style="font-size: 0.8rem; color: var(--gray);">${animal.english}</div>
                </div>
            `;
        });

        shuffledNames.forEach((animal) => {
            namesHtml += `
                <div class="name-card" data-name="${animal.twi}" style="background: var(--cream); border-radius: 15px; padding: 0.8rem; text-align: center; cursor: pointer; border: 2px solid var(--cream); box-shadow: 0 2px 5px var(--shadow); margin-bottom: 0.5rem;">
                    <div style="font-size: 1.2rem; font-weight: 700; color: var(--green);">${animal.twi}</div>
                </div>
            `;
        });

        gameContent.innerHTML = `
            <div>
                <div style="display: flex; justify-content: space-between; background: white; padding: 0.5rem 1rem; border-radius: 30px; margin-bottom: 1rem; position: sticky; top: 0; z-index: 10;">
                    <span>⭐ ${matchedPairs}/${animals.length}</span>
                    <span>${attempts} ${attempts === 1 ? 'try' : 'tries'}</span>
                </div>

                <p style="font-size: 0.9rem; color: var(--gray); text-align: center; margin-bottom: 1rem;">👆 Click animal, then click name</p>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <h4 style="font-size: 1rem; margin-bottom: 0.5rem;">Animals:</h4>
                        <div style="max-height: 250px; overflow-y: auto; padding-right: 0.3rem;">
                            ${animalsHtml}
                        </div>
                    </div>
                    <div>
                        <h4 style="font-size: 1rem; margin-bottom: 0.5rem;">Names:</h4>
                        <div style="max-height: 250px; overflow-y: auto; padding-right: 0.3rem;">
                            ${namesHtml}
                        </div>
                    </div>
                </div>

                <button id="reset-game-btn" class="btn btn-outline" style="width: 100%; margin-top: 1rem; padding: 0.5rem;">🔄 New Animals</button>
            </div>
        `;

        // Add click handlers
        const animalCards = document.querySelectorAll('.animal-card');
        const nameCards = document.querySelectorAll('.name-card');

        animalCards.forEach(card => {
            card.addEventListener('click', function() {
                if (gameCompleted) return;
                
                animalCards.forEach(c => c.style.borderColor = 'var(--cream)');
                this.style.borderColor = 'var(--green)';
                selectedAnimal = this.dataset.animal;
            });
        });

        nameCards.forEach(card => {
            card.addEventListener('click', function() {
                if (gameCompleted || !selectedAnimal) return;
                
                attempts++;
                
                if (this.dataset.name === selectedAnimal) {
                    if (window.SoundEffects) SoundEffects.correct();
                    
                    this.style.opacity = '0.3';
                    this.style.pointerEvents = 'none';
                    
                    animalCards.forEach(animalCard => {
                        if (animalCard.dataset.animal === selectedAnimal) {
                            animalCard.style.opacity = '0.3';
                            animalCard.style.pointerEvents = 'none';
                        }
                    });
                    
                    matchedPairs++;
                    
                    if (matchedPairs === animals.length) {
                        gameCompleted = true;
                        if (window.SoundEffects) SoundEffects.cheer();
                        setTimeout(() => showEmailForm(), 500);
                    }
                    
                    selectedAnimal = null;
                    animalCards.forEach(c => c.style.borderColor = 'var(--cream)');
                } else {
                    if (window.SoundEffects) SoundEffects.wrong();
                }
            });
        });

        document.getElementById('reset-game-btn').addEventListener('click', () => {
            startNewGame();
            showGame();
        });
    }

    function showEmailForm() {
        document.getElementById('game-content').style.display = 'none';
        document.getElementById('game-email').style.display = 'block';
        document.getElementById('game-email').innerHTML = `
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 30px;">
                <span style="font-size: 3rem;">🏆</span>
                <h3 style="color: var(--green); font-size: 1.8rem; margin: 0.5rem 0;">You did it!</h3>
                <form id="game-email-form">
                    <input type="email" id="game-email-input" placeholder="parent@email.com" required 
                           style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 30px; margin-bottom: 0.8rem;">
                    <input type="text" id="game-name-input" placeholder="Child's name (optional)" 
                           style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 30px; margin-bottom: 1rem;">
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.8rem;">Get Free Games →</button>
                </form>
            </div>
        `;

        document.getElementById('game-email-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('game-email-input').value;
            const childName = document.getElementById('game-name-input').value;
            
            gtag('event', 'kids_animal_game_completed', { 'event_category': 'kids' });
            showResults(email, childName);
            addToMailerLite(email, childName);
        });
    }

    function addToMailerLite(email, childName) {
        fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAILERLITE_API_KEY}`
            },
            body: JSON.stringify({
                email: email,
                fields: { name: childName || 'Animal Game Parent', child_name: childName || '', game_type: 'Animal Match Game' },
                groups: [KIDS_GROUP_ID],
                status: 'active'
            })
        }).catch(error => console.error('Error:', error));
    }

    function showResults(email, childName) {
        document.getElementById('game-email').style.display = 'none';
        document.getElementById('game-results').style.display = 'block';
        document.getElementById('game-results').innerHTML = `
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 30px;">
                <span style="font-size: 3rem;">🐾</span>
                <h3 style="color: var(--green); font-size: 1.8rem; margin: 0.5rem 0;">Thanks for playing!</h3>
                <p style="font-size: 1rem; margin-bottom: 1rem;">✓ Sent to: ${email}</p>
                <button id="play-again-btn" class="btn btn-primary" style="padding: 0.8rem 2rem;">Play Again! 🔄</button>
            </div>
        `;

        document.getElementById('play-again-btn').addEventListener('click', () => {
            document.getElementById('game-results').style.display = 'none';
            document.getElementById('game-start').style.display = 'block';
        });
    }

    createGameContainer();
});
