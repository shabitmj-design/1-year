const revealBtn = document.getElementById('revealBtn');
const container = document.getElementById('container');
const gothicPhase = document.getElementById('gothicPhase');
const cherryPhase = document.getElementById('cherryPhase');
const fireworksContainer = document.getElementById('fireworksContainer');
const blossomsBg = document.getElementById('blossomsBg');
const letterContainer = document.getElementById('letterContainer');

let hasRevealed = false;

// Add atmospheric particles to gothic page
function createGothicParticles() {
    const particleBg = document.getElementById('particleBg');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.1})`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.borderRadius = '50%';
        particle.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        particleBg.appendChild(particle);
    }
}

// Add CSS animation for particles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes twinkle {
        0%, 100% {
            opacity: 0.2;
        }
        50% {
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(particleStyle);

createGothicParticles();

revealBtn.addEventListener('click', () => {
    if (hasRevealed) return;
    hasRevealed = true;

    revealBtn.disabled = true;
    revealBtn.style.pointerEvents = 'none';

    // Create fireworks explosion
    createFireworks();

    // Hide gothic phase and show cherry phase
    setTimeout(() => {
        gothicPhase.classList.add('hidden');
        cherryPhase.classList.remove('hidden');
        createCherryBlossoms();
    }, 1000);
});

function createFireworks() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const particleCount = 120;

    for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 5 + Math.random() * 12;
        const endX = centerX + Math.cos(angle) * velocity * 60;
        const endY = centerY + Math.sin(angle) * velocity * 60;

        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = (2 + Math.random() * 8) + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = getRandomBlossomColor();
        particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${particle.style.background}`;

        fireworksContainer.appendChild(particle);

        // Animate particle
        particle.style.setProperty('--x', (endX - centerX) + 'px');
        particle.style.setProperty('--y', (endY - centerY) + 'px');
        particle.style.animation = `explode ${1.5 + Math.random() * 0.5}s ease-out forwards`;

        setTimeout(() => {
            particle.remove();
        }, 2000);
    }
}

function createCherryBlossoms() {
    const blossomCount = 50;

    for (let i = 0; i < blossomCount; i++) {
        const blossom = document.createElement('div');
        blossom.className = 'blossom';
        blossom.style.left = Math.random() * 100 + '%';
        blossom.style.top = -30 + 'px';
        blossom.style.animationDelay = (Math.random() * 5) + 's';
        blossom.style.animationDuration = (6 + Math.random() * 4) + 's';
        blossom.style.background = getRandomBlossomColor();

        blossomsBg.appendChild(blossom);
    }

    // Continuously add new blossoms
    const blossomInterval = setInterval(() => {
        if (cherryPhase.classList.contains('hidden')) {
            clearInterval(blossomInterval);
            return;
        }

        const blossom = document.createElement('div');
        blossom.className = 'blossom';
        blossom.style.left = Math.random() * 100 + '%';
        blossom.style.top = -30 + 'px';
        blossom.style.animationDuration = (6 + Math.random() * 4) + 's';
        blossom.style.background = getRandomBlossomColor();

        blossomsBg.appendChild(blossom);

        setTimeout(() => {
            blossom.remove();
        }, 10000);
    }, 400);
}

function getRandomBlossomColor() {
    const colors = [
        '#ffb7c5',  // light pink
        '#ff69b4',  // hot pink
        '#ffb6d9',  // pale pink
        '#ffc0cb',  // pink
        '#ff1493',  // deep pink
        '#ffffff',  // white (for highlights)
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Update particle animation with CSS custom properties
const explodeStyle = document.createElement('style');
explodeStyle.textContent = `
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
document.head.appendChild(explodeStyle);
