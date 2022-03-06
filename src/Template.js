import React from 'react';
import Header from './Header.js';

export default function PlaceHolder(props) {
    const { currUser, familyInfo, setUserCallback, signedIn } = props;
    return (
        <div className="flex flex-col">
            <Header title={'To be worked on ...'} currUser={currUser} familyInfo={familyInfo} setUserCallback={setUserCallback} signedIn={signedIn} />
        </div>
    );
}