document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        id: email,
        pw: password
    };

    try {
        const response = await fetch('http://localhost:5006/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful', data);
            window.location.href = '/dashboard'; // Redirect to dashboard
        } else {
            const data = await response.json();
            document.getElementById('login-error').textContent = data.message || 'Login failed';
        }
    } catch (error) {
        console.error('Login failed:', error);
        document.getElementById('login-error').textContent = 'Login failed. Please try again.';
    }
});
