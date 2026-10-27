import { useState } from 'react';
import './missao2.css';

type MissaoProps = {
    onConcluir: () => void;
};

type Alternativa = 'A' | 'B' | 'C';

type Opcao = {
    id: Alternativa;
    texto: string;
    classificacao: string;
    pontos: number;
    reacao: string;
    aprender: string;
    historia: string;
    flags?: Record<string, string>;
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
        titulo: 'Decisão 1 — Investigando os problemas',
        contexto:
            'Helena quer tornar a vinícola mais sustentável, mas ainda não sabe exatamente onde estão os maiores desperdícios.',
        pergunta:
            'Qual deve ser o primeiro passo para descobrir onde agir?',
        opcoes: [
            {
                id: 'A',
                texto:
                    'Levantar dados de consumo, observar os processos e conversar com a equipe.',
                classificacao: 'Caminho sólido',
                pontos: 2,
                reacao:
                    'Boa ideia! Assim teremos evidências para entender onde estão os maiores impactos.',
                aprender:
                    'Um diagnóstico inicial combina dados, observação e conhecimento das pessoas que executam o trabalho.',
                historia:
                    'Helena inicia um levantamento do consumo e dos processos da vinícola.',
                flags: { baseline: 'forte' },
            },
            {
                id: 'B',
                texto:
                    'Fazer uma inspeção rápida e registrar os problemas mais visíveis.',
                classificacao: 'Defensável, com ressalvas',
                pontos: 1,
                reacao:
                    'É um começo útil, mas alguns desperdícios podem não ser percebidos apenas pela observação.',
                aprender:
                    'Uma inspeção identifica problemas aparentes. Medições e registros ajudam a confirmar sua dimensão.',
                historia:
                    'Helena registra os problemas encontrados e percebe que precisará de dados mais precisos.',
                flags: { baseline: 'parcial' },
            },
            {
                id: 'C',
                texto:
                    'Escolher uma solução conhecida e avaliar os resultados depois.',
                classificacao: 'Arriscado neste contexto',
                pontos: 0,
                reacao:
                    'Podemos acabar investindo em algo que não resolve o principal problema da vinícola.',
                aprender:
                    'Sem um diagnóstico, é difícil saber se a solução escolhida ataca a causa do problema.',
                historia:
                    'Helena decide investigar melhor antes de comprometer os recursos.',
                flags: { baseline: 'fraca' },
            },
        ],
    },
    {
        titulo: 'Decisão 2 — Definindo prioridades',
        contexto:
            'O levantamento inicial revelou diferentes oportunidades de melhoria, mas o orçamento da vinícola é limitado.',
        pergunta:
            'Como Helena deve decidir quais problemas enfrentar primeiro?',
        opcoes: [
            {
                id: 'A',
                texto:
                    'Comparar impacto ambiental, custo, viabilidade e benefício esperado de cada alternativa.',
                classificacao: 'Caminho sólido',
                pontos: 2,
                reacao:
                    'Assim podemos justificar as prioridades e escolher mudanças que façam sentido para a vinícola.',
                aprender:
                    'Uma análise de prioridades considera impacto, custo, urgência, viabilidade e resultados esperados.',
                historia:
                    'Helena compara as oportunidades antes de decidir onde concentrar os recursos.',
            },
            {
                id: 'B',
                texto:
                    'Começar pela mudança mais simples e barata de implementar.',
                classificacao: 'Defensável, com ressalvas',
                pontos: 1,
                reacao:
                    'Uma melhoria rápida pode ajudar, desde que não deixemos de lado problemas ambientais mais importantes.',
                aprender:
                    'Ações rápidas podem gerar resultados iniciais, mas devem ser avaliadas junto com sua relevância ambiental.',
                historia:
                    'A vinícola escolhe uma melhoria simples e mantém as demais oportunidades mapeadas.',
            },
            {
                id: 'C',
                texto:
                    'Priorizar a mudança que parece mais moderna e tecnológica.',
                classificacao: 'Arriscado neste contexto',
                pontos: 0,
                reacao:
                    'Uma solução moderna não é necessariamente a mais adequada para a realidade da vinícola.',
                aprender:
                    'A escolha deve responder a necessidades concretas, e não apenas à novidade de uma tecnologia.',
                historia:
                    'Helena percebe que precisa comparar as opções com critérios objetivos.',
            },
        ],
    },
    {
        titulo: 'Decisão 3 — Envolvendo a equipe',
        contexto:
            'As mudanças podem alterar tarefas diárias. Alguns funcionários estão preocupados com as novas rotinas.',
        pergunta:
            'Como Helena pode incentivar a participação da equipe?',
        opcoes: [
            {
                id: 'A',
                texto:
                    'Ouvir os funcionários, explicar os motivos das mudanças e convidá-los a propor melhorias.',
                classificacao: 'Caminho sólido',
                pontos: 2,
                reacao:
                    'Quem conhece a rotina pode identificar soluções que não aparecem nos relatórios.',
                aprender:
                    'A participação da equipe melhora o diagnóstico, aumenta a adesão e ajuda a manter as mudanças ao longo do tempo.',
                historia:
                    'Os funcionários passam a contribuir com sugestões para tornar a vinícola mais sustentável.',
                flags: { team: 'engajada' },
            },
            {
                id: 'B',
                texto:
                    'Apresentar as mudanças prontas e abrir espaço para perguntas.',
                classificacao: 'Defensável, com ressalvas',
                pontos: 1,
                reacao:
                    'Explicar o plano é importante. Envolver a equipe desde o início também pode revelar dificuldades práticas.',
                aprender:
                    'A comunicação clara ajuda, mas a participação ativa permite identificar obstáculos e melhorar as soluções.',
                historia:
                    'A equipe conhece o plano, embora algumas sugestões apareçam somente depois.',
                flags: { team: 'parcial' },
            },
            {
                id: 'C',
                texto:
                    'Deixar as decisões apenas com a gestão para evitar atrasos.',
                classificacao: 'Arriscado neste contexto',
                pontos: 0,
                reacao:
                    'A decisão pode ser rápida, mas quem executa as mudanças pode não se sentir parte delas.',
                aprender:
                    'Mudanças sem diálogo podem encontrar resistência e dificuldades durante a implementação.',
                historia:
                    'Helena percebe que precisa melhorar a comunicação com os funcionários.',
                flags: { team: 'resistente' },
            },
        ],
    },
];

