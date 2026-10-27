
import { useState } from 'react';
import './missao3.css';

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
    flag: string;
    valor: string;
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
        titulo: 'Decisão 1 — Reduzindo o consumo de água',
        contexto:
            'A investigação mostrou que a limpeza dos tanques consome uma quantidade significativa de água.',
        pergunta:
            'Qual solução Helena deve priorizar para reduzir esse consumo?',
        opcoes: [
            {
                id: 'A',
                texto:
                    'Monitorar o consumo por etapa, corrigir vazamentos e avaliar formas seguras de reutilização.',
                classificacao: 'Caminho sólido',
                pontos: 2,
                reacao:
                    'Ótimo! Vamos identificar onde a água é mais utilizada e verificar onde podemos economizar sem comprometer a higiene.',
                aprender:
                    'Monitoramento, manutenção e reutilização planejada podem reduzir o consumo de água. Qualquer reúso deve respeitar os requisitos sanitários e de qualidade.',
                historia:
                    'Helena inicia um plano-piloto para monitorar e reduzir o consumo de água na vinícola.',
                flag: 'water',
                valor: 'plano',
            },
            {
                id: 'B',
                texto:
                    'Orientar os funcionários a economizar água durante as atividades diárias.',
                classificacao: 'Defensável, com ressalvas',
                pontos: 1,
                reacao:
                    'A conscientização é importante! Mas precisamos acompanhar o consumo para saber se as orientações estão funcionando.',
                aprender:
                    'Mudanças de comportamento ajudam, mas são mais eficazes quando acompanhadas de procedimentos, indicadores e monitoramento.',
                historia:
                    'A equipe recebe orientações para economizar água, enquanto Helena planeja medir os resultados.',
                flag: 'water',
                valor: 'parcial',
            },
            {
                id: 'C',
                texto:
                    'Reduzir a frequência da limpeza dos tanques para gastar menos água.',
                classificacao: 'Arriscado neste contexto',
                pontos: 0,
                reacao:
                    'Precisamos tomar cuidado! Economizar água não pode comprometer a higiene nem a qualidade do vinho.',
                aprender:
                    'A redução de impactos ambientais deve respeitar os requisitos sanitários, a qualidade do produto e a legislação.',
                historia:
                    'Helena descarta essa proposta e procura uma alternativa que preserve a higiene.',
                flag: 'water',
                valor: 'inadequado',
            },
        ],
    },
    {
        titulo: 'Decisão 2 — Melhorando a eficiência energética',
        contexto:
            'A conta de energia aumentou, e Helena considera investir em melhorias no consumo elétrico.',
        pergunta:
            'Qual deve ser a abordagem antes de realizar um investimento?',
        opcoes: [
            {
                id: 'A',
                texto:
                    'Analisar a conta de energia, identificar os equipamentos que mais consomem e comparar alternativas de eficiência.',
                classificacao: 'Caminho sólido',
                pontos: 2,
                reacao:
                    'Assim poderemos descobrir onde estão os maiores consumos e quais mudanças oferecem os melhores resultados.',
                aprender:
                    'A análise do consumo ajuda a priorizar medidas de eficiência e a estimar custos, economia potencial e retorno do investimento.',
                historia:
                    'Helena solicita uma análise energética antes de decidir quais equipamentos serão modificados.',
                flag: 'energy',
                valor: 'avaliada',
            },
            {
                id: 'B',
                texto:
                    'Substituir primeiro as lâmpadas mais utilizadas por modelos eficientes.',
                classificacao: 'Defensável, com ressalvas',
                pontos: 1,
                reacao:
                    'Pode ser uma boa iniciativa inicial. Também precisamos verificar se outros equipamentos consomem muito mais energia.',
                aprender:
                    'Pequenas melhorias podem contribuir para a economia, mas seu impacto depende do consumo e do tempo de utilização de cada equipamento.',
                historia:
                    'A vinícola começa por uma mudança simples e continua investigando outras oportunidades.',
                flag: 'energy',
                valor: 'parcial',
            },
            {
                id: 'C',
                texto:
                    'Instalar painéis solares imediatamente, sem estimar a demanda ou os custos.',
                classificacao: 'Arriscado neste contexto',
                pontos: 0,
                reacao:
                    'A energia solar pode ser uma alternativa interessante, mas precisamos verificar se o investimento é adequado.',
                aprender:
                    'Antes de investir, é importante avaliar demanda energética, espaço disponível, custos, manutenção e viabilidade financeira.',
                historia:
                    'Helena decide solicitar uma avaliação técnica e financeira antes de aprovar a instalação.',
                flag: 'energy',
                valor: 'sem_analise',
            },
        ],
    },
    {
        titulo: 'Decisão 3 — Dando destino aos resíduos',
        contexto:
            'A produção gera diferentes resíduos, e parte deles ainda não possui uma destinação bem definida.',
        pergunta:
            'Como a vinícola deve lidar com esses materiais?',
        opcoes: [
            {
                id: 'A',
                texto:
                    'Mapear os tipos e volumes de resíduos e buscar prevenção, reaproveitamento ou destinação adequada.',
                classificacao: 'Caminho sólido',
                pontos: 2,
                reacao:
                    'Vamos descobrir o que é gerado e identificar oportunidades de reduzir desperdícios e aproveitar materiais.',
                aprender:
                    'A gestão de resíduos prioriza prevenir a geração, reduzir, reutilizar e reciclar, respeitando as exigências de destinação.',
                historia:
                    'A equipe começa a registrar os resíduos produzidos e a avaliar alternativas para cada tipo de material.',
                flag: 'waste',
                valor: 'mapeado',
            },
            {
                id: 'B',
                texto:
                    'Separar os materiais recicláveis mais fáceis de identificar.',
                classificacao: 'Defensável, com ressalvas',
                pontos: 1,
                reacao:
                    'É um bom começo! Ainda precisaremos verificar o que fazer com os outros resíduos da produção.',
                aprender:
                    'A separação facilita a reciclagem, mas um plano completo também precisa contemplar os materiais que não são recicláveis.',
                historia:
                    'A vinícola organiza a separação inicial e mantém os demais resíduos para análise.',
                flag: 'waste',
                valor: 'parcial',
            },
            {
                id: 'C',
                texto:
                    'Descartar todos os resíduos juntos para simplificar a rotina.',
                classificacao: 'Arriscado neste contexto',
                pontos: 0,
                reacao:
                    'Isso pode desperdiçar materiais que poderiam ser aproveitados e causar impactos ambientais.',
                aprender:
                    'A destinação deve considerar o tipo de resíduo, as regras aplicáveis e as oportunidades de reutilização ou reciclagem.',
                historia:
                    'Helena solicita a revisão do procedimento de descarte e a organização dos resíduos.',
                flag: 'waste',
                valor: 'inadequado',
            },
        ],
    },
    {
        titulo: 'Decisão 4 — Transformando ideias em ações',
        contexto:
            'Helena já identificou oportunidades relacionadas à água, energia e resíduos. Agora precisa organizar a execução.',
        pergunta:
            'Como transformar essas oportunidades em um plano viável?',
        opcoes: [
            {
                id: 'A',
                texto:
                    'Definir responsáveis, prazos, recursos, indicadores e começar com uma etapa-piloto.',
                classificacao: 'Caminho sólido',
                pontos: 2,
                reacao:
                    'Excelente! Assim todos saberão suas responsabilidades e teremos critérios para avaliar os resultados.',
                aprender:
                    'Um plano de ação deve definir tarefas, responsáveis, cronograma, recursos e indicadores de acompanhamento.',
                historia:
                    'Helena organiza as iniciativas em um plano e define quais ações serão testadas primeiro.',
                flag: 'plan',
                valor: 'estruturado',
            },
            {
                id: 'B',
                texto:
                    'Criar uma lista de ideias e começar quando houver tempo disponível.',
                classificacao: 'Defensável, com ressalvas',
                pontos: 1,
                reacao:
                    'Registrar as ideias ajuda, mas sem prazos e responsáveis algumas iniciativas podem nunca sair do papel.',
                aprender:
                    'Uma lista de ideias é um ponto de partida. Um plano executável precisa de prioridades, responsáveis e acompanhamento.',
                historia:
                    'Helena registra as propostas e percebe que ainda precisa organizar a execução.',
                flag: 'plan',
                valor: 'incompleto',
            },
            {
                id: 'C',
                texto:
                    'Implementar todas as mudanças ao mesmo tempo para acelerar os resultados.',
                classificacao: 'Arriscado neste contexto',
                pontos: 0,
                reacao:
                    'Tentar fazer tudo de uma vez pode sobrecarregar a equipe e dificultar o controle dos gastos e dos resultados.',
                aprender:
                    'A implementação gradual facilita o aprendizado, reduz riscos e permite corrigir problemas antes de ampliar as ações.',
                historia:
                    'Helena decide reduzir o escopo inicial e organizar a implementação por etapas.',
                flag: 'plan',
                valor: 'desorganizado',
            },
        ],
    },
];

