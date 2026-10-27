
import { useEffect, useState } from 'react';
import './App.css';

import Missao1 from './missao1/missao1.tsx';
import Missao2 from './missao2/missao2.tsx';
import Missao3 from './missao3/missao3.tsx';
import Missao4 from './missao4/missao4.tsx';
import Missao5 from './missao5/missao5.tsx';

function App() {
  const [segundaTela, setSegundaTela] = useState(false);
  const [telaIntroducao, setTelaIntroducao] = useState(false);
  const [dialogoHelena, setDialogoHelena] = useState(false);
  const [missaoAtual, setMissaoAtual] = useState(0);

  const backgroundImage = `url("${import.meta.env.BASE_URL}fundo.png")`;

  useEffect(() => {
    if (!telaIntroducao || dialogoHelena) return;

    const timer = setTimeout(() => {
      setDialogoHelena(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [telaIntroducao, dialogoHelena]);

  const iniciarJornada = () => {
    setMissaoAtual(1);
  };

  if (missaoAtual > 0) {
    switch (missaoAtual) {
      case 1:
        return (
          <Missao1
            onConcluir={() => setMissaoAtual(2)}
          />
        );

      case 2:
        return (
          <Missao2
            onConcluir={() => setMissaoAtual(3)}
          />
        );

      case 3:
        return (
          <Missao3
            onConcluir={() => setMissaoAtual(4)}
          />
        );

      case 4:
        return (
          <Missao4
            onConcluir={() => setMissaoAtual(5)}
          />
        );

      case 5:
        return <Missao5 />;

      default:
        return null;
    }
  }

  return (
    <main
      className="tela-inicial"
      style={{ backgroundImage }}
    >
      <div className="tela-inicial__overlay" />

      {!segundaTela ? (
        <section className="cena-inicial">
          <div className="cena-inicial__conteudo">
            <h1 className="cena-inicial__titulo">
              Green Valley
            </h1>

            <p className="cena-inicial__subtitulo">
              O desafio da inovação verde
            </p>

            <button
              className="cena-inicial__botao"
              onClick={() => setSegundaTela(true)}
            >
              Vamos começar!
            </button>
          </div>

          <div className="cena-inicial__personagem">
            <img
              src={`${import.meta.env.BASE_URL}helena_ct.png`}
              alt="Helena Martins"
            />
          </div>
        </section>
      ) : !telaIntroducao ? (
        <section className="cena-jornada">
          <article className="card-jornada">
            <h1 className="card-jornada__titulo">
              Sua jornada no Green Valley
            </h1>

            <ul className="card-jornada__informacoes">
              <li>5 missões curtas</li>
              <li>16 decisões</li>
              <li>Cerca de 15 minutos</li>
            </ul>
          </article>

          <button
            className="cena-inicial__botao cena-jornada__botao"
            onClick={() => {
              setDialogoHelena(false);
              setTelaIntroducao(true);
            }}
          >
            Toque para Continuar {'>>'}
          </button>
        </section>
      ) : (
        <section className="cena-introducao">
          <div className="painel-introducao">
            <article className="cartao-desafio">
              <h2>Seu desafio</h2>

              <p>
                Você será a consultoria de Helena. Cada decisão
                precisa equilibrar:
              </p>

              <ul>
                <li>Recursos financeiros</li>
                <li>Impacto ambiental</li>
                <li>Viabilidade operacional</li>
                <li>Objetivos do negócio</li>
              </ul>
            </article>

            <article className="cartao-como-jogar">
              <h2>Como jogar</h2>

              <div className="como-jogar__espaco" />

              <ol>
                <li>Leia a conversa com Helena</li>
                <li>Escolha uma alternativa e confirme</li>
                <li>Veja a reação de Helena e o que aprender</li>
              </ol>
            </article>
          </div>

          <div className="dialogo-cena">
            <div className="dialogo-introducao">
              <p>
                {dialogoHelena
                  ? 'Olá! Eu sou a Helena Martins, dona da Vinícola Green Valley. Meus pais plantaram as primeiras videiras e hoje cuido de tudo por aqui.'
                  : 'Você é consultor(a) de uma pequena vinícola. Me ajude a decidir como começar a mudar, com pouco dinheiro e muitas dúvidas.'}
              </p>
            </div>

            {dialogoHelena && (
              <div className="helena-introducao">
                <img
                  src={`${import.meta.env.BASE_URL}helena_cb1.png`}
                  alt="Helena Martins"
                />

                <span className="helena-introducao__pensando">
                  ...
                </span>
              </div>
            )}
          </div>

          <button
            className="cena-inicial__botao introducao__botao"
            onClick={iniciarJornada}
          >
            Aceitar o desafio
          </button>
        </section>
      )}
    </main>
  );
}

export default App;
