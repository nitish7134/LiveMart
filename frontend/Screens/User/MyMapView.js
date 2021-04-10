import React from 'react';
import {Dimensions} from 'react-native';
import MapView from 'react-native-maps';


var { width } = Dimensions.get('window');

const MyMapView = (props) => {
    return (
        <MapView
            style={{ flex: 1,height:500,width:width*0.8 }}
            region={props.region}
            showsUserLocation={true}
            onRegionChange={(reg) => props.onRegionChange(reg)}>

            <MapView.Marker
                coordinate={props.region} />
        </MapView>
    )
}
export default MyMapView;