import React, { useEffect, useState, useCallback } from "react";
import {
    getDocs,
    collection,
    deleteDoc,
    doc,
    orderBy,
    query,
    updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";

function CommentDashboard() {
    const [comments, setComments] = useState([]);
    const [editCommentText, setEditCommentText] = useState("");
    const [editCommentId, setEditCommentId] = useState(null);

    const deleteComment = useCallback(async (id) => {
        const commentDoc = doc(db, "comments", id);
        await deleteDoc(commentDoc);
        getComments();
    }, []);

    const editComment = useCallback(async () => {
        if (editCommentId) {
            const commentDoc = doc(db, "comments", editCommentId);
            await updateDoc(commentDoc, { text: editCommentText });
            setEditCommentId(null);
            setEditCommentText("");
            getComments();
        }
    }, [editCommentText, editCommentId]);

    const getComments = async () => {
        try {
            const q = query(collection(db, "comments"), orderBy("createdAt", "desc"));
            const data = await getDocs(q);

            const commentsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setComments(commentsData);
        } catch (error) {
            console.error("Erro ao obter os comentários:", error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getComments();
            }
        });

        return () => unsubscribe();
    }, [deleteComment, editComment]);

    const handleEditClick = (commentId, commentText) => {
        setEditCommentId(commentId);
        setEditCommentText(commentText);
    };

    return (
        <div className="commentDashboard">
            <h1>Comentarios</h1>
            <div className="commentList">
                {comments.map((comment) => (
                    <div className="comment" key={comment.id}>
                        <div className="commentHeader">
                            <div className="deleteComment">
                                {auth.currentUser && (
                                    <>
                                        <button
                                            className="edit"
                                            onClick={() => handleEditClick(comment.id, comment.text)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => deleteComment(comment.id)}
                                        >
                                            &#128465; Excluir
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="commentTextContainer">{comment.text}{comment.commentText}</div>
                        <p className="createdAt">
                            Criado em: {new Date(comment.createdAt?.seconds * 1000).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
            {editCommentId && (
                <div className="editCommentForm">
                    <textarea
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        placeholder="Editar comentário"
                    />
                    <button onClick={editComment}>
                        <FontAwesomeIcon icon={faFeather} style={{ color: "#dedede" }} /> Salvar Edições
                    </button>
                </div>
            )}
        </div>
    );
}

export default CommentDashboard;

