import React, { useEffect, useState } from "react";
import "./FacebookProfile.css";

export default function FacebookProfile() {
  const [post, setPost] = useState("");
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/mensagens")
      .then((response) => response.json())
      .then((data) => setPostList(data))
      .catch((error) => console.error("Erro:", error));
  }, []);

  const handlePost = (e) => {
    setPost(e.target.value);
  };

  const sendPost = () => {
    if (!post || post.trim() === "") return;

    fetch("http://localhost:8000/mensagens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mensagem: post })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sucesso) {
          setPostList(data.mensagens);
          setPost("");
        } else {
          console.error("Erro ao postar:", data.erro);
        }
      })
      .catch((error) => console.error("Erro na requisição:", error));
  };

  const loadPosts = () => {
    return postList
      .slice()
      .reverse()
      .map((value, index) => (
        <div className="post" key={index}>
          <div className="post-header">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
            />
            <div>
              <div className="user-name">{value.autor}</div>
              <div className="post-time">
                {new Date(value.data).toLocaleString()}
              </div>
            </div>
          </div>
          <p>{value.texto}</p>
        </div>
      ));
  };

  return (
    <div className="facebook-profile">
      <div className="cover-photo">
        <img
          src="https://static.vecteezy.com/ti/vetor-gratis/t1/11171103-fundo-moderno-branco-e-laranja-gratis-vetor.jpg"
          alt="Cover"
        />
        <div className="profile-info">
          <img
            src="https://static8.depositphotos.com/1338574/829/i/950/depositphotos_8292937-stock-photo-the-letter-b-in-gold.jpg"
            alt="Profile"
            className="profile-picture"
          />
          <div className="profile-name">Beatris</div>
        </div>
      </div>

      <div className="nav-bar">
        <div>Posts</div>
        <div>About</div>
        <div>Friends</div>
        <div>Photos</div>
        <div>More</div>
      </div>

      <div className="content-section">
        <div className="left-column">
          <div className="intro-box">
            <h2>Dados</h2>
            <p>Trabalho: Sim</p>            
            <p>Idade: 21</p> 
          </div>
          <div className="photos-box">
            <h2>Fotos</h2>
            <div className="photo-grid">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <img
                  key={num}
                  src={`https://source.unsplash.com/random/100x100?sig=${num}`}
                  alt={`Photo${num}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="post-box">
            <textarea
              placeholder="Faça um post!"
              onChange={handlePost}
              value={post}
            />
            <button onClick={sendPost}>Postar</button>
          </div>

          <div className="posts">{loadPosts()}</div>
        </div>
      </div>
    </div>
  );
}
