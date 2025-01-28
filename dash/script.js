const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Verificar se o tema está salvo no localStorage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.textContent = '🌞'; // Ícone do sol para tema escuro
} else {
    body.classList.remove('dark-theme');
    themeToggle.textContent = '🌙'; // Ícone da lua para tema claro
}

// Alternar entre os temas ao clicar no botão
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        themeToggle.textContent = '🌞';
        localStorage.setItem('theme', 'dark'); // Salvar tema escuro
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light'); // Salvar tema claro
    }
});
