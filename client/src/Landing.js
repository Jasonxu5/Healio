import React from 'react';
import { Link } from 'react-router-dom';

import landingImage from './img/landingImage.svg';

export default function Landing() {
    return (
        <div className="flex flex-col">
            <div className="flex mx-10 mt-4 pb-4">
                <h1 className="font-heading text-3xl font-bold mt-2">Healio</h1>
                <div className="sm:hidden flex gap-10 text-xl my-1 ml-auto">
                    <p className="mt-2">Contact</p>
                    <p className="mt-2">About</p>
                    <Link to="/login">
                        <p className="font-semibold text-dark-blue bg-dark-green rounded-lg py-2 px-4 hover:cursor-pointer">Login</p>
                    </Link>
                </div>
            </div>
            <div className="sm:mx-auto sm:w-full bg-pale-blue h-[90vh]">
            <img className="sm:hidden absolute right-0 ml-auto h-[90vh]" src={landingImage} alt="Patients and Doctor Clipart" />
                <div className="sm:text-center flex flex-col gap-4 mx-10 mt-[200px]">
                    <h2 className="font-heading text-5xl font-bold">Healio</h2>
                    <div className="text-2xl">
                        <p>Son, Daughter, Parent, <p className="text-light-blue inline">You.</p></p>
                        <p>Take control of your family's</p>
                        <p>medical information today.</p>
                    </div>
                    <Link to="/login">
                        <p className="sm:mx-auto font-semibold text-dark-blue bg-dark-green rounded-lg py-2 px-4 w-[115px] hover:cursor-pointer">Join Healio</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}