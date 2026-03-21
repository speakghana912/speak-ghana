// Kids Color Game - RANDOM VERSION with Sound Effects
document.addEventListener('DOMContentLoaded', function() {
    
    const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjcwN2UyMWMxNmYyMjYyZGZjYTQ4ZWYzNWU0NDY5OGNhNzVkOWQxYTZmNWQ0YjlkNTIwM2JlY2M2NzQ0NWFkMTUyMWRmZjY1ODY3NDU1ZWIiLCJpYXQiOjE3NzM4MzA2ODUuNjQ0NjE3LCJuYmYiOjE3NzM4MzA2ODUuNjQ0NjE5LCJleHAiOjQ5Mjk1MDQyODUuNjM3OTc5LCJzdWIiOiIyMjE3MjQ2Iiwic2NvcGVzIjpbXX0.NukFhsIIW5aLhITNpa08eSMIAi7em6HnFp9Z7xf_9OIbuLaSX9mIxl8MDwgzYMfgh_McPwrChF5qTLsqmB_umHxbSe7H9_e8lkFU9h6wu56X94dFIB8mMm6e7YDqfM_COgyFD8iyp9SufBg9zAsEU84t8sLmXbhU9LkS8Xn8GIu69SOQcyeWyOxfuKTWHDpjSDbJ1aspmieDeOt6fk5ZrFGv7O2JxAe__IKkEdgzbxOMF3THiCy9owYSUGVxpoTXjGs1ULmvhNDDi5izxKkGHU-XYbr8HSGFlye4PY9zs7xX5vhMbS5NOgsFVHRdCf9WRCCGvqSPSl_G_-4_waAua3z8QuiIDEgugyqudefRdM6QyvWp5uRzh7WGH8TmR8VmWG8Vle2yYPpMC-BpWoDDPDEKKgUYCZJG1edHpbA-ECsTF9HvdS4OFS04Igq0BCSOhcW9STA8JZdm4bplPNacLsh7ZQOK7bde-bDSoI2xfU8eb1mntPNgRJadlxCvBYaNOV0q477iJG3kR8nY4Rpq5_vG6JtCsHNFfqR520JrhJW4rvV8Cr2iMN7qMzGheqm2ouqOfvRGV0FDkCsWq_uM3B6BmBCBpF7q_n9YY0c_uQy2JCu6M-gXh4z2XsOiMomCHzZPzpzpO78GGRZ5Te-OFTpXvEFVCjf9Q93BrvD-hVs';
    const KIDS_GROUP_ID = '182277545531541431';

    // Color pool - will randomize order
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

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startNewGame() {
        // Pick 6 random colors and shuffle them
        const shuffledPool = shuffleArray([...colorPool]);
        colors = shuffledPool.slice(0, 6);
        currentQuestion = 0;
        score = 0;
    }

    function createGameContainer() {
        const gameSection = document.getElementById('kids-colors');
        if (!gameSection) return;

        gameSection.innerHTML = `
            <div class="game-container" style="background: linear-gradient(135deg, #FFE5E5, #FFD5E5); border-radius: 30px; padding: 1.5rem; margin: 2rem 0; border: 4px solid var(--gold);">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 3rem;">🎨</span>
                    <div>
                        <h3 style="color: var(--green); font-size: 1.8rem; margin: 0;">Color Fun!</h3>
                        <p style="color: var(--gray); font-size: 1rem;">Different colors every time!</p>
                    </div>
                </div>
                
                <div id="color-start" style="text-align: center;">
                    <button id="start-color-btn" class="btn btn-primary" style="padding: 0.8rem 2rem;">Start Game →</button>
                </div>
                
                <div id="color-content" style="display: none;"></div>
                <div id="color-email" style="display: none;"></div>
                <div id="color-results" style="display: none;"></div>
            </div>
        `;

        document.getElementById('start-color-btn').addEventListener('click', () => {
            startNewGame();
            startGame();
        });
    }

    function startGame() {
        document.getElementById('color-start').style.display = 'none';
        document.getElementById('color-content').style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        const color = colors[currentQuestion];
        const gameContent = document.getElementById('color-content');
        
        // Shuffle options for this question
        const shuffledOptions = shuffleArray([...colors]);
        
        let optionsHtml = '';
        shuffledOptions.forEach((c, idx) => {
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

        gameContent.innerHTML = `
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
                            showEmailForm();
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

    function showEmailForm() {
        document.getElementById('color-content').style.display = 'none';
        document.getElementById('color-email').style.display = 'block';
        document.getElementById('color-email').innerHTML = `
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 30px;">
                <span style="font-size: 4rem;">🌈</span>
                <h3 style="color: var(--green); font-size: 1.8rem; margin: 0.5rem 0;">Great job!</h3>
                <form id="color-email-form">
                    <input type="email" id="color-email-input" placeholder="parent@email.com" required 
                           style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 30px; margin-bottom: 0.8rem;">
                    <input type="text" id="color-name-input" placeholder="Child's name (optional)" 
                           style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 30px; margin-bottom: 1rem;">
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.8rem;">Get Free Coloring Pages →</button>
                </form>
            </div>
        `;

        document.getElementById('color-email-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('color-email-input').value;
            const childName = document.getElementById('color-name-input').value;
            
            gtag('event', 'kids_color_game_completed', { 'event_category': 'kids', 'value': score });
            showResults(email, childName);
            addToMailerLite(email, childName, score);
        });
    }

    function addToMailerLite(email, childName, score) {
        fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAILERLITE_API_KEY}`
            },
            body: JSON.stringify({
                email: email,
                fields: { name: childName || 'Color Game Parent', child_name: childName || '', game_type: 'Color Game', game_score: score.toString() },
                groups: [KIDS_GROUP_ID],
                status: 'active'
            })
        }).catch(error => console.error('Error:', error));
    }

    function showResults(email, childName) {
        document.getElementById('color-email').style.display = 'none';
        document.getElementById('color-results').style.display = 'block';
        document.getElementById('color-results').innerHTML = `
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 30px;">
                <span style="font-size: 4rem;">🎨</span>
                <h3 style="color: var(--green); font-size: 2.5rem; margin: 0.5rem 0;">${score}/${colors.length}</h3>
                <div style="background: var(--cream); border-radius: 20px; padding: 1rem; margin: 1rem 0;">
                    <p style="font-size: 1rem;">✓ Sent to: ${email}</p>
                </div>
                <button id="color-play-again" class="btn btn-primary" style="padding: 0.8rem 2rem;">Play Again! 🔄</button>
            </div>
        `;

        document.getElementById('color-play-again').addEventListener('click', () => {
            document.getElementById('color-results').style.display = 'none';
            document.getElementById('color-start').style.display = 'block';
        });
    }

    createGameContainer();
});
