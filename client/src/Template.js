import React from 'react';

export default function PlaceHolder(props) {
    const { currUser, templateHeader } = props;
    return (
        <div className="md:pl-[25px] flex flex-col pl-[235px]">
            {templateHeader}
        </div>
    );
}