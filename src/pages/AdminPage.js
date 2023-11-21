/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from "react";
import CommentDashboard from "../components/CommentDashboard";
import PostDashboard from "../components/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather, faCode, faComment, faCamera } from "@fortawesome/free-solid-svg-icons";

function AdminPage() {
    const [selectedDashboard, setSelectedDashboard] = useState('posts');

    return (
        <div className="adminPage">
            <h1>Página de Edição</h1>

            <div className="navPerfil">
                <a href="#" onClick={() => setSelectedDashboard('posts')}><FontAwesomeIcon icon={faFeather} />  Posts</a>
                <a href="#" onClick={() => setSelectedDashboard('comments')}><FontAwesomeIcon icon={faComment} />  Comentários</a>
                {/* <a href="#" onClick={() => setSelectedDashboard('midia')}><FontAwesomeIcon icon={faCamera} /> Midia</a> */}
            </div>

            <div className="dashboards">
                {selectedDashboard === 'posts' && (
                    <div className="postsDashboard">
                        <PostDashboard />
                    </div>
                )}

                {selectedDashboard === 'comments' && (
                    <div className="commentsDashboard">
                        <CommentDashboard />
                    </div>
                )}
                {/* {selectedDashboard === 'midia' && (
                    <div className="commentsDashboard">
                    </div>
                )} */}
            </div>
        </div>
    );
}

export default AdminPage;
