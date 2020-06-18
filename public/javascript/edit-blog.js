async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name = "post-title"]').value.trim();
  const id = window.location.toString().split('/') [window.location.toString().split('/').length - 1
  ];

  //console.log(comment_text, post_id);

  console.log("its a string");
      const response = await fetch(`/api/posts/${id}`, {
          method: 'PUT',

          body: JSON.stringify({
              title,

              // post_id: id
          }),

          headers: {
              'Content-Type': 'application/JSON'
          }
      });

      if(response.ok) {
          document.location.redirect('/dashboard');
      }
      else{
          alert(response.statusText);
      }
  
}
console.log("35");
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);