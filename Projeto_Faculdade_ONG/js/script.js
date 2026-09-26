/* Interações da Bíblia para Todos — JavaScript puro, sem dependências externas. */
(function () {
  'use strict';

  // Menu responsivo: mantém a navegação acessível por teclado e toque.
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.main-nav');
  if (menuButton && navigation) {
    menuButton.addEventListener('click', function () {
      const isOpen = navigation.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? 'Fechar' : 'Menu';
    });
  }

  // Máscara genérica: remove tudo que não for número e limita o tamanho.
  function onlyDigits(value, maxLength) {
    return value.replace(/\D/g, '').slice(0, maxLength);
  }

  function maskCPF(event) {
    let value = onlyDigits(event.target.value, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    event.target.value = value;
  }

  function maskPhone(event) {
    let value = onlyDigits(event.target.value, 11);
    if (value.length > 10) value = value.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
    else value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
    event.target.value = value;
  }

  function maskCEP(event) {
    let value = onlyDigits(event.target.value, 8);
    value = value.replace(/(\d{5})(\d{1,3})$/, '$1-$2');
    event.target.value = value;
  }

  const cpf = document.querySelector('#cpf');
  const phone = document.querySelector('#telefone');
  const cep = document.querySelector('#cep');
  if (cpf) cpf.addEventListener('input', maskCPF);
  if (phone) phone.addEventListener('input', maskPhone);
  if (cep) cep.addEventListener('input', maskCEP);

  const form = document.querySelector('#cadastro-form');
  if (!form) return;

  function showFieldError(field, message) {
    const error = document.querySelector('#' + field.id + '-error');
    field.setAttribute('aria-invalid', 'true');
    if (error) error.textContent = message;
  }

  function clearFieldError(field) {
    const error = document.querySelector('#' + field.id + '-error');
    field.removeAttribute('aria-invalid');
    if (error) error.textContent = '';
  }

  function validateField(field) {
    clearFieldError(field);
    if (field.validity.valid) return true;
    let message = 'Confira este campo.';
    if (field.validity.valueMissing) message = 'Este campo é obrigatório.';
    else if (field.validity.typeMismatch) message = 'Digite um e-mail válido.';
    else if (field.validity.tooShort) message = 'Digite um pouco mais de informação.';
    else if (field.validity.patternMismatch) message = 'Use o formato indicado.';
    showFieldError(field, message);
    return false;
  }

  form.querySelectorAll('input, select, textarea').forEach(function (field) {
    field.addEventListener('blur', function () { validateField(field); });
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true') validateField(field);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const fields = Array.from(form.querySelectorAll('input:not([type="radio"]):not([type="checkbox"]), select, textarea'));
    let isValid = fields.map(validateField).every(Boolean);

    const participation = form.querySelector('input[name="participacao"]:checked');
    if (!participation) {
      isValid = false;
      const firstRadio = form.querySelector('input[name="participacao"]');
      firstRadio.focus();
    }

    const lgpd = form.querySelector('#lgpd');
    if (!lgpd.checked) {
      isValid = false;
      lgpd.focus();
    }

    if (!isValid) {
      const firstInvalid = form.querySelector('[aria-invalid="true"], :invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Como o projeto é estático, o envio é simulado sem transmitir dados.
    const status = document.querySelector('#form-status');
    status.textContent = 'Cadastro recebido com carinho! Nossa equipe entrará em contato em breve.';
    status.classList.add('visible');
    form.reset();
    status.focus();
    window.scrollTo({ top: status.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' });
  });
})();
