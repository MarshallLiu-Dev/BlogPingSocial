import React, { useState, useEffect } from "react";
import { getDocs, collection, query, where, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather, faCode, faComment } from "@fortawesome/free-solid-svg-icons";

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const getComments = async () => {
            try {
                const q = query(
                    collection(db, "comments"),
                    where("postId", "==", postId),
                    orderBy("createdAt", "asc")
                );
                const data = await getDocs(q);
                const commentsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setComments(commentsData);
            } catch (error) {
                console.error("Erro ao obter os comentários:", error.message);
            }
        };

        getComments();
    }, [postId]);

    const handleAddComment = async () => {
        try {
            const docRef = await addDoc(collection(db, "comments"), {
                postId,
                text: newComment,
                author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
                createdAt: serverTimestamp(),
            });
            setComments([...comments, { id: docRef.id, text: newComment, author: { name: auth.currentUser.displayName, id: auth.currentUser.uid }, createdAt: new Date() }]);
            setNewComment("");
        } catch (error) {
            console.error("Erro ao adicionar o comentário:", error.message);
        }
    };

    return (
        <div className="commentsContainer">
            {comments.map((comment) => (
                <div key={comment.id} className="commentDetails">
                    <h3> Comentado por: <FontAwesomeIcon icon={faCode} /> {comment.author.name}</h3>
                    <p><strong><FontAwesomeIcon icon={faComment} /></strong> {comment.text}{comment.commentText}</p>
                </div>
            ))}
            {auth.currentUser && (
                <div className="newComment">
                    <textarea
                        placeholder="Adicione um comentário"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={handleAddComment}><FontAwesomeIcon icon={faFeather} style={{ color: "#dedede" }} /> Comentar</button>
                </div>
            )}
        </div>
    );
}

export default Comments;
