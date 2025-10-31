document.addEventListener('DOMContentLoaded', () => {
    const totalSupplyElement = document.createElement('span');
    const circulatingSupplyElement = document.createElement('span');

    const tokenomicsSection = document.querySelector('#tokenomics');
    const quickStatsContainer = document.createElement('div');
    quickStatsContainer.classList.add('quick-stats');

    const totalSupplyStat = document.createElement('div');
    totalSupplyStat.innerHTML = '<strong>Total Supply:</strong> 9137';

    const circulatingSupplyStat = document.createElement('div');
    circulatingSupplyStat.innerHTML = '<strong>Circulating Supply:</strong> '; circulatingSupplyStat.appendChild(circulatingSupplyElement);

    quickStatsContainer.appendChild(totalSupplyStat);
    quickStatsContainer.appendChild(circulatingSupplyStat);

    tokenomicsSection.insertBefore(quickStatsContainer, tokenomicsSection.firstChild);

    fetch('https://api.multiversx.com/tokens/NIX-de14cc/supply')
        .then(response => response.json())
        .then(data => {
            const circulatingSupply = (Number(data.circulatingSupply) / Math.pow(10, 18)).toFixed(0);
            circulatingSupplyElement.textContent = circulatingSupply;
        })
        .catch(error => {
            console.error('Error fetching circulating supply:', error);
            circulatingSupplyElement.textContent = 'Error';
        });

    const hero = document.querySelector('.hero h1');
    const originalText = hero.textContent;
    const chars = '!<>-_\/[]{}—=+*^?#________';

    hero.addEventListener('mouseover', () => {
        let iterations = 0;
        const interval = setInterval(() => {
            hero.textContent = originalText.split('')
                .map((letter, index) => {
                    if(index < iterations) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if(iterations >= originalText.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30);
    });
});
