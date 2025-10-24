// scripts/script.js

// --- 1. Dark/Light Mode Toggle (Troca de Tema) ---
const checkbox = document.getElementById('checkbox');
const root = document.documentElement; // Elemento raiz (<html>) para variáveis CSS

// Variáveis para o Modo Claro (Light Mode)
const lightThemeVars = {
    '--color-primary': '#00bfff', // Azul vibrante
    '--color-secondary': '#0099cc',
    '--color-background-dark': '#f0f0f0', // Fundo principal claro
    '--color-background-card': '#ffffff', // Fundo de cards/elementos claro
    '--color-text-light': '#0a104bff', // Texto escuro
    '--color-text-muted': '#0a104bff', // Texto muted mais escuro
    '--color-border': '#c0c0c0', // Borda clara
};

// Variáveis para o Modo Escuro (Dark Mode) - AGORA MAIS AZUL
const darkThemeVars = {
    '--color-primary': '#00bfff',
    '--color-secondary': '#0099cc',
    '--color-background-dark': '#041525ff', // NOVO: AZUL ESCURO PROFUNDO
    '--color-background-card': '#081929ff', // NOVO: AZUL ESCURO LEVE PARA CARDS
    '--color-text-light': '#ffffff',
    '--color-text-muted': '#e1f7faff',
    '--color-border': '#1b1b58ff',
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
const menuIcon = document.querySelector('.menu .ri-menu-line');
const closeIcon = document.querySelector('.menu .ri-close-line');
const menuOpen = document.querySelector('.menuOpen');

function toggleMobileMenu() {
    menuOpen.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

menuIcon.addEventListener('click', toggleMobileMenu);
closeIcon.addEventListener('click', toggleMobileMenu);

// Fechar menu ao clicar em um link
menuOpen.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', toggleMobileMenu);
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


// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
});