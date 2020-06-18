async function signupFormHandler (event) {
  event.preventDefault();

  const username = document.querySelector('#InputUsername').value.trim();
  const email = document.querySelector('#InputEmail').value.trim();
  const password = document.querySelector('#InputPassword').value.trim();

  if(username && email && password ) {
      const response = await fetch ('/api/users', {
          method: 'post',

          body: JSON.stringify({
              username,
              email,
              password
          }),

          headers: { 'Content-Type': 'application/json'}
      })
      //adding error handler
      if(response.ok) {
          console.log('Success');
      } else {
          alert (response.statusText);
      }
      
  }
}

async function loginFormHandler (event) {
  event.preventDefault();

  const username = document.querySelector('#savedUsername').value.trim();
  const password = document.querySelector('#savedPassword').value.trim();

  if( username && password ) {
      const response = await fetch ('/api/users/login', {
          method: 'post',

          body: JSON.stringify({
              username,
              password
          }),

          headers: { 'Content-Type': 'application/json'}
      })
      //adding error handler
      if(response.ok) {
          document.location.replace('/dashboard');
      } else {
          alert (response.statusText);
      }
      
  }
}

document.querySelector('.signup').addEventListener('submit', signupFormHandler);
document.querySelector('.login').addEventListener('click', loginFormHandler);













/*

async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}


document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

*/