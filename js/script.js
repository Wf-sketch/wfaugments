document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("warframe-container");

    warframes.forEach(wf => {
        const block = document.createElement("div");
        block.className = "warframe-block";

        block.innerHTML = `
            <img class="warframe-img" src="${wf.image}" alt="${wf.name}">
            <div>
                <div class="warframe-name">${wf.name}</div>
                <ul class="augment-list">
                    ${wf.augments.map(a => `
                        <li class="augment-item"
                            data-tooltip="${a.description}"
                            data-sound="${a.sound}">
                            ${a.name}
                        </li>
                    `).join("")}
                </ul>
            </div>
        `;

        container.appendChild(block);
    });

    document.querySelectorAll('.augment-item').forEach(item => {
        item.addEventListener('mouseenter', function () {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-box';
            tooltip.innerText = this.dataset.tooltip || '';
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + window.scrollX + 'px';
            tooltip.style.top = rect.top + window.scrollY - tooltip.offsetHeight - 10 + 'px';

            this._tooltip = tooltip;

            const soundUrl = this.dataset.sound;
            if (soundUrl) {
                const audio = new Audio(soundUrl);
                audio.volume = 0.5;
                audio.play().catch(() => {});
            }
        });

        item.addEventListener('mouseleave', function () {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
});
