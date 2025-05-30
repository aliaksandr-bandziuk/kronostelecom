// if (!document.querySelector('.main-form')) return;
// Validate email input
// document.querySelector('input[name="email"]').addEventListener('input', function () {
//   this.value = this.value.replace(/[^a-zA-Z0-9@._-]/g, '');
// });

document.addEventListener('DOMContentLoaded', () => {

  if (!document.querySelector('.main-form')) return;

  const zipInputs = document.querySelectorAll('input[name="zip"]');
  zipInputs.forEach((input) => {
    input.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '').slice(0, 5);
    });
  });

  const inputs = document.querySelectorAll('.main-form .input-contact');

  inputs.forEach((input) => {
    const container = input.closest('.input-container');

    // Обработка авто-заполнения и ручного ввода
    const updateFilled = () => {
      if (input.value.trim() !== '') {
        container.classList.add('filled');
      } else {
        container.classList.remove('filled');
      }
    };

    // Запуск сразу (на случай autofill)
    updateFilled();

    // Навешиваем на ввод
    input.addEventListener('input', updateFilled);
    input.addEventListener('change', updateFilled);
  });
});