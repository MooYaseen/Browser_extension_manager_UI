let cards = [];

const list = document.getElementById('cards');

const btnAll = document.getElementById('btn-all');
const btnActive = document.getElementById('btn-active');
const btnInActive = document.getElementById('btn-inactive');

let filterStatus = 'all'; // الحالة الافتراضية

// جلب الداتا وتخزينها
fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        cards = data;
        applyFilterAndRender();
    })
    .catch(error => console.error('Error:', error));

// دالة لإنشاء كارت
//? لم تستدعى بعد 

const createCard = (ele) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const info = document.createElement('div');
    info.classList.add('info');
    card.appendChild(info);

    const img = document.createElement('img');
    img.src = ele.logo;
    img.alt = 'logo';
    info.appendChild(img);

    const text = document.createElement('div');
    text.classList.add('text');
    info.appendChild(text);

    const head = document.createElement('div');
    head.classList.add('head');
    head.textContent = ele.name;
    text.appendChild(head);

    const paragraph = document.createElement('p');
    paragraph.textContent = ele.description;
    text.appendChild(paragraph);

    // Settings
    const settings = document.createElement('div');
    settings.className = 'settings';

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove';
    remove.textContent = 'remove';
    
    // حذف الكارت
    remove.addEventListener('click', () => {
        card.remove();
        cards = cards.filter(c => c !== ele);
        applyFilterAndRender();
    });

    settings.appendChild(remove);

    const toggle = document.createElement('button');
    toggle.className = ele.isActive ? 'toggle active' : 'toggle';
    const span = document.createElement('span');
    toggle.appendChild(span);
    toggle.setAttribute('tabindex', '0');

    toggle.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('active');
        ele.isActive = e.currentTarget.classList.contains('active');
        console.log(ele.isActive);
    });

    settings.appendChild(toggle);

    card.appendChild(settings);

    return card;
};


// دالة تطبيق الفلتر والرندر
function applyFilterAndRender() {
    let filteredCards;
    if (filterStatus === 'all') {
        filteredCards = cards;
    } else if (filterStatus === 'active') {
        filteredCards = cards.filter(card => card.isActive);
    } else {
        filteredCards = cards.filter(card => !card.isActive);
    }
    renderCards(filteredCards);
}


// دالة لترندر الكروت
const renderCards = (cardsToRender) => {
    list.innerHTML = '';
    const fragment = document.createDocumentFragment();
    cardsToRender.forEach(card => fragment.appendChild(createCard(card)));
    list.appendChild(fragment);
};


// دالة لتفعيل زرار معين
function setActiveButton(activeBtn) {
    [btnAll, btnActive, btnInActive].forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// ربط الأزرار بالحدث
btnAll.addEventListener('click', () => {
    filterStatus = 'all';
    setActiveButton(btnAll);
    applyFilterAndRender();
});

btnActive.addEventListener('click', () => {
    filterStatus = 'active';
    setActiveButton(btnActive);
    applyFilterAndRender();
});

btnInActive.addEventListener('click', () => {
    filterStatus = 'inactive';
    setActiveButton(btnInActive);
    applyFilterAndRender();
});




const toggleTheme = document.querySelector('.theme .logo');
const themeIcon = document.querySelector('.theme .logo img');
toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.header .theme').classList.toggle('active');
    document.body.classList.contains('dark-mode') ? themeIcon.src = 'assets/images/icon-sun.svg' : themeIcon.src = 'assets/images/icon-moon.svg';
});
