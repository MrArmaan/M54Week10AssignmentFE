import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/SocialMediaPage.css";

function SocialMediaPage({ loggedInUser }) {
  const [photos, setPhotos] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get("https://api.unsplash.com/photos", {
        params: { client_id: "qQQGmmQbKDUunBP7z-KoctFBxxQqZnFnV06Ad7cqcxU" },
      });
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const handleLike = async (photoId) => {
    try {
      await axios.post(
        `https://api.unsplash.com/photos/${photoId}/like`,
        {},
        {
          headers: {
            Authorization: "Bearer qQQGmmQbKDUunBP7z-KoctFBxxQqZnFnV06Ad7cqcxU",
          },
        }
      );
      fetchPhotos();
    } catch (error) {
      console.error("Error liking photo:", error);
    }
  };

  const handleComment = async (photoId, comment) => {
    try {
      await axios.post(
        `https://api.unsplash.com/photos/${photoId}/comments`,
        {
          body: comment,
        },
        {
          headers: {
            Authorization: "Bearer qQQGmmQbKDUunBP7z-KoctFBxxQqZnFnV06Ad7cqcxU",
          },
        }
      );
      fetchPhotos();
      setComment("");
    } catch (error) {
      console.error("Error commenting on photo:", error);
    }
  };

  return (
    <div className="social-media-container">
      <h1>Social Media Page</h1>
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-container">
            <img
              src={photo.urls.regular}
              alt={photo.alt_description}
              className="photo"
            />
            <div className="photo-details">
              <p>By: {photo.user.username}</p>
              <p>Likes: {photo.likes}</p>
              <button onClick={() => handleLike(photo.id)}>Like</button>
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="comment-input"
              />
              <button onClick={() => handleComment(photo.id, comment)}>
                Comment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialMediaPage;
