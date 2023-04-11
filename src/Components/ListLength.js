import React from "react";

function ListLength({ music } ) {
    return (
        <div>
            <h4 id='list-length'>
                You have {music.length} songs in your library
            </h4>
        </div>
    )
}

export default ListLength;