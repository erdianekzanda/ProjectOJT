// Membuat elemen container utama (tampilan layar HP)
const appContainer = document.createElement('div');
appContainer.style.cssText = `
  width: 100%;
  max-width: 412px;
  height: 844px;
  margin: 0 auto;
  background-color: #ffffff;
  position: relative;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 40px;
`;

// Membuat elemen latar belakang gradasi ungu di atas
const bgCircle = document.createElement('div');
bgCircle.style.cssText = `
  position: absolute;
  top: -100px;
  left: -50px;
  width: 450px;
  height: 450px;
  background: linear-gradient(135deg, rgba(220, 200, 255, 0.7) 0%, rgba(245, 240, 255, 0.2) 100%);
  border-radius: 50%;
  z-index: 1;
  pointer-events: none;
`;
appContainer.appendChild(bgCircle);

// Membuat container konten utama
const contentWrapper = document.createElement('div');
contentWrapper.style.cssText = `
  position: relative;
  z-index: 2;
  padding: 160px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
`;

// Judul "Login"
const title = document.createElement('h1');
title.innerText = 'Login';
title.style.cssText = `
  font-size: 36px;
  font-weight: 700;
  color: #000000;
  margin: 0 0 40px 0;
`;
contentWrapper.appendChild(title);

// Form Container
const form = document.createElement('form');
form.style.cssText = `
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

// Input Email (menggantikan nomor telepon)
const emailWrapper = document.createElement('div');
emailWrapper.style.cssText = `
  position: relative;
  width: 100%;
`;

const emailInput = document.createElement('input');
emailInput.type = 'email';
emailInput.placeholder = 'Email';
emailInput.style.cssText = `
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #d1d5db;
  border-radius: 16px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #333333;
  transition: border-color 0.2s;
`;
emailInput.addEventListener('focus', () => emailInput.style.borderColor = '#9333ea');
emailInput.addEventListener('blur', () => emailInput.style.borderColor = '#d1d5db');
emailWrapper.appendChild(emailInput);
form.appendChild(emailWrapper);

// Input Password dengan tombol "FORGOT"
const passwordWrapper = document.createElement('div');
passwordWrapper.style.cssText = `
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const passwordInput = document.createElement('input');
passwordInput.type = 'password';
passwordInput.placeholder = 'Password';
passwordInput.style.cssText = `
  width: 100%;
  padding: 16px 85px 16px 20px;
  border: 1px solid #d1d5db;
  border-radius: 16px;
  font-size: 16px;
  outline: none;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #333333;
  transition: border-color 0.2s;
`;
passwordInput.addEventListener('focus', () => passwordInput.style.borderColor = '#9333ea');
passwordInput.addEventListener('blur', () => passwordInput.style.borderColor = '#d1d5db');

const forgotBtn = document.createElement('button');
forgotBtn.type = 'button';
forgotBtn.innerText = 'FORGOT';
forgotBtn.style.cssText = `
  position: absolute;
  right: 20px;
  background: none;
  border: none;
  color: #9333ea;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  letter-spacing: 0.5px;
`;
forgotBtn.addEventListener('click', (e) => {
  e.preventDefault();
  alert('Fitur pemulihan kata sandi diklik.');
});

passwordWrapper.appendChild(passwordInput);
passwordWrapper.appendChild(forgotBtn);
form.appendChild(passwordWrapper);

// Tombol Login
const loginBtn = document.createElement('button');
loginBtn.type = 'submit';
loginBtn.style.cssText = `
  margin-top: 24px;
  align-self: flex-end;
  background-color: #9333ea;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
  transition: background-color 0.2s;
`;

// Teks pada tombol login
const loginTextSpan = document.createElement('span');
loginTextSpan.innerText = 'Login';
loginBtn.appendChild(loginTextSpan);

// Membuat SVG Icon Panah yang aman untuk DOM JavaScript murni
const svgNS = "http://www.w3.org/2000/svg";
const svgIcon = document.createElementNS(svgNS, "svg");
svgIcon.setAttribute("width", "16");
svgIcon.setAttribute("height", "16");
svgIcon.setAttribute("fill", "currentColor");
svgIcon.setAttribute("viewBox", "0 0 16 16");

const path1 = document.createElementNS(svgNS, "path");
path1.setAttribute("fill-rule", "evenodd");
path1.setAttribute("d", "M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z");

const path2 = document.createElementNS(svgNS, "path");
path2.setAttribute("fill-rule", "evenodd");
path2.setAttribute("d", "M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z");

svgIcon.appendChild(path1);
svgIcon.appendChild(path2);
loginBtn.appendChild(svgIcon);

// Efek hover tombol
loginBtn.addEventListener('mouseover', () => loginBtn.style.backgroundColor = '#7e22ce');
loginBtn.addEventListener('mouseout', () => loginBtn.style.backgroundColor = '#9333ea');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  if (!email || !password) {
    alert('Mohon isi email dan password terlebih dahulu.');
    return;
  }
  alert(`Login berhasil: ${email}`);
});

form.appendChild(loginBtn);
contentWrapper.appendChild(form);
appContainer.appendChild(contentWrapper);

// Menempelkan elemen ke dalam body halaman
document.body.appendChild(appContainer);