const lengthInput = document.getElementById('length');
const lengthValue = document.getElementById('length-value');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');
const generateBtn = document.getElementById('generate');
const passwordInput = document.getElementById('password');
const copyBtn = document.getElementById('copy');
const strengthBar = document.getElementById('strength-bar');
const themeToggleBtn = document.getElementById('theme-toggle');

lengthInput.addEventListener('input', () => {
  lengthValue.textContent = lengthInput.value;
});

function getRandomChar(str) {
  return str[Math.floor(Math.random() * str.length)];
}

function generatePassword() {
  const len = +lengthInput.value;
  let chars = '';
  if (uppercase.checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercase.checked) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers.checked) chars += '0123456789';
  if (symbols.checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (!chars) return '';
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += getRandomChar(chars);
  }
  return pwd;
}

generateBtn.addEventListener('click', () => {
  const pwd = generatePassword();
  passwordInput.value = pwd;
  updateStrength(pwd);
});

copyBtn.addEventListener('click', () => {
  passwordInput.select();
  document.execCommand('copy');
  copyBtn.textContent = 'Copied!';
  setTimeout(() => (copyBtn.textContent = 'Copy'), 1200);
});

function updateStrength(password) {
  // Placeholder: will implement real strength logic later
  if (!password) {
    strengthBar.style.background = '#eee';
    strengthBar.style.width = '100%';
    return;
  }
  let score = 0;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  let colors = ['#ff4d4d', '#ffb84d', '#ffe44d', '#a2e34d', '#4de37b'];
  strengthBar.style.background = colors[score-1] || '#eee';
  strengthBar.style.width = (score * 20) + '%';
}

function setTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
}

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme === 'dark');
}

themeToggleBtn.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark');
  setTheme(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
