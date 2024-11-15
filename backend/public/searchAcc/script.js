async function fetchAccounts() {
    try {
        const response = await fetch('/api/searchAccount');
        const accounts = await response.json();
        displayAccounts(accounts);
    } catch (error) {
        console.error('Error fetching accounts:', error);
    }
}

function displayAccounts(accounts) {
    const resultsContainer = document.getElementById('account-results');
    resultsContainer.innerHTML = accounts.map(account => `<p>${account.id}</p>`).join('');
}

async function searchAccount() {
    const searchValue = document.getElementById('account-search-box').value;

    try {
        const response = await fetch(`/api/searchAccount?id=${searchValue}`);
        const result = await response.json();
        displayAccounts(Array.isArray(result) ? result : [result]);
    } catch (error) {
        console.error('Error searching account:', error);
    }
}

window.onload = fetchAccounts;
