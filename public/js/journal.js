const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#journal-title').value.trim();
    
    const entry = document.querySelector('#journal-entry').value.trim();
  
    if (title && entry) {
      const response = await fetch(`/api/journal`, {
        method: 'POST',
        body: JSON.stringify({ title, entry }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/journal');
      } else {
        alert('Failed to create entry');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/journal/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/journal');
      } else {
        alert('Failed to delete entry');
      }
    }
  };
  
  document
    .querySelector('.new-journal-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.journal-list')
    .addEventListener('click', delButtonHandler);