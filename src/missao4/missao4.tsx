
import { useState } from 'react';
import './missao4.css';

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
    flag?: string;
    valor?: string;
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
        titulo: 'Decisão 1 — Organizando o orçamento',
        contexto:
            'Helena já tem algumas soluções em mente, mas precisa implementá-las sem comprometer a saúde financeira da vinícola.',
        pergunta:
            'Como ela deve começar a colocar as mudanças em prática?',
        opcoes: [
            {
                id: 'A',
                texto:
                    'Começar por um projeto-piloto, estimar custos e acompanhar os resultados antes de ampliar.',
                classificacao: 'Caminho sólido',
                pontos: 2,
                reacao:
                    'Boa escolha! Um projeto-piloto permite aprender, ajustar os processos e evitar investimentos desnecessários.',
                aprender:
                    'A implementação gradual permite validar os benefícios, identificar dificuldades e estimar os custos reais antes de ampliar uma solução.',
                historia:
                    'Helena aprova uma etapa-piloto com limites de custo e critérios para avaliar os resultados.',
                flag: 'budget',
                valor: 'controlado',
            },
            {
                id: 'B',
                texto:
                    'Utilizar parte do orçamento disponível e acompanhar os gastos durante a execução.',
                classificacao: 'Defensável, com ressalvas',
                pontos: 1,
                reacao:
                    'Podemos avançar, mas precisamos acompanhar os gastos para evitar que imprevistos comprometam o projeto.',
                aprender:
                    'O controle financeiro durante a execução ajuda a identificar desvios. Também é importante prever custos de manutenção e imprevistos.',
                historia:
                    'A implementação começa, e Helena passa a revisar os gastos com frequência.',
                flag: 'budget',
                valor: 'apertado',
            },
            {
                id: 'C',
                texto:
                    'Comprometer todo o orçamento de uma vez para acelerar as mudanças.',
                classificacao: 'Arriscado neste contexto',
                pontos: 0,
                reacao:
                    'Se surgir algum imprevisto, a vinícola pode ficar sem recursos para manter as operações ou concluir o projeto.',
                aprender:
                    'Um investimento precisa considerar os custos totais, os riscos e a capacidade financeira de manter a solução funcionando.',
                historia:
                    'Helena percebe o risco e precisa rever o plano para preservar recursos para a operação.',
                flag: 'budget',
                valor: 'cortado',
            },
        ],
    },
    {
        titulo: 'Decisão 2 — Lidando com a resistência',
        contexto:
            'Alguns funcionários estão inseguros com as novas rotinas e temem que as mudanças tornem o trabalho mais difícil.',
        pergunta:
            'Como Helena deve responder a essas preocupações?',
        opcoes: [
            {
                id: 'A',
                texto:
                    'Ouvir as preocupações, demonstrar os novos procedimentos e oferecer treinamento.',
                classificacao: 'Caminho sólido',
                pontos: 2,
                reacao:
                    'Quando as pessoas entendem a mudança e recebem apoio, fica mais fácil construir uma rotina que funcione para todos.',
                aprender:
                    'A implementação de mudanças exige comunicação, capacitação e oportunidades para identificar e corrigir dificuldades práticas.',
                historia:
                    'A equipe testa os novos procedimentos e apresenta sugestões para melhorar a execução.',
            },
            {
                id: 'B',
                texto:
                    'Distribuir instruções escritas e deixar a equipe consultar o material quando tiver dúvidas.',
                classificacao: 'Defensável, com ressalvas',
                pontos: 1,
                reacao:
                    'As instruções ajudam, mas algumas pessoas podem precisar de demonstrações e acompanhamento.',
                aprender:
                    'A documentação padroniza procedimentos, mas é mais eficaz quando acompanhada de treinamento e espaço para perguntas.',
                historia:
                    'As instruções são distribuídas, e Helena organiza uma conversa para acompanhar as primeiras dificuldades.',
            },
            {
                id: 'C',
                texto:
                    'Ignorar as reclamações e exigir que todos sigam as novas regras imediatamente.',
                classificacao: 'Arriscado neste contexto',
                pontos: 0,
                reacao:
                    'Sem diálogo, as dúvidas podem virar erros, baixa adesão ou abandono das novas práticas.',
                aprender:
                    'A resistência pode revelar obstáculos reais. Compreender essas dificuldades ajuda a ajustar a implementação.',
                historia:
                    'Helena percebe que precisa abrir espaço para ouvir os funcionários e explicar os motivos das mudanças.',
            },
        ],
    },
    {
        titulo: 'Decisão 3 — Acompanhando a implementação',
        contexto:
            'As primeiras mudanças já foram colocadas em prática. Helena precisa verificar se estão produzindo os resultados esperados.',
        pergunta:
            'Qual é a melhor forma de avaliar o que foi implementado?',
        opcoes: [
            {
                id: 'A',
                texto:
                    'Comparar indicadores com os dados iniciais e registrar os ajustes necessários.',
                classificacao: 'Caminho sólido',
                pontos: 2,
                reacao:
                    'Assim conseguiremos entender o que melhorou e quais pontos ainda precisam de atenção.',
                aprender:
                    'Comparar indicadores antes e depois permite avaliar os efeitos das mudanças. Quando possível, utilize métodos de medição consistentes.',
                historia:
                    'Helena revisa os dados do projeto-piloto e registra os próximos ajustes.',
            },
            {
                id: 'B',
                texto:
                    'Perguntar à equipe se percebeu alguma melhora na rotina.',
                classificacao: 'Defensável, com ressalvas',
                pontos: 1,
                reacao:
                    'A percepção da equipe é importante, mas precisamos combiná-la com medidas objetivas quando possível.',
                aprender:
                    'Relatos qualitativos ajudam a compreender a experiência das pessoas, enquanto indicadores permitem quantificar resultados.',
                historia:
                    'A equipe relata mudanças positivas, e Helena planeja complementar esses relatos com medições.',
            },
            {
                id: 'C',
                texto:
                    'Considerar a mudança um sucesso assim que os novos procedimentos forem implantados.',
                classificacao: 'Arriscado neste contexto',
                pontos: 0,
                reacao:
                    'Concluir a implantação não significa que os resultados esperados foram alcançados.',
                aprender:
                    'A execução de uma atividade e o impacto gerado são coisas diferentes. Os resultados precisam ser avaliados.',
                historia:
                    'Helena decide aguardar as evidências antes de declarar que o projeto foi bem-sucedido.',
            },
        ],
    },
];

