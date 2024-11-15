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
    resultsContainer.innerHTML = profiles.map(profile => `<p>${profile.profile.name}</p>`).join('');
}

async function searchProfile() {
    const searchValue = document.getElementById('profile-search-box').value;

    try {
        const response = await fetch(`/api/searchProfile/${searchValue}`);
        const result = await response.json();
        displayProfiles(Array.isArray(result) ? result : [result]);
    } catch (error) {
        console.error('Error searching profile:', error);
    }
}

window.onload = fetchProfiles;