// Kids Number Game - COMPACT VERSION
document.addEventListener('DOMContentLoaded', function() {
    
    const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjcwN2UyMWMxNmYyMjYyZGZjYTQ4ZWYzNWU0NDY5OGNhNzVkOWQxYTZmNWQ0YjlkNTIwM2JlY2M2NzQ0NWFkMTUyMWRmZjY1ODY3NDU1ZWIiLCJpYXQiOjE3NzM4MzA2ODUuNjQ0NjE3LCJuYmYiOjE3NzM4MzA2ODUuNjQ0NjE5LCJleHAiOjQ5Mjk1MDQyODUuNjM3OTc5LCJzdWIiOiIyMjE3MjQ2Iiwic2NvcGVzIjpbXX0.NukFhsIIW5aLhITNpa08eSMIAi7em6HnFp9Z7xf_9OIbuLaSX9mIxl8MDwgzYMfgh_McPwrChF5qTLsqmB_umHxbSe7H9_e8lkFU9h6wu56X94dFIB8mMm6e7YDqfM_COgyFD8iyp9SufBg9zAsEU84t8sLmXbhU9LkS8Xn8GIu69SOQcyeWyOxfuKTWHDpjSDbJ1aspmieDeOt6fk5ZrFGv7O2JxAe__IKkEdgzbxOMF3THiCy9owYSUGVxpoTXjGs1ULmvhNDDi5izxKkGHU-XYbr8HSGFlye4PY9zs7xX5vhMbS5NOgsFVHRdCf9WRCCGvqSPSl_G_-4_waAua3z8QuiIDEgugyqudefRdM6QyvWp5uRzh7WGH8TmR8VmWG8Vle2yYPpMC-BpWoDDPDEKKgUYCZJG1edHpbA-ECsTF9HvdS4OFS04Igq0BCSOhcW9STA8JZdm4bplPNacLsh7ZQOK7bde-bDSoI2xfU8eb1mntPNgRJadlxCvBYaNOV0q477iJG3kR8nY4Rpq5_vG6JtCsHNFfqR520JrhJW4rvV8Cr2iMN7qMzGheqm2ouqOfvRGV0FDkCsWq_uM3B6BmBCBpF7q_n9YY0c_uQy2JCu6M-gXh4z2XsOiMomCHzZPzpzpO78GGRZ5Te-OFTpXvEFVCjf9Q93BrvD-hVs';
    const KIDS_GROUP_ID = '182277545531541431';

    const numbers = [
        { number: 1, twi: "Baako", animals: "🐘" },
        { number: 2, twi: "Mmienu", animals: "🐘🐘" },
        { number: 3, twi: "Mmiɛnsa", animals: "🐘🐘🐘" },
        { number: 4, twi: "Mnan", animals: "🐘🐘🐘🐘" },
        { number: 5, twi: "Enum", animals: "🐘🐘🐘🐘🐘" }
    ];

    let currentQuestion = 0;
    let score = 0;

    function createGameContainer() {
        const gameSection = document.getElementById('kids-numbers');
        if (!gameSection) return;

        gameSection.innerHTML = `
            <div style="background: linear-gradient(135deg, #E0F2FE, #BAE6FD); border-radius: 30px; padding: 1.5rem; margin: 2rem 0; border: 4px solid var(--gold);">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 3rem;">🔢</span>
                    <div>
                        <h3 style="color: var(--green); font-size: 1.8rem; margin: 0;">Let's Count!</h3>
                        <p style="color: var(--gray); font-size: 1rem;">Numbers 1-5</p>
                    </div>
                </div>
                
                <div id="game-start" style="text-align: center;">
                    <button id="start-game-btn" class="btn btn-primary" style="padding: 0.8rem 2rem;">Start →</button>
                </div>
                
                <div id="game-content" style="display: none;"></div>
                <div id="game-email" style="display: none;"></div>
                <div id="game-results" style="display: none;"></div>
            </div>
        `;

        document.getElementById('start-game-btn').addEventListener('click', startGame);
    }

    function startGame() {
        currentQuestion = 0;
        score = 0;
        document.getElementById('game-start').style.display = 'none';
        document.getElementById('game-content').style.display = 'block';
        showQuestion();
    }

    function showQuestion() {
        const num = numbers[currentQuestion];
        
        let optionsHtml = '';
        numbers.forEach((n, index) => {
            optionsHtml += `
                <button class="number-option" data-number="${n.number}" style="width: 100%; padding: 0.8rem; margin: 0.3rem 0; border-radius: 30px; border: 2px solid white; background: var(--cream); font-size: 1.2rem; color: var(--green); cursor: pointer;">
                    ${n.number} → ${n.twi}
                </button>
            `;
        });

        document.getElementById('game-content').innerHTML = `
            <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <div style="background: white; height: 8px; border-radius: 10px; flex-grow: 1; border: 1px solid var(--gold);">
                        <div style="background: var(--green); width: ${(currentQuestion / numbers.length) * 100}%; height: 100%;"></div>
                    </div>
                    <span style="font-size: 0.9rem; background: white; padding: 0.2rem 0.8rem; border-radius: 20px;">${currentQuestion + 1}/${numbers.length}</span>
                </div>
                
                <div style="background: white; border-radius: 20px; padding: 1rem; margin-bottom: 1rem; text-align: center; position: sticky; top: 0; z-index: 10;">
                    <div style="font-size: 2rem; letter-spacing: 0.5rem;">${num.animals}</div>
                    <h4 style="font-size: 1.3rem; color: var(--green); margin: 0.3rem 0 0;">How many?</h4>
                </div>
                
                <div style="max-height: 300px; overflow-y: auto;">
                    ${optionsHtml}
                </div>
            </div>
        `;

        document.querySelectorAll('.number-option').forEach(btn => {
            btn.addEventListener('click', function() {
                if (parseInt(this.dataset.number) === num.number) {
                    score++;
                    this.style.background = 'var(--green)';
                    this.style.color = 'white';
                    this.textContent = '✓ Correct!';
                    
                    setTimeout(() => {
                        if (currentQuestion < numbers.length - 1) {
                            currentQuestion++;
                            showQuestion();
                        } else {
                            showEmailForm();
                        }
                    }, 800);
                }
            });
        });
    }

    function showEmailForm() {
        document.getElementById('game-content').style.display = 'none';
        document.getElementById('game-email').style.display = 'block';
        document.getElementById('game-email').innerHTML = `
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 30px;">
                <span style="font-size: 3rem;">🎉</span>
                <h3 style="color: var(--green); font-size: 1.8rem; margin: 0.5rem 0;">Great counting!</h3>
                <form id="game-email-form">
                    <input type="email" id="game-email-input" placeholder="parent@email.com" required 
                           style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 30px; margin-bottom: 0.8rem;">
                    <input type="text" id="game-name-input" placeholder="Child's name (optional)" 
                           style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 30px; margin-bottom: 1rem;">
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.8rem;">Get Worksheets →</button>
                </form>
            </div>
        `;

        document.getElementById('game-email-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('game-email-input').value;
            const childName = document.getElementById('game-name-input').value;
            
            gtag('event', 'kids_number_game_completed', { 'event_category': 'kids', 'value': score });
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
                fields: { name: childName || 'Number Game Parent', child_name: childName || '', game_type: 'Number Game', game_score: score.toString() },
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
                <span style="font-size: 3rem;">🔢</span>
                <h3 style="color: var(--green); font-size: 1.8rem; margin: 0.5rem 0;">${score}/${numbers.length}</h3>
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