function Missao4({ onConcluir }: MissaoProps) {
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

        if (alternativaEscolhida.flag && alternativaEscolhida.valor) {
            setFlags((anteriores) => ({
                ...anteriores,
                [alternativaEscolhida.flag!]:
                    alternativaEscolhida.valor!,
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

        console.log('Resultado da Missão 4:', resultado);

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
            className={`missao4 missao4--fase-${fase}`}
            style={{ backgroundImage }}
        >
            <div className="missao4__overlay" />

            <button
                className="missao4__inicio"
                type="button"
                aria-label="Reiniciar missão"
                onClick={reiniciarMissao}
            >
                ◎
            </button>

            <header className="missao4__cabecalho">
                <span>GREEN VALLEY</span>
                <span>Missão 4 — Implementando a mudança</span>
            </header>

            {fase === 'decisao' && (
                <section className="missao4__decisao">
                    <h1>{decisao.titulo}</h1>

                    <p className="missao4__contexto">
                        {decisao.contexto}
                    </p>

                    <p className="missao4__pergunta">
                        {decisao.pergunta}
                    </p>

                    <div className="missao4__alternativas">
                        {decisao.opcoes.map((opcao) => (
                            <button
                                key={opcao.id}
                                type="button"
                                className={`missao4__alternativa ${selecionada === opcao.id
                                        ? 'missao4__alternativa--selecionada'
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
                <section className="missao4__feedback">
                    <div className="missao4__resultado">
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

                    <div className="missao4__dialogo">
                        <p>{alternativaEscolhida.reacao}</p>
                    </div>

                    <img
                        className="missao4__helena"
                        src={`${import.meta.env.BASE_URL}${spriteHelena(alternativaEscolhida.pontos)}`}
                        alt="Reação de Helena"
                    />
                </section>
            )}

            {fase === 'aprendizado' && alternativaEscolhida && (
                <section className="missao4__aprendizado">
                    <article className="missao4__cartao">
                        <h2>Para aprender</h2>
                        <p>{alternativaEscolhida.aprender}</p>
                    </article>

                    <article className="missao4__cartao">
                        <h2>Na história</h2>
                        <p>{alternativaEscolhida.historia}</p>
                    </article>
                </section>
            )}

            <div className="missao4__progresso">
                Decisão {decisaoAtual + 1} de {decisoes.length}
            </div>

            <button
                className="missao4__botao"
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

export default Missao4;
