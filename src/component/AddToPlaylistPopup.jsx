import React from "react";
import "./AddToPlaylistPopup.css";

export default function AddToPlaylistPopup({ playlists, onAdd, onClose, position }) {
    return (
        <div
            className="popup-container"
            style={{ top: position.top, left: position.left }}
        >
            <h3>Select a Playlist</h3>
            <ul>
                {playlists.map((playlist) => (
                    <li key={playlist.id}>
                        <button
                            onClick={() => {
                                if (onAdd) {
                                    onAdd(playlist.id); // Call the onAdd function with playlist ID
                                } else {
                                    console.error("onAdd function is missing");
                                }
                            }}
                        >
                            {playlist.name}
                        </button>
                    </li>
                ))}
            </ul>
            <button className="close-btn" onClick={onClose}>
                Close
            </button>
        </div>
    );
}
