import React from 'react';
import Header from './Header.js';

export default function Messaging(props) {
    const { currUser, familyInfo, setUserCallback, signedIn } = props;
    return (
        <div className="">
            <Header title={'Messaging'} currUser={currUser} familyInfo={familyInfo} setUserCallback={setUserCallback} signedIn={signedIn} />
            <hr className="" />
            <div className="flex w-[97.5%]">
                <ChatBox />
                <ChatNav />
            </div>
        </div>
    );
}

function ChatBox() {
    return <p className="pl-[235px]">This will be the chat box</p>;
}

function ChatNav() {
    return <p className="">This will be the chat nav</p>
}