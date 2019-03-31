const join = document.querySelector('#join');
const login = document.querySelector('#login');
const signUpDiv = document.querySelector('#signUpDiv');
const loginDiv = document.querySelector('#loginDiv');
const opaque = document.querySelectorAll('.opacity');
const closeSignUp = document.querySelector('#closeSignUp');
const closeLogin = document.querySelector('#closeLogin');


const close = (div) => {
  opaque.forEach((n) => {
    n.style.display = 'unset';
  });
  div.style.display = 'none';
};
const display = (div) => {
  div.style.display = 'block';
  opaque.forEach((n) => {
    n.style.display = 'none';
  });
};
join.addEventListener('click', () => { display(signUpDiv); });
login.addEventListener('click', () => { display(loginDiv); });
closeSignUp.addEventListener('click', () => { close(signUpDiv); });
closeLogin.addEventListener('click', () => { close(loginDiv); });
