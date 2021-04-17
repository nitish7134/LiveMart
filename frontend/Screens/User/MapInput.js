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
                listViewDisplayed={'auto'}

                fetchDetails={true}

                onPress={(data, details = null) => {
                    this.props.notifyChange(details.geometry.location);
                }}
                query={{
                    key: 'AIzaSyCSJg197HNnhk43JQCdkan-AXbtojffOnU',
                    language: 'en'
                }}
                onFail={error => console.error("Googleplace API ERROR",error)}

                nearbyPlacesAPI='GooglePlacesSearch'

                debounce={200}
            />
        );
    }
}

export default MapInput;