function Missao2({ onConcluir }: MissaoProps) {
    const [decisaoAtual, setDecisaoAtual] = useState(0);
    const [selecionada, setSelecionada] =
        useState<Alternativa | null>(null);

    const [fase, setFase] = useState<
        'decisao' | 'feedback' | 'aprendizado'
    >('decisao');

    const [respostas, setRespostas] = useState<
        Partial<Record<number, Alternativa>>
    >({});

    const [flags, setFlags] = useState<Record<string, string>>({});

    const decisao = decisoes[decisaoAtual];

    const alternativaEscolhida = decisao.opcoes.find(
        (opcao) => opcao.id === selecionada,
    );

    const backgroundImage = `url("${import.meta.env.BASE_URL}fundo.png")`;

    function confirmarEscolha() {
        if (!selecionada || !alternativaEscolhida) return;

        setRespostas((anteriores) => ({
            ...anteriores,
            [decisaoAtual]: selecionada,
        }));

        if (alternativaEscolhida.flags) {
            setFlags((anteriores) => ({
                ...anteriores,
                ...alternativaEscolhida.flags,
            }));
        }

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

        const resultado = {
            respostas,
            flags,
            pontos: decisoes.reduce((total, item, indice) => {
                const resposta = respostas[indice];
                const opcao = item.opcoes.find(
                    (alternativa) => alternativa.id === resposta,
                );

                return total + (opcao?.pontos ?? 0);
            }, 0),
        };

        console.log('Resultado da Missão 2:', resultado);

        onConcluir();
    }

    function reiniciarMissao() {
        setDecisaoAtual(0);
        setSelecionada(null);
        setFase('decisao');
        setRespostas({});
        setFlags({});
    }

    return (
        <main
            className={`missao2 missao2--fase-${fase}`}
            style={{ backgroundImage }}
        >
            <div className="missao2__overlay" />

            <button
                className="missao2__inicio"
                type="button"
                aria-label="Reiniciar missão"
                onClick={reiniciarMissao}
            >
                ◎
            </button>

            <header className="missao2__cabecalho">
                <span>GREEN VALLEY</span>
                <span>Missão 2 — Investigando a vinícola</span>
            </header>

            {fase === 'decisao' && (
                <section className="missao2__decisao">
                    <h1>{decisao.titulo}</h1>

                    <p className="missao2__contexto">
                        {decisao.contexto}
                    </p>

                    <p className="missao2__pergunta">
                        {decisao.pergunta}
                    </p>

                    <div className="missao2__alternativas">
                        {decisao.opcoes.map((opcao) => (
                            <button
                                key={opcao.id}
                                type="button"
                                className={`missao2__alternativa ${
                                    selecionada === opcao.id
                                        ? 'missao2__alternativa--selecionada'
                                        : ''
                                }`}
                                onClick={() => setSelecionada(opcao.id)}
                            >
                                <strong>{opcao.id})</strong>
                                <span>{opcao.texto}</span>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {fase === 'feedback' && alternativaEscolhida && (
                <section className="missao2__feedback">
                    <div className="missao2__resultado">
                        <h1>{alternativaEscolhida.classificacao}</h1>
                        <div className="missao1__prancheta">
                        <img
                            src={`${import.meta.env.BASE_URL}positivo.png`}
                            alt="Ícone positivo"
                        />
                    </div>
                    </div>

                    <div className="missao2__dialogo">
                        <p>{alternativaEscolhida.reacao}</p>
                    </div>

                    <img
                        className="missao2__helena"
                        src={`${import.meta.env.BASE_URL}${spriteHelena(alternativaEscolhida.pontos)}`}
                        alt="Reação de Helena"
                    />
                </section>
            )}

            {fase === 'aprendizado' && alternativaEscolhida && (
                <section className="missao2__aprendizado">
                    <article className="missao2__cartao">
                        <h2>Para aprender</h2>
                        <p>{alternativaEscolhida.aprender}</p>
                    </article>

                    <article className="missao2__cartao">
                        <h2>Na história</h2>
                        <p>{alternativaEscolhida.historia}</p>
                    </article>
                </section>
            )}

            <div className="missao2__progresso">
                Decisão {decisaoAtual + 1} de {decisoes.length}
            </div>

            <button
                className="missao2__botao"
                type="button"
                disabled={fase === 'decisao' && !selecionada}
                onClick={fase === 'decisao' ? confirmarEscolha : avancar}
            >
                {fase === 'decisao'
                    ? 'Confirmar escolha'
                    : fase === 'feedback'
                      ? 'Continuar »'
                      : decisaoAtual < decisoes.length - 1
                        ? 'Próxima decisão »'
                        : 'Concluir missão »'}
            </button>
        </main>
    );
}

export default Missao2;