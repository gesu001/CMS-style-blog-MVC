const newCommentHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment').value.trim();
    console.log(content);
    // const created_at = day.js().format('DD/MM/YYYY');
    console.log(created_at)
    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body:JSON.stringify({ content }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log(response)
        // if (response.ok) {
        //     document.location.reload();
        // } else {
        //     alert('Failed to add comment')
        // }
    }
};

document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);