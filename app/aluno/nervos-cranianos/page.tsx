"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Question = {
  q: string;
  a: string[];
  correct: number;
};

type Test = {
  id: number;
  nerves: string;
  title: string;
  challenge: string;
  procedure: string;
  questions: Question[];
};

const tests: Test[] = [
  {
    id: 1,
    nerves: "I — Olfatório",
    title: "Reconhecimento de odores",
    challenge:
      "Teste a capacidade de perceber e identificar odores, examinando cada narina separadamente.",
    procedure:
      "Com os olhos fechados, oclua uma narina e apresente uma substância conhecida, como café, canela, hortelã, tabaco ou baunilha. Pergunte se o paciente sente e identifica o odor. Repita na outra narina.",
    questions: [
      {
        q: "Como deve ser feita a avaliação do olfato?",
        a: [
          "Com as duas narinas juntas.",
          "Com cada narina separadamente e olhos fechados.",
          "Somente pela narina direita.",
          "Com os olhos abertos.",
        ],
        correct: 1,
      },
      {
        q: "Qual termo indica perda total do olfato?",
        a: ["Hiposmia", "Parosmia", "Anosmia", "Amaurose"],
        correct: 2,
      },
    ],
  },
  {
    id: 2,
    nerves: "II — Óptico",
    title: "Acuidade visual",
    challenge: "Avalie a acuidade visual de cada olho separadamente.",
    procedure:
      "Utilize a tabela de Snellen ou peça ao paciente para identificar letras, objetos ou texto a aproximadamente 35–40 cm. Examine cada olho separadamente.",
    questions: [
      {
        q: "Como a acuidade visual deve ser examinada?",
        a: [
          "Com os dois olhos juntos.",
          "Com cada olho separadamente.",
          "Somente com o olho dominante.",
          "Somente no escuro.",
        ],
        correct: 1,
      },
      {
        q: "Qual recurso pode ser utilizado?",
        a: ["Tabela de Snellen", "Dix-Hallpike", "Reflexo fotomotor", "Abaixador de língua"],
        correct: 0,
      },
    ],
  },
  {
    id: 3,
    nerves: "II — Óptico",
    title: "Campo visual por confrontação",
    challenge: "Compare o campo visual do paciente com o seu próprio campo visual.",
    procedure:
      "Posicione-se a cerca de 60 cm. O paciente fecha um olho e você fecha o olho oposto. Peça para olhar para seu nariz e movimente o dedo pelos quatro quadrantes, comparando a percepção.",
    questions: [
      {
        q: "Para onde o paciente deve olhar durante a confrontação?",
        a: ["Para o dedo.", "Para o teto.", "Para o nariz do examinador.", "Para os próprios pés."],
        correct: 2,
      },
      {
        q: "Quantos quadrantes devem ser testados?",
        a: ["Dois", "Três", "Quatro", "Seis"],
        correct: 2,
      },
    ],
  },
  {
    id: 4,
    nerves: "III, IV e VI — Oculomotor, Troclear e Abducente",
    title: "Motilidade extrínseca",
    challenge:
      "Avalie os movimentos oculares e procure alterações como estrabismo ou diplopia.",
    procedure:
      "Mantenha a cabeça parada e peça ao paciente que acompanhe um objeto apenas com os olhos, realizando movimentos horizontais e verticais. Examine cada olho e depois os dois simultaneamente. Teste a convergência.",
    questions: [
      {
        q: "Por que III, IV e VI são examinados em conjunto?",
        a: [
          "Controlam a audição.",
          "Participam dos movimentos dos olhos.",
          "Controlam a língua.",
          "Controlam a mastigação.",
        ],
        correct: 1,
      },
      {
        q: "O que deve permanecer parado durante o teste?",
        a: ["A cabeça", "A língua", "A mandíbula", "O tronco inteiro"],
        correct: 0,
      },
    ],
  },
  {
    id: 5,
    nerves: "III, IV e VI — Oculomotor, Troclear e Abducente",
    title: "Pupilas e motilidade intrínseca",
    challenge: "Avalie as pupilas diante da luz e durante a acomodação.",
    procedure:
      "Observe tamanho e simetria. Teste o reflexo fotomotor direto, o consensual e a acomodação, observando a resposta das pupilas.",
    questions: [
      {
        q: "O reflexo fotomotor direto provoca:",
        a: [
          "Dilatação da pupila iluminada.",
          "Constrição da pupila iluminada.",
          "Movimento da língua.",
          "Fechamento da boca.",
        ],
        correct: 1,
      },
      {
        q: "Qual outra resposta pupilar deve ser observada?",
        a: ["Consensual", "Patelar", "Aquileu", "Plantar"],
        correct: 0,
      },
    ],
  },
  {
    id: 6,
    nerves: "V — Trigêmeo",
    title: "Reflexo córneo-palpebral",
    challenge: "Avalie a integridade do reflexo córneo-palpebral.",
    procedure:
      "Peça ao paciente para olhar para o lado. Com algodão, toque delicadamente a córnea e observe o fechamento palpebral. Compare os dois lados.",
    questions: [
      {
        q: "Qual reflexo é avaliado?",
        a: ["Fotomotor", "Córneo-palpebral", "Patelar", "Plantar"],
        correct: 1,
      },
      {
        q: "Uma lesão trigeminal unilateral pode causar:",
        a: [
          "Ausência de resposta ao estímulo da córnea afetada.",
          "Aumento da audição.",
          "Dilatação obrigatória da pupila.",
          "Desvio da língua.",
        ],
        correct: 0,
      },
    ],
  },
  {
    id: 7,
    nerves: "V — Trigêmeo",
    title: "Músculos da mastigação",
    challenge: "Avalie força e simetria dos músculos da mastigação.",
    procedure:
      "Peça ao paciente para cerrar os dentes com força e palpe masseter e temporal, comparando os lados. Observe a abertura da boca e a movimentação mandibular.",
    questions: [
      {
        q: "Quais músculos devem ser palpados?",
        a: [
          "Masseter e temporal",
          "Trapézio e deltoide",
          "Bíceps e tríceps",
          "Esternocleidomastóideo e trapézio",
        ],
        correct: 0,
      },
      {
        q: "O que deve ser observado ao abrir a boca?",
        a: ["Desvio da mandíbula", "Movimento dos olhos", "Resposta pupilar", "Posição dos ombros"],
        correct: 0,
      },
    ],
  },
  {
    id: 8,
    nerves: "VII — Facial",
    title: "Movimentos da face",
    challenge: "Avalie a motricidade dos músculos da expressão facial.",
    procedure:
      "Observe a face em repouso e durante a conversa. Peça para sorrir, mostrar os dentes e fazer uma careta. Compare os dois lados, observando sulco nasolabial e fissura palpebral.",
    questions: [
      {
        q: "Como uma fraqueza facial pode ser percebida?",
        a: [
          "Pela assimetria no sorriso ou careta.",
          "Pelo campo visual.",
          "Pela Dix-Hallpike.",
          "Pela audição.",
        ],
        correct: 0,
      },
      {
        q: "Qual estrutura pode apresentar alteração de simetria?",
        a: ["Sulco nasolabial", "Patela", "Tíbia", "Punho"],
        correct: 0,
      },
    ],
  },
  {
    id: 9,
    nerves: "VII — Facial",
    title: "Gustação",
    challenge: "Avalie a percepção dos sabores na região anterior da língua.",
    procedure:
      "Utilize soluções doce, azeda, salgada ou amarga e teste os dois lados da porção anterior da língua, evitando que o paciente veja a substância.",
    questions: [
      {
        q: "Qual região da língua é testada para a gustação relacionada ao VII?",
        a: ["Porção anterior", "Somente a raiz", "Somente o dorso posterior", "Apenas a face inferior"],
        correct: 0,
      },
      {
        q: "Quais sabores podem ser utilizados?",
        a: [
          "Somente doce",
          "Doce, azedo, salgado e amargo",
          "Somente salgado",
          "Somente ácido",
        ],
        correct: 1,
      },
    ],
  },
  {
    id: 10,
    nerves: "VIII — Vestibulococlear",
    title: "Avaliação auditiva",
    challenge: "Faça uma avaliação clínica inicial da audição.",
    procedure:
      "Produza um som de baixa intensidade próximo a cada ouvido, alternadamente, usando por exemplo relógio ou diapasão. Compare a percepção do paciente com a sua.",
    questions: [
      {
        q: "A raiz coclear do VIII está relacionada principalmente à:",
        a: ["Audição", "Mastigação", "Expressão facial", "Movimentação da língua"],
        correct: 0,
      },
      {
        q: "Como pode ser feita uma avaliação inicial?",
        a: [
          "Sons próximos a cada ouvido alternadamente",
          "Luz nas pupilas",
          "Sorriso",
          "Elevação dos ombros",
        ],
        correct: 0,
      },
    ],
  },
  {
    id: 11,
    nerves: "VIII — Vestibulococlear",
    title: "Impulso da cabeça",
    challenge: "Avalie a resposta vestibular diante de movimentos rápidos da cabeça.",
    procedure:
      "Com o paciente sentado e olhando para um ponto fixo, segure a cabeça e faça rapidamente pequenos movimentos de aproximadamente 20° para direita e esquerda, observando os olhos.",
    questions: [
      {
        q: "O que o teste de impulso da cabeça avalia?",
        a: ["Resposta vestibular", "Força da língua", "Reflexo pupilar", "Sensibilidade facial"],
        correct: 0,
      },
      {
        q: "Durante o teste, o paciente deve:",
        a: ["Manter o olhar fixo", "Fechar os olhos", "Olhar para os pés", "Olhar para trás"],
        correct: 0,
      },
    ],
  },
  {
    id: 12,
    nerves: "VIII — Vestibulococlear",
    title: "Manobra de Dix-Hallpike",
    challenge: "Avalie vertigem e nistagmo desencadeados por mudança de posição.",
    procedure:
      "Com o paciente sentado, leve-o rapidamente para a posição supina, com a cabeça estendida cerca de 45° abaixo da horizontal e rodada 45° para um lado. Observe nistagmo e vertigem e repita no lado oposto.",
    questions: [
      {
        q: "Qual manobra é usada para investigar vertigem posicional?",
        a: ["Dix-Hallpike", "Snellen", "Confrontação", "Fotomotor"],
        correct: 0,
      },
      {
        q: "O que deve ser observado?",
        a: ["Nistagmo e vertigem", "Somente força muscular", "Somente audição", "Somente pupila"],
        correct: 0,
      },
    ],
  },
  {
    id: 13,
    nerves: "IX e X — Glossofaríngeo e Vago",
    title: "Motricidade do palato e úvula",
    challenge: "Avalie o movimento do palato durante a fonação.",
    procedure:
      "Peça ao paciente para abrir a boca e dizer “Ah!” ou “Eh!”, mantendo o som por alguns segundos. Observe a contração e elevação do palato e a posição da úvula.",
    questions: [
      {
        q: "Como avaliar o movimento do palato?",
        a: [
          "Pedindo para dizer “Ah!” ou “Eh!”",
          "Pedindo para fechar os olhos",
          "Aplicando luz na pupila",
          "Elevando os ombros",
        ],
        correct: 0,
      },
      {
        q: "Quais estruturas devem ser observadas?",
        a: ["Palato e úvula", "Pupilas", "Trapézio", "Masseter"],
        correct: 0,
      },
    ],
  },
  {
    id: 14,
    nerves: "IX e X — Glossofaríngeo e Vago",
    title: "Sensibilidade da faringe",
    challenge: "Avalie a sensibilidade da região faríngea.",
    procedure:
      "Com um abaixador de língua, toque delicadamente os pilares das tonsilas de cada lado e pergunte se o paciente percebe o estímulo. O reflexo de vômito pode confirmar.",
    questions: [
      {
        q: "Como examinar a sensibilidade faríngea?",
        a: [
          "Tocando os pilares das tonsilas com abaixador",
          "Aplicando luz",
          "Testando visão",
          "Palpando o temporal",
        ],
        correct: 0,
      },
      {
        q: "Qual resposta pode auxiliar na confirmação?",
        a: ["Reflexo de vômito", "Fotomotor", "Patelar", "Aquileu"],
        correct: 0,
      },
    ],
  },
  {
    id: 15,
    nerves: "XI — Acessório",
    title: "Trapézio",
    challenge: "Avalie a força do músculo trapézio.",
    procedure:
      "Peça ao paciente para elevar os ombros contra a resistência das suas mãos. Compare os dois lados e observe queda ou atrofia.",
    questions: [
      {
        q: "Como testar o trapézio?",
        a: [
          "Elevar os ombros contra resistência.",
          "Abrir a boca.",
          "Movimentar a língua.",
          "Seguir um objeto com os olhos.",
        ],
        correct: 0,
      },
      {
        q: "O que pode aparecer em uma lesão do XI?",
        a: ["Queda ou atrofia do ombro.", "Anosmia.", "Amaurose.", "Diplopia obrigatória."],
        correct: 0,
      },
    ],
  },
  {
    id: 16,
    nerves: "XI — Acessório",
    title: "Esternocleidomastóideo",
    challenge: "Avalie a força do esternocleidomastóideo.",
    procedure:
      "Peça ao paciente para girar a cabeça contra resistência. A rotação para a direita testa principalmente o esternocleidomastóideo esquerdo; para a esquerda, o direito.",
    questions: [
      {
        q: "A rotação da cabeça para a direita testa principalmente qual lado?",
        a: ["Esquerdo", "Direito", "Ambos exclusivamente", "Nenhum"],
        correct: 0,
      },
      {
        q: "O exame deve ser realizado contra:",
        a: ["Resistência", "Luz", "Algodão na córnea", "Estímulo gustativo"],
        correct: 0,
      },
    ],
  },
  {
    id: 17,
    nerves: "XII — Hipoglosso",
    title: "Movimentação da língua",
    challenge: "Avalie a motricidade e a simetria da língua.",
    procedure:
      "Observe a língua em repouso e peça ao paciente para colocá-la para fora, movimentá-la para cima, para baixo e para os lados e pressioná-la contra a bochecha. Observe desvios e alterações de trofismo.",
    questions: [
      {
        q: "Qual nervo está relacionado aos movimentos da língua?",
        a: ["VII", "IX", "X", "XII"],
        correct: 3,
      },
      {
        q: "O que deve ser observado ao colocar a língua para fora?",
        a: [
          "Desvio e alterações de trofismo.",
          "Acuidade visual.",
          "Movimento dos olhos.",
          "Resposta pupilar.",
        ],
        correct: 0,
      },
    ],
  },
];

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export default function NervosCranianosPage() {
  const router = useRouter();

  const [test, setTest] = useState<Test | null>(null);
  const [performed, setPerformed] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [station, setStation] = useState(1);

  useEffect(() => {
    const access = sessionStorage.getItem("anatolab_acesso_nervos");

    if (access !== "true") {
      router.replace("/aluno");
      return;
    }

    chooseTest();
  }, [router]);

  function chooseTest(previousId?: number) {
    const available =
      previousId && tests.length > 1
        ? tests.filter((item) => item.id !== previousId)
        : tests;

    const next = randomItem(available);

    setTest(next);
    setPerformed(false);
    setQuestions([]);
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  }

  function performTest() {
    if (!test) return;

    const selectedQuestions = [...test.questions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    setQuestions(selectedQuestions);
    setPerformed(true);
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  }

  function answer(index: number) {
    if (answered) return;

    setSelected(index);
    setAnswered(true);

    if (questions[current] && index === questions[current].correct) {
      setScore((value) => value + 1);
    }
  }

  function nextQuestion() {
    if (current < questions.length - 1) {
      setCurrent((value) => value + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  }

  function newTest() {
    setStation((value) => value + 1);
    chooseTest(test?.id);
  }

  if (!test) {
    return (
      <main className="loading">
        <div>Carregando estação...</div>
        <style jsx>{styles}</style>
      </main>
    );
  }

  const question = questions[current];

  const percentage = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0;

  return (
    <main className="page">
      <header className="topbar">
        <div className="brand">
          <div className="mark">A</div>

          <div className="brand-text">
            <strong>ANATOLAB</strong>
            <small>LABORATÓRIO DE ANATOMIA</small>
          </div>
        </div>

        <button
          className="back"
          type="button"
          onClick={() => router.push("/aluno")}
        >
          VOLTAR
        </button>
      </header>

      <section className="hero">
        <span>ANATOMIA II · LHS</span>

        <h1>
          Exame dos
          <em> nervos cranianos.</em>
        </h1>

        <p>
          Uma estação prática para testar sua capacidade de reconhecer,
          executar e interpretar o exame neurológico.
        </p>
      </section>

      <div className="station">
        <div className="station-number">
          <small>ESTAÇÃO</small>
          <b>{String(station).padStart(2, "0")}</b>
        </div>

        <div className="station-info">
          <small>DESAFIO PRÁTICO</small>
          <strong>{test.nerves}</strong>
        </div>
      </div>

      <section className="card">
        <div className="card-head">
          <div>
            <small>{test.nerves}</small>
            <h2>{test.title}</h2>
          </div>

          <div className="number">
            {String(test.id).padStart(2, "0")}
          </div>
        </div>

        {!performed && (
          <>
            <div className="challenge">
              <small>SUA MISSÃO</small>
              <p>{test.challenge}</p>
            </div>

            <div className="notice">
              <i>?</i>

              <div>
                <b>Antes de realizar o teste</b>
                <p>
                  Execute o procedimento como faria em uma estação prática.
                  A explicação detalhada será liberada depois que você marcar
                  o teste como realizado.
                </p>
              </div>
            </div>

            <button className="primary" type="button" onClick={performTest}>
              TESTE REALIZADO
              <span>→</span>
            </button>
          </>
        )}

        {performed && !finished && question && (
          <>
            <div className="procedure">
              <div className="procedure-head">
                <small>COMO O TESTE DEVERIA SER REALIZADO</small>
                <b>LIBERADO</b>
              </div>

              <p>{test.procedure}</p>
            </div>

            <div className="divider">
              <span>VERIFICAÇÃO</span>
            </div>

            <div className="question-head">
              <small>
                QUESTÃO {current + 1} DE {questions.length}
              </small>

              <h3>{question.q}</h3>

              <div className="progress">
                <span
                  style={{
                    width: `${((current + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="answers">
              {question.a.map((answerText, index) => {
                const isSelected = selected === index;
                const isCorrect = question.correct === index;

                let className = "answer";

                if (answered && isCorrect) {
                  className += " correct";
                } else if (answered && isSelected && !isCorrect) {
                  className += " wrong";
                } else if (isSelected) {
                  className += " chosen";
                }

                return (
                  <button
                    key={answerText}
                    type="button"
                    className={className}
                    disabled={answered}
                    onClick={() => answer(index)}
                  >
                    <b>{String.fromCharCode(65 + index)}</b>
                    <span>{answerText}</span>
                  </button>
                );
              })}
            </div>

            {answered && (
              <div className="feedback">
                <b>
                  {selected === question.correct
                    ? "Resposta correta."
                    : "Resposta incorreta."}
                </b>

                <p>
                  {selected === question.correct
                    ? "Boa. Você identificou corretamente o ponto principal do exame."
                    : `A alternativa correta é ${String.fromCharCode(
                        65 + question.correct
                      )}.`}
                </p>
              </div>
            )}

            {answered && (
              <button
                className="primary"
                type="button"
                onClick={nextQuestion}
              >
                {current < questions.length - 1
                  ? "PRÓXIMA QUESTÃO"
                  : "VER RESULTADO"}
                <span>→</span>
              </button>
            )}
          </>
        )}

        {finished && (
          <div className="result">
            <small>ESTAÇÃO CONCLUÍDA</small>

            <strong>{percentage}%</strong>

            <h3>
              {score === questions.length
                ? "Excelente domínio."
                : score === 1
                ? "Quase lá."
                : "Hora de revisar."}
            </h3>

            <p>
              Você acertou <b>{score}</b> de <b>{questions.length}</b>{" "}
              questões desta estação.
            </p>

            <button className="primary" type="button" onClick={newTest}>
              NOVO TESTE
              <span>→</span>
            </button>
          </div>
        )}
      </section>

      <footer>
        <b>ANATOLAB</b>
        <span>ANATOMIA II · LABORATÓRIO DE HABILIDADES SIMULADAS</span>
        <i />
        <span>ESTAÇÃO PRÁTICA</span>
      </footer>

      <style jsx>{styles}</style>
    </main>
  );
}

const styles = `
  :global(*) {
    box-sizing: border-box;
  }

  :global(html) {
    background: #F2E5C6;
  }

  :global(body) {
    margin: 0;
    min-height: 100%;
    background: #F2E5C6;
    color: #3B010B;
    font-family: Arial, Helvetica, sans-serif;
  }

  :global(button) {
    font-family: inherit;
  }

  .page {
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    background: #F2E5C6;
    padding: 28px 7vw 34px;
  }

  .topbar,
  .hero,
  .station,
  .card,
  footer {
    width: min(1180px, 100%);
    margin-left: auto;
    margin-right: auto;
  }

  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(86, 11, 24, 0.18);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  .mark {
    width: 42px;
    height: 42px;
    flex: 0 0 42px;
    display: grid;
    place-items: center;
    background: #75162D;
    color: #F2E5C6;
    font: 700 25px Georgia, serif;
  }

  .brand-text {
    min-width: 0;
  }

  .brand strong {
    display: block;
    color: #560B18;
    font: 700 18px Georgia, serif;
    letter-spacing: 0.13em;
  }

  .brand small {
    display: block;
    margin-top: 5px;
    color: #75162D;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.15em;
  }

  .back {
    border: 0;
    padding: 10px 0;
    background: transparent;
    color: #75162D;
    cursor: pointer;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.13em;
    white-space: nowrap;
  }

  .hero {
    margin-top: 68px;
    margin-bottom: 45px;
  }

  .hero > span,
  .card-head small,
  .challenge small,
  .procedure-head small,
  .question-head small,
  .result small,
  .station small {
    color: #75162D;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.17em;
    text-transform: uppercase;
  }

  .hero h1 {
    margin: 12px 0 16px;
    color: #3B010B;
    font: 400 clamp(48px, 7vw, 84px) / 0.94 Georgia, serif;
    letter-spacing: -0.045em;
  }

  .hero h1 em {
    color: #75162D;
    font-style: normal;
  }

  .hero p {
    max-width: 650px;
    margin: 0;
    color: rgba(59, 1, 11, 0.68);
    font-size: 15px;
    line-height: 1.7;
  }

  .station {
    display: grid;
    grid-template-columns: 155px minmax(0, 1fr);
    border-top: 1px solid rgba(86, 11, 24, 0.18);
    border-bottom: 1px solid rgba(86, 11, 24, 0.18);
  }

  .station > div {
    min-width: 0;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .station > div:first-child {
    border-right: 1px solid rgba(86, 11, 24, 0.18);
  }

  .station b {
    font: 400 25px Georgia, serif;
  }

  .station strong {
    min-width: 0;
    overflow-wrap: anywhere;
    font: 400 16px Georgia, serif;
  }

  .card {
    margin-top: 14px;
    padding: 40px;
    background: rgba(255, 250, 236, 0.65);
    border: 1px solid rgba(86, 11, 24, 0.17);
    box-shadow: 0 18px 45px rgba(59, 1, 11, 0.07);
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    padding-bottom: 26px;
    border-bottom: 1px solid rgba(86, 11, 24, 0.15);
  }

  .card-head h2 {
    margin: 9px 0 0;
    color: #3B010B;
    font: 400 clamp(29px, 4vw, 43px) / 1.06 Georgia, serif;
    letter-spacing: -0.025em;
  }

  .number {
    width: 46px;
    height: 46px;
    flex: 0 0 46px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(117, 22, 45, 0.3);
    color: #75162D;
    font: 400 14px Georgia, serif;
  }

  .challenge {
    padding: 30px 0 26px;
  }

  .challenge p,
  .procedure p {
    max-width: 880px;
    margin: 11px 0 0;
    font: 400 20px / 1.55 Georgia, serif;
  }

  .notice {
    display: flex;
    gap: 13px;
    margin-bottom: 27px;
    padding: 16px;
    background: rgba(226, 217, 160, 0.3);
    border-left: 3px solid #E2D9A0;
  }

  .notice i {
    width: 25px;
    height: 25px;
    flex: 0 0 25px;
    display: grid;
    place-items: center;
    border: 1px solid #75162D;
    border-radius: 50%;
    color: #75162D;
    font: 700 15px Georgia, serif;
    font-style: normal;
  }

  .notice b {
    font-size: 12px;
  }

  .notice p {
    margin: 5px 0 0;
    color: rgba(59, 1, 11, 0.7);
    font-size: 12px;
    line-height: 1.55;
  }

  .primary {
    width: auto;
    min-height: 53px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
    padding: 0 21px;
    border: 1px solid #75162D;
    background: #75162D;
    color: #F2E5C6;
    cursor: pointer;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.13em;
    transition: 0.15s ease;
  }

  .primary:hover {
    background: #560B18;
    transform: translateY(-1px);
  }

  .primary span {
    font-size: 18px;
  }

  .procedure {
    padding: 27px 0 29px;
  }

  .procedure-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
  }

  .procedure-head b {
    flex-shrink: 0;
    padding: 5px 8px;
    border: 1px solid rgba(117, 22, 45, 0.25);
    color: #75162D;
    font-size: 7px;
    letter-spacing: 0.12em;
  }

  .divider {
    height: 1px;
    margin-bottom: 28px;
    background: rgba(86, 11, 24, 0.15);
    position: relative;
  }

  .divider span {
    position: absolute;
    top: -6px;
    padding-right: 12px;
    background: #FFF9EC;
    color: #75162D;
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.16em;
  }

  .question-head h3 {
    max-width: 850px;
    margin: 10px 0 15px;
    font: 400 24px / 1.35 Georgia, serif;
  }

  .progress {
    height: 3px;
    background: rgba(117, 22, 45, 0.12);
  }

  .progress span {
    display: block;
    height: 100%;
    background: #75162D;
    transition: width 0.2s;
  }

  .answers {
    display: grid;
    gap: 9px;
    margin: 23px 0;
  }

  .answer {
    width: 100%;
    min-height: 57px;
    display: flex;
    align-items: center;
    gap: 13px;
    padding: 9px 13px;
    border: 1px solid rgba(86, 11, 24, 0.18);
    background: rgba(255, 250, 236, 0.65);
    color: #3B010B;
    text-align: left;
    cursor: pointer;
    font-size: 14px;
    line-height: 1.4;
  }

  .answer:hover:not(:disabled),
  .answer.chosen {
    border-color: #75162D;
    background: rgba(226, 217, 160, 0.3);
  }

  .answer.correct {
    border-color: #75162D;
    background: rgba(226, 217, 160, 0.42);
  }

  .answer.wrong {
    border-color: #560B18;
    background: rgba(117, 22, 45, 0.09);
  }

  .answer > b {
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(117, 22, 45, 0.3);
    color: #75162D;
    font: 400 13px Georgia, serif;
  }

  .feedback {
    margin-bottom: 22px;
    padding: 15px;
    border-left: 3px solid #75162D;
    background: rgba(226, 217, 160, 0.22);
  }

  .feedback b {
    font-size: 13px;
  }

  .feedback p {
    margin: 5px 0 0;
    color: rgba(59, 1, 11, 0.7);
    font-size: 12px;
    line-height: 1.5;
  }

  .result {
    padding: 38px 0 8px;
    text-align: center;
  }

  .result > strong {
    display: block;
    margin: 9px 0;
    color: #75162D;
    font: 400 clamp(70px, 11vw, 120px) / 0.9 Georgia, serif;
    letter-spacing: -0.06em;
  }

  .result h3 {
    margin: 15px 0 7px;
    font: 400 28px Georgia, serif;
  }

  .result p {
    max-width: 500px;
    margin: 0 auto 27px;
    color: rgba(59, 1, 11, 0.68);
    font-size: 13px;
    line-height: 1.6;
  }

  .result .primary {
    margin: 0 auto;
  }

  footer {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-top: 18px;
    color: rgba(59, 1, 11, 0.5);
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.12em;
  }

  footer b {
    color: #75162D;
    font: 700 12px Georgia, serif;
  }

  footer i {
    height: 1px;
    flex: 1;
    background: rgba(86, 11, 24, 0.16);
  }

  .loading {
    min-height: 100vh;
    display: grid;
    place-items: center;
    background: #F2E5C6;
    color: #560B18;
    font: 400 20px Georgia, serif;
  }

  /* TABLET */
  @media (max-width: 900px) {
    .page {
      padding-left: 28px;
      padding-right: 28px;
    }

    .hero {
      margin-top: 52px;
      margin-bottom: 36px;
    }

    .hero h1 {
      font-size: clamp(46px, 8vw, 68px);
    }

    .card {
      padding: 30px;
    }
  }

  /* CELULAR */
  @media (max-width: 768px) {
    .page {
      width: 100%;
      padding: 16px 14px 24px;
    }

    .topbar {
      width: 100%;
      gap: 12px;
      padding-bottom: 15px;
    }

    .brand {
      gap: 9px;
      min-width: 0;
    }

    .mark {
      width: 35px;
      height: 35px;
      flex-basis: 35px;
      font-size: 20px;
    }

    .brand strong {
      font-size: 14px;
      letter-spacing: 0.09em;
    }

    .brand small {
      margin-top: 3px;
      font-size: 6px;
      letter-spacing: 0.08em;
    }

    .back {
      flex-shrink: 0;
      font-size: 8px;
      letter-spacing: 0.1em;
    }

    .hero {
      margin-top: 39px;
      margin-bottom: 28px;
    }

    .hero > span,
    .card-head small,
    .challenge small,
    .procedure-head small,
    .question-head small,
    .result small,
    .station small {
      font-size: 8px;
      letter-spacing: 0.13em;
    }

    .hero h1 {
      width: 100%;
      margin: 10px 0 15px;
      font-size: clamp(38px, 12vw, 56px);
      line-height: 0.96;
      letter-spacing: -0.04em;
    }

    .hero p {
      width: 100%;
      font-size: 13px;
      line-height: 1.6;
    }

    .station {
      width: 100%;
      display: block;
    }

    .station > div {
      width: 100%;
      padding: 10px 13px;
    }

    .station > div:first-child {
      border-right: 0;
      border-bottom: 1px solid rgba(86, 11, 24, 0.18);
    }

    .station > div:last-child {
      align-items: flex-start;
      flex-direction: column;
      gap: 4px;
    }

    .station b {
      font-size: 21px;
    }

    .station strong {
      width: 100%;
      font-size: 13px;
      line-height: 1.35;
    }

    .card {
      width: 100%;
      margin-top: 9px;
      padding: 20px 15px;
      box-shadow: 0 10px 25px rgba(59, 1, 11, 0.06);
    }

    .card-head {
      gap: 10px;
      padding-bottom: 19px;
    }

    .card-head > div:first-child {
      min-width: 0;
    }

    .card-head h2 {
      margin-top: 8px;
      font-size: 27px;
      line-height: 1.08;
      overflow-wrap: anywhere;
    }

    .number {
      width: 36px;
      height: 36px;
      flex-basis: 36px;
      font-size: 11px;
    }

    .challenge {
      padding: 21px 0 19px;
    }

    .challenge p,
    .procedure p {
      width: 100%;
      font-size: 16px;
      line-height: 1.55;
    }

    .notice {
      width: 100%;
      gap: 10px;
      margin-bottom: 19px;
      padding: 13px;
    }

    .notice i {
      width: 24px;
      height: 24px;
      flex-basis: 24px;
    }

    .notice b {
      font-size: 11px;
    }

    .notice p {
      font-size: 11px;
      line-height: 1.5;
    }

    .primary {
      width: 100%;
      min-height: 52px;
      padding: 0 15px;
      font-size: 9px;
      letter-spacing: 0.11em;
    }

    .procedure {
      padding: 21px 0 23px;
    }

    .procedure-head {
      align-items: flex-start;
    }

    .procedure-head small {
      max-width: 72%;
      line-height: 1.4;
    }

    .procedure p {
      margin-top: 12px;
    }

    .procedure-head b {
      font-size: 6px;
      padding: 5px 6px;
    }

    .divider {
      margin-bottom: 25px;
    }

    .divider span {
      font-size: 7px;
    }

    .question-head h3 {
      width: 100%;
      margin: 9px 0 14px;
      font-size: 19px;
      line-height: 1.35;
    }

    .answers {
      gap: 8px;
      margin: 19px 0;
    }

    .answer {
      min-height: 55px;
      padding: 9px 10px;
      gap: 10px;
      font-size: 12.5px;
      line-height: 1.38;
    }

    .answer > b {
      width: 28px;
      height: 28px;
      flex-basis: 28px;
      font-size: 12px;
    }

    .feedback {
      margin-bottom: 19px;
      padding: 13px;
    }

    .feedback b {
      font-size: 12px;
    }

    .feedback p {
      font-size: 11px;
    }

    .result {
      padding: 25px 0 5px;
    }

    .result > strong {
      font-size: 78px;
    }

    .result h3 {
      font-size: 23px;
    }

    .result p {
      font-size: 12px;
      margin-bottom: 22px;
    }

    footer {
      width: 100%;
      flex-wrap: wrap;
      gap: 7px 10px;
      padding-top: 16px;
      font-size: 7px;
      line-height: 1.45;
    }

    footer i {
      display: none;
    }

    footer span {
      max-width: 100%;
    }
  }

  /* CELULARES PEQUENOS */
  @media (max-width: 390px) {
    .page {
      padding-left: 11px;
      padding-right: 11px;
    }

    .brand small {
      display: none;
    }

    .brand strong {
      font-size: 13px;
    }

    .back {
      font-size: 8px;
    }

    .hero {
      margin-top: 34px;
      margin-bottom: 25px;
    }

    .hero h1 {
      font-size: 36px;
    }

    .hero p {
      font-size: 12.5px;
    }

    .station > div {
      padding-left: 11px;
      padding-right: 11px;
    }

    .card {
      padding: 18px 13px;
    }

    .card-head h2 {
      font-size: 24px;
    }

    .number {
      width: 33px;
      height: 33px;
      flex-basis: 33px;
    }

    .challenge p,
    .procedure p {
      font-size: 15px;
    }

    .question-head h3 {
      font-size: 18px;
    }

    .answer {
      font-size: 12px;
      min-height: 53px;
    }

    .primary {
      min-height: 50px;
      font-size: 8px;
    }
  }

  /* CELULARES MUITO ESTREITOS */
  @media (max-width: 340px) {
    .page {
      padding-left: 9px;
      padding-right: 9px;
    }

    .topbar {
      gap: 7px;
    }

    .mark {
      width: 32px;
      height: 32px;
      flex-basis: 32px;
      font-size: 18px;
    }

    .brand strong {
      font-size: 12px;
    }

    .back {
      font-size: 7px;
    }

    .hero h1 {
      font-size: 32px;
    }

    .card {
      padding-left: 11px;
      padding-right: 11px;
    }

    .card-head h2 {
      font-size: 22px;
    }

    .answer {
      font-size: 11.5px;
    }
  }
`;