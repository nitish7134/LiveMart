import React from 'react';
import MapView from 'react-native-maps'

const MyMapView = (props) => {
    return (
        <MapView
            style={{ flex: 1 }}
            region={props.region}
            showsUserLocation={true}
            onRegionChange={(reg) => props.onRegionChange(reg)}>

            <MapView.Marker
                coordinate={props.region} />
        </MapView>
    )
}
export default MyMapView;