import { KeyboardEvent, useRef, useState, useEffect } from "react";
import { useGlobalContext } from "../GlobalContext";
import logoName from "../assets/logoName.svg";
import botonIniciar from "../assets/iniciar.svg";
import Princess from "../assets/princess.svg";
import Knight from "../assets/knight.svg";
import Dino from "../assets/dino.svg";
import btnPrincess from "../assets/princess-btn.svg";
import btnKnight from "../assets/knight-btn.svg";
import btnDino from "../assets/dino-btn.svg";
import info from "../assets/info.svg";
import "../styles/pages/Home.css";
import { CustomModal } from "../components/Modal";

const Home = () => {
  const { setPage, character, setCharacter, setPersonajeImage, retorno, setRetorno } = useGlobalContext();
  const characterRef = useRef<HTMLImageElement>(null);
  const [announcement, setAnnouncement] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const startButtonRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      changeCharacter();
    }
  };

  const changeCharacter = () => {
    if (character === "PRINCESS") {
      setPersonajeImage(Knight);
      setCharacter("KNIGHT");
    } else if (character === "KNIGHT") {
      setPersonajeImage(Dino);
      setCharacter("DINO");
    } else {
      setPersonajeImage(Princess);
      setCharacter("PRINCESS");
    }

    // Mantener el foco en el botón del personaje seleccionado
    if (characterRef.current) {
      characterRef.current.focus();
    }
  };

  const handleInfoClick = () => {
    setIsModalOpen(true);
  };

  const handleInfoKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleInfoClick();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal sin cambiar el foco
  };

  useEffect(() => {
    if (retorno) {
      setRetorno(false);
    } else {
      setAnnouncement(`Personaje: ${character}`);
    }
  }, [character, retorno, setRetorno]);

  return (
    <div className="home-page-container">
      <div className="header">
        <img
          tabIndex={0}
          src={logoName}
          width="960px"
          height="380px"
          alt="Math Monsters"
          aria-label="Math Monsters logo"
        />
        <div className="character-info" style={{ margin: '0 20px 20px 0' }}>
          <img
            tabIndex={0}
            role="button"
            src={character === "PRINCESS" ? btnPrincess : character === "KNIGHT" ? btnKnight : btnDino}
            width="194px"
            height="164px"
            onClick={changeCharacter}
            onKeyDown={handleKeyDown}
            className="select-character"
            alt={`Seleccionar personaje ${character}`}
            aria-label={`Seleccionar personaje ${character}`}
            ref={characterRef}
          />
          <div
            aria-live="assertive"
            className="announcement"
            style={{ color: 'white'}}
          >
            {announcement}
          </div>
          <img
            tabIndex={0}
            role="button"
            src={info}
            width="44px"
            height="44px"
            className="info"
            alt="Información"
            onClick={handleInfoClick}
            onKeyDown={handleInfoKeyDown}
          />
        </div>
      </div>
      <div className="start">
        <div
          tabIndex={0}
          role="button"
          onClick={() => setPage("GAME")}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setPage("GAME");
            }
          }}
          ref={startButtonRef}
          style={{ cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}
          aria-label="Iniciar juego"
        >
          <img
            src={botonIniciar}
            alt="Iniciar juego"
            width="505px"
            height="127px"
          />
          
        </div>
        {character === "PRINCESS" && (
        <img
          tabIndex={0}
          src={Princess}
          width="227px"
          height="320px"
          alt="Princesa"
        />
      )}
      {character === "KNIGHT" && (
        <img
          tabIndex={0}
          src={Knight}
          width="227px"
          height="320px"
          alt="Caballero"
        />
      )}
      {character === "DINO" && (
        <img
          tabIndex={0}
          src={Dino}
          width="227px"
          height="320px"
          alt="Dinosaurio"
        />
      )}
      </div>
      <CustomModal isOpen={isModalOpen} onCloseModal={closeModal} />
    </div>
  );
};

export default Home;

