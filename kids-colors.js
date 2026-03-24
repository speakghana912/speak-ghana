// kids-colors.js - UPDATED with modal popup for email

document.addEventListener('DOMContentLoaded', function() {
    
    const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjcwN2UyMWMxNmYyMjYyZGZjYTQ4ZWYzNWU0NDY5OGNhNzVkOWQxYTZmNWQ0YjlkNTIwM2JlY2M2NzQ0NWFkMTUyMWRmZjY1ODY3NDU1ZWIiLCJpYXQiOjE3NzM4MzA2ODUuNjQ0NjE3LCJuYmYiOjE3NzM4MzA2ODUuNjQ0NjE5LCJleHAiOjQ5Mjk1MDQyODUuNjM3OTc5LCJzdWIiOiIyMjE3MjQ2Iiwic2NvcGVzIjpbXX0.NukFhsIIW5aLhITNpa08eSMIAi7em6HnFp9Z7xf_9OIbuLaSX9mIxl8MDwgzYMfgh_McPwrChF5qTLsqmB_umHxbSe7H9_e8lkFU9h6wu56X94dFIB8mMm6e7YDqfM_COgyFD8iyp9SufBg9zAsEU84t8sLmXbhU9LkS8Xn8GIu69SOQcyeWyOxfuKTWHDpjSDbJ1aspmieDeOt6fk5ZrFGv7O2JxAe__IKkEdgzbxOMF3THiCy9owYSUGVxpoTXjGs1ULmvhNDDi5izxKkGHU-XYbr8HSGFlye4PY9zs7xX5vhMbS5NOgsFVHRdCf9WRCCGvqSPSl_G_-4_waAua3z8QuiIDEgugyqudefRdM6QyvWp5uRzh7WGH8TmR8VmWG8Vle2yYPpMC-BpWoDDPDEKKgUYCZJG1edHpbA-ECsTF9HvdS4OFS04Igq0BCSOhcW9STA8JZdm4bplPNacLsh7ZQOK7bde-bDSoI2xfU8eb1mntPNgRJadlxCvBYaNOV0q477iJG3kR8nY4Rpq5_vG6JtCsHNFfqR520JrhJW4rvV8Cr2iMN7qMzGheqm2ouqOfvRGV0FDkCsWq_uM3B6BmBCBpF7q_n9YY0c_uQy2JCu6M-gXh4z2XsOiMomCHzZPzpzpO78GGRZ5Te-OFTpXvEFVCjf9Q93BrvD-hVs';
    const KIDS_GROUP_ID = '182277545531541431';

    const colorPool = [
        { name: "Red", twi: "kɔkɔɔ", emoji: "🟥", bg: "#FF4444" },
        { name: "Yellow", twi: "akokɔsradeɛ", emoji: "🟨", bg: "#FFD700" },
        { name: "Blue", twi: "bibire", emoji: "🟦", bg: "#4444FF" },
        { name: "Green", twi: "ahabanmono", emoji: "🟩", bg: "#44FF44" },
        { name: "Black", twi: "tuntum", emoji: "⬛", bg: "#333333" },
        { name: "White", twi: "fitaa", emoji: "⬜", bg: "#FFFFFF", textColor: "black" },
        { name: "Purple", twi: "beredum", emoji: "🟪", bg: "#AA44FF" },
        { name: "Orange", twi: "akaahono", emoji: "🟧", bg: "#FF8844" }
    ];

    let colors = [];
    let currentQuestion = 0;
    let score = 0;
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
        const shuffledPool = shuffleArray([...colorPool]);
        colors = shuffledPool.slice(0, 6);
        currentQuestion = 0;
        score = 0;
    }

    // Create modal popup
    function showEmailModal(onSubmit) {
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
                <span style="font-size: 3rem;">🎨</span>
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
        
        document.getElementById('close-modal').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
        
        document.getElementById('modal-email-form').addEventListener('submit', function(e) {
            e.preventDefault();
            playerEmail = document.getElementById('modal-player-email').value;
            playerName = document.getElementById('modal-player-name').value;
            modal.remove();
            onSubmit();
        });
    }

    function createGameContainer() {
        const gameSection = document.getElementById('kids-colors');
        if (!gameSection) return;

        gameSection.innerHTML = `
            <div class="game-container" style="background: linear-gradient(135deg, #FFE5E5, #FFD5E5); border-radius: 30px; padding: 1.5rem; margin: 2rem 0; border: 4px solid var(--gold); text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 3rem;">🎨</span>
                    <div>
                        <h3 style="color: var(--green); font-size: 1.8rem; margin: 0;">Color Fun!</h3>
                        <p style="color: var(--gray); font-size: 1rem;">Different colors every time!</p>
                    </div>
                </div>
                
                <button id="play-color-btn" class="btn btn-primary" style="padding: 1rem 3rem; font-size: 1.2rem;">🎮 Play Game</button>
                
                <div id="color-content" style="display: none;"></div>
                <div id="color-results" style="display: none;"></div>
            </div>
        `;

        document.getElementById('play-color-btn').addEventListener('click', () => {
            showEmailModal(() => {
                addToMailerLite(playerEmail, playerName);
                gtag('event', 'game_email_signup', {
                    'event_category': 'engagement',
                    'event_label': 'kids_color_game'
                });
                document.getElementById('play-color-btn').style.display = 'none';
                startNewGame();
                startGame();
            });
        });
    }

    function startGame() {
        gameContentDiv = document.getElementById('color-content');
        gameContentDiv.style.display = 'block';
        
        gtag('event', 'game_start', {
            'event_category': 'engagement',
            'event_label': 'kids_color_game'
        });
        
        gameStarted = true;
        showQuestion();
    }

    function showQuestion() {
        const color = colors[currentQuestion];
        
        const shuffledOptions = shuffleArray([...colors]);
        
        let optionsHtml = '';
        shuffledOptions.forEach((c) => {
            const textColor = c.name === 'White' ? 'black' : 'white';
            optionsHtml += `
                <div style="margin: 0.5rem 0;">
                    <button class="color-option" data-color-name="${c.name}" data-twi="${c.twi}" style="width: 100%; padding: 1rem; border-radius: 30px; border: 2px solid white; background: ${c.bg}; color: ${textColor}; font-size: 1.2rem; font-weight: bold; cursor: pointer; transition: all 0.2s;"
                            onmouseover="this.style.transform='scale(1.02)';" onmouseout="this.style.transform='scale(1)';">
                        ${c.name} → ${c.twi}
                    </button>
                </div>
            `;
        });

        gameContentDiv.innerHTML = `
            <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <div style="background: white; height: 8px; border-radius: 10px; flex-grow: 1; overflow: hidden; border: 1px solid var(--gold);">
                        <div style="background: var(--green); width: ${(currentQuestion / colors.length) * 100}%; height: 100%;"></div>
                    </div>
                    <span style="font-size: 0.9rem; background: white; padding: 0.2rem 0.8rem; border-radius: 20px; border: 1px solid var(--gold);">
                        ${currentQuestion + 1}/${colors.length}
                    </span>
                </div>
                
                <div style="background: white; border-radius: 20px; padding: 1.5rem; margin-bottom: 1rem; text-align: center; position: sticky; top: 0; z-index: 10; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <span style="font-size: 4rem; display: block; margin-bottom: 0.5rem;">${color.emoji}</span>
                    <h4 style="font-size: 1.3rem; color: var(--green); margin: 0;">What color is this?</h4>
                </div>
                
                <div style="max-height: 300px; overflow-y: auto; padding-right: 0.3rem;">
                    ${optionsHtml}
                </div>
            </div>
        `;

        document.querySelectorAll('.color-option').forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.dataset.colorName === color.name) {
                    score++;
                    if (window.SoundEffects) SoundEffects.correct();
                    this.style.background = 'var(--green)';
                    this.textContent = '✓ Correct! ✓';
                    
                    setTimeout(() => {
                        if (currentQuestion < colors.length - 1) {
                            currentQuestion++;
                            showQuestion();
                        } else {
                            if (window.SoundEffects) SoundEffects.cheer();
                            showResults();
                        }
                    }, 800);
                } else {
                    if (window.SoundEffects) SoundEffects.wrong();
                    this.style.opacity = '0.5';
                    setTimeout(() => this.style.opacity = '1', 300);
                }
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
                fields: { name: childName || 'Color Game Parent', child_name: childName || '', game_type: 'Color Game' },
                groups: [KIDS_GROUP_ID],
                status: 'active'
            })
        }).catch(error => console.error('Error:', error));
    }

    function showResults() {
        gameContentDiv.style.display = 'none';
        const resultsDiv = document.getElementById('color-results');
        resultsDiv.style.display = 'block';
        resultsDiv.innerHTML = `
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 30px;">
                <span style="font-size: 4rem;">🌈</span>
                <h3 style="color: var(--green); font-size: 1.8rem; margin: 0.5rem 0;">Great job, ${playerName || 'champion'}!</h3>
                <p style="font-size: 2rem; font-weight: bold; color: var(--green);">${score}/${colors.length}</p>
                <p style="font-size: 0.9rem; color: var(--gray); margin-bottom: 1rem;">✓ Free coloring pages sent to: ${playerEmail}</p>
                <button id="play-again-btn" class="btn btn-primary" style="padding: 0.8rem 2rem;">Play Again! 🔄</button>
            </div>
        `;

        gtag('event', 'game_complete', {
            'event_category': 'engagement',
            'event_label': 'kids_color_game',
            'score': score,
            'total': colors.length
        });

        document.getElementById('play-again-btn').addEventListener('click', () => {
            resultsDiv.style.display = 'none';
            document.getElementById('play-color-btn').style.display = 'block';
            gameContentDiv.innerHTML = '';
            playerEmail = "";
            playerName = "";
        });
    }

    createGameContainer();
});
