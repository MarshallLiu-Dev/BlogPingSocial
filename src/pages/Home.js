/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from "react";
// import { getDocs, collection, orderBy, query } from "firebase/firestore";
// import { Link } from "react-router-dom"; 
// import { auth, db } from "../firebase-config";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFeather, faCode } from "@fortawesome/free-solid-svg-icons";

// function Home({ isAuth }) {
//   const [postLists, setPostList] = useState([]);

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
//   }, []);

//   return (
//     <div className="homePage">
//       {postLists.map((post) => (
//         <div className="post" key={post.id}>
//           <div className="postHeader">
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
//               <p>Postado por: <FontAwesomeIcon icon={faCode} /> {post.author.name}</p>
//             </div>
//           )}
//           <p className="createdAt">Criado em: {new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
//           <div className="postTextContainer">{post.postText}</div>
//           <Link to={`/post/${post.id}`}>
//             <p className="createdAt">Ver Detalhes</p>
//             </Link>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Home;

// import React, { useEffect, useState } from "react";
// import { getDocs, collection, orderBy, query } from "firebase/firestore";
// import { Link } from "react-router-dom";
// import { auth, db } from "../firebase-config";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFeather, faCode, faComment, faHeart } from "@fortawesome/free-solid-svg-icons";

// function Home({ isAuth }) {
//   const [postLists, setPostList] = useState([]);

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
//   }, []);

//   return (
//     <div className="homePage">
//       {postLists.map((post) => (
//         <div className="post" key={post.id}>
//           <div className="postHeader">
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
//               <p>Postado por: <FontAwesomeIcon icon={faCode} /> {post.author.name}</p>
//             </div>
//           )}
//           <p className="createdAt">Criado em: {new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
//           <div className="postTextContainer">{post.postText}</div>
//           <div className="likesContainer">
//             <p className="likes">
//               <FontAwesomeIcon icon={faHeart} /> {post.likes ? post.likes.length : 0}
//             </p>
//             <p className="comments">
//               <FontAwesomeIcon icon={faComment} /> {post.comments ? post.comments.length : 0}
//             </p>
//           </div>
//           <Link to={`/post/${post.id}`}>
//             <p className="createdAt">Ver Detalhes</p>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Home;


// import React, { useEffect, useState } from "react";
// import { getDocs, collection, orderBy, query, where } from "firebase/firestore";
// import { Link } from "react-router-dom";
// import { auth, db } from "../firebase-config";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFeather, faCode, faComment, faHeart } from "@fortawesome/free-solid-svg-icons";

// function Home({ isAuth }) {
//   const [postLists, setPostList] = useState([]);

//   useEffect(() => {
//     const getPosts = async () => {
//       try {
//         const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
//         const data = await getDocs(q);

//         const posts = await Promise.all(
//           data.docs.map(async (doc) => {
//             const postData = { ...doc.data(), id: doc.id };
//             const commentsQuery = query(
//               collection(db, "comments"),
//               where("postId", "==", postData.id)
//             );
//             const commentsData = await getDocs(commentsQuery);
//             const commentsCount = commentsData.size;

//             return { ...postData, commentsCount };
//           })
//         );

//         setPostList(posts);
//         console.log("Posts:", posts);
//       } catch (error) {
//         console.error("Erro ao obter os posts:", error.message);
//       }
//     };

//     getPosts();
//   }, []);

//   return (
//     <div className="homePage">
//       {postLists.map((post) => (
//         <div className="post" key={post.id}>
//           <div className="postHeader">
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
//               <p>Postado por: <FontAwesomeIcon icon={faCode} /> {post.author.name}</p>
//             </div>
//           )}
//           <p className="createdAt">Criado em: {new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
//           <div className="postTextContainer">{post.postText}</div>
          // <div className="likesContainer">
          //   <p className="likes">
          //     <FontAwesomeIcon icon={faHeart} /> {post.likes ? post.likes.length : 0}
          //   </p>
          //   <p className="comments">
          //     <FontAwesomeIcon icon={faComment} /> {post.comments ? post.comments.length : 0}
          //   </p>
          // </div>
//           <Link to={`/post/${post.id}`}>
//             <p className="createdAt">Ver Detalhes</p>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Home;



// import React, { useEffect, useState } from "react";
// import { getDocs, collection, orderBy, query, where } from "firebase/firestore";
// import { Link } from "react-router-dom";
// import { auth, db } from "../firebase-config";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFeather, faCode } from "@fortawesome/free-solid-svg-icons";

// function Home({ isAuth }) {
//   const [postLists, setPostList] = useState([]);

//   useEffect(() => {
//     // funcional numero de comentarios 
//   //   const getPosts = async () => {
//   //     try {
    //     const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    //     const data = await getDocs(q);

    //     const posts = data.docs.map(async (doc) => {
    //       const postId = doc.id;
    //       const commentsQ = query(collection(db, "comments"), where("postId", "==", postId));

    //       try {
    //         const commentsData = await getDocs(commentsQ);
    //         const commentsCount = commentsData.docs.length;

    //         console.log(`Post ${postId} - Comentários:`, commentsData.docs.map((comment) => comment.data()));

    //         return { ...doc.data(), id: doc.id, commentsCount };
    //       } catch (error) {
    //         console.error("Erro ao obter comentários:", error.message);
    //         return { ...doc.data(), id: doc.id, commentsCount: 0 };
    //       }
    //     });

    //     Promise.all(posts).then((postsWithComments) => {
    //       setPostList(postsWithComments);
    //     });

    //   } catch (error) {
    //     console.error("Erro ao obter os posts:", error.message);
    //   }
    // };

