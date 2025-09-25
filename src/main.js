// Обработка модального окна
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

if (openBtn && dlg) {
    openBtn.addEventListener('click', () => {
        lastActive = document.activeElement;
        dlg.showModal();
        // Фокус на первое поле формы
        const firstInput = dlg.querySelector('input, select, textarea, button');
        if (firstInput) firstInput.focus();
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => dlg.close('cancel'));
}

if (form) {
    form.addEventListener('submit', (e) => {
        // Сброс кастомных сообщений
        [...form.elements].forEach(el => {
            if (el.setCustomValidity) el.setCustomValidity('');
            el.removeAttribute('aria-invalid');
        });

        // Проверка валидации
        if (!form.checkValidity()) {
            e.preventDefault();

            const email = form.elements.email;
            if (email && email.validity.typeMismatch) {
                email.setCustomValidity('Введите корректный e-mail, например name@example.com');
            }

            const phone = form.elements.phone;
            if (phone && phone.validity.patternMismatch) {
                phone.setCustomValidity('Формат: +7 (900) 000-00-00');
            }

            form.reportValidity();

            // Подсветка ошибок
            [...form.elements].forEach(el => {
                if (el.willValidate && !el.checkValidity()) {
                    el.setAttribute('aria-invalid', 'true');
                }
            });
            return;
        }

        e.preventDefault();
        if (dlg) dlg.close('success');

        alert('Сообщение отправлено!');
        form.reset();
    });
}

if (dlg) {
    dlg.addEventListener('close', () => {
        if (lastActive) lastActive.focus();
    });
}