function Missao3({ onConcluir }: MissaoProps) {
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

        setFlags((anteriores) => ({
            ...anteriores,
            [alternativaEscolhida.flag]:
                alternativaEscolhida.valor,
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

        console.log('Resultado da Missão 3:', resultado);

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
            className={`missao3 missao3--fase-${fase}`}
            style={{ backgroundImage }}
        >
            <div className="missao3__overlay" />

            <button
                className="missao3__inicio"
                type="button"
                aria-label="Reiniciar missão"
                onClick={reiniciarMissao}
            >
                ◎
            </button>

            <header className="missao3__cabecalho">
                <span>GREEN VALLEY</span>
                <span>Missão 3 — Escolhendo soluções</span>
            </header>

            {fase === 'decisao' && (
                <section className="missao3__decisao">
                    <h1>{decisao.titulo}</h1>

                    <p className="missao3__contexto">
                        {decisao.contexto}
                    </p>

                    <p className="missao3__pergunta">
                        {decisao.pergunta}
                    </p>

                    <div className="missao3__alternativas">
                        {decisao.opcoes.map((opcao) => (
                            <button
                                key={opcao.id}
                                type="button"
                                className={`missao3__alternativa ${selecionada === opcao.id
                                        ? 'missao3__alternativa--selecionada'
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
                <section className="missao3__feedback">
                    <div className="missao3__resultado">
                        <h1>
                            {alternativaEscolhida.classificacao}
                            <div className="missao1__prancheta">
                                <img
                                    src={`${import.meta.env.BASE_URL}positivo.png`}
                                    alt="Ícone positivo"
                                />
                            </div>
                        </h1>
                    </div>

                    <div className="missao3__dialogo">
                        <p>{alternativaEscolhida.reacao}</p>
                    </div>

                    <img
                        className="missao3__helena"
                        src={`${import.meta.env.BASE_URL}${spriteHelena(alternativaEscolhida.pontos)}`}
                        alt="Reação de Helena"
                    />
                </section>
            )}

            {fase === 'aprendizado' && alternativaEscolhida && (
                <section className="missao3__aprendizado">
                    <article className="missao3__cartao">
                        <h2>Para aprender</h2>
                        <p>{alternativaEscolhida.aprender}</p>
                    </article>

                    <article className="missao3__cartao">
                        <h2>Na história</h2>
                        <p>{alternativaEscolhida.historia}</p>
                    </article>
                </section>
            )}

            <div className="missao3__progresso">
                Decisão {decisaoAtual + 1} de {decisoes.length}
            </div>

            <button
                className="missao3__botao"
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
                        : decisaoAtual < decisoes.length - 1
                            ? 'Próxima decisão »'
                            : 'Concluir missão »'}
            </button>
        </main>
    );
}

export default Missao3;
