import React, { useEffect } from 'react';

const MyComponent = () => {
  useEffect(() => {
    // Load the Google Sign-In API
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id: '1077808714159-bcuikd9k78ofsdhhhhq6ur49evb3u4oi.apps.googleusercontent.com', // Replace with your Google Client ID
        })
        .then((auth2) => {
          // Check if the user is signed in
          if (auth2.isSignedIn.get()) {
            // Get the user's basic profile
            const profile = auth2.currentUser.get().getBasicProfile();

            console.log('ID: ' + profile.getId());
            console.log('Full Name: ' + profile.getName());
            console.log('Given Name: ' + profile.getGivenName());
            console.log('Family Name: ' + profile.getFamilyName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
          }
        })
        .catch((error) => {
          console.error('Error initializing Google Sign-In:', error);
        });
    });
  }, []); // Run the effect only once on component mount

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default MyComponent;
