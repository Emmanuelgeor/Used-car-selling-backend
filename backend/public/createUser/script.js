// createUser/script.js
document.getElementById("createUserForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form data
    const id = document.getElementById("id").value;
    const pw = document.getElementById("pw").value;
    const email = document.getElementById("email").value;
    const role = document.getElementById("role").value;

    const data = {
        id,
        pw,
        email,
        role
    };

    try {
        // Send POST request to create user endpoint
        const response = await fetch('http://localhost:5006/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById("success-message").textContent = result.message;
            document.getElementById("error-message").textContent = '';
            // Optionally, redirect to another page (e.g., login or dashboard)
            setTimeout(() => {
                window.location.href = '/login';  // Redirect to login page
            }, 2000);
        } else {
            throw new Error(result.message || 'Failed to create account');
        }
    } catch (error) {
        document.getElementById("error-message").textContent = error.message;
        document.getElementById("success-message").textContent = '';
    }
});
