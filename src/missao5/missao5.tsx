
import { useState } from 'react';
import './missao5.css';

type Alternativa = 'A' | 'B' | 'C';

type Opcao = {
    id: Alternativa;
    texto: string;
    classificacao: string;
    pontos: number;
    reacao: string;
    aprender: string;
    historia: string;
};

type Decisao = {
    titulo: string;
    contexto: string;
    pergunta: string;
    opcoes: Opcao[];
};

// Mesmo padrão da Missão 1: reação positiva usa helena_feliz.png
function spriteHelena(pontos: number) {
    return pontos === 2 ? 'helena_feliz.png' : 'helena_cb1.png';
}

const decisoes: Decisao[] = [
    {
        titulo: 'Decisão 1 — Os resultados da mudança',
        contexto:
            'Após implementar as primeiras ações, Helena precisa avaliar o que mudou na Green Valley. Os recursos são limitados e alguns resultados ainda não são claros.',
        pergunta:
            'Como Helena deve decidir quais ações continuar?',
        opcoes: [
            {
                id: 'A',
                texto:
                    'Comparar os resultados com os dados iniciais, verificar os custos e priorizar as ações com benefícios comprovados.',
                classificacao: 'Caminho sólido',
                pontos: 2,
                reacao:
                    'Helena consegue identificar quais iniciativas apresentam resultados e onde ainda são necessários ajustes.',
                aprender:
                    'Indicadores, custos e dados de referência ajudam a avaliar se uma iniciativa está atingindo seus objetivos. Resultados precisam ser analisados antes de ampliar investimentos.',
                historia:
                    'A equipe organiza os dados e identifica as iniciativas que merecem continuidade e aprimoramento.',
            },
            {
                id: 'B',
                texto:
                    'Manter as ações que parecem funcionar e acompanhar a evolução ao longo dos próximos meses.',
                classificacao: 'Defensável, com ressalvas',
                pontos: 1,
                reacao:
                    'A observação contínua é útil, mas sem critérios claros pode ser difícil distinguir uma melhora real de uma impressão.',
                aprender:
                    'Acompanhamento contínuo ajuda a perceber tendências, mas indicadores definidos previamente tornam as conclusões mais consistentes.',
                historia:
                    'Helena mantém as iniciativas em observação e começa a definir metas para a próxima avaliação.',
            },
            {
                id: 'C',
                texto:
                    'Ampliar imediatamente todas as ações para demonstrar que a transformação foi um sucesso.',
                classificacao: 'Arriscado neste contexto',
                pontos: 0,
                reacao:
                    'Ampliar sem avaliar os resultados pode aumentar custos e reproduzir problemas em maior escala.',
                aprender:
                    'A ampliação de uma iniciativa deve considerar evidências, recursos disponíveis, riscos e capacidade de execução.',
                historia:
                    'Helena decide revisar o plano antes de assumir novos compromissos financeiros.',
            },
        ],
    },
    {
        titulo: 'Decisão 2 — O próximo ciclo',
        contexto:
            'A Green Valley aprendeu com as primeiras mudanças. Agora, Helena precisa decidir como manter a evolução ambiental e operacional.',
        pergunta:
            'Qual estratégia deve orientar os próximos meses?',
        opcoes: [
            {
                id: 'A',
                texto:
                    'Definir novas metas mensuráveis, responsáveis, prazos e revisões periódicas.',
                classificacao: 'Caminho sólido',
                pontos: 2,
                reacao:
                    'A equipe passa a ter objetivos claros e consegue acompanhar as responsabilidades de cada etapa.',
                aprender:
                    'Metas mensuráveis, responsáveis definidos e prazos facilitam o acompanhamento e permitem corrigir o planejamento quando necessário.',
                historia:
                    'Helena estabelece um novo ciclo de melhoria contínua com participação da equipe.',
            },
            {
                id: 'B',
                texto:
                    'Manter as práticas atuais e discutir novas metas quando surgirem oportunidades.',
                classificacao: 'Defensável, com ressalvas',
                pontos: 1,
                reacao:
                    'Manter as práticas pode consolidar os avanços, mas a falta de metas dificulta avaliar a evolução.',
                aprender:
                    'Consolidar mudanças é importante, mas revisões planejadas ajudam a identificar oportunidades e evitar que os resultados estagnem.',
                historia:
                    'A vinícola mantém as práticas adotadas e agenda uma revisão para definir os próximos objetivos.',
            },
            {
                id: 'C',
                texto:
                    'Encerrar o acompanhamento porque as principais mudanças já foram realizadas.',
                classificacao: 'Arriscado neste contexto',
                pontos: 0,
                reacao:
                    'Sem acompanhamento, problemas podem reaparecer e os resultados alcançados podem se perder.',
                aprender:
                    'Sustentabilidade e melhoria operacional dependem da continuidade das práticas, da medição e da revisão dos processos.',
                historia:
                    'Helena reconhece que a transformação precisa de acompanhamento para se manter ao longo do tempo.',
            },
        ],
    },
    {
        titulo: 'Decisão 3 — Compartilhando o aprendizado',
        contexto:
            'Helena quer que a experiência da Green Valley também ajude outras organizações a enfrentar desafios ambientais.',
        pergunta:
            'Como a vinícola deve compartilhar sua experiência?',
        opcoes: [
            {
                id: 'A',
                texto:
                    'Documentar os resultados, os custos, os erros e as soluções, compartilhando também os limites da experiência.',
                classificacao: 'Caminho sólido',
                pontos: 2,
                reacao:
                    'A experiência se torna útil para outras organizações, inclusive quando os resultados não são perfeitos.',
                aprender:
                    'Compartilhar métodos, evidências, limitações e aprendizados permite que outras equipes adaptem as soluções à própria realidade.',
                historia:
                    'Helena apresenta os resultados da Green Valley e incentiva outras organizações a trocar experiências.',
            },
            {
                id: 'B',
                texto:
                    'Divulgar as principais conquistas e apresentar as práticas que tiveram melhor aceitação.',
                classificacao: 'Defensável, com ressalvas',
                pontos: 1,
                reacao:
                    'As conquistas podem inspirar outras pessoas, mas apresentar também os desafios tornaria o relato mais completo.',
                aprender:
                    'Comunicar resultados positivos é válido, mas transparência sobre dificuldades e condições de implementação ajuda outras organizações a tomar decisões melhores.',
                historia:
                    'A vinícola divulga suas conquistas e começa a preparar um registro mais detalhado dos aprendizados.',
            },
            {
                id: 'C',
                texto:
                    'Divulgar apenas que a Green Valley se tornou sustentável, sem apresentar dados ou explicar o processo.',
                classificacao: 'Arriscado neste contexto',
                pontos: 0,
                reacao:
                    'Sem evidências, outras organizações não conseguem avaliar o que realmente funcionou nem reproduzir as iniciativas.',
                aprender:
                    'Afirmações sobre sustentabilidade devem ser proporcionais às evidências disponíveis. Dados e transparência dão credibilidade aos resultados.',
                historia:
                    'Helena percebe que precisa documentar as ações antes de apresentar conclusões sobre a transformação.',
            },
        ],
    },
];

