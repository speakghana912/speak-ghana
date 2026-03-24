// Kids Number Game - RANDOM VERSION with Sound Effects & Analytics
document.addEventListener('DOMContentLoaded', function() {
    
    const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjcwN2UyMWMxNmYyMjYyZGZjYTQ4ZWYzNWU0NDY5OGNhNzVkOWQxYTZmNWQ0YjlkNTIwM2JlY2M2NzQ0NWFkMTUyMWRmZjY1ODY3NDU1ZWIiLCJpYXQiOjE3NzM4MzA2ODUuNjQ0NjE3LCJuYmYiOjE3NzM4MzA2ODUuNjQ0NjE5LCJleHAiOjQ5Mjk1MDQyODUuNjM3OTc5LCJzdWIiOiIyMjE3MjQ2Iiwic2NvcGVzIjpbXX0.NukFhsIIW5aLhITNpa08eSMIAi7em6HnFp9Z7xf_9OIbuLaSX9mIxl8MDwgzYMfgh_McPwrChF5qTLsqmB_umHxbSe7H9_e8lkFU9h6wu56X94dFIB8mMm6e7YDqfM_COgyFD8iyp9SufBg9zAsEU84t8sLmXbhU9LkS8Xn8GIu69SOQcyeWyOxfuKTWHDpjSDbJ1aspmieDeOt6fk5ZrFGv7O2JxAe__IKkEdgzbxOMF3THiCy9owYSUGVxpoTXjGs1ULmvhNDDi5izxKkGHU-XYbr8HSGFlye4PY9zs7xX5vhMbS5NOgsFVHRdCf9WRCCGvqSPSl_G_-4_waAua3z8QuiIDEgugyqudefRdM6QyvWp5uRzh7WGH8TmR8VmWG8Vle2yYPpMC-BpWoDDPDEKKgUYCZJG1edHpbA-ECsTF9HvdS4OFS04Igq0BCSOhcW9STA8JZdm4bplPNacLsh7ZQOK7bde-bDSoI2xfU8eb1mntPNgRJadlxCvBYaNOV0q477iJG3kR8nY4Rpq5_vG6JtCsHNFfqR520JrhJW4rvV8Cr2iMN7qMzGheqm2ouqOfvRGV0FDkCsWq_uM3B6BmBCBpF7q_n9YY0c_uQy2JCu6M-gXh4z2XsOiMomCHzZPzpzpO78GGRZ5Te-OFTpXvEFVCjf9Q93BrvD-hVs';
    const KIDS_GROUP_ID = '182277545531541431';

    // Number pool - will randomize which animals appear
    const numberPool = [
        { number: 1, twi: "Baako", emoji: "🐘" },
        { number: 2, twi: "Mmienu", emoji: "🐘" },
        { number: 3, twi: "Mmiɛnsa", emoji: "🐘" },
        { number: 4, twi: "Ɛnan", emoji: "🐘" },
        { number: 5, twi: "Enum", emoji: "🐘" },
        { number: 1, twi: "Baako", emoji: "🐶" },
        { number: 2, twi: "Mmienu", emoji: "🐶" },
        { number: 3, twi: "Mmiɛnsa", emoji: "🐱" },
        { number: 4, twi: "Ɛnan", emoji: "🐔" },
        { number: 5, twi: "Enum", emoji: "🐑" }
    ];

    let numbers = [];
    let currentQuestion = 0;
    let score = 0;
    let gameStarted = false;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startNewGame() {
        // Pick 5 random number questions
        const shuffledPool = shuffleArray([...numberPool]);
        numbers = shuffledPool.slice(0, 5);
        currentQuestion = 0;
        score = 0;
    }

    function createGameContainer() {
        const gameSection = document.getElementById('kids-numbers');
        if (!gameSection) return;

        gameSection.innerHTML = `
            <div class="game-container" style="background: linear-gradient(135deg, #E0F2FE, #BAE6FD); border-radius: 30px; padding: 1.5rem; margin: 2rem 0; border: 4px solid var(--gold);">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 3rem;">🔢</span>
                    <div>
                        <h3 style="color: var(--green); font-size: 1.8rem; margin: 0;">Let's Count!</h3>
                        <p style="color: var(--gray); font-size: 1rem;">Different animals every time!</p>
                    </div>
                </div>
                
                <div id="number-start" style="text-align: center;">
                    <button id="start-number-btn" class="btn btn-primary" style="padding: 0.8rem 2rem;">Start Counting →</button>
                </div>
                
                <div id="number-content" style="display: none;"></div>
                <div id="number-email" style="display: none;"></div>
                <div id="number-results" style="display: none;"></div>
            </div>
        `;

        document.getElementById('start-number-btn').addEventListener('click', () => {
            startNewGame();
            startGame();
        });
    }

    function startGame() {
        document.getElementById('number-start').style.display = 'none';
        document.getElementById('number-content').style.display = 'block';
        
        // Track game start
        gtag('event', 'game_start', {
            'event_category': 'engagement',
            'event_label': 'kids_number_game'
        });
        
        gameStarted = true;
        showQuestion();
    }

    function showQuestion() {
        const num = numbers[currentQuestion];
        const gameContent = document.getElementById('number-content');
        
        // Create animal string
        const animals = num.emoji.repeat(num.number);
        
        // Shuffle number options
        const numberOptions = [
            { number: 1, twi: "Baako" },
            { number: 2, twi: "Mmienu" },
            { number: 3, twi: "Mmiɛnsa" },
            { number: 4, twi: "Ɛnan" },
            { number: 5, twi: "Enum" }
        ];
        const shuffledNumbers = shuffleArray([...numberOptions]);
        
        let optionsHtml = '';
        shuffledNumbers.forEach((n) => {
            optionsHtml += `
                <div style="margin: 0.5rem 0;">
                    <button class="number-option" data-number="${n.number}" style="width: 100%; padding: 1rem; border-radius: 30px; border: 2px solid white; background: var(--cream); font-size: 1.3rem; font-weight: bold; color: var(--green); cursor: pointer; transition: all 0.2s;"
                            onmouseover="this.style.transform='scale(1.02)'; this.style.background='white';" 
                            onmouseout="this.style.transform='scale(1)'; this.style.background='var(--cream)';">
                        ${n.number} → ${n.twi}
                    </button>
                </div>
            `;
        });

        gameContent.innerHTML = `
            <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <div style="background: white; height: 8px; border-radius: 10px; flex-grow: 1; overflow: hidden; border: 1px solid var(--gold);">
                        <div style="background: var(--green); width: ${(currentQuestion / numbers.length) * 100}%; height: 100%;"></div>
                    </div>
                    <span style="font-size: 0.9rem; background: white; padding: 0.2rem 0.8rem; border-radius: 20px; border: 1px solid var(--gold);">
                        ${currentQuestion + 1}/${numbers.length}
                    </span>
                </div>
                
                <div style="background: white; border-radius: 20px; padding: 1.5rem; margin-bottom: 1rem; text-align: center; position: sticky; top: 0; z-index: 10; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <div style="font-size: 3rem; letter-spacing: 0.5rem; margin-bottom: 0.5rem;">${animals}</div>
                    <h4 style="font-size: 1.3rem; color: var(--green); margin: 0;">How many animals?</h4>
                </div>
                
                <div style="max-height: 300px; overflow-y: auto; padding-right: 0.3rem;">
                    ${optionsHtml}
                </div>
            </div>
        `;

        document.querySelectorAll('.number-option').forEach(btn => {
            btn.addEventListener('click', function() {
                const selectedNumber = parseInt(this.dataset.number);
                
                if (selectedNumber === num.number) {
                    score++;
                    if (window.SoundEffects) SoundEffects.correct();
                    this.style.background = 'var(--green)';
                    this.style.color = 'white';
                    this.textContent = '✓ Correct! ✓';
                    
                    setTimeout(() => {
                        if (currentQuestion < numbers.length - 1) {
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
        document.getElementById('number-content').style.display = 'none';
        document.getElementById('number-email').style.display = 'block';
        document.getElementById('number-email').innerHTML = `
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 30px;">
                <span style="font-size: 4rem;">🎉</span>
                <h3 style="color: var(--green); font-size: 1.8rem; margin: 0.5rem 0;">Great counting!</h3>
                <p style="font-size: 1rem; margin-bottom: 1rem;">⭐ ${score} out of ${numbers.length} correct!</p>
                <p style="font-size: 0.9rem; margin-bottom: 1rem;">🎯 ${Math.round((score / numbers.length) * 100)}% accuracy!</p>
                <form id="number-email-form">
                    <input type="email" id="number-email-input" placeholder="parent@email.com" required 
                           style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 30px; margin-bottom: 0.8rem;">
                    <input type="text" id="number-name-input" placeholder="Child's name (optional)" 
                           style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 30px; margin-bottom: 1rem;">
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.8rem;">Get Free Worksheets →</button>
                </form>
            </div>
        `;

        document.getElementById('number-email-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('number-email-input').value;
            const childName = document.getElementById('number-name-input').value;
            
            // Track game completion
            gtag('event', 'game_complete', {
                'event_category': 'engagement',
                'event_label': 'kids_number_game',
                'score': score,
                'total': numbers.length,
                'percentage': Math.round((score / numbers.length) * 100)
            });
            
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
        document.getElementById('number-email').style.display = 'none';
        document.getElementById('number-results').style.display = 'block';
        document.getElementById('number-results').innerHTML = `
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 30px;">
                <span style="font-size: 4rem;">🔢</span>
                <h3 style="color: var(--green); font-size: 2.5rem; margin: 0.5rem 0;">${score}/${numbers.length}</h3>
                <div style="background: var(--cream); border-radius: 20px; padding: 1rem; margin: 1rem 0;">
                    <p style="font-size: 1rem;">✓ Free worksheets sent to: ${email}</p>
                    <p style="font-size: 0.9rem; color: var(--gray); margin-top: 0.5rem;">Check your inbox for more Twi counting fun!</p>
                </div>
                <button id="number-play-again" class="btn btn-primary" style="padding: 0.8rem 2rem;">Play Again! 🔄</button>
            </div>
        `;

        document.getElementById('number-play-again').addEventListener('click', () => {
            document.getElementById('number-results').style.display = 'none';
            document.getElementById('number-start').style.display = 'block';
            
            // Track game restart
            gtag('event', 'game_restart', {
                'event_category': 'engagement',
                'event_label': 'kids_number_game'
            });
        });
    }

    createGameContainer();
});
