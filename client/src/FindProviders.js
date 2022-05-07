import React from 'react';
import { Link } from 'react-router-dom';

export default function FindProviders(props) {
    const { doctorInfo, findProvidersHeader } = props;
    return (
        <div className="md:pl-[25px] flex flex-col pl-[235px]">
            {findProvidersHeader}
            <ProviderCards doctorInfo={doctorInfo} />
        </div>
    );
}

function ProviderCards(props) {
    const { doctorInfo } = props;
    const doctorInfoArray = doctorInfo.map((doctor, index) => {
        return <SingleProvider docName={doctor.name} docImg={doctor.img} docSpeciality={doctor.speciality} key={index} />;
    })
    return (
        <div className="sm:grid-cols-1 grid grid-cols-2 gap-4 w-[95%]">
            {doctorInfoArray}
        </div>
    );
}

function SingleProvider(props) {
    const { docName, docImg, docSpeciality } = props;

    return (
        <div>
            <div className="flex gap-6 animate-popup p-6 bg-white shadow-[2px_4px_20px_rgba(0,0,0,0.25)] rounded-[20px]">
                <img className="rounded-full w-24 h-24" src={docImg} alt={docName} />
                <div className="flex flex-col gap-2">
                    <h2 className="font-heading text-3xl">{docName}</h2>
                    <hr className="border-grey" />
                    <p className="font-bold">Speciality: {docSpeciality}</p>
                    <Link to="/appointments"
                        className="transition w-[215px] py-3 px-6 border-2 border-light-blue bg-[#FFFFFF] rounded-[15px] hover:cursor-pointer hover:bg-light-blue hover:font-bold">
                        Schedule Appointment
                    </Link>
                </div>
            </div>
            <hr className="sm:block mt-4 border-grey hidden" />
        </div>
    )
}