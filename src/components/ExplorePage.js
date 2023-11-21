// ExplorePage.js
import React, { useEffect, useState } from "react";
import { getDocs, collection, orderBy, query, limit } from "firebase/firestore";
import { db } from "../firebase-config";

function ExplorePage() {
    const [mostCommentedPosts, setMostCommentedPosts] = useState([]);
    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {
        // Obter os posts mais comentados
        const fetchMostCommentedPosts = async () => {
            try {
                const q = query(collection(db, "posts"), orderBy("commentCount", "desc"), limit(5));
                const data = await getDocs(q);
                const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setMostCommentedPosts(posts);
            } catch (error) {
                console.error("Erro ao obter os posts mais comentados:", error.message);
            }
        };

        // Obter os usuários mais recentes
        const fetchRecentUsers = async () => {
            try {
                const q = query(collection(db, "users"), orderBy("createdAt", "desc"), limit(4));
                const data = await getDocs(q);
                const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
                setRecentUsers(users);
            } catch (error) {
                console.error("Erro ao obter os usuários mais recentes:", error.message);
            }
        };

        fetchMostCommentedPosts();
        fetchRecentUsers();
    }, []);

    return (
        <div className="explorePage">
            <div className="mostCommentedPosts">
                <h2>Posts Mais Comentados</h2>
                <ul>
                    {mostCommentedPosts.map((post) => (
                        <li key={post.id}>{post.postText}</li>
                    ))}
                </ul>
            </div>
            <div className="recentUsers">
                <h2>Usuários Mais Recentes</h2>
                <ul>
                    {recentUsers.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ExplorePage;
