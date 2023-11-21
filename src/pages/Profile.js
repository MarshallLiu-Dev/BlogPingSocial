/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from "react";
import { getDocs, collection, where, query, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather, faCode, faComment, faCamera } from "@fortawesome/free-solid-svg-icons";

function Profile() {
    const [userPosts, setUserPosts] = useState([]);
    const [userComments, setUserComments] = useState([]);
    const [userPhotoURL, setUserPhotoURL] = useState(null);
    const [selectedTab, setSelectedTab] = useState('posts');

    useEffect(() => {
        const getUserData = async () => {
            setUserPhotoURL(auth.currentUser.photoURL);

            // Obter os posts do usuário
            const userPostsQuery = query(
                collection(db, "posts"),
                where("author.id", "==", auth.currentUser.uid),
                orderBy("createdAt", "desc")
            );

            const userPostsSnapshot = await getDocs(userPostsQuery);
            const posts = userPostsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setUserPosts(posts);

            // Obter os comentários do usuário
            const userCommentsQuery = query(
                collection(db, "comments"),
                where("author.id", "==", auth.currentUser.uid),
                orderBy("createdAt", "desc")
            );

            const userCommentsSnapshot = await getDocs(userCommentsQuery);
            const comments = userCommentsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setUserComments(comments);
        };

        if (auth.currentUser) {
            getUserData();
        }
    }, []);

    return (
        <div className="profilePage">

            <h1>Perfil do Usuário</h1>
            {auth.currentUser && (
                <div className="userProfile">
                    <img
                        src={userPhotoURL}
                        alt="Perfil do Usuário"
                        style={{ borderRadius: "50%", width: "100px", height: "100px" }}
                    />
                    <h2>{auth.currentUser.displayName}</h2>
                </div>
            )}
            <div className="navPerfil">
                <a href="#" onClick={() => setSelectedTab('posts')}> <FontAwesomeIcon icon={faFeather} /> Posts</a>
                <a href="#" onClick={() => setSelectedTab('comments')}><FontAwesomeIcon icon={faComment}/> Comentários</a>
                {/* <a href="#" onClick={() => setSelectedTab('midia')}><FontAwesomeIcon icon={faCamera} /> Midia</a> */}
            </div>

            {selectedTab === 'posts' && (
                <div className="userPosts">
                    {userPosts.map((post) => (

                        <div className="post" key={post.id}>
                            <div class="tools">
                                <div class="circle">
                                    <span class="red box"></span>
                                </div>
                                <div class="circle">
                                    <span class="yellow box"></span>
                                </div>
                                <div class="circle">
                                    <span class="green box"></span>
                                </div>
                            </div>
                            <div className="authorInfo">
                                <p>Postado por: <FontAwesomeIcon icon={faCode} /> {post.author.name}</p>
                            </div>
                            <div className="postTextContainer">{post.postText}</div>
                            <p className="createdAt">Criado em: {new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}

            {selectedTab === 'comments' && (
                <div className="userComments">
                    {userComments.map((comment) => (
                        <div className="comment" key={comment.id}>
                            <div class="tools">
                                <div class="circle">
                                    <span class="red box"></span>
                                </div>
                                <div class="circle">
                                    <span class="yellow box"></span>
                                </div>
                                <div class="circle">
                                    <span class="green box"></span>
                                </div>
                            </div>
                            <h3> Comentado por: <FontAwesomeIcon icon={faCode} /> {comment.author.name}</h3>
                            <div className="commentTextContainer">{comment.text}</div>
                            <p className="createdAt">Comentado em: {new Date(comment.createdAt?.seconds * 1000).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Profile;
