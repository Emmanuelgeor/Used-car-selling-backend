import React, { useState, useEffect } from 'react';
import './searchAcc.css'; // Importing the CSS file for styling

const SearchAccount = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to search accounts based on account ID
    const searchAccount = async () => {
        if (!searchTerm) return;

        setLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch(`/api/searchAccount?search=${searchTerm}`);
            const data = await response.json();
            setAccounts(data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
            setErrorMessage('Failed to fetch accounts.');
        } finally {
            setLoading(false);
        }
    };

    // Function to suspend an account
    const suspendAccount = async (id) => {
        try {
            const response = await fetch(`/api/suspendAccount/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                alert('Account suspended successfully');
                searchAccount(); // Refresh the accounts list
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to suspend account');
            }
        } catch (error) {
            console.error('Error suspending account:', error);
            alert('An error occurred while suspending the account. Please try again.');
        }
    };

    // Function to handle viewing an account's details
    const viewAccount = (id) => {
        window.location.href = `/viewAccountDetails?id=${id}`;
    };

    return (
        <div>
            <h1>Search Account</h1>
            <div className="search-container">
                <input
                    type="text"
                    id="account-search-box"
                    placeholder="Enter account ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={searchAccount}>Search</button>
            </div>

            {loading && <p>Loading...</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <div id="account-results">
                {accounts.length > 0 ? (
                    accounts.map((account) => (
                        <div key={account.id} className="account-row" onClick={() => viewAccount(account.id)}>
                            <span>{account.id}</span>
                            <div className="action-buttons">
                                <a href={`/updateAccount/${account.id}`} className="update-link">Update</a>
                                <button onClick={(e) => { e.stopPropagation(); suspendAccount(account.id); }}>Suspend</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No accounts found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchAccount;