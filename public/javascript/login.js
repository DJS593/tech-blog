// sign-up function
async function signupFormHandler(event) {
  event.preventDefault();

  // locate and pull the username and password
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // ensure we have both a username AND password
  if (username && password) {
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
      // upon signup, route the user to the dashboard
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

// log-in function
async function loginFormHandler(event) {
  event.preventDefault();

  // locate and pull the usernae and password
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  
  // ensure we have both a userame AND password
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
      // users redirect to the dashboard after log in
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}


// event listeners to trigger the above functions
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);