const PostHandler = async (event) => {
    event.preventDefault();
    const Id = document.querySelector('#title').dataset.value;
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#desc').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/posts/${Id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post');
      }
    }
  };

  document
  .querySelector('.post-form')
  .addEventListener('submit', PostHandler);