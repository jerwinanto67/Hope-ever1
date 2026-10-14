// Shared by the Contact and Get Involved forms (any form posting to Web3Forms).
window.initContactForm = function initContactForm() {
  const form = document.querySelector('form[action*="web3forms"]');
  const feedback = document.querySelector('#form-feedback');
  if (!form || !feedback) {
    return;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      feedback.textContent = 'Please fill in all required fields before submitting.';
      feedback.className = 'error';
      return;
    }

    const button = form.querySelector('[type="submit"]');
    const json = JSON.stringify(Object.fromEntries(new FormData(form)));

    feedback.textContent = 'Sending...';
    feedback.className = '';
    button.disabled = true;

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
      .then(function (response) {
        return response.json().then(function (data) {
          if (!response.ok || !data.success) {
            throw new Error(data.message || 'Submission failed');
          }
        });
      })
      .then(function () {
        feedback.textContent = form.dataset.success || 'Thank you! Your message has been sent successfully.';
        feedback.className = 'success';
        form.reset();
      })
      .catch(function () {
        feedback.textContent = 'Sorry, something went wrong. Please try again or email us at contact@hopeever.org.';
        feedback.className = 'error';
      })
      .finally(function () {
        button.disabled = false;
      });
  });
};
