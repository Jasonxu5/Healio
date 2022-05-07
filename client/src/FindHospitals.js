import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { mapboxToken } from './mapboxToken.js';


export default function FindHospitals(props) {
    const { findHospitalsHeader } = props;
    return (
        <div className="md:pl-[25px] flex flex-col pl-[235px]">
            {findHospitalsHeader}
            <SeattleMap />
        </div>
    );
}

function SeattleMap() {
    return (
        <MapContainer className="md:mx-auto w-[90%] h-[500px] z-0 rounded-[15px]" center={[47.6,-122.2]} zoom={11}  >
            <TileLayer
                url={'https://api.mapbox.com/styles/v1/jcorille/cl2vdj5hd000a15pi839lo74j/tiles/256/{z}/{x}/{y}@2x?access_token=' + mapboxToken}
                attribution='Jerome Orille | University of Washington'
            />
        </MapContainer>
    );
}