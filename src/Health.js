import React from 'react';
import katie from './img/katie.png';

export default function Health() {
    return (
        <header className="flex justify-end w-10/12 px-5 py-8">
            <p className="font-heading text-3xl mr-auto">Overview</p>
            <img className="rounded-full w-8 h-8" src={katie} alt="Katie Wang" />
            <p className="text-2xl ml-2">Katie Wang</p>
        </header>
    );
}