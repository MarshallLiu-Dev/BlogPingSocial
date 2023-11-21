/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc, collection, query, orderBy, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import Comments from "./Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather, faCode, faHeart } from "@fortawesome/free-solid-svg-icons";
import { updateDoc } from "firebase/firestore";


function PostDetails() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const getPostDetails = async () => {
            try {
                const postDoc = await getDoc(doc(db, "posts", postId));
                if (postDoc.exists()) {
                    const postData = { ...postDoc.data(), id: postDoc.id };
                    setPost(postData);
                    const commentsQuery = query(
                        collection(db, "comments"),
                        orderBy("createdAt", "asc")
                    );
                    const commentsData = await getDocs(commentsQuery);
                    const postComments = commentsData.docs
                        .filter((doc) => doc.data().postId === postId)
                        .map((doc) => ({ ...doc.data(), id: doc.id }));
                    setComments(postComments);
                }
            } catch (error) {
                console.error("Erro ao obter os detalhes do post:", error.message);
            }
        };

        getPostDetails();
    }, [postId]);

    const handleLike = async () => {
        try {
           
            const updatedLikes = Array.isArray(post.likes) ? [...post.likes] : [];

            if (!isLiked) {
                updatedLikes.push(auth.currentUser.uid);
            } else {
            
                const index = updatedLikes.indexOf(auth.currentUser.uid);
                if (index !== -1) {
                    updatedLikes.splice(index, 1);
                }
            }

            await updateDoc(doc(db, "posts", postId), {
                likes: updatedLikes,
            });

            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Erro ao curtir o post:", error.message);
        }
    };


    return (
        <div className="postDetailsPage">
            {post && (
                <div className="postDetails">
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
                        <h3> Postado por: <FontAwesomeIcon icon={faCode} /> {post.author.name}</h3>
                    </div>
                    <p className="createdAt">Criado em: {new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
                    <div className="postTextContainer">{post.postText}</div>
                    <div className="likeButtonContainer">
                        <button onClick={handleLike}>
                                <FontAwesomeIcon icon={faHeart} />      {isLiked ? "Descurtir" : "Curtir"}  ({post.likes?.length || 0})
                        </button>

                    </div>
                    <div className="commentsContainer">
                        <h2>Comentários</h2>
                    </div>
                    <Comments postId={postId} />
                </div>
            )}
        </div>
    );
}

export default PostDetails;