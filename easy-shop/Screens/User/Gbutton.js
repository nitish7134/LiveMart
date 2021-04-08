import React from 'react'
import { View, Text } from 'react-native'

const Gbutton = () => {
    return (
        <>
            <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>

            <script>
                renderButton = () =>{
                    gapi.signin2.render('my-signin2', {
                        'scope': 'profile email',
                        'width': 240,
                        'height': 50,
                        'longtitle': true,
                        'theme': 'dark',
                        'onsuccess': onSuccess,
                        'onfailure': onFailure
                    });
    }
  </script>

        </>
    )
}

export default Gbutton
