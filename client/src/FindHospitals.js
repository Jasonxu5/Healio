import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseMedical } from '@fortawesome/free-solid-svg-icons';
import hospitalData from './data/hospitals.json';

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
    const hospitalMarkers = hospitalData.features;

    const hospitalMarkersArray = hospitalMarkers.map((hospital, index) => {
        const x = hospital.geometry.coordinates[1];
        const y = hospital.geometry.coordinates[0];
        const hospitalIcon = <FontAwesomeIcon
            className="text-dark-grey"
            icon={faHouseMedical}
            size="lg"
            aria-label="Hospital icon" />;
        const iconHTML = ReactDOMServer.renderToString(hospitalIcon);
        const customHospitalIcon = new DivIcon({ html: iconHTML });
        const hospitalName = hospital.properties.NAME;

        return <Marker icon={customHospitalIcon} position={[x, y]} key={index}>
            <Popup>
                <div>
                    <h2>{hospitalName}</h2>
                </div>
            </Popup>
        </Marker>
    });
    return (
        <MapContainer
            className="md:mx-auto w-[90%] h-[500px] z-0 rounded-[15px] shadow-[4px_4px_4px_rgba(0,0,0,0.25)]"
            center={[47.6, -122.2]}
            zoom={10}>
            <TileLayer
                url={'https://api.mapbox.com/styles/v1/jcorille/cl2vdj5hd000a15pi839lo74j/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiamNvcmlsbGUiLCJhIjoiY2wydmY5OHlyMGI3eTNsbXZkZHE1a254MyJ9.bprBsigMZMrTf_RkkDzE9g'}
                attribution='Jerome Orille | University of Washington'
            />
            {hospitalMarkersArray}
        </MapContainer>
    );
}