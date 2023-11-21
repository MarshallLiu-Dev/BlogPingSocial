/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";

function CreatePost({ isAuth }) {
  const [postText, setPostText] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    try {
      const docRef = await addDoc(postsCollectionRef, {
        postText,
        author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        createdAt: serverTimestamp(),
      });
      setCreatedAt(docRef.id);
      setSuccessMessage("Post criado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao criar post:", error.message);
      setSuccessMessage("Erro ao criar post. Por favor, tente novamente.");
    }
  };

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Cria Ping</h1>
        <div className="inputGp">
          <textarea
            placeholder="O que está acontecendo?"
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button onClick={createPost}>
          <FontAwesomeIcon icon={faFeather} style={{ color: "#dedede" }} /> Postar
        </button>
        {createdAt && (
          <p style={{ marginTop: "10px", color: "#888" }}>
            Post criado em: {new Date(createdAt).toLocaleString()}
          </p>
        )}
        {successMessage && <p style={{ marginTop: "10px", color: "#4CAF50" }}>{successMessage}</p>}
      </div>
    </div>
  );
}

export default CreatePost;
