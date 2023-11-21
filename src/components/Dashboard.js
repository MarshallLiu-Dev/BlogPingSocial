/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import { getDocs, collection, deleteDoc, doc, orderBy, query, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
    const [postList, setPostList] = useState([]);
    const [editText, setEditText] = useState("");
    const [editPostId, setEditPostId] = useState(null);

    const deletePost = useCallback(async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
        getPosts();
    }, []);

    const editPost = useCallback(async () => {
        if (editPostId) {
            const postDoc = doc(db, "posts", editPostId);
            await updateDoc(postDoc, { postText: editText });
            setEditPostId(null);
            setEditText("");
            getPosts();
        }
    }, [editText, editPostId]);

    const getPosts = async () => {
        try {
            const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
            const data = await getDocs(q);

            const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setPostList(posts);
        } catch (error) {
            console.error("Erro ao obter os posts:", error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getPosts();
            }
        });

        return () => unsubscribe();
    }, [deletePost, editPost]);

    const handleEditClick = (postId, postText) => {
        setEditPostId(postId);
        setEditText(postText);
    };

    return (
        <div className="dashboard">
            <h1>Posts</h1>
            <div className="postList">
                {postList.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="postHeader">
                            <div className="deletePost">
                                {auth.currentUser && post.author && post.author.id === auth.currentUser.uid && (
                                    <>
                                        <button className="edit" onClick={() => handleEditClick(post.id, post.postText)}>
                                            Editar
                                        </button>
                                        <button className="delete" onClick={() => deletePost(post.id)}> &#128465; Excluir</button>

                                    </>
                                )}
                            </div>
                        </div>
                        <div className="postTextContainer">{post.postText}</div>
                        <p className="createdAt">Criado em: {new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
                    </div>
                ))}
            </div>
            {editPostId && (
                <div className="editPostForm">
                    <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Editar post"
                    />
                    <button onClick={editPost}><FontAwesomeIcon icon={faFeather} style={{ color: "#dedede" }} /> Salvar Edições</button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
