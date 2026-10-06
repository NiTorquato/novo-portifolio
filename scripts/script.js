// scripts/script.js

// --- 1. Dark/Light Mode Toggle (Troca de Tema) ---
const checkbox = document.getElementById('checkbox');
const root = document.documentElement; // Elemento raiz (<html>) para variáveis CSS

// Variáveis para o Modo Claro (Light Mode)
const lightThemeVars = {
    '--color-primary': '#466a2a',
    '--color-secondary': '#c75b43',
    '--color-background-dark': '#f3f2eb',
    '--color-background-card': '#e8e9df',
    '--color-text-light': '#182018',
    '--color-text-muted': '#5c665b',
    '--color-border': '#cbd1c4',
};

// Variáveis para o Modo Escuro (Dark Mode) - AGORA MAIS AZUL
const darkThemeVars = {
    '--color-primary': '#c7f36b',
    '--color-secondary': '#ff8a72',
    '--color-background-dark': '#111612',
    '--color-background-card': '#1a211b',
    '--color-text-light': '#f4f3eb',
    '--color-text-muted': '#b4beb3',
    '--color-border': '#354236',
};

// Função para aplicar o tema e salvar a preferência
function applyTheme(isLight) {
    const vars = isLight ? lightThemeVars : darkThemeVars;
    for (const [key, value] of Object.entries(vars)) {
        root.style.setProperty(key, value);
    }
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Carregar o tema salvo na inicialização
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        checkbox.checked = true;
        applyTheme(true);
    } else {
        checkbox.checked = false;
        applyTheme(false);
    }
}

// Event Listener para a troca de tema
checkbox.addEventListener('change', () => {
    applyTheme(checkbox.checked);
});

// --- 2. Mobile Menu Toggle (Menu Hamburger) ---
const menuToggle = document.querySelector('.menu-toggle');
const menuIcon = menuToggle.querySelector('.ri-menu-line');
const closeIcon = menuToggle.querySelector('.ri-close-line');
const menuOpen = document.querySelector('.menuOpen');

function toggleMobileMenu(isOpen = menuOpen.classList.contains('hidden')) {
    menuOpen.classList.toggle('hidden', !isOpen);
    menuOpen.setAttribute('aria-hidden', String(!isOpen));
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar navegação' : 'Abrir navegação');
    menuIcon.classList.toggle('hidden', isOpen);
    closeIcon.classList.toggle('hidden', !isOpen);
}

menuToggle.addEventListener('click', () => toggleMobileMenu());

// Fechar menu ao clicar em um link
menuOpen.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menuOpen.classList.contains('hidden')) {
        toggleMobileMenu(false);
        menuToggle.focus();
    }
});

// --- 3. Smooth Scroll para navegação ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Exclui o menu mobile para não atrapalhar o evento de fechar
        if (this.closest('.menuOpen')) return; 

        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// idade
const anoNascimento = 2001;
const mesNascimento = 11; // novembro
const diaNascimento = 3;

const hoje = new Date();
let idade = hoje.getFullYear() - anoNascimento;

const mesAtual = hoje.getMonth() + 1;
const diaAtual = hoje.getDate();

if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
  idade--;
}

const idadeElement = document.getElementById('idade');
if (idadeElement) idadeElement.textContent = idade;

function updatePortfolioYear() {
    const portfolioYear = document.getElementById('portfolio-year');
    if (portfolioYear) portfolioYear.textContent = new Date().getFullYear();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    updatePortfolioYear();
});
