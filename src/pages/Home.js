/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState, useCallback } from "react";
// import { getDocs, collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
// import { auth, db } from "../firebase-config";

// function Home({ isAuth }) {
//   const [postLists, setPostList] = useState([]);

//   const deletePost = useCallback(async (id) => {
//     const postDoc = doc(db, "posts", id);
//     await deleteDoc(postDoc);
//   }, [db]);

//   useEffect(() => {
//     const getPosts = async () => {
//       try {
//         const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
//         const data = await getDocs(q);

//         const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//         setPostList(posts);
//         console.log("Posts:", posts);
//       } catch (error) {
//         console.error("Erro ao obter os posts:", error.message);
//       }
//     };

//     getPosts();
//   }, [deletePost]);

//   return (
//     <div className="homePage">
//       {postLists.map((post) => (
//         <div className="post" key={post.id}>
//           <div className="postHeader">
//             <div className="deletePost">
//               {isAuth && post.author && post.author.id === auth.currentUser.uid && (
//                 <button
//                   onClick={() => {
//                     deletePost(post.id);
//                   }}
//                 >
//                   {" "}
//                   &#128465;
//                 </button>
//               )}
//             </div>
//           </div>
//           <div class="tools">
//             <div class="circle">
//               <span class="red box"></span>
//             </div>
//             <div class="circle">
//               <span class="yellow box"></span>
//             </div>
//             <div class="circle">
//               <span class="green box"></span>
//             </div>
//           </div>
//           {post.author && (
//             <div className="authorInfo">
//               <h3>@{post.author.name}</h3>
//             </div>
//           )}
//           <p className="createdAt">Criado em: {new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
//           <div className="postTextContainer"> {post.postText} </div>

//         </div>
//       ))}
//     </div>
//   );
// }

// export default Home;

/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const data = await getDocs(q);

        const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPostList(posts);
        console.log("Posts:", posts);
      } catch (error) {
        console.error("Erro ao obter os posts:", error.message);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="homePage">
      {postLists.map((post) => (
        <div className="post" key={post.id}>
          <div className="postHeader">
          </div>
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
          {post.author && (
            <div className="authorInfo">
              <h3>@{post.author.name}</h3>
            </div>
          )}
          <p className="createdAt">Criado em: {new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
          <div className="postTextContainer"> {post.postText} 
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
