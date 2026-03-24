// sound-effects.js - Web Audio API version
// Creates sounds using browser's built-in audio synthesis
// No external files needed - works immediately!

window.SoundEffects = {
    audioContext: null,
    isInitialized: false,
    
    // Initialize audio context (must be triggered by user interaction)
    init: function() {
        if (this.isInitialized) return;
        
        try {
            // Create audio context (suspended initially)
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.isInitialized = true;
            console.log('Sound Effects initialized');
        } catch (e) {
            console.log('Web Audio API not supported in this browser');
            this.isInitialized = false;
        }
    },
    
    // Resume audio context (required for browsers like Chrome)
    resume: function() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    },
    
    // Play correct answer sound - cheerful ding!
    correct: function() {
        this.init();
        this.resume();
        if (!this.audioContext) return;
        
        try {
            const now = this.audioContext.currentTime;
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Two-note ascending melody for correct answer
            oscillator.frequency.value = 523.25; // C5
            
            gainNode.gain.setValueAtTime(0.3, now);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
            
            oscillator.start();
            oscillator.stop(now + 0.4);
            
            // Add a second note for extra cheer
            setTimeout(() => {
                if (this.audioContext) {
                    const osc2 = this.audioContext.createOscillator();
                    const gain2 = this.audioContext.createGain();
                    osc2.connect(gain2);
                    gain2.connect(this.audioContext.destination);
                    osc2.frequency.value = 659.25; // E5
                    gain2.gain.setValueAtTime(0.3, 0);
                    gain2.gain.exponentialRampToValueAtTime(0.0001, 0.3);
                    osc2.start();
                    osc2.stop(0.3);
                }
            }, 150);
        } catch (e) {
            console.log('Error playing correct sound:', e);
        }
    },
    
    // Play wrong answer sound - gentle buzz
    wrong: function() {
        this.init();
        this.resume();
        if (!this.audioContext) return;
        
        try {
            const now = this.audioContext.currentTime;
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = 'sawtooth'; // Buzzing sound
            oscillator.frequency.value = 220; // A3
            
            gainNode.gain.setValueAtTime(0.2, now);
            gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
            
            oscillator.start();
            oscillator.stop(now + 0.3);
        } catch (e) {
            console.log('Error playing wrong sound:', e);
        }
    },
    
    // Play celebration sound - cheerful little melody!
    cheer: function() {
        this.init();
        this.resume();
        if (!this.audioContext) return;
        
        try {
            // Play a happy little melody: C-E-G-C
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, i) => {
                setTimeout(() => {
                    if (this.audioContext) {
                        const now = this.audioContext.currentTime;
                        const oscillator = this.audioContext.createOscillator();
                        const gainNode = this.audioContext.createGain();
                        
                        oscillator.connect(gainNode);
                        gainNode.connect(this.audioContext.destination);
                        
                        oscillator.frequency.value = freq;
                        gainNode.gain.setValueAtTime(0.25, now);
                        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
                        
                        oscillator.start();
                        oscillator.stop(now + 0.5);
                    }
                }, i * 180);
            });
            
            // Add a little "ding" at the end
            setTimeout(() => {
                if (this.audioContext) {
                    const now = this.audioContext.currentTime;
                    const oscillator = this.audioContext.createOscillator();
                    const gainNode = this.audioContext.createGain();
                    oscillator.connect(gainNode);
                    gainNode.connect(this.audioContext.destination);
                    oscillator.frequency.value = 1318.51; // E6
                    gainNode.gain.setValueAtTime(0.2, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
                    oscillator.start();
                    oscillator.stop(now + 0.3);
                }
            }, 720);
        } catch (e) {
            console.log('Error playing cheer sound:', e);
        }
    }
};

// Auto-initialize when page loads (but audio won't play until user clicks first)
document.addEventListener('DOMContentLoaded', function() {
    window.SoundEffects.init();
    
    // Resume audio on first user interaction (browser policy requirement)
    const resumeAudio = function() {
        window.SoundEffects.resume();
        document.removeEventListener('click', resumeAudio);
        document.removeEventListener('touchstart', resumeAudio);
    };
    document.addEventListener('click', resumeAudio);
    document.addEventListener('touchstart', resumeAudio);
});

// Helper function to test sounds (remove after testing)
window.testSoundEffects = function() {
    console.log('Testing sounds...');
    setTimeout(() => window.SoundEffects.correct(), 100);
    setTimeout(() => window.SoundEffects.wrong(), 800);
    setTimeout(() => window.SoundEffects.cheer(), 1500);
};