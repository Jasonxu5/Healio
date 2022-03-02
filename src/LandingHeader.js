import React from 'react';

export default function LandingHeader(props) {
    const { signedIn } = props;
    return (
        <div className="flex px-10 py-4">
            <h1 className="font-heading text-3xl font-bold">Healio</h1>
            <div className="flex gap-10 text-xl py-1 ml-auto">
                <p>Contact</p>
                <p>About</p>
                <p className="mb-15 py-2 px-4 font-semibold bg-dark-green rounded-lg hover:cursor-pointer" onClick={() => signedIn(true)}>Login</p>
            </div>
        </div>
    );
}