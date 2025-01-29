// Alterna entre tema claro e escuro
document.getElementById('theme-toggle').onclick = function () {
    document.body.classList.toggle('dark-theme');
    let currentTheme = document.body.classList.contains('dark-theme') ? '🌞' : '🌙';
    document.getElementById('theme-toggle').textContent = currentTheme;
};

// Abre o modal
document.getElementById('new-event-btn').onclick = function () {
    document.getElementById('modal').style.display = 'block';
};

// Fecha o modal
document.querySelector('.close-modal').onclick = function () {
    document.getElementById('modal').style.display = 'none';
};

// Fecha o modal se o usuário clicar fora do conteúdo do modal
window.onclick = function (event) {
    if (event.target == document.getElementById('modal')) {
        document.getElementById('modal').style.display = 'none';
    }
};

// Função para salvar evento no localStorage
function saveEventToLocalStorage(eventData) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(eventData);
    localStorage.setItem('events', JSON.stringify(events));
}

// Função para exibir os eventos salvos no localStorage
function displaySavedEvents() {
    let events = JSON.parse(localStorage.getItem('events')) || [];

    // Limpa os cards existentes
    document.getElementById('event-cards-container').innerHTML = '';

    events.forEach(event => {
        let eventCard = document.createElement('div');
        eventCard.classList.add('card-event');

        // Adiciona as classes de categoria conforme o tipo
        let categoryClass = '';
        if (event.category === 'Importante') {
            categoryClass = 'importante';
        } else if (event.category === 'Média') {
            categoryClass = 'media';
        } else if (event.category === 'Básica') {
            categoryClass = 'basica';
        }

        eventCard.innerHTML = `
            <div class="card-title">${event.title}</div>
            <div class="card-category ${categoryClass}">${event.category}</div>
            <div class="card-description">${event.description}</div>
            <div class="card-location">Local: ${event.location}</div>
            <div class="card-time">Horário: ${event.time}</div>
            <div class="card-actions">
                <button class="check-btn"><i class="fas fa-check-circle"></i> Concluído</button>
                <button class="delete-btn"><i class="fas fa-trash-alt"></i> Deletar</button>
            </div>
        `;

        // Adiciona a funcionalidade de check
        eventCard.querySelector('.check-btn').onclick = function () {
            markAsCompleted(event); // Marca o evento como concluído
        };

        // Adiciona a funcionalidade de delete com modal
        eventCard.querySelector('.delete-btn').onclick = function () {
            deleteEvent(event);  // Deleta o evento
        };

        document.getElementById('event-cards-container').appendChild(eventCard);
    });
}

// Adiciona o evento e cria um card
document.getElementById('event-form').onsubmit = function (e) {
    e.preventDefault(); // Impede o envio do formulário

    // Coleta os dados do formulário
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let location = document.getElementById('location').value;
    let time = document.getElementById('time').value;
    let category = document.getElementById('category').value;

    // Cria um objeto de evento
    let eventData = {
        title,
        description,
        location,
        time,
        category
    };

    // Salva o evento no localStorage
    saveEventToLocalStorage(eventData);

    // Cria o card para o evento
    let eventCard = document.createElement('div');
    eventCard.classList.add('card-event');

    // Adiciona as classes de categoria conforme o tipo
    let categoryClass = '';
    if (category === 'Importante') {
        categoryClass = 'importante';
    } else if (category === 'Média') {
        categoryClass = 'media';
    } else if (category === 'Básica') {
        categoryClass = 'basica';
    }

    eventCard.innerHTML = `
        <div class="card-title">${title}</div>
        <div class="card-category ${categoryClass}">${category}</div>
        <div class="card-description">${description}</div>
        <div class="card-location">Local: ${location}</div>
        <div class="card-time">Horário: ${time}</div>
        <div class="card-actions">
            <button class="check-btn"><i class="fas fa-check-circle"></i> Concluído</button>
            <button class="delete-btn"><i class="fas fa-trash-alt"></i> Deletar</button>
        </div>
    `;

    // Adiciona o card ao container
    document.getElementById('event-cards-container').appendChild(eventCard);

    // Fecha o modal
    document.getElementById('modal').style.display = 'none';

    // Limpa o formulário
    document.getElementById('event-form').reset();
};

// Função para marcar evento como concluído
function markAsCompleted(event) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events = events.map(e => {
        if (e.title === event.title) {
            e.completed = true;
        }
        return e;
    });
    localStorage.setItem('events', JSON.stringify(events));
    displaySavedEvents();  // Atualiza a lista de eventos
}

// Função para deletar evento
function deleteEvent(event) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events = events.filter(e => e.title !== event.title); // Filtra o evento para remover
    localStorage.setItem('events', JSON.stringify(events));
    displaySavedEvents();  // Atualiza a lista de eventos
}

// Exibe os eventos salvos ao carregar a página
window.onload = function () {
    displaySavedEvents();
};
