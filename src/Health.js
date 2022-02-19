import React from 'react';
import katie from './img/katie.png'; // profile picture

const HEALTH_CARD_TEXT = [
    { title: "Hello, Katie!", body: "the big card!!" },
    { title: "Notifications", body: "Create customized lists of games you have played, are currently playing, and want to play next on your My Games page." },
    { title: "Lab Results", body: "Share and talk about the lists of the games you are currently enjoying or want to play with your friends. Or connect with new friends who share similar interests." },
    { title: "Looking for a New Provider?", body: "Let other people know what you think about the games you have played by giving them a rating and a review as you add them to your game lists." },
    { title: "Doctor's Notes", body: "Look at game reviews and ratings from your friends and others to create your own wishlist of games so you never have to worry about what to play next." },
    { title: "Upcoming Appointments", body: "idk wat to put here lol" }
];

export default function Health() {
    // Profile picture under img: "rounded-full w-8 h-8"
    // Username under p: "text-2xl ml-2"
    return (
        <div className="">
            <header className="absolute flex justify-end w-[80%] left-[235px] py-8">
                <p className="font-heading text-3xl mr-auto">Overview</p>
                <img className="rounded-full w-8 h-8" src={katie} alt="Katie Wang" />
                <p className="text-2xl ml-2">Katie Wang</p>
            </header>
            <HealthCards />
        </div>
    );
}

function HealthCards() {
    const healthInfoCards = HEALTH_CARD_TEXT.map((cardInfo, index) => {
        return <SingleHealthCard title={cardInfo.title} body={cardInfo.body} count={index} key={cardInfo.title} />;
    });
    return (
        <div className="flex">
            {healthInfoCards}
        </div>
    );
}

function SingleHealthCard(props) {
    const { title, body, count } = props;
    let leftPxSize;
    let topPxSize;
    let widthPxSize;
    let heightPxSize;

    // Position card based on left anchors
    if (count <= 1 || count === 4) {
        leftPxSize = 'left-[235px] ';
    } else {
        leftPxSize = 'left-[836px] ';
    }

    // Position card based on top anchors
    if (count === 0) {
        topPxSize = 'top-[106px] ';
    } else if (count < 3) {
        topPxSize = 'top-[352px] ';
    } else if (count < 4) {
        topPxSize = 'top-[528px] ';
    } else {
        topPxSize = 'top-[705px] ';
    }

    // Determine card width based on position
    if (count === 0) {
        widthPxSize = 'w-[1170px] ';
    } else {
        widthPxSize = 'w-[569px] ';
    }

    // Determine card height based on position
    if (count === 0) {
        heightPxSize = 'h-[205px] ';
    } else if (count === 1) {
        heightPxSize = 'h-[321px] ';
    } else if (count < 4) {
        heightPxSize = 'h-[144.5px] ';
    } else {
        heightPxSize = 'h-[280px] ';
    }

    return (
        <div className={"absolute " + leftPxSize + topPxSize + widthPxSize + heightPxSize + "bg-white shadow-[2px_4px_20px_rgba(0,0,0,0.25)] rounded-[20px]"}>
            <h2 className="font-heading text-2xl">{title}</h2>
            <p>{body}</p>
        </div>
    );
}