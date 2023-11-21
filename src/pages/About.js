import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {  } from "@fortawesome/free-solid-svg-icons";


function About() {
    return (
        <div className="aboutPage">
            <h1>Sobre o Projeto</h1>
            <p>
                Bem-vindo ao Ping! Este é um espaço onde os usuários podem compartilhar suas ideias,
                pensamentos e experiências. Nossa comunidade é dedicada à troca construtiva e à conexão entre pessoas
                com interesses semelhantes.
            </p>
            <p>
                Este projeto foi criado com React e Firebase para fornecer uma plataforma interativa e segura para
                expressar e compartilhar suas ideias. Sinta-se à vontade para explorar os posts, interagir com outros
                usuários e fazer parte da nossa comunidade!
            </p>
            <p>
                Se tiver alguma dúvida ou feedback, não hesite em nos contatar. Agradecemos por fazer parte desta
                jornada conosco!
            </p>
            <div className="footer-container">
                <footer className="footer">
                    <div className="footer-icons">
                        <a href="https://github.com/MarshallLiu-Dev/Blog.PingSocial-.git" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a href="https://twitter.com/seu-usuario-do-twitter" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://www.linkedin.com/in/paulo-henrique-martins-de-morais-309997240/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </div>
                    <p>&copy; 2023 Ping Social. Todos os direitos reservados.</p>
                </footer>
            </div>
        </div>
    );
}

export default About;