function Missao5() {
    const [decisaoAtual, setDecisaoAtual] = useState(0);
    const [selecionada, setSelecionada] =
        useState<Alternativa | null>(null);

    const [fase, setFase] = useState<
        'decisao' | 'feedback' | 'aprendizado' | 'final'
    >('decisao');

    const [respostas, setRespostas] = useState<
        Partial<Record<number, Alternativa>>
    >({});

    const decisao = decisoes[decisaoAtual];

    const alternativaEscolhida = decisao.opcoes.find(
        (opcao) => opcao.id === selecionada,
    );

    const pontos = decisoes.reduce((total, item, indice) => {
        const resposta = respostas[indice];
        const opcao = item.opcoes.find(
            (alternativa) => alternativa.id === resposta,
        );

        return total + (opcao?.pontos ?? 0);
    }, 0);

    const backgroundImage = `url("${import.meta.env.BASE_URL}fundo.png")`;

    function confirmarEscolha() {
        if (!selecionada || !alternativaEscolhida) return;

        setRespostas((anteriores) => ({
            ...anteriores,
            [decisaoAtual]: selecionada,
        }));

        setFase('feedback');
    }

    function avancar() {
        if (fase === 'feedback') {
            setFase('aprendizado');
            return;
        }

        if (decisaoAtual < decisoes.length - 1) {
            setDecisaoAtual((atual) => atual + 1);
            setSelecionada(null);
            setFase('decisao');
            return;
        }

        setFase('final');
    }

    function reiniciarMissao() {
        setDecisaoAtual(0);
        setSelecionada(null);
        setRespostas({});
        setFase('decisao');
    }

    const perfil =
        pontos >= 5
            ? 'Agente de transformação'
            : pontos >= 3
                ? 'Aprendiz de inovação'
                : 'Explorador de possibilidades';

    if (fase === 'final') {
        return (
            <main
                className="missao5 missao5--final"
                style={{ backgroundImage }}
            >
                <div className="missao5__overlay" />

                <section className="missao5__final">
                    <span className="missao5__selo">
                        GREEN VALLEY
                    </span>

                    <h1>Jornada concluída!</h1>

                    <p className="missao5__mensagem">
                        Helena aprendeu que transformar uma organização
                        exige planejamento, participação, avaliação e
                        compromisso contínuo.
                    </p>

                    <div className="missao5__pontuacao">
                        <span>Pontuação da Missão 5</span>
                        <strong>{pontos} / 6</strong>
                    </div>

                    <div className="missao5__perfil">
                        <span>Seu perfil nesta missão</span>
                        <h2>{perfil}</h2>
                    </div>

                    <article className="missao5__reflexao">
                        <h2>O que fica dessa jornada?</h2>
                        <ul>
                            <li>
                                Tomar decisões com base em dados e
                                evidências.
                            </li>
                            <li>
                                Considerar pessoas, custos e impactos
                                ambientais.
                            </li>
                            <li>
                                Acompanhar resultados e ajustar as
                                estratégias.
                            </li>
                            <li>
                                Compartilhar aprendizados com
                                transparência.
                            </li>
                        </ul>
                    </article>

                    <div className="missao5__fala">
                        <div className="missao5__dialogo">
                            <p>
                                “A inovação não termina quando implementamos
                                uma ideia. Ela continua quando aprendemos com
                                os resultados e melhoramos juntos.”
                            </p>
                        </div>

                        <img
                            className="missao5__helena"
                            src={`${import.meta.env.BASE_URL}helena_feliz.png`}
                            alt="Helena Martins"
                        />
                    </div>

                    <button
                        className="missao5__botao"
                        type="button"
                        onClick={reiniciarMissao}
                    >
                        Jogar novamente
                    </button>
                </section>
            </main>
        );
    }

    return (
        <main
            className={`missao5 missao5--fase-${fase}`}
            style={{ backgroundImage }}
        >
            <div className="missao5__overlay" />

            <header className="missao5__cabecalho">
                <span>GREEN VALLEY</span>
                <span>Missão 5 — O futuro da Green Valley</span>
            </header>

            {fase === 'decisao' && (
                <section className="missao5__decisao">
                    <h1>{decisao.titulo}</h1>

                    <p className="missao5__contexto">
                        {decisao.contexto}
                    </p>

                    <p className="missao5__pergunta">
                        {decisao.pergunta}
                    </p>

                    <div className="missao5__alternativas">
                        {decisao.opcoes.map((opcao) => (
                            <button
                                key={opcao.id}
                                type="button"
                                className={`missao5__alternativa ${
                                    selecionada === opcao.id
                                        ? 'missao5__alternativa--selecionada'
                                        : ''
                                }`}
                                onClick={() =>
                                    setSelecionada(opcao.id)
                                }
                            >
                                <strong>{opcao.id})</strong>
                                <span>{opcao.texto}</span>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {fase === 'feedback' && alternativaEscolhida && (
                <section className="missao5__feedback">
                    <h1>{alternativaEscolhida.classificacao}</h1>
                    <div className="missao1__prancheta">
                                <img
                                    src={`${import.meta.env.BASE_URL}positivo.png`}
                                    alt="Ícone positivo"
                                />
                            </div> 
                    <div className="missao5__dialogo">
                        <p>{alternativaEscolhida.reacao}</p>
                    </div>

                    <img
                        className="missao5__helena"
                        src={`${import.meta.env.BASE_URL}${spriteHelena(alternativaEscolhida.pontos)}`}
                        alt="Reação de Helena"
                    />
                </section>
            )}

            {fase === 'aprendizado' && alternativaEscolhida && (
                <section className="missao5__aprendizado">
                    <article className="missao5__cartao">
                        <h2>Para aprender</h2>
                        <p>{alternativaEscolhida.aprender}</p>
                    </article>

                    <article className="missao5__cartao">
                        <h2>Conclusão da decisão</h2>
                        <p>{alternativaEscolhida.historia}</p>
                    </article>
                </section>
            )}

            <div className="missao5__progresso">
                Decisão {decisaoAtual + 1} de {decisoes.length}
            </div>

            <button
                className="missao5__botao"
                type="button"
                disabled={
                    fase === 'decisao' && !selecionada
                }
                onClick={
                    fase === 'decisao'
                        ? confirmarEscolha
                        : avancar
                }
            >
                {fase === 'decisao'
                    ? 'Confirmar escolha'
                    : fase === 'feedback'
                        ? 'Continuar »'
                        : 'Ver resultado final »'}
            </button>
        </main>
    );
}

export default Missao5;
