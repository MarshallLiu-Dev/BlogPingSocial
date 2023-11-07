// import React, { useEffect, useState } from "react";
// import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
// import { auth, db } from "../firebase-config";

// function Home({ isAuth }) {
//   const [postLists, setPostList] = useState([]);

//   const deletePost = async (id) => {
//     const postDoc = doc(db, "posts", id);
//     await deleteDoc(postDoc);
//   };

//   useEffect(() => {
//     const getPosts = async () => {
//       const data = await getDocs(collection(db, "posts"));
//       setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
//           <div className="postTextContainer"> {post.postText} </div>
//           {post.author && <h3>@{post.author.name}</h3>}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Home;


import React, { useEffect, useState, useCallback } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);

  const deletePost = useCallback(async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  }, [db]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost]);

  return (
    <div className="homePage">
      {postLists.map((post) => (
        <div className="post" key={post.id}>
          <div className="postHeader">
            <div className="deletePost">
              {isAuth && post.author && post.author.id === auth.currentUser.uid && (
                <button
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  {" "}
                  &#128465;
                </button>
              )}
            </div>
          </div>
          <div className="postTextContainer"> {post.postText} </div>
          {post.author && <h3>@{post.author.name}</h3>}
        </div>
      ))}
    </div>
  );
}

export default Home;
