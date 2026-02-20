const revealBtn = document.getElementById('revealBtn');
const container = document.getElementById('container');
const gothicPhase = document.getElementById('gothicPhase');
const cherryPhase = document.getElementById('cherryPhase');
const fireworksContainer = document.getElementById('fireworksContainer');
const blossomsBg = document.getElementById('blossomsBg');

let hasRevealed = false;

revealBtn.addEventListener('click', () => {
    if (hasRevealed) return;
    hasRevealed = true;

    revealBtn.disabled = true;
    revealBtn.style.opacity = '0.5';

    // Create fireworks explosion
    createFireworks();

    // Hide gothic phase after a short delay
    setTimeout(() => {
        gothicPhase.classList.add('hidden');
        cherryPhase.classList.remove('hidden');
        createCherryBlossoms();
    }, 1000);
});

function createFireworks() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 5 + Math.random() * 10;
        const endX = centerX + Math.cos(angle) * velocity * 50;
        const endY = centerY + Math.sin(angle) * velocity * 50;

        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = (3 + Math.random() * 6) + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = getRandomBlossomColor();
        particle.style.setProperty('--endX', (endX - centerX) + 'px');
        particle.style.setProperty('--endY', (endY - centerY) + 'px');

        fireworksContainer.appendChild(particle);

        // Animate particle
        particle.style.animation = `explode 1.5s ease-out forwards`;
        particle.style.setProperty('--x', (endX - centerX) + 'px');
        particle.style.setProperty('--y', (endY - centerY) + 'px');

        setTimeout(() => {
            particle.remove();
        }, 1500);
    }
}

function createCherryBlossoms() {
    const blossomCount = 40;

    for (let i = 0; i < blossomCount; i++) {
        const blossom = document.createElement('div');
        blossom.className = 'blossom';
        blossom.style.left = Math.random() * 100 + '%';
        blossom.style.top = -20 + 'px';
        blossom.style.animationDelay = (Math.random() * 4) + 's';
        blossom.style.animationDuration = (5 + Math.random() * 3) + 's';
        blossom.style.background = getRandomBlossomColor();

        blossomsBg.appendChild(blossom);
    }

    // Continuously add new blossoms
    setInterval(() => {
        if (cherryPhase.classList.contains('hidden')) return;

        const blossom = document.createElement('div');
        blossom.className = 'blossom';
        blossom.style.left = Math.random() * 100 + '%';
        blossom.style.top = -20 + 'px';
        blossom.style.animationDuration = (5 + Math.random() * 3) + 's';
        blossom.style.background = getRandomBlossomColor();

        blossomsBg.appendChild(blossom);

        setTimeout(() => {
            blossom.remove();
        }, 8000);
    }, 300);
}

function getRandomBlossomColor() {
    const colors = [
        '#ffb7c5',  // light pink
        '#ff69b4',  // hot pink
        '#ffb6d9',  // pale pink
        '#ffc0cb',  // pink
        '#ff1493',  // deep pink
        '#ffffff',  // white
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Update particle animation with CSS custom properties
const style = document.createElement('style');
style.textContent = `
    @keyframes explode {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--x), var(--y)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
