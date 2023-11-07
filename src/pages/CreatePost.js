import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Cria Ping</h1>
        <div className="inputGp">
          <textarea
            placeholder="o que está acontecendo?"
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button onClick={createPost}>Postar</button>
      </div>
    </div>
  );
}

export default CreatePost;




// import React, { useState, useEffect } from "react";
// import { addDoc, collection } from "firebase/firestore";
// import { db, auth } from "../firebase-config";
// import { useNavigate } from "react-router-dom";

// function CreatePost({ isAuth }) {
//   const [combinedField, setCombinedField] = useState("");
//   const [formError, setFormError] = useState("");
//   let navigate = useNavigate();

//   const postsCollectionRef = collection(db, "posts");

//   const createPost = async () => {
//     if (!combinedField.trim()) {
//       setFormError("Por favor, preencha o campo combinado.");
//       return;
//     }

//     const [postText, image, tagsString] = combinedField.split('|');
//     const tagsArray = tagsString.split(",").map((tag) => tag.trim().toLowerCase());

//     try {
//       new URL(image);
//     } catch (error) {
//       setFormError("A imagem precisa ser uma URL válida.");
//       return;
//     }

//     await addDoc(postsCollectionRef, {
//       postText,
//       image,
//       tags: tagsArray,
//       author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
//     });
//     navigate("/");
//   };

//   useEffect(() => {
//     if (!auth.currentUser) {
//       navigate("/login");
//     }
//   }, [navigate]);

//   return (
//     <div className="createPostPage">
//       <div className="cpContainer">
//         <h1>Cria Ping</h1>
//         <label>
//           <span>O que está acontecendo? | Imagem | Tags:</span>
//           <textarea
//             placeholder="Descreva o que está acontecendo, insira a URL da imagem e as tags separadas por vírgula (ex: minha postagem|URL|tag1, tag2)"
//             onChange={(e) => setCombinedField(e.target.value)}
//             value={combinedField}
//           />
//         </label>
//         <button onClick={createPost}>Postar</button>
//         {formError && <p className="error">{formError}</p>}
//       </div>
//     </div>
//   );
// }

// export default CreatePost;

