const menu = document.getElementById("menu");

Array.from(document.getElementsByClassName("menu-item"))
  .forEach((item, index) => {
    item.onmouseover = () => {
      menu.dataset.activeIndex = index;
    }
  })

let tools = document.querySelectorAll('.tool');
let popup = document.querySelector('.popup');

popup.addEventListener('click', function () {
  this.style.display = 'none';
  document.body.style.overflow = 'auto';
  scrollFunction()
});

tools.forEach(tool => {
  tool.addEventListener('click', function () {
    let toolName = this.querySelector('img').alt;
    let toolExplanation = getToolExplanation(toolName);
    popup.style.display = 'flex';
    popup.querySelector('p').textContent = toolExplanation;
    popup.querySelector('img').src = this.querySelector('img').src;
    popup.querySelector('img').alt = toolName;
    document.body.style.overflow = 'hidden';
    mybutton.style.display = "none";
  });
});

// Function to return the explanation of a tool
function getToolExplanation(toolName) {
  let explanations = {
    'Angular': 'I use Angular to build web applications with TypeScript, HTML, and CSS.',
    'TypeScript': 'TypeScript helps me write less error-prone code and provides a better development experience.',
    'Python': 'With Python, I build the backend for web applications, data analysis tools, and automation scripts.',
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

let popupProj = document.querySelector('.popupProj');
let projects = document.querySelectorAll('.project');

popupProj.addEventListener('click', function () {
  this.style.display = 'none';
  document.body.style.overflow = 'auto';
  scrollFunction()
});

projects.forEach(project => {
  project.addEventListener('click', function () {
    let projectName = this.querySelector('img').alt;
    let projectExplanation = getProjectExplanation(projectName);
    popupProj.style.display = 'flex';
    popupProj.querySelector('p').textContent = projectExplanation;
    popupProj.querySelector('img').src = this.querySelector('img').src;
    popupProj.querySelector('img').alt = projectName;
    document.body.style.overflow = 'hidden';
    mybutton.style.display = "none";
  });
});

function getProjectExplanation(projectName) {
  let explanations = {
    'UJIERT_03': 'This is the bike I worked on in a team of 9 people. I was responsible for the telemetry and the design of the bike. We competed in the MotoStudent competition in 2023.',
    'Telemetría UJIERT': 'As head of the telemetry department, I developed the telemetry to help improve the bike\'s performance. We used the data to make decisions on the bike\'s design and performance.',
    'Paneles solares': 'I use my drone to record videos of solar panels for Magnetis Ingeniería. This footage is used to show the client the state of the panels and to detect any possible damage.',
    'Unity Game': 'During university, I developed a platform videogame with Unity where the character can control gravity and uses it to move around and solve various puzzles.',
  };
  return explanations[projectName] || 'No explanation available.';
}

var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
