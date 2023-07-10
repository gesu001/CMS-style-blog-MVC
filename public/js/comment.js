const newCommentHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#comment').value.trim();
    const post_id = document.querySelector('#post-title').dataset.id;
    console.log(content);
    console.log(post_id);
    if (content && post_id) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body:JSON.stringify({ content, post_id }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log(response)
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to add comment')
        }
    }
};

document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);