//   //   getPosts();
//   // }, []);

//   // teste curidas e comentarios 
//     const getPosts = async () => {
//       try {
//         const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
//         const data = await getDocs(q);

//         const posts = data.docs.map(async (doc) => {
//           const postId = doc.id;
//           const commentsQ = query(collection(db, "comments"), where("postId", "==", postId));

//           try {
//             const commentsData = await getDocs(commentsQ);
//             const commentsCount = commentsData.docs.length;

//             // Ajuste na consulta de curtidas
//             const likesQ = query(collection(db, "likes"), where("postId", "==", postId));
//             const likesData = await getDocs(likesQ);
//             const likesCount = likesData.docs.length;

//             console.log(`Post ${postId} - Comentários:`, commentsData.docs.map((comment) => comment.data()));
//             console.log(`Post ${postId} - Curtidas:`, likesData.docs.map((like) => like.data()));

//             return { ...doc.data(), id: doc.id, commentsCount, likesCount };
//           } catch (error) {
//             console.error("Erro ao obter dados adicionais:", error.message);
//             return { ...doc.data(), id: doc.id, commentsCount: 0, likesCount: 0 };
//           }
//         });

//         Promise.all(posts).then((postsWithExtras) => {
//           setPostList(postsWithExtras);
//         });

//       } catch (error) {
//         console.error("Erro ao obter os posts:", error.message);
//       }
//     };

//     getPosts();
//   }, []);


//   return (
//     <div className="homePage">
//       {postLists.map((post) => (
//         <div className="post" key={post.id}>
//           <div className="postHeader">
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
//               <p>Postado por: <FontAwesomeIcon icon={faCode} /> {post.author.name}</p>
//             </div>
//           )}
//           <p className="createdAt">Criado em: {new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
//           <div className="postTextContainer">{post.postText}</div>
//           <p className="likesCount">Curtidas: {post.likesCount}</p>
//           <p className="commentsCount">Comentários: {post.commentsCount}</p>
//           <Link to={`/post/${post.id}`}>
//             <p className="createdAt">Ver Detalhes</p>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Home;


// // Funciona numero de curtidas 
// import React, { useEffect, useState } from "react";
// import { getDocs, collection, orderBy, query } from "firebase/firestore";
// import { Link } from "react-router-dom";
// import { auth, db } from "../firebase-config";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFeather, faCode } from "@fortawesome/free-solid-svg-icons";

// function Home({ isAuth }) {
//   const [postLists, setPostList] = useState([]);
//   const [likesCount, setLikesCount] = useState({});

//   useEffect(() => {
    
//     const getPosts = async () => {
//       try {
//         const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
//         const data = await getDocs(q);

//         const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//         setPostList(posts);

//         // Obtendo e armazenando a contagem de curtidas para cada post
//         const likesCountData = {};
//         posts.forEach((post) => {
//           likesCountData[post.id] = post.likes ? post.likes.length : 0;
//         });
//         setLikesCount(likesCountData);

//         console.log("Posts:", posts);
//       } catch (error) {
//         console.error("Erro ao obter os posts:", error.message);
//       }
//     };

//     getPosts();
//   }, []);

//   return (
//     <div className="homePage">
//       {postLists.map((post) => (
//         <div className="post" key={post.id}>
//           <div className="postHeader">
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
//               <p>Postado por: <FontAwesomeIcon icon={faCode} /> {post.author.name}</p>
//             </div>
//           )}
//           <p className="createdAt">Criado em: {new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
//           <div className="postTextContainer">{post.postText}</div>
//           <p className="likesCount">Curtidas: {likesCount[post.id]}</p>
//           <Link to={`/post/${post.id}`}>
//             <p className="createdAt">Ver Detalhes</p>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Home;



import React, { useEffect, useState } from "react";
import { getDocs, collection, orderBy, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faHeart, faComment } from "@fortawesome/free-solid-svg-icons";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const [likesCount, setLikesCount] = useState({});

  useEffect(() => {
    const getPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const data = await getDocs(q);

        const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        // Obtendo e armazenando a contagem de curtidas para cada post
        const likesCountData = {};
        posts.forEach((post) => {
          likesCountData[post.id] = post.likes ? post.likes.length : 0;
        });

        console.log("Curtidas:", likesCountData);


        setLikesCount(likesCountData);

        const postsWithComments = await Promise.all(
          posts.map(async (post) => {
            const postId = post.id;
            const commentsQ = query(collection(db, "comments"), where("postId", "==", postId));

            try {
              const commentsData = await getDocs(commentsQ);
              const commentsCount = commentsData.docs.length;

              console.log(`Post ${postId} - Comentários:`, commentsData.docs.map((comment) => comment.data()));

              return { ...post, commentsCount };
            } catch (error) {
              console.error("Erro ao obter comentários:", error.message);
              return { ...post, commentsCount: 0 };
            }
          })
        );

        console.log("Contagem de Curtidas após o processamento:", likesCount);

        setPostList(postsWithComments);

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
              <p>Postado por: <FontAwesomeIcon icon={faCode} /> {post.author.name}</p>
            </div>
          )}
          <p className="createdAt">Criado em: {new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
          <div className="postTextContainer">{post.postText}</div>
        
          
          <div className="likesContainer">
            <p className="likes">
              <FontAwesomeIcon icon={faHeart} /> Curtidas:  {likesCount[post.id]}
            </p>
            <p className="comments">
              <FontAwesomeIcon icon={faComment} /> Comentários:  {post.commentsCount} 
            </p>
          </div>
          
          <Link to={`/post/${post.id}`}>
            <p className="createdAt">Ver Detalhes</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;