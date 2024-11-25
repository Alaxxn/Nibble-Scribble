// src/DiaryEntry.jsx
import React, { useState, useEffect } from "react";
import closedtrash from "./assets/ClosedTrash.svg";
import opentrash from "./assets/OpenTrash.svg";
import lock from "./assets/Lock.svg";
import unlock from "./assets/Unlock.svg";
import star from "./assets/Stared.svg";
import unstar from "./assets/Unstared.svg";
import send from "./assets/Send.svg";
import sent from "./assets/SendHover.svg";
import save from "./assets/Save.svg";
import savehover from "./assets/SaveHover.svg";
import HamburgerMenu from "./HamburgerMenu";

function DiaryEntry() {
  const [entry, setEntry] = useState("");
  const [title, setTitle] = useState("");
  const [isPrivate, setIsPrivate] = useState(true); // Initially private
  const [isFavorite, setIsFavorite] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [lastEdited, setLastEdited] = useState(null);

  useEffect(() => {
    // Function to update lastEdited time
    const updateLastEdited = () => {
      const now = new Date();
      const options = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedTime = now.toLocaleString("en-US", options);
      setLastEdited(formattedTime);
    };

    // Update lastEdited initially
    updateLastEdited();

    // Event listeners to update lastEdited on input changes
    const inputFields = document.querySelectorAll(".diary-title, textarea");
    inputFields.forEach((input) => {
      input.addEventListener("input", updateLastEdited);
    });

    // Cleanup: remove event listeners when component unmounts
    return () => {
      inputFields.forEach((input) => {
        input.removeEventListener("input", updateLastEdited);
      });
    };
  }, []);

  const handleChange = (e) => {
    setEntry(e.target.value); // Update state with the value from the textarea
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSave = () => {
    if (title.trim().length < 2 || entry.trim().length < 2) {
      alert("Please enter a title and text with at least 2 characters.");
      return;
    }

    // Prepare the diary entry object
    const diaryEntry = {
      user_id: 96, // Temporary static ID of user_name 'MiladRocks249'; update with authenticated user ID when available
      title,
      entry,
      is_public: isPrivate ? "false" : "true",
      status: isPrivate ? "draft" : "published",
    };

    // Send the diary entry to your backend API
    fetch(`${import.meta.env.VITE_BACKEND_URL}/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(diaryEntry),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save scribble.");
        }
        // console.log("Scribble saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving scribble:", error);
        // Handle the error (e.g., show an error message)
      });
  };

  const handleTrash = () => {
    setEntry("");
    setTitle("");
  };

  const handleLock = () => {
    setIsPrivate(!isPrivate);
  };

  const handleStar = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    setIsShare(!isShare);
  };

  return (
    <div>
      <HamburgerMenu />
      <div className="diary-container">
        <div className="diary-header">
          <input
            type="text"
            className="diary-title"
            placeholder="Insert title"
            value={title}
            onChange={handleTitleChange}
          />
          <div className="diary-status">
            <span
              className={`diary-private ${isPrivate ? "private" : "public"}`}
            >
              {isPrivate ? "Private" : "Public"}
            </span>
            <span className="diary-edit">
              Last edited {lastEdited ? lastEdited : "xx/xx/xxxx"}
            </span>
          </div>
        </div>
        <form className="diary-form">
          {" "}
          <textarea
            value={entry}
            onChange={handleChange}
            placeholder="Scribble here..."
            rows="10"
            cols="50"
            required
          />
          {/* ... your toolbar ... */}
          <div className="diary-footer">
            <button type="button" className="diary-button" onClick={handleSave}>
              <img
                src={save}
                alt="Share"
                onMouseOver={(e) => (e.currentTarget.src = savehover)}
                onMouseOut={(e) => (e.currentTarget.src = save)}
              />
            </button>
            <button
              type="button"
              className="diary-button"
              onClick={handleTrash}
            >
              <img
                src={send}
                alt="Share"
                onMouseOver={(e) => (e.currentTarget.src = sent)}
                onMouseOut={(e) => (e.currentTarget.src = send)}
              />
            </button>
            <button
              type="button"
              className="diary-button"
              onClick={handleLock}
              onMouseDown={(e) => e.preventDefault()}
            >
              <img
                src={isPrivate ? lock : unlock}
                alt="Lock"
                onMouseOut={(e) =>
                  (e.currentTarget.src = isPrivate ? lock : unlock)
                }
              />
            </button>
            <button type="button" className="diary-button" onClick={handleStar}>
              <img
                src={isFavorite ? star : unstar}
                alt="Star"
                onMouseOut={(e) =>
                  (e.currentTarget.src = isFavorite ? star : unstar)
                }
              />
            </button>
            <button
              type="button"
              className="diary-button"
              onClick={handleTrash}
            >
              <img
                src={closedtrash}
                alt="Trash"
                onMouseOver={(e) => (e.currentTarget.src = opentrash)}
                onMouseOut={(e) => (e.currentTarget.src = closedtrash)}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DiaryEntry;
