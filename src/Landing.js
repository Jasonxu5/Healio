import React from 'react';
import { Link } from 'react-router-dom';

import landingImage from './img/landingImage.svg';

export default function Landing() {
    return (
        <div>
            <div className="flex mx-10 my-4 pb-4">
                <h1 className="font-heading text-3xl font-bold mt-2">Healio</h1>
                <div className="flex gap-10 text-xl my-1 ml-auto">
                    <p className="mt-2">Contact</p>
                    <p className="mt-2">About</p>
                    <Link to="/login">
                        <p className="font-semibold text-dark-blue bg-dark-green rounded-lg py-2 px-4 hover:cursor-pointer">Login</p>
                    </Link>
                </div>
            </div>
            <div className="bg-pale-blue">
                <div className="flex flex-col gap-4 absolute mx-10 mt-[200px]">
                    <h2 className="font-heading text-5xl font-bold">Healio</h2>
                    <div className="text-2xl">
                        <p>Son, Daughter, Parent, <p className="text-light-blue inline">You.</p></p>
                        <p>Take control of your family's</p>
                        <p>medical information today.</p>
                    </div>
                    <Link to="/login">
                        <p className="font-semibold text-dark-blue bg-dark-green rounded-lg py-2 px-4 w-[38%] hover:cursor-pointer">Join Healio</p>
                    </Link>
                </div>
                <img className="ml-auto h-[590px]" src={landingImage} alt="Patients and Doctor Clipart" />
            </div>
        </div>
    );
}