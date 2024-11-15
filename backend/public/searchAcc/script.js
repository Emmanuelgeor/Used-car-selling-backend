async function suspendAccount(event, id) {
    event.stopPropagation();

    try {
        const response = await fetch(`/api/suspendAccount/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message || 'Account suspended successfully');
            // Refresh accounts to show updated data
            fetchAccounts();
        } else {
            const data = await response.json();
            alert(data.message || 'Failed to suspend account');
        }
    } catch (error) {
        console.error('Error suspending account:', error);
        alert('An error occurred while suspending the account. Please try again.');
    }
}

function updateAccountLink(id) {
    // Redirect to update account page
    window.location.href = `/updateAccount/${id}`;
}

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
    resultsContainer.innerHTML = accounts.map(account => `
        <div class="account-row" onclick="viewAccount('${account.id}')">
            <span>${account.id}</span>
            <div class="action-buttons">
                <a href="/updateAccount/${account.id}" class="update-link">Update</a>
                <button onclick="suspendAccount(event, '${account.id}')">Suspend</button>
            </div>
        </div>
    `).join('');
}

function viewAccount(id) {
    window.location.href = `/viewAccount/${id}`;
}

window.onload = fetchAccounts;
