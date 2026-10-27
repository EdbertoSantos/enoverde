
import { useState } from 'react';
import './missao1.css';

type MissaoProps = {
    onConcluir: () => void;
};

type Alternativa = 'A' | 'B' | 'C';

const alternativas = [
    {
        id: 'A' as const,
        texto:
            'É qualquer novidade que reduza impactos ambientais, em processos, produtos ou na forma de organizar o trabalho.',
        classificacao: 'Caminho sólido',
        reacao:
            'Que bom! Então não é só comprar equipamento. Posso olhar também como lavamos os tanques e como organizamos as tarefas.',
        aprender:
            'Inovação verde costuma ser entendida de forma ampla: pode envolver produtos, processos, práticas de gestão e modelos de negócio que reduzem impactos ambientais.',
        historia:
            'Helena passa a considerar mudanças de processo e de organização, além de tecnologias.',
        sprite: 'helena_feliz.png',
    },
    {
        id: 'B' as const,
        texto:
            'É adotar tecnologias limpas, como energia solar. Com tecnologia verde, o negócio fica verde.',
        classificacao: 'Defensável, com ressalvas',
        reacao:
            'Faz sentido, painéis solares foram a primeira coisa que me veio à cabeça. Mas será que só tecnologia resolve?',
        aprender:
            'Tecnologia limpa é uma forma importante de inovação verde, mas não é a única. Sem mudar processos e hábitos, uma tecnologia nova pode render menos do que o esperado.',
        historia:
            'Helena fica atenta às tecnologias, mas pode deixar de ver melhorias simples do dia a dia.',
        sprite: 'helena_cb1.png',
    },
    {
        id: 'C' as const,
        texto:
            'É principalmente mostrar ao mercado que a vinícola é sustentável, para valorizar a marca.',
        classificacao: 'Arriscado neste contexto',
        reacao:
            'Hmm, a imagem me importa, mas não quero prometer o que não consigo cumprir.',
        aprender:
            'Comunicar é importante, mas inovação verde exige mudança real. Divulgar mais do que se faz pode ser visto como greenwashing e prejudicar a confiança.',
        historia:
            'Helena decide que qualquer divulgação virá depois de resultados concretos.',
        sprite: 'helena_cb1.png',
    },
];

function Missao1({ onConcluir }: MissaoProps) {
    const [pagina, setPagina] = useState(0);
    const [selecionada, setSelecionada] =
        useState<Alternativa | null>(null);

    const backgroundImage = `url("${import.meta.env.BASE_URL}fundo.png")`;

    const alternativaEscolhida = alternativas.find(
        (alternativa) => alternativa.id === selecionada,
    );

    function avancar() {
        if (pagina === 2 && !selecionada) return;

        if (pagina < 4) {
            setPagina((atual) => atual + 1);
            return;
        }

        onConcluir();
    }

    function reiniciarMissao() {
        setPagina(0);
        setSelecionada(null);
    }

    return (
        <main
            className={`missao1 missao1--pagina-${pagina + 3}`}
            style={{ backgroundImage }}
        >
            <div className="missao1__overlay" />

            <button
                className="missao1__inicio"
                type="button"
                aria-label="Voltar ao início da missão"
                onClick={reiniciarMissao}
            >
                ◎
            </button>

            {pagina < 2 && (
                <section className="missao1__fala">
                    {pagina === 0 && (
                        <div className="missao1__ilustracao">
                            <img
                                src={`${import.meta.env.BASE_URL}planta.png`}
                                alt="Muda de planta crescendo sobre uma mão"
                            />
                        </div>
                    )}

                    <div className="missao1__dialogo">
                        <p>
                            {pagina === 0
                                ? 'Que bom ter você por aqui! Quero deixar a vinícola mais sustentável, mas meus recursos são limitados.'
                                : 'Ouvi falar de inovação verde numa feira do setor. Só não entendi bem o que isso significa na prática.'}
                        </p>
                    </div>

                    <img
                        className="missao1__helena"
                        src={`${import.meta.env.BASE_URL}helena_cb1.png`}
                        alt="Helena Martins"
                    />
                </section>
            )}

            {pagina === 2 && (
                <>
                    <section className="missao1__decisao">
                        <h1>Decisão 1 — O que é inovação verde?</h1>

                        <p className="missao1__pergunta">
                            Escolha a resposta que você considera mais adequada:
                        </p>

                        <div className="missao1__alternativas">
                            {alternativas.map((alternativa) => (
                                <button
                                    key={alternativa.id}
                                    type="button"
                                    className={`missao1__alternativa ${
                                        selecionada === alternativa.id
                                            ? 'missao1__alternativa--selecionada'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        setSelecionada(alternativa.id)
                                    }
                                >
                                    <strong>{alternativa.id})</strong>
                                    <span>{alternativa.texto}</span>
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="missao1__fala missao1__fala--pagina5">
                        <div className="missao1__dialogo">
                            <p>
                                Na feira, cada pessoa explicava de um jeito diferente.
                                Como você explicaria inovação verde para mim?
                            </p>
                        </div>

                        <img
                            className="missao1__helena"
                            src={`${import.meta.env.BASE_URL}helena_cb1.png`}
                            alt="Helena Martins"
                        />
                    </section>
                </>
            )}

            {pagina === 3 && alternativaEscolhida && (
                <section className="missao1__feedback">
                    <div className="missao1__resultado">
                        <img
                            className="missao1__icone"
                            src={`${import.meta.env.BASE_URL}positivo.png`}
                            alt=""
                        />

                        <h1>{alternativaEscolhida.classificacao}</h1>
                    </div>

                    <div className="missao1__dialogo">
                        <p>{alternativaEscolhida.reacao}</p>
                    </div>

                    <img
                        className="missao1__helena"
                        src={`${import.meta.env.BASE_URL}${alternativaEscolhida.sprite}`}
                        alt="Reação de Helena"
                    />
                </section>
            )}

            {pagina === 4 && alternativaEscolhida && (
                <section className="missao1__aprendizado">
                    <article className="missao1__cartao">
                        <h2>Para aprender</h2>
                        <p>{alternativaEscolhida.aprender}</p>
                    </article>

                    <div className="missao1__prancheta">
                        <img
                            src={`${import.meta.env.BASE_URL}positivo.png`}
                            alt="Ícone positivo"
                        />
                    </div>

                    <article className="missao1__cartao">
                        <h2>Na história</h2>
                        <p>{alternativaEscolhida.historia}</p>
                    </article>
                </section>
            )}

            <div className="missao1__progresso">
                Página {pagina + 3} de 7
            </div>

            <button
                className="missao1__botao"
                type="button"
                onClick={avancar}
                disabled={pagina === 2 && !selecionada}
            >
                {pagina === 2
                    ? 'Confirmar escolha'
                    : pagina === 4
                        ? 'Continuar para a próxima missão'
                        : 'Continuar »'}
            </button>
        </main>
    );
}

export default Missao1;
