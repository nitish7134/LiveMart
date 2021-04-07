import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class MapInput extends React.Component {

    render() {

        return (

            <GooglePlacesAutocomplete

                placeholder='Search'

                minLength={2}

                autoFocus={true}

                returnkeyType={'search'}
                listVienDisplayed={false}

                fetchDetails={true}

                onPress={(data, details = null) => {// 'details' is provided 
                    this.props.notifyChange(details.geometry.location);
                }}
                query={{
                    key: 'AIzaSyCSJg197HNnhk43JQCdkan-AXbtojffOnU',
                    language: 'en'
                }}

                nearbyPlacesAPI='GooglePlacesSearch'

                debounce={200}
            />
        );
    }
}

export default MapInput;