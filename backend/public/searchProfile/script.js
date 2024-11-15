async function suspendProfile(event, name) {
    event.stopPropagation();

    try {
        const response = await fetch(`/api/suspendProfile/${name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message || 'Profile suspended successfully');
            // Refresh profiles to show updated data
            fetchProfiles();
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to suspend profile');
        }
    } catch (error) {
        console.error('Error suspending profile:', error);
        alert('An error occurred while suspending the profile. Please try again.');
    }
}

function updateProfileLink(name) {
    // Redirect to update profile page
    window.location.href = `/updateProfile/${name}`;
}

async function fetchProfiles() {
    try {
        const response = await fetch('/api/searchProfile');
        const profiles = await response.json();
        displayProfiles(profiles);
    } catch (error) {
        console.error('Error fetching profiles:', error);
    }
}

function displayProfiles(profiles) {
    const resultsContainer = document.getElementById('profile-results');
    resultsContainer.innerHTML = profiles.map(profile => `
        <div class="profile-row" onclick="viewProfile('${profile.profile.name}')">
            <span>${profile.profile.name}</span>
            <div class="action-buttons">
                <a href="/updateProfile/${profile.profile.name}" class="update-link">Update</a>
                <button onclick="suspendProfile(event, '${profile.profile.name}')">Suspend</button>
            </div>
        </div>
    `).join('');
}

function viewProfile(name) {
    window.location.href = `/viewProfile/${name}`;
}

window.onload = fetchProfiles;