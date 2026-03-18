// Kids Memory Game - COMPACT VERSION
// ID: kids-memory

document.addEventListener('DOMContentLoaded', function() {
    
    const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjcwN2UyMWMxNmYyMjYyZGZjYTQ4ZWYzNWU0NDY5OGNhNzVkOWQxYTZmNWQ0YjlkNTIwM2JlY2M2NzQ0NWFkMTUyMWRmZjY1ODY3NDU1ZWIiLCJpYXQiOjE3NzM4MzA2ODUuNjQ0NjE3LCJuYmYiOjE3NzM4MzA2ODUuNjQ0NjE5LCJleHAiOjQ5Mjk1MDQyODUuNjM3OTc5LCJzdWIiOiIyMjE3MjQ2Iiwic2NvcGVzIjpbXX0.NukFhsIIW5aLhITNpa08eSMIAi7em6HnFp9Z7xf_9OIbuLaSX9mIxl8MDwgzYMfgh_McPwrChF5qTLsqmB_umHxbSe7H9_e8lkFU9h6wu56X94dFIB8mMm6e7YDqfM_COgyFD8iyp9SufBg9zAsEU84t8sLmXbhU9LkS8Xn8GIu69SOQcyeWyOxfuKTWHDpjSDbJ1aspmieDeOt6fk5ZrFGv7O2JxAe__IKkEdgzbxOMF3THiCy9owYSUGVxpoTXjGs1ULmvhNDDi5izxKkGHU-XYbr8HSGFlye4PY9zs7xX5vhMbS5NOgsFVHRdCf9WRCCGvqSPSl_G_-4_waAua3z8QuiIDEgugyqudefRdM6QyvWp5uRzh7WGH8TmR8VmWG8Vle2yYPpMC-BpWoDDPDEKKgUYCZJG1edHpbA-ECsTF9HvdS4OFS04Igq0BCSOhcW9STA8JZdm4bplPNacLsh7ZQOK7bde-bDSoI2xfU8eb1mntPNgRJadlxCvBYaNOV0q477iJG3kR8nY4Rpq5_vG6JtCsHNFfqR520JrhJW4rvV8Cr2iMN7qMzGheqm2ouqOfvRGV0FDkCsWq_uM3B6BmBCBpF7q_n9YY0c_uQy2JCu6M-gXh4z2XsOiMomCHzZPzpzpO78GGRZ5Te-OFTpXvEFVCjf9Q93BrvD-hVs';
    const KIDS_GROUP_ID = '182277545531541431';

    const allAnimals = [
        { emoji: "🐶", twi: "kraman" },
        { emoji: "🐱", twi: "agyinamoa" },
        { emoji: "🐔", twi: "akokɔ" },
        { emoji: "🐮", twi: "nantwie" },
        { emoji: "🐑", twi: "odwan" },
        { emoji: "🐘", twi: "sonono" }
    ];

    let currentRound = 0;
    let score = 0;
    const totalRounds = 5;
    let currentAnimals = [];

    function createGameContainer() {
        const gameSection = document.getElementById('kids-memory');
        if (!gameSection) {
            console.log('kids-memory element not found');
            return;
        }

        gameSection.innerHTML = `
            <div class="game-container" style="background: linear-gradient(135deg, #FCE7F3, #FBCFE8); border-radius: 30px; padding: 1.5rem; margin: 2rem 0; border: 4px solid var(--gold);">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 3rem;">🧠</span>
                    <div>
                        <h3 style="color: var(--green); font-size: 1.8rem; margin: 0;">Memory Challenge!</h3>
                        <p style="color: var(--gray); font-size: 1rem;">Which animal is missing?</p>
                    </div>
                </div>
                
                <div id="memory-start" style="text-align: center;">
                    <button id="start-memory-btn" class="btn btn-primary" style="padding: 0.8rem 2rem;">Start Game →</button>
                </div>
                
                <div id="memory-content" style="display: none;"></div>
                <div id="memory-email" style="display: none;"></div>
                <div id="memory-results" style="display: none;"></div>
            </div>
        `;

        document.getElementById('start-memory-btn').addEventListener('click', startGame);
    }

    function startGame() {
        currentRound = 0;
        score = 0;
        
        document.getElementById('memory-start').style.display = 'none';
        document.getElementById('memory-content').style.display = 'block';
        
        nextRound();
    }

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

        showRound(displayedAnimals, missingAnimal);
    }

    function showRound(displayed, missing) {
        const gameContent = document.getElementById('memory-content');
        
        // Create animals display
        let animalsHtml = '';
        displayed.forEach(animal => {
            animalsHtml += `
                <span style="font-size: 3rem; margin: 0 0.3rem;">${animal.emoji}</span>
            `;
        });

        // Create options (including the missing one)
        let optionsHtml = '';
        const options = [missing, ...displayed].sort(() => 0.5 - Math.random());
        
        options.forEach((animal) => {
            optionsHtml += `
                <div style="margin: 0.5rem 0;">
                    <button class="memory-option" data-twi="${animal.twi}" style="width: 100%; padding: 1rem; border-radius: 30px; border: 2px solid white; background: var(--cream); font-size: 1.3rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 1rem;"
                            onmouseover="this.style.transform='scale(1.02)'; this.style.background='white';" 
                            onmouseout="this.style.transform='scale(1)'; this.style.background='var(--cream)';">
                        <span style="font-size: 2rem;">${animal.emoji}</span>
                        <span style="color: var(--green);">${animal.twi}</span>
                    </button>
                </div>
            `;
        });

        gameContent.innerHTML = `
            <div>
                <!-- Progress bar -->
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <div style="background: white; height: 8px; border-radius: 10px; flex-grow: 1; overflow: hidden; border: 1px solid var(--gold
