import React, { useState, useEffect } from 'react';
import './searchProfile.css'; // Import your CSS file

const SearchProfile = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch profiles when the component loads or after an action
    const fetchProfiles = async () => {
        try {
            const response = await fetch('/api/searchProfile');
            if (!response.ok) throw new Error('Failed to fetch profiles');
            const data = await response.json();
            setProfiles(data);
        } catch (error) {
            console.error('Error fetching profiles:', error);
            setErrorMessage('Error fetching profiles. Please try again.');
        }
    };

    // Suspend a profile
    const suspendProfile = async (event, name) => {
        event.stopPropagation(); // Prevent the parent click event
        try {
            const response = await fetch(`/api/suspendProfile/${name}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message || 'Profile suspended successfully');
                fetchProfiles(); // Refresh profiles
            } else {
                alert(data.message || 'Failed to suspend profile');
            }
        } catch (error) {
            console.error('Error suspending profile:', error);
            alert('An error occurred while suspending the profile. Please try again.');
        }
    };

    // Update profile link redirection
    const updateProfileLink = (name) => {
        window.location.href = `/updateProfile/${name}`;
    };

    // View profile link redirection
    const viewProfile = (name) => {
        window.location.href = `/viewProfile/${name}`;
    };

    // Fetch profiles on component mount
    useEffect(() => {
        fetchProfiles();
    }, []);

    return (
        <div>
            <h1>Search Profile</h1>
            <div className="search-container">
                <input
                    type="text"
                    id="profile-search-box"
                    placeholder="Enter profile name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={fetchProfiles}>Search</button>
            </div>
            <div id="profile-results">
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {profiles.length > 0 ? (
                    profiles.map((profile) => (
                        <div
                            key={profile.profile.name}
                            className="profile-row"
                            onClick={() => viewProfile(profile.profile.name)}
                        >
                            <span>{profile.profile.name}</span>
                            <div className="action-buttons">
                                <a
                                    href={`/updateProfile/${profile.profile.name}`}
                                    className="update-link"
                                >
                                    Update
                                </a>
                                <button
                                    onClick={(e) => suspendProfile(e, profile.profile.name)}
                                >
                                    Suspend
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No profiles found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchProfile;