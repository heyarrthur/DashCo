function togglePassword() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Lista de logins válidos com redirecionamento específico
    const validLogins = [
        { username: 'admin', password: '1234', redirect: 'dashadmin/index.html' },
        { username: 'robison.ferreira@dex.co', password: 'Robisonribeiro', redirect: 'dash/index.html' },
        { username: 'arthur.ferreira@unimedjf.coop.br', password: '0201@RthuR', redirect: 'dashArthur/index.html' }
    ];

    // Verifica se o login é válido
    const user = validLogins.find(
        (login) => login.username === username && login.password === password
    );

    if (user) {
        // Redireciona para a página específica do usuário
        window.location.href = user.redirect;
    } else {
        alert('Credenciais inválidas. Tente novamente.');
    }
});
