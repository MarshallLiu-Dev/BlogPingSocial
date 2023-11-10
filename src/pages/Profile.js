import React, { useEffect, useState } from "react";
import { getDocs, collection, where, query } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Profile() {
    const [userPosts, setUserPosts] = useState([]);
    const [userPhotoURL, setUserPhotoURL] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            setUserPhotoURL(auth.currentUser.photoURL);
            const userPostsQuery = query(
                collection(db, "posts"),
                where("author.id", "==", auth.currentUser.uid)
            );

            const userPostsSnapshot = await getDocs(userPostsQuery);
            const posts = userPostsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setUserPosts(posts);
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
            <div className="userPosts">
                <h3>Seus Posts</h3>
                {userPosts.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="postTextContainer">{post.postText}</div>
                        <p className="createdAt">Criado em: {new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;
