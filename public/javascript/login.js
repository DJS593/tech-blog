async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // check the response status
    if (response.ok) {
      console.log('success');
    } else {
      alert(response.statusText);
    }
  }
}


async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  
  // don't think we will use email, so this will probably change
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      // users redirect to the dashboard after log in
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}
/********************************************** */

/* turning the functions off for now unitl I can match the html template with this */

//document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
//document.querySelector('.login-form').addEventListener('submit', loginFormHandler);