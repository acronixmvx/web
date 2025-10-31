// Fetch circulating supply
async function fetchCirculatingSupply() {
    try {
        const response = await fetch('https://api.multiversx.com/tokens/NIX-de14cc/supply');
        const data = await response.json();
        const circulatingSupply = parseFloat(data.circulatingSupply).toLocaleString();
        document.getElementById('circulating-supply').textContent = circulatingSupply;
    } catch (error) {
        console.error('Error fetching circulating supply:', error);
        document.getElementById('circulating-supply').textContent = 'N/A';
    }
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Add animate class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .section {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .section.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Typing effect for terminal
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

const terminalLines = [
    '> Initializing $NIX protocol...',
    '> Supply locked: 9137 tokens',
    '> Community governance active',
    '> Buyback engine online',
    '> System ready_'
];

let lineIndex = 0;
function animateTerminal() {
    if (lineIndex < terminalLines.length) {
        const p = document.createElement('p');
        document.querySelector('.terminal-body').appendChild(p);
        typeWriter(p, terminalLines[lineIndex]);
        lineIndex++;
        setTimeout(animateTerminal, 2000);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchCirculatingSupply();
    setTimeout(animateTerminal, 1000);
});