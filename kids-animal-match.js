// kids-animal-match.js - UPDATED with modal popup for email

document.addEventListener('DOMContentLoaded', function() {
    
    const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjcwN2UyMWMxNmYyMjYyZGZjYTQ4ZWYzNWU0NDY5OGNhNzVkOWQxYTZmNWQ0YjlkNTIwM2JlY2M2NzQ0NWFkMTUyMWRmZjY1ODY3NDU1ZWIiLCJpYXQiOjE3NzM4MzA2ODUuNjQ0NjE3LCJuYmYiOjE3NzM4MzA2ODUuNjQ0NjE5LCJleHAiOjQ5Mjk1MDQyODUuNjM3OTc5LCJzdWIiOiIyMjE3MjQ2Iiwic2NvcGVzIjpbXX0.NukFhsIIW5aLhITNpa08eSMIAi7em6HnFp9Z7xf_9OIbuLaSX9mIxl8MDwgzYMfgh_McPwrChF5qTLsqmB_umHxbSe7H9_e8lkFU9h6wu56X94dFIB8mMm6e7YDqfM_COgyFD8iyp9SufBg9zAsEU84t8sLmXbhU9LkS8Xn8GIu69SOQcyeWyOxfuKTWHDpjSDbJ1aspmieDeOt6fk5ZrFGv7O2JxAe__IKkEdgzbxOMF3THiCy9owYSUGVxpoTXjGs1ULmvhNDDi5izxKkGHU-XYbr8HSGFlye4PY9zs7xX5vhMbS5NOgsFVHRdCf9WRCCGvqSPSl_G_-4_waAua3z8QuiIDEgugyqudefRdM6QyvWp5uRzh7WGH8TmR8VmWG8Vle2yYPpMC-BpWoDDPDEKKgUYCZJG1edHpbA-ECsTF9HvdS4OFS04Igq0BCSOhcW9STA8JZdm4bplPNacLsh7ZQOK7bde-bDSoI2xfU8eb1mntPNgRJadlxCvBYaNOV0q477iJG3kR8nY4Rpq5_vG6JtCsHNFfqR520JrhJW4rvV8Cr2iMN7qMzGheqm2ouqOfvRGV0FDkCsWq_uM3B6BmBCBpF7q_n9YY0c_uQy2JCu6M-gXh4z2XsOiMomCHzZPzpzpO78GGRZ5Te-OFTpXvEFVCjf9Q93BrvD-hVs';
    const KIDS_GROUP_ID = '182277545531541431';

    const animalPool = [
        { emoji: "🐶", english: "Dog", twi: "kraman" },
        { emoji: "🐱", english: "Cat", twi: "agyinamoa" },
        { emoji: "🐔", english: "Chicken", twi: "akokɔ" },
        { emoji: "🐮", english: "Cow", twi: "nantwie" },
        { emoji: "🐑", english: "Sheep", twi: "odwan" },
        { emoji: "🐘", english: "Elephant", twi: "ɔsono" },
        { emoji: "🐒", english: "Monkey", twi: "ɔkwakuo" },
        { emoji: "🐊", english: "Crocodile", twi: "denkyem" },
        { emoji: "🐠", english: "Fish", twi: "mpataa" }
    ];

    let animals = [];
    let matchedPairs = 0;
    let selectedAnimal = null;
    let gameCompleted = false;
    let attempts = 0;
    let gameStarted = false;
    let playerEmail = "";
    let playerName = "";
    let gameContentDiv = null;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startNewGame() {
        const shuffledPool = shuffleArray([...animalPool]);
        animals = shuffledPool.slice(0, 6);
        matchedPairs = 0;
        selectedAnimal = null;
        gameCompleted = false;
        attempts = 0;
    }

    // Create modal popup
    function showEmailModal(onSubmit) {
        // Remove any existing modal
        const existingModal = document.getElementById('game-email-modal');
        if (existingModal) existingModal.remove();
        
        const modal = document.createElement('div');
        modal.id = 'game-email-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        modal.innerHTML = `
            <div style="background: white; border-radius: 30px; padding: 2rem; max-width: 400px; width: 90%; text-align: center; position: relative;">
                <button id="close-modal" style="position: absolute; top: 15px; right: 20px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray);">&times;</button>
                <span style="font-size: 3rem;">📧</span>
                <h3 style="color: var(--green); margin: 0.5rem 0;">Free Game Access</h3>
                <p style="color: var(--gray); margin-bottom: 1rem;">Enter your email to start playing!</p>
                <form id="modal-email-form">
                    <input type="email" id="modal-player-email" placeholder="parent@email.com" required 
                           style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 30px; margin-bottom: 0.8rem; font-size: 1rem;">
                    <input type="text" id="modal-player-name" placeholder="Child's name (optional)" 
                           style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 30px; margin-bottom: 1rem; font-size: 1rem;">
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.8rem;">Start Game →</button>
                </form>
                <p style="margin-top: 1rem; font-size: 0.8rem; color: var(--gray);">No spam. Unsubscribe anytime.</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal on X click
        document.getElementById('close-modal').addEventListener('click', () => {
            modal.remove();
        });
        
        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        // Handle form submit
        document.getElementById('modal-email-form').addEventListener('submit', function(e) {
            e.preventDefault();
            playerEmail = document.getElementById('modal-player-email').value;
            playerName = document.getElementById('modal-player-name').value;
            modal.remove();
            onSubmit();
        });
    }

    function createGameContainer() {
        const gameSection = document.getElementById('kids-animal-match');
        if (!gameSection) return;

        gameSection.innerHTML = `
            <div class="game-container" style="background: linear-gradient(135deg, #C4E0F9, #B5EAD7); border-radius: 30px; padding: 1.5rem; margin: 2rem 0; border: 4px solid var(--gold); text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 3rem;">🐾</span>
                    <div>
                        <h3 style="color: var(--green); font-size: 1.8rem; margin: 0;">Animal Match!</h3>
                        <p style="color: var(--gray); font-size: 1rem;">Different animals every time!</p>
                    </div>
                </div>
                
                <button id="play-animal-match-btn" class="btn btn-primary" style="padding: 1rem 3rem; font-size: 1.2rem;">🎮 Play Game</button>
                
                <div id="animal-match-content" style="display: none;"></div>
                <div id="animal-match-results" style="display: none;"></div>
            </div>
        `;

        document.getElementById('play-animal-match-btn').addEventListener('click', () => {
            showEmailModal(() => {
                addToMailerLite(playerEmail, playerName);
                gtag('event', 'game_email_signup', {
                    'event_category': 'engagement',
                    'event_label': 'kids_animal_match_game'
                });
                document.getElementById('play-animal-match-btn').style.display = 'none';
                startNewGame();
                startGame();
            });
        });
    }

    function startGame() {
        gameContentDiv = document.getElementById('animal-match-content');
        gameContentDiv.style.display = 'block';
        
        gtag('event', 'game_start', {
            'event_category': 'engagement',
            'event_label': 'kids_animal_match_game'
        });
        
        gameStarted = true;
        showGame();
    }

    function showGame() {
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

        gameContentDiv.innerHTML = `
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
                        setTimeout(() => showResults(), 500);
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
            
            gtag('event', 'game_restart', {
                'event_category': 'engagement',
                'event_label': 'kids_animal_match_game'
            });
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

    function showResults() {
        gameContentDiv.style.display = 'none';
        const resultsDiv = document.getElementById('animal-match-results');
        resultsDiv.style.display = 'block';
        resultsDiv.innerHTML = `
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 30px;">
                <span style="font-size: 3rem;">🏆</span>
                <h3 style="color: var(--green); font-size: 1.8rem; margin: 0.5rem 0;">Great job, ${playerName || 'champion'}!</h3>
                <p style="font-size: 1.5rem; font-weight: bold; color: var(--green);">${matchedPairs}/${animals.length}</p>
                <p style="font-size: 1rem; margin-bottom: 1rem;">🎯 ${attempts} total attempts</p>
                <p style="font-size: 0.9rem; color: var(--gray); margin-bottom: 1rem;">✓ Free games sent to: ${playerEmail}</p>
                <button id="play-again-btn" class="btn btn-primary" style="padding: 0.8rem 2rem;">Play Again! 🔄</button>
            </div>
        `;

        gtag('event', 'game_complete', {
            'event_category': 'engagement',
            'event_label': 'kids_animal_match_game',
            'score': matchedPairs,
            'total': animals.length,
            'attempts': attempts
        });

        document.getElementById('play-again-btn').addEventListener('click', () => {
            resultsDiv.style.display = 'none';
            document.getElementById('play-animal-match-btn').style.display = 'block';
            gameContentDiv.innerHTML = '';
            playerEmail = "";
            playerName = "";
        });
    }

    createGameContainer();
});
