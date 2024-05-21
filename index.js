const menu = document.getElementById("menu");

Array.from(document.getElementsByClassName("menu-item"))
    .forEach((item, index) => {
        item.onmouseover = () => {
            menu.dataset.activeIndex = index;
        }
    })

// Step 1: Select all the tool elements
let tools = document.querySelectorAll('.tool');
let popup = document.querySelector('.popup');

popup.addEventListener('click', function () {
    this.style.display = 'none';
    document.body.style.overflow = 'auto';

});

// Step 2: Iterate over the selected elements
tools.forEach(tool => {
    // Step 3: Add a click event listener
    tool.addEventListener('click', function () {
        // Step 4: Identify the tool that was clicked
        let toolName = this.querySelector('img').alt;        
        
        // Step 5: Display an explanation for the clicked tool
        let toolExplanation = getToolExplanation(toolName);
        popup.style.display = 'flex';
        popup.querySelector('p').textContent = toolExplanation;
        popup.querySelector('img').src = this.querySelector('img').src;
        document.body.style.overflow = 'hidden';


    });
});

// Function to return the explanation of a tool
function getToolExplanation(toolName) {
    let explanations = {
        'Angular': 'I use Angular to build web applications with TypeScript, HTML, and CSS.',
        'TypeScript': 'TypeScript helps me write less error-prone code and provides a better development experience.',
        'Python': 'With Python, I build web applications, data analysis tools, and automation scripts.',
        'Tailwind': 'Tailwind allows me to quickly build custom designs without leaving my code.',
        'Firebase': 'Firebase serves as my backend for web applications, providing authentication, databases, and cloud functions.',
        'VSCode': 'I use Visual Studio Code as my primary code editor for writing and debugging code.',
        'Github': 'My code is stored on GitHub, where I can collaborate with others and maintain version control.',
        'Figma': 'I make my designs in Figma, a cloud-based design tool that is great for collaboration.',
        'Photoshop': 'I enjoy using Photoshop to create custom designs and edit photos for my projects.',
        'Notion': 'I organize my tasks, notes, and projects in Notion, a versatile productivity tool.',
    };

    return explanations[toolName] || 'No explanation available.';
}