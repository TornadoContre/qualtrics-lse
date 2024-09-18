document.addEventListener('DOMContentLoaded', (event) => {
    const slider = document.getElementById('myRange');
    const output = document.getElementById('sliderValue');

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = 'hola';
    document.body.appendChild(tooltip);

    // Set initial value
    output.textContent = slider.value;

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        output.textContent = this.value;

        // Position the tooltip
        const sliderRect = slider.getBoundingClientRect();
        const handlePosition = ((this.value - this.min) / (this.max - this.min)) * sliderRect.width;
        tooltip.style.left = `10px`;
        tooltip.style.top = `10px`;
    };

    slider.onmouseover = function() {
        tooltip.style.opacity = '1';
    };

    slider.onmouseout = function() {
        tooltip.style.opacity = '0';
    };
});