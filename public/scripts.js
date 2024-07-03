document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.swipe-action').forEach(button => {
        button.addEventListener('click', () => {
            const userId = button.getAttribute('data-id');
            const action = button.getAttribute('data-action');

            fetch(`/swipe/${action}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    button.closest('.swipe-item').remove();
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    });
});
