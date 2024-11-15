document.getElementById('createProfileForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission

    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const hp = document.getElementById('hp').value;
    const preference = document.getElementById('preference').value;
    const age = document.getElementById('age').value;

    const profileData = {
        id,
        name,
        hp,
        preference,
        age
    };

    try {
        const response = await fetch('http://localhost:5006/api/createProfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData)
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Error creating profile');
        }

        document.getElementById('errorMessage').innerText = ''; // Clear previous errors
        document.getElementById('successMessage').innerText = result.message || 'Profile created successfully';
    } catch (error) {
        document.getElementById('successMessage').innerText = ''; // Clear previous success messages
        document.getElementById('errorMessage').innerText = error.message || 'Failed to create profile';
    }
});
