  const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBTN = document.getElementById('loginBTN');
const togglePasswordBtn = document.getElementById('togglePassword');
const errorModal = document.getElementById('errorModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const closeBtn = document.querySelector('.close');

// Modal functions
function showModal(message) {
  const modalMessage = document.getElementById('modalMessage');
  modalMessage.textContent = message;
  errorModal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function hideModal() {
  errorModal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
}

// Modal event listeners
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', hideModal);
}

if (closeBtn) {
  closeBtn.addEventListener('click', hideModal);
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === errorModal) {
    hideModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && errorModal.style.display === 'block') {
    hideModal();
  }
});

if (togglePasswordBtn) {
  togglePasswordBtn.addEventListener('click', () => {
    if (password.type === 'password') {
      password.type = 'text';
      togglePasswordBtn.querySelector('img').src = 'src/img/eye-off.svg';
      togglePasswordBtn.querySelector('img').style.filter = 'brightness(0.3)';
    } else {
      password.type = 'password';
      togglePasswordBtn.querySelector('img').src = 'src/img/eye.svg';
      togglePasswordBtn.querySelector('img').style.filter = 'brightness(0.6)';
    }
  });
}

function login(user, pass) {
  // Clear any previous errors
  username.style.borderColor = '';
  password.style.borderColor = '';
  
  // Validate empty fields
  if (!user.trim() || !pass.trim()) {
    showModal('Por favor, preencha todos os campos.');
    if (!user.trim()) username.style.borderColor = '#DC2626';
    if (!pass.trim()) password.style.borderColor = '#DC2626';
    return;
  }

  if (user === 'admin' && pass === 'admin123') {
    localStorage.setItem('userRole', 'admin');
    window.location.href = './src/html/admin.html';
  } else if (user === 'vendedor' && pass === 'vend123') {
    localStorage.setItem('userRole', 'vendedor');
    window.location.href = './src/html/vendedor.html';
  } else if (user === 'supervisor' && pass === 'supervisor123') {
    localStorage.setItem('userRole', 'supervisor');
    window.location.href = './src/html/supervisor.html';
  } else if (user === 'producao' && pass === 'producao123') {
    localStorage.setItem('userRole', 'producao');
    window.location.href = './src/html/producao.html';
  } else if (user === 'personalizacao' && pass === 'personalizacao123') {
    localStorage.setItem('userRole', 'personalizacao');
    window.location.href = './src/html/personalizacao.html';
  } else {
    showModal('Usuário ou senha inválidos. Verifique suas credenciais e tente novamente.');
    username.style.borderColor = '#DC2626';
    password.style.borderColor = '#DC2626';
  }
}

if (loginBTN) {
  loginBTN.addEventListener('click', () => {
    login(username.value, password.value);
  });
}

// Allow Enter key to submit form
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && (document.activeElement === username || document.activeElement === password)) {
    login(username.value, password.value);
  }
});
