"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
} from "react";
import { useRouter } from "next/navigation";

type Questao = {
  pergunta: string;
  alternativas: string[];
  resposta: number;
  explicacao: string;
};

type Teste = {
  nervo: string;
  titulo: string;
  desafio: string;
  observacao?: string;
  comoFazer: string[];
  perguntas: Questao[];
};

const TESTES: Teste[] = [
  {
    nervo: "I — Nervo Olfatório",
    titulo: "Reconhecimento de odores",
    desafio:
      "Avalie a capacidade do paciente de perceber e identificar diferentes odores, examinando cada narina separadamente.",
    observacao:
      "Utilize substâncias conhecidas, como café, canela, hortelã, tabaco ou baunilha.",
    comoFazer: [
      "Peça ao paciente para fechar os olhos.",
      "Oclua uma narina e mantenha a outra livre.",
      "Apresente uma substância conhecida próxima à narina livre.",
      "Pergunte se o paciente percebe algum odor.",
      "Pergunte se consegue identificar o odor e se o considera agradável ou desagradável.",
      "Repita o procedimento na outra narina.",
      "Na suspeita de alteração unilateral, iniciar pelo lado afetado.",
    ],
    perguntas: [
      {
        pergunta: "Como é denominada a perda total do olfato?",
        alternativas: ["Hiposmia", "Anosmia", "Parosmia", "Disosmia"],
        resposta: 1,
        explicacao:
          "Anosmia corresponde à perda total da capacidade de perceber odores.",
      },
      {
        pergunta:
          "Como é denominada a alteração na percepção de um odor, como perceber baunilha como desagradável?",
        alternativas: ["Anosmia", "Hiposmia", "Parosmia", "Amaurose"],
        resposta: 2,
        explicacao:
          "Parosmia corresponde à alteração da percepção dos odores.",
      },
      {
        pergunta: "O exame deve ser realizado com qual condição?",
        alternativas: [
          "Os dois olhos abertos e as duas narinas livres",
          "Olhos fechados e cada narina examinada separadamente",
          "Somente com a narina direita",
          "Somente com a narina esquerda",
        ],
        resposta: 1,
        explicacao:
          "O paciente deve permanecer com os olhos fechados e cada narina deve ser testada separadamente.",
      },
    ],
  },

  {
    nervo: "II — Nervo Óptico",
    titulo: "Acuidade visual",
    desafio:
      "Avalie a capacidade visual do paciente, examinando cada olho individualmente.",
    observacao:
      "Pode ser utilizada a tabela de Snellen ou, em uma avaliação mais simples, textos ou objetos posicionados a aproximadamente 35–40 cm.",
    comoFazer: [
      "Examine um olho por vez.",
      "Peça ao paciente para ocluir o olho que não será examinado.",
      "Utilize a tabela de Snellen ou outro recurso disponível.",
      "Solicite que o paciente identifique os optótipos ou leia o texto apresentado.",
      "Repita o procedimento no olho contralateral.",
      "Compare o desempenho dos dois olhos.",
    ],
    perguntas: [
      {
        pergunta:
          "Qual estrutura é avaliada principalmente no teste de acuidade visual?",
        alternativas: [
          "Nervo óptico",
          "Nervo facial",
          "Nervo trigêmeo",
          "Nervo vestibulococlear",
        ],
        resposta: 0,
        explicacao:
          "A acuidade visual é uma das funções avaliadas do II par craniano, o nervo óptico.",
      },
      {
        pergunta:
          "Como deve ser realizada a avaliação da acuidade visual?",
        alternativas: [
          "Sempre com os dois olhos simultaneamente",
          "Somente com o olho dominante",
          "Cada olho deve ser examinado separadamente",
          "Somente com os olhos fechados",
        ],
        resposta: 2,
        explicacao:
          "Cada olho deve ser examinado individualmente para permitir comparação entre os lados.",
      },
      {
        pergunta: "Como é denominada a perda completa da visão?",
        alternativas: ["Hiposmia", "Amaurose", "Diplopia", "Parosmia"],
        resposta: 1,
        explicacao:
          "Amaurose corresponde à perda abolida da visão.",
      },
    ],
  },

  {
    nervo: "II — Nervo Óptico",
    titulo: "Campo visual por confrontação",
    desafio:
      "Avalie os campos visuais do paciente por meio da comparação com o campo visual do examinador.",
    comoFazer: [
      "Posicione o paciente a aproximadamente 60 cm do examinador.",
      "Paciente e examinador devem manter os olhos na mesma altura.",
      "Peça ao paciente para ocluir um olho.",
      "O examinador deve ocluir o olho oposto.",
      "Peça ao paciente para olhar fixamente para o nariz do examinador.",
      "Mova o dedo lentamente a partir das regiões periféricas.",
      "Teste os quatro quadrantes do campo visual.",
      "Compare a percepção do paciente com a percepção do examinador.",
    ],
    perguntas: [
      {
        pergunta:
          "Durante o teste de confrontação, para onde o paciente deve direcionar o olhar?",
        alternativas: [
          "Para o próprio dedo",
          "Para o nariz do examinador",
          "Para o teto",
          "Para o lado examinado",
        ],
        resposta: 1,
        explicacao:
          "O paciente deve manter o olhar fixo no nariz do examinador enquanto o estímulo é movimentado perifericamente.",
      },
      {
        pergunta: "Quantos quadrantes devem ser avaliados?",
        alternativas: ["Dois", "Três", "Quatro", "Seis"],
        resposta: 2,
        explicacao:
          "O campo visual é confrontado nos quatro quadrantes.",
      },
      {
        pergunta:
          "O que deve ser feito com os olhos durante a comparação?",
        alternativas: [
          "Paciente fecha os dois olhos",
          "Paciente e examinador mantêm os dois olhos abertos",
          "Paciente fecha um olho e o examinador fecha o olho oposto",
          "Somente o examinador fecha um olho",
        ],
        resposta: 2,
        explicacao:
          "A técnica compara os campos visuais correspondentes, com um olho ocluído em cada participante.",
      },
    ],
  },

  {
    nervo: "III, IV e VI — Oculomotor, Troclear e Abducente",
    titulo: "Motilidade ocular extrínseca",
    desafio:
      "Avalie os movimentos oculares coordenados pelos músculos inervados pelos nervos III, IV e VI.",
    observacao:
      "Esses três nervos são examinados conjuntamente porque participam da motilidade extrínseca dos olhos.",
    comoFazer: [
      "Mantenha a cabeça do paciente imóvel.",
      "Peça ao paciente para acompanhar o objeto apenas com os olhos.",
      "Movimente o objeto horizontalmente para os dois lados.",
      "Depois, movimente-o verticalmente.",
      "Observe se há limitação dos movimentos.",
      "Observe a presença de estrabismo.",
      "Pergunte se o paciente apresenta diplopia.",
      "Teste a convergência aproximando o objeto dos olhos.",
    ],
    perguntas: [
      {
        pergunta:
          "Qual músculo é inervado pelo VI nervo craniano?",
        alternativas: [
          "Reto medial",
          "Reto lateral",
          "Reto superior",
          "Oblíquo superior",
        ],
        resposta: 1,
        explicacao:
          "O VI par craniano, nervo abducente, inerva o músculo reto lateral.",
      },
      {
        pergunta:
          "Qual músculo é inervado pelo IV nervo craniano?",
        alternativas: [
          "Reto lateral",
          "Reto medial",
          "Oblíquo superior",
          "Oblíquo inferior",
        ],
        resposta: 2,
        explicacao:
          "O IV par craniano, nervo troclear, inerva o músculo oblíquo superior.",
      },
      {
        pergunta:
          "Qual é uma queixa comum quando existe alteração da motilidade ocular?",
        alternativas: ["Anosmia", "Diplopia", "Disfagia", "Anacusia"],
        resposta: 1,
        explicacao:
          "A diplopia é uma queixa inicial frequente nas alterações da motilidade ocular.",
      },
    ],
  },

  {
    nervo: "III, IV e VI — Oculomotor, Troclear e Abducente",
    titulo: "Motilidade ocular intrínseca e reflexos pupilares",
    desafio:
      "Avalie a resposta das pupilas à luz e à acomodação.",
    comoFazer: [
      "Observe o tamanho e a simetria das pupilas.",
      "Ilumine uma pupila e observe sua constrição.",
      "Observe também a resposta da pupila contralateral.",
      "Repita o procedimento do outro lado.",
      "Avalie o reflexo fotomotor direto.",
      "Avalie o reflexo consensual.",
      "Se necessário, avalie também a acomodação.",
    ],
    perguntas: [
      {
        pergunta:
          "O que acontece no reflexo fotomotor direto normal?",
        alternativas: [
          "Dilatação da pupila iluminada",
          "Constrição da pupila iluminada",
          "Movimento lateral do olho",
          "Fechamento da pálpebra",
        ],
        resposta: 1,
        explicacao:
          "A luz incidindo sobre a retina provoca constrição da pupila iluminada.",
      },
      {
        pergunta:
          "O que caracteriza o reflexo consensual?",
        alternativas: [
          "Constrição apenas da pupila iluminada",
          "Constrição da pupila contralateral",
          "Dilatação de ambas as pupilas",
          "Fechamento de ambos os olhos",
        ],
        resposta: 1,
        explicacao:
          "A iluminação de um olho provoca também constrição da pupila contralateral.",
      },
      {
        pergunta:
          "Qual dos seguintes nervos participa diretamente do controle da motilidade ocular?",
        alternativas: ["III", "VIII", "IX", "XII"],
        resposta: 0,
        explicacao:
          "O III nervo craniano, junto com IV e VI, participa da motilidade ocular.",
      },
    ],
  },

  {
    nervo: "V — Nervo Trigêmeo",
    titulo: "Reflexo córneo-palpebral",
    desafio:
      "Avalie o reflexo córneo-palpebral utilizando estímulo delicado da córnea.",
    observacao:
      "O reflexo envolve aferência pelo trigêmeo e resposta motora pelo facial.",
    comoFazer: [
      "Peça ao paciente para olhar para o lado oposto ao que será estimulado.",
      "Aproxime cuidadosamente um pequeno pedaço de algodão.",
      "Toque delicadamente a córnea.",
      "Observe o fechamento palpebral.",
      "Repita no lado contralateral.",
      "Compare as respostas.",
    ],
    perguntas: [
      {
        pergunta:
          "Qual nervo fornece a principal aferência sensitiva do reflexo córneo-palpebral?",
        alternativas: [
          "Trigêmeo",
          "Facial",
          "Glossofaríngeo",
          "Vago",
        ],
        resposta: 0,
        explicacao:
          "A aferência sensitiva do reflexo córneo-palpebral é conduzida pelo nervo trigêmeo.",
      },
      {
        pergunta:
          "Qual resposta deve ser observada durante o reflexo córneo-palpebral?",
        alternativas: [
          "Abertura dos olhos",
          "Fechamento palpebral",
          "Dilatação pupilar",
          "Desvio da língua",
        ],
        resposta: 1,
        explicacao:
          "O estímulo corneano normalmente provoca fechamento das pálpebras.",
      },
      {
        pergunta:
          "Em uma lesão unilateral do trigêmeo, o que pode ocorrer ao estimular a córnea do lado afetado?",
        alternativas: [
          "Resposta normal obrigatoriamente",
          "Ausência da resposta do lado afetado",
          "Somente dilatação pupilar",
          "Desvio da mandíbula",
        ],
        resposta: 1,
        explicacao:
          "Na lesão trigeminal unilateral, o estímulo no lado afetado pode não desencadear o reflexo.",
      },
    ],
  },

  {
    nervo: "V — Nervo Trigêmeo",
    titulo: "Músculos da mastigação",
    desafio:
      "Avalie a função motora do trigêmeo por meio da musculatura responsável pela mastigação.",
    comoFazer: [
      "Peça ao paciente para cerrar os dentes com força.",
      "Palpe os músculos masseter e temporal.",
      "Compare a contração dos dois lados.",
      "Observe assimetrias.",
      "Peça ao paciente para abrir a boca.",
      "Observe eventual desvio da mandíbula.",
      "Se necessário, utilize um abaixador de língua para testar a força de mordida.",
    ],
    perguntas: [
      {
        pergunta:
          "Quais músculos devem ser palpados durante a avaliação da mastigação?",
        alternativas: [
          "Masseter e temporal",
          "Trapézio e esternocleidomastóideo",
          "Frontal e orbicular",
          "Reto lateral e medial",
        ],
        resposta: 0,
        explicacao:
          "Masseter e temporal são importantes músculos da mastigação avaliados no exame do trigêmeo.",
      },
      {
        pergunta:
          "Em uma lesão unilateral, para qual lado a mandíbula tende a desviar durante a abertura da boca?",
        alternativas: [
          "Para o lado saudável",
          "Para o lado da lesão",
          "Sempre para a direita",
          "Sempre para a esquerda",
        ],
        resposta: 1,
        explicacao:
          "Na lesão unilateral do trigêmeo, a mandíbula tende a desviar para o lado da lesão.",
      },
      {
        pergunta:
          "O trigêmeo possui componentes:",
        alternativas: [
          "Somente motores",
          "Somente sensitivos",
          "Sensitivos e motores",
          "Somente autonômicos",
        ],
        resposta: 2,
        explicacao:
          "O nervo trigêmeo apresenta componentes sensitivos e motores.",
      },
    ],
  },

  {
    nervo: "VII — Nervo Facial",
    titulo: "Movimentos da face",
    desafio:
      "Avalie a motricidade dos músculos da expressão facial, observando possíveis assimetrias.",
    comoFazer: [
      "Observe o rosto em repouso.",
      "Peça ao paciente para sorrir.",
      "Peça para mostrar os dentes.",
      "Peça para franzir a testa.",
      "Peça para fechar os olhos com força.",
      "Observe a simetria das pregas nasolabiais.",
      "Observe a largura das fissuras palpebrais.",
    ],
    perguntas: [
      {
        pergunta:
          "Qual nervo craniano é responsável pela motricidade dos músculos da expressão facial?",
        alternativas: [
          "V",
          "VII",
          "IX",
          "XII",
        ],
        resposta: 1,
        explicacao:
          "O VII nervo craniano, nervo facial, participa da motricidade da expressão facial.",
      },
      {
        pergunta:
          "Em uma fraqueza facial periférica, o que pode ser observado no lado afetado?",
        alternativas: [
          "Aumento da prega nasolabial",
          "Aprofundamento da prega nasolabial e aumento da fissura palpebral",
          "Desvio da língua",
          "Perda da audição",
        ],
        resposta: 1,
        explicacao:
          "O lado afetado pode apresentar aprofundamento da prega nasolabial e alargamento da fissura palpebral.",
      },
      {
        pergunta:
          "Na fraqueza facial central descrita na fonte, quais movimentos podem permanecer preservados?",
        alternativas: [
          "Somente movimentos da língua",
          "Franzir a testa e fechar os olhos",
          "Somente mastigação",
          "Somente movimentos oculares",
        ],
        resposta: 1,
        explicacao:
          "Na fraqueza facial central, a fonte descreve preservação do enrugamento da testa e do fechamento palpebral.",
      },
    ],
  },

  {
    nervo: "VII — Nervo Facial",
    titulo: "Gustação dos dois terços anteriores da língua",
    desafio:
      "Avalie a percepção dos sabores nos dois lados dos dois terços anteriores da língua.",
    comoFazer: [
      "Explique o procedimento ao paciente.",
      "Utilize soluções de sabores conhecidos.",
      "Teste os lados direito e esquerdo.",
      "Podem ser utilizados sabores doce, azedo, salgado e amargo.",
      "Solicite que o paciente identifique o sabor.",
      "Compare os dois lados.",
    ],
    perguntas: [
      {
        pergunta:
          "Qual região da língua é avaliada nesse teste relacionado ao nervo facial?",
        alternativas: [
          "Terço posterior",
          "Dois terços anteriores",
          "Somente a ponta",
          "Toda a língua obrigatoriamente",
        ],
        resposta: 1,
        explicacao:
          "A fonte descreve a avaliação da gustação nos dois terços anteriores da língua.",
      },
      {
        pergunta:
          "Quais sabores podem ser utilizados na avaliação?",
        alternativas: [
          "Somente doce",
          "Somente salgado",
          "Doce, azedo, salgado e amargo",
          "Somente amargo",
        ],
        resposta: 2,
        explicacao:
          "A fonte cita soluções doce, azeda, salgada e amarga.",
      },
      {
        pergunta:
          "Por que os dois lados devem ser testados?",
        alternativas: [
          "Para comparar a função entre os lados",
          "Porque o sabor só existe de um lado",
          "Para avaliar apenas o nervo óptico",
          "Para avaliar o campo visual",
        ],
        resposta: 0,
        explicacao:
          "A comparação bilateral permite identificar assimetrias na percepção gustativa.",
      },
    ],
  },

  {
    nervo: "VIII — Nervo Vestibulococlear",
    titulo: "Avaliação auditiva",
    desafio:
      "Realize uma avaliação clínica inicial da audição, comparando a percepção dos sons entre os dois ouvidos.",
    comoFazer: [
      "Produza um som de baixa intensidade próximo a uma das orelhas.",
      "Evite que o paciente veja a fonte do som.",
      "Teste um ouvido e depois o outro.",
      "Pode ser utilizado o som de um relógio ou diapasão.",
      "Pergunte se o paciente percebe o som.",
      "Compare a audição do paciente com a do examinador quando apropriado.",
    ],
    perguntas: [
      {
        pergunta:
          "Qual raiz do VIII nervo está relacionada principalmente à audição?",
        alternativas: [
          "Coclear",
          "Vestibular",
          "Motora",
          "Facial",
        ],
        resposta: 0,
        explicacao:
          "O VIII nervo possui uma raiz coclear relacionada à audição.",
      },
      {
        pergunta:
          "Qual raiz do VIII nervo está relacionada ao equilíbrio?",
        alternativas: [
          "Coclear",
          "Vestibular",
          "Trigeminal",
          "Olfatória",
        ],
        resposta: 1,
        explicacao:
          "A raiz vestibular está relacionada ao equilíbrio.",
      },
      {
        pergunta:
          "Qual síndrome é descrita na fonte com zumbido, vertigem, desequilíbrio, náuseas/vômitos e hipoacusia progressiva?",
        alternativas: [
          "Síndrome de Ménière",
          "Síndrome de Horner",
          "Síndrome piramidal",
          "Síndrome cerebelar",
        ],
        resposta: 0,
        explicacao:
          "A fonte relaciona esse conjunto de manifestações à síndrome de Ménière.",
      },
    ],
  },

  {
    nervo: "VIII — Nervo Vestibulococlear",
    titulo: "Impulso/compressão da cabeça",
    desafio:
      "Avalie a resposta vestibular utilizando movimentos rápidos da cabeça enquanto o paciente mantém a fixação visual.",
    comoFazer: [
      "Sente o paciente confortavelmente.",
      "Peça que mantenha o olhar fixo em um objeto ou no nariz do examinador.",
      "Segure a cabeça do paciente.",
      "Realize rapidamente uma rotação aproximada de 20° para um lado.",
      "Retorne à posição inicial.",
      "Repita para o lado oposto.",
      "Observe a manutenção da fixação visual e eventuais alterações.",
    ],
    perguntas: [
      {
        pergunta:
          "Durante o teste, o paciente deve manter o olhar fixo em:",
        alternativas: [
          "Um objeto ou no nariz do examinador",
          "O próprio ombro",
          "O teto",
          "Os próprios pés",
        ],
        resposta: 0,
        explicacao:
          "A fixação visual é mantida enquanto a cabeça é movimentada.",
      },
      {
        pergunta:
          "Qual sistema é especialmente avaliado nesse tipo de manobra?",
        alternativas: [
          "Vestibular",
          "Olfatório",
          "Gustativo",
          "Motor da língua",
        ],
        resposta: 0,
        explicacao:
          "A manobra avalia aspectos relacionados ao sistema vestibular.",
      },
      {
        pergunta:
          "A rotação rápida descrita na fonte é aproximadamente de:",
        alternativas: ["5°", "10°", "20°", "90°"],
        resposta: 2,
        explicacao:
          "A fonte descreve uma rotação rápida da cabeça de aproximadamente 20° para cada lado.",
      },
    ],
  },

  {
    nervo: "VIII — Nervo Vestibulococlear",
    titulo: "Manobra de Dix-Hallpike",
    desafio:
      "Avalie a presença de vertigem e nistagmo associados ao posicionamento da cabeça.",
    comoFazer: [
      "Mantenha o paciente sentado inicialmente.",
      "Posicione a cabeça rodada aproximadamente 45° para um lado.",
      "Rapidamente leve o paciente à posição supina.",
      "Mantenha a cabeça estendida aproximadamente 45° abaixo da horizontal.",
      "Observe a presença de vertigem.",
      "Observe a direção e a duração do nistagmo.",
      "Retorne o paciente à posição inicial.",
      "Repita para o lado oposto.",
    ],
    perguntas: [
      {
        pergunta:
          "Qual manifestação deve ser observada durante a manobra?",
        alternativas: [
          "Vertigem e nistagmo",
          "Somente anosmia",
          "Somente perda gustativa",
          "Somente ptose",
        ],
        resposta: 0,
        explicacao:
          "A manobra permite observar vertigem e nistagmo relacionados ao posicionamento.",
      },
      {
        pergunta:
          "A cabeça é rodada aproximadamente quantos graus para o lado?",
        alternativas: ["15°", "30°", "45°", "90°"],
        resposta: 2,
        explicacao:
          "A fonte descreve rotação da cabeça de aproximadamente 45°.",
      },
      {
        pergunta:
          "A manobra deve ser repetida no lado oposto?",
        alternativas: [
          "Não",
          "Somente em pacientes jovens",
          "Sim",
          "Somente se não houver sintomas",
        ],
        resposta: 2,
        explicacao:
          "A fonte orienta repetir a manobra para o lado oposto.",
      },
    ],
  },

  {
    nervo: "IX e X — Glossofaríngeo e Vago",
    titulo: "Motricidade do palato",
    desafio:
      "Observe a elevação do palato e o comportamento da úvula durante a emissão de um som.",
    comoFazer: [
      "Peça ao paciente para abrir a boca.",
      "Solicite que diga “Ah!” ou “Eh!” e mantenha o som.",
      "Observe a contração e elevação do palato.",
      "Observe a posição da úvula.",
      "Compare os dois lados.",
      "Observe alterações na voz.",
    ],
    observacao:
      "A fonte descreve alterações como voz nasal ou bitonal e dificuldade na elevação do palato em determinadas lesões.",
    perguntas: [
      {
        pergunta:
          "Como deve ser solicitado que o paciente produza o som durante o exame?",
        alternativas: [
          "Diga “Ah!” ou “Eh!” e mantenha",
          "Diga apenas “O”",
          "Mantenha os dentes cerrados",
          "Prenda a respiração",
        ],
        resposta: 0,
        explicacao:
          "A fonte recomenda solicitar a emissão de “Ah!” ou “Eh!” e observar o palato.",
      },
      {
        pergunta:
          "Quais nervos são examinados conjuntamente nesse teste?",
        alternativas: [
          "III e IV",
          "V e VII",
          "IX e X",
          "XI e XII",
        ],
        resposta: 2,
        explicacao:
          "Os nervos glossofaríngeo e vago são examinados conjuntamente na avaliação do palato e faringe.",
      },
      {
        pergunta:
          "Qual alteração da voz pode estar associada a lesões desses nervos?",
        alternativas: [
          "Voz nasal ou bitonal",
          "Somente rouquidão fisiológica",
          "Afonia obrigatória",
          "Nenhuma alteração vocal",
        ],
        resposta: 0,
        explicacao:
          "A fonte descreve voz nasal ou bitonal entre as manifestações possíveis.",
      },
    ],
  },

  {
    nervo: "IX e X — Glossofaríngeo e Vago",
    titulo: "Sensibilidade da faringe",
    desafio:
      "Avalie a sensibilidade da região faríngea por meio de estímulo dos pilares amigdalianos.",
    comoFazer: [
      "Peça ao paciente para abrir a boca.",
      "Utilize um abaixador de língua.",
      "Toque delicadamente um dos pilares amigdalianos.",
      "Pergunte ao paciente se percebeu o estímulo.",
      "Repita do outro lado.",
      "O reflexo de vômito pode ser utilizado como confirmação.",
    ],
    perguntas: [
      {
        pergunta:
          "Qual instrumento pode ser utilizado para estimular os pilares amigdalianos?",
        alternativas: [
          "Algodão apenas na córnea",
          "Abaixador de língua",
          "Diapasão",
          "Tabela de Snellen",
        ],
        resposta: 1,
        explicacao:
          "A fonte descreve o uso do abaixador de língua para tocar os pilares amigdalianos.",
      },
      {
        pergunta:
          "O paciente deve ser questionado sobre:",
        alternativas: [
          "Se percebeu o estímulo",
          "Se enxerga melhor",
          "Se identifica um odor",
          "Se percebe diplopia",
        ],
        resposta: 0,
        explicacao:
          "A sensibilidade faríngea é avaliada perguntando se o paciente percebeu o estímulo.",
      },
      {
        pergunta:
          "Qual reflexo pode ajudar a confirmar a avaliação?",
        alternativas: [
          "Fotomotor",
          "Córneo-palpebral",
          "Gag",
          "Aquileu",
        ],
        resposta: 2,
        explicacao:
          "A fonte cita o reflexo de vômito (gag) como possibilidade de confirmação.",
      },
    ],
  },

  {
    nervo: "XI — Nervo Acessório",
    titulo: "Trapézio",
    desafio:
      "Avalie a função do músculo trapézio por meio da elevação dos ombros contra resistência.",
    comoFazer: [
      "Peça ao paciente para elevar os ombros.",
      "Aplique resistência para baixo.",
      "Compare a força dos dois lados.",
      "Observe assimetria.",
      "Observe eventual queda do ombro.",
      "Observe sinais de atrofia.",
    ],
    perguntas: [
      {
        pergunta:
          "Qual músculo é avaliado pela elevação dos ombros contra resistência?",
        alternativas: [
          "Trapézio",
          "Masseter",
          "Temporal",
          "Esternocleidomastóideo",
        ],
        resposta: 0,
        explicacao:
          "A elevação dos ombros contra resistência avalia o trapézio.",
      },
      {
        pergunta:
          "O que pode ocorrer em uma lesão do nervo acessório?",
        alternativas: [
          "Queda do ombro e atrofia",
          "Anosmia",
          "Amaurose",
          "Diplopia obrigatória",
        ],
        resposta: 0,
        explicacao:
          "A fonte descreve queda do ombro e atrofia em lesões relacionadas ao trapézio.",
      },
      {
        pergunta:
          "Qual nervo está sendo avaliado?",
        alternativas: [
          "VII",
          "VIII",
          "XI",
          "XII",
        ],
        resposta: 2,
        explicacao:
          "O XI nervo craniano é o nervo acessório.",
      },
    ],
  },

  {
    nervo: "XI — Nervo Acessório",
    titulo: "Esternocleidomastóideo",
    desafio:
      "Avalie a força dos músculos esternocleidomastóideos durante a rotação da cabeça contra resistência.",
    comoFazer: [
      "Peça ao paciente para manter a cabeça centralizada.",
      "Solicite que gire a cabeça para um lado.",
      "Aplique resistência ao movimento.",
      "Compare a força dos dois lados.",
      "Repita para o lado oposto.",
    ],
    perguntas: [
      {
        pergunta:
          "Ao pedir que o paciente gire a cabeça para a direita contra resistência, qual esternocleidomastóideo está sendo testado principalmente?",
        alternativas: [
          "Direito",
          "Esquerdo",
          "Ambos exclusivamente",
          "Nenhum",
        ],
        resposta: 1,
        explicacao:
          "A fonte descreve que a rotação da cabeça para a direita contra resistência testa o esternocleidomastóideo esquerdo.",
      },
      {
        pergunta:
          "A rotação para a esquerda contra resistência testa principalmente o:",
        alternativas: [
          "Esternocleidomastóideo direito",
          "Esternocleidomastóideo esquerdo",
          "Trapézio esquerdo",
          "Masseter direito",
        ],
        resposta: 0,
        explicacao:
          "A rotação para a esquerda testa principalmente o esternocleidomastóideo direito.",
      },
      {
        pergunta:
          "Qual nervo fornece a inervação motora principal avaliada nesse teste?",
        alternativas: [
          "IX",
          "X",
          "XI",
          "XII",
        ],
        resposta: 2,
        explicacao:
          "O XI nervo craniano participa da inervação motora do esternocleidomastóideo.",
      },
    ],
  },

  {
    nervo: "XII — Nervo Hipoglosso",
    titulo: "Movimentação da língua",
    desafio:
      "Avalie a motricidade da língua, observando seus movimentos, força e eventual desvio.",
    comoFazer: [
      "Peça ao paciente para colocar a língua para fora.",
      "Observe a posição da língua.",
      "Peça para mover a língua para cima.",
      "Peça para mover para baixo.",
      "Peça para mover para a direita e para a esquerda.",
      "Peça para pressionar a língua contra a bochecha.",
      "Palpe a consistência da língua quando necessário.",
      "Observe atrofias e assimetrias.",
    ],
    perguntas: [
      {
        pergunta:
          "Para qual lado a língua tende a desviar quando protrudida em uma paralisia unilateral?",
        alternativas: [
          "Para o lado saudável",
          "Para o lado paralisado",
          "Sempre para a direita",
          "Sempre para a esquerda",
        ],
        resposta: 1,
        explicacao:
          "A fonte descreve desvio da língua para o lado paralisado durante a protrusão.",
      },
      {
        pergunta:
          "O XII nervo craniano é predominantemente:",
        alternativas: [
          "Sensitivo",
          "Motor",
          "Autonômico",
          "Visual",
        ],
        resposta: 1,
        explicacao:
          "O nervo hipoglosso é exclusivamente motor.",
      },
      {
        pergunta:
          "O que deve ser observado durante a inspeção da língua?",
        alternativas: [
          "Somente a cor",
          "Movimentos, trofismo e desvios",
          "Somente a sensibilidade térmica",
          "Somente o paladar",
        ],
        resposta: 1,
        explicacao:
          "A fonte orienta observar movimentos, trofismo e desvio da língua.",
      },
    ],
  },
];

function sortearTeste(anterior: Teste | null) {
  const disponiveis = TESTES.filter((teste) => teste !== anterior);

  return disponiveis[Math.floor(Math.random() * disponiveis.length)];
}

function sortearQuestoes(teste: Teste) {
  const embaralhadas = [...teste.perguntas].sort(
    () => Math.random() - 0.5
  );

  return embaralhadas.slice(0, 2);
}

export default function NervosCranianosPage() {
  const router = useRouter();

  const [testeAtual, setTesteAtual] = useState<Teste | null>(null);
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [indiceQuestao, setIndiceQuestao] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<
    number | null
  >(null);
  const [respondeu, setRespondeu] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [testeRealizado, setTesteRealizado] = useState(false);
  const [estacao, setEstacao] = useState(1);

  useEffect(() => {
    const acesso = sessionStorage.getItem("anatolab_acesso_nervos");

    if (acesso !== "true") {
      router.replace("/aluno");
      return;
    }

    setTesteAtual(sortearTeste(null));
  }, [router]);

  function iniciarAvaliacao() {
    if (!testeAtual) return;

    setTesteRealizado(true);
    setQuestoes(sortearQuestoes(testeAtual));
    setIndiceQuestao(0);
    setRespostaSelecionada(null);
    setRespondeu(false);
    setPontuacao(0);
    setFinalizado(false);
  }

  function selecionarResposta(index: number) {
    if (respondeu) return;

    setRespostaSelecionada(index);
    setRespondeu(true);

    const questao = questoes[indiceQuestao];

    if (index === questao.resposta) {
      setPontuacao((valor) => valor + 1);
    }
  }

  function proximaQuestao() {
    if (indiceQuestao < questoes.length - 1) {
      setIndiceQuestao((valor) => valor + 1);
      setRespostaSelecionada(null);
      setRespondeu(false);
      return;
    }

    setFinalizado(true);
  }

  function novoTeste() {
    const novo = sortearTeste(testeAtual);

    setTesteAtual(novo);
    setTesteRealizado(false);
    setQuestoes([]);
    setIndiceQuestao(0);
    setRespostaSelecionada(null);
    setRespondeu(false);
    setPontuacao(0);
    setFinalizado(false);
    setEstacao((valor) => valor + 1);
  }

  if (!testeAtual) {
    return (
      <main style={styles.loading}>
        <div style={styles.loadingBox}>
          <div style={styles.loadingLine} />
          <p style={styles.loadingText}>Preparando estação prática...</p>
        </div>
      </main>
    );
  }

  const questaoAtual = questoes[indiceQuestao];

  return (
    <main style={styles.page}>
      <div style={styles.backgroundMark} />

      <div style={styles.shell}>
        <header style={styles.header}>
          <div>
            <div style={styles.marcaPequena}>ANATOLAB</div>
            <div style={styles.marcaSub}>LABORATÓRIO DE ANATOMIA</div>
          </div>

          <div style={styles.headerRight}>
            <span style={styles.disciplina}>ANATOMIA II</span>

            <button
              type="button"
              onClick={() => router.push("/aluno")}
              style={styles.backButton}
            >
              VOLTAR
            </button>
          </div>
        </header>

        <section style={styles.hero}>
          <div>
            <div style={styles.overline}>
              ESTAÇÃO PRÁTICA · NERVOS CRANIANOS
            </div>

            <h1 style={styles.title}>
              Exame dos
              <br />
              <span style={styles.titleAccent}>nervos cranianos.</span>
            </h1>

            <p style={styles.subtitle}>
              Uma estação de avaliação clínica. Leia o desafio, realize o
              procedimento e depois responda às questões para consolidar o
              exame neurológico.
            </p>
          </div>

          <div style={styles.station}>
            <span style={styles.stationLabel}>ESTAÇÃO</span>
            <strong style={styles.stationNumber}>
              {String(estacao).padStart(2, "0")}
            </strong>
            <span style={styles.stationLine} />
            <span style={styles.stationSmall}>PRÁTICA</span>
          </div>
        </section>

        <section style={styles.mainCard}>
          <div style={styles.cardTop}>
            <div>
              <span style={styles.cardEyebrow}>NERVOS CRANIANOS</span>
              <h2 style={styles.cardTitle}>{testeAtual.nervo}</h2>
            </div>

            <div style={styles.testNumber}>
              <span>TESTE</span>
              <strong>
                {String(TESTES.indexOf(testeAtual) + 1).padStart(2, "0")}
              </strong>
              <span>/ {String(TESTES.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div style={styles.divider} />

          {!testeRealizado && !finalizado && (
            <>
              <div style={styles.challengeHeader}>
                <span style={styles.sectionNumber}>01</span>

                <div>
                  <span style={styles.sectionLabel}>DESAFIO CLÍNICO</span>
                  <h3 style={styles.sectionTitle}>{testeAtual.titulo}</h3>
                </div>
              </div>

              <div style={styles.challengeBox}>
                <div style={styles.quoteMark}>“</div>

                <p style={styles.challengeText}>
                  {testeAtual.desafio}
                </p>
              </div>

              {testeAtual.observacao && (
                <div style={styles.observation}>
                  <span style={styles.observationLabel}>NOTA TÉCNICA</span>
                  <p>{testeAtual.observacao}</p>
                </div>
              )}

              <div style={styles.actionArea}>
                <div>
                  <span style={styles.actionLabel}>ETAPA 01</span>
                  <p style={styles.actionDescription}>
                    Realize o exame no paciente ou simule o procedimento.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={iniciarAvaliacao}
                  style={styles.primaryButton}
                >
                  TESTE REALIZADO
                  <span style={styles.buttonArrow}>→</span>
                </button>
              </div>
            </>
          )}

          {testeRealizado && !finalizado && questaoAtual && (
            <>
              <div style={styles.instructionsHeader}>
                <span style={styles.sectionNumber}>02</span>

                <div>
                  <span style={styles.sectionLabel}>
                    PROCEDIMENTO ESPERADO
                  </span>

                  <h3 style={styles.sectionTitle}>
                    Como o teste deveria ser realizado
                  </h3>
                </div>
              </div>

              <div style={styles.procedureBox}>
                {testeAtual.comoFazer.map((passo, index) => (
                  <div key={index} style={styles.procedureItem}>
                    <span style={styles.procedureNumber}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p>{passo}</p>
                  </div>
                ))}
              </div>

              <div style={styles.quizDivider}>
                <span />
                <strong>VERIFICAÇÃO DE CONHECIMENTO</strong>
                <span />
              </div>

              <div style={styles.quizHeader}>
                <div>
                  <span style={styles.sectionLabel}>QUESTÃO</span>

                  <h3 style={styles.questionCounter}>
                    {String(indiceQuestao + 1).padStart(2, "0")}
                    <span>/02</span>
                  </h3>
                </div>

                <div style={styles.progressContainer}>
                  <div style={styles.progressTrack}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${
                          ((indiceQuestao + 1) / questoes.length) * 100
                        }%`,
                      }}
                    />
                  </div>

                  <span style={styles.progressText}>
                    {Math.round(
                      ((indiceQuestao + 1) / questoes.length) * 100
                    )}
                    %
                  </span>
                </div>
              </div>

              <div style={styles.questionCard}>
                <p style={styles.question}>{questaoAtual.pergunta}</p>

                <div style={styles.options}>
                  {questaoAtual.alternativas.map((alternativa, index) => {
                    const correta = index === questaoAtual.resposta;
                    const selecionada =
                      index === respostaSelecionada;

                    let optionStyle = styles.option;

                    if (respondeu && correta) {
                      optionStyle = {
                        ...styles.option,
                        ...styles.optionCorrect,
                      };
                    } else if (respondeu && selecionada && !correta) {
                      optionStyle = {
                        ...styles.option,
                        ...styles.optionWrong,
                      };
                    } else if (selecionada) {
                      optionStyle = {
                        ...styles.option,
                        ...styles.optionSelected,
                      };
                    }

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => selecionarResposta(index)}
                        style={optionStyle}
                      >
                        <span style={styles.optionLetter}>
                          {String.fromCharCode(65 + index)}
                        </span>

                        <span style={styles.optionText}>
                          {alternativa}
                        </span>

                        {respondeu && correta && (
                          <span style={styles.optionStatus}>CORRETA</span>
                        )}

                        {respondeu && selecionada && !correta && (
                          <span style={styles.optionStatusWrong}>
                            INCORRETA
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {respondeu && (
                  <div
                    style={
                      respostaSelecionada === questaoAtual.resposta
                        ? styles.feedbackCorrect
                        : styles.feedbackWrong
                    }
                  >
                    <div style={styles.feedbackTitle}>
                      {respostaSelecionada === questaoAtual.resposta
                        ? "Resposta correta"
                        : "Resposta incorreta"}
                    </div>

                    <p>{questaoAtual.explicacao}</p>
                  </div>
                )}

                {respondeu && (
                  <button
                    type="button"
                    onClick={proximaQuestao}
                    style={styles.nextButton}
                  >
                    {indiceQuestao < questoes.length - 1
                      ? "PRÓXIMA QUESTÃO"
                      : "FINALIZAR ESTAÇÃO"}

                    <span>→</span>
                  </button>
                )}
              </div>
            </>
          )}

          {finalizado && (
            <div style={styles.final}>
              <div style={styles.finalHeader}>
                <span style={styles.sectionLabel}>ESTAÇÃO CONCLUÍDA</span>

                <div style={styles.finalLine} />

                <h2 style={styles.finalTitle}>
                  Avaliação
                  <br />
                  finalizada.
                </h2>
              </div>

              <div style={styles.scoreBox}>
                <div>
                  <span style={styles.scoreLabel}>DESEMPENHO</span>
                  <p style={styles.scoreDescription}>
                    Resultado da verificação de conhecimento desta estação.
                  </p>
                </div>

                <div style={styles.score}>
                  <strong>{pontuacao}</strong>
                  <span>/ 2</span>
                </div>
              </div>

              <div style={styles.finalMessage}>
                {pontuacao === 2 && (
                  <>
                    <strong>Excelente desempenho.</strong>
                    <p>
                      Você acertou as duas questões da estação. O
                      conhecimento clínico demonstrado está consistente com o
                      procedimento avaliado.
                    </p>
                  </>
                )}

                {pontuacao === 1 && (
                  <>
                    <strong>Bom trabalho.</strong>
                    <p>
                      Você acertou uma das questões. Revise o procedimento
                      antes de seguir para a próxima estação.
                    </p>
                  </>
                )}

                {pontuacao === 0 && (
                  <>
                    <strong>Momento de revisar.</strong>
                    <p>
                      Use a explicação apresentada nas questões e refaça a
                      estação para consolidar o conteúdo.
                    </p>
                  </>
                )}
              </div>

              <div style={styles.finalActions}>
                <button
                  type="button"
                  onClick={novoTeste}
                  style={styles.primaryButton}
                >
                  NOVO TESTE
                  <span style={styles.buttonArrow}>→</span>
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/aluno")}
                  style={styles.secondaryButton}
                >
                  VOLTAR AO ACESSO
                </button>
              </div>
            </div>
          )}
        </section>

        <footer style={styles.footer}>
          <div>
            <strong>ANATOLAB</strong>
            <span>ANATOMIA II · LHS</span>
          </div>

          <span style={styles.footerCenter}>
            ESTAÇÃO DE EXAME NEUROLÓGICO
          </span>

          <span>MONITORIA ACADÊMICA</span>
        </footer>
      </div>
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#F2E5C6",
    color: "#3B010B",
    fontFamily:
      "Arial, Helvetica, sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  backgroundMark: {
    position: "fixed",
    width: "520px",
    height: "520px",
    border: "1px solid rgba(117, 22, 45, 0.08)",
    borderRadius: "50%",
    right: "-260px",
    top: "-220px",
    pointerEvents: "none",
  },

  shell: {
    width: "min(1180px, calc(100% - 48px))",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },

  header: {
    minHeight: "86px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(86, 11, 24, 0.2)",
  },

  marcaPequena: {
    fontFamily:
      "Georgia, 'Times New Roman', serif",
    fontSize: "24px",
    fontWeight: 700,
    letterSpacing: "0.16em",
    color: "#560B18",
  },

  marcaSub: {
    marginTop: "4px",
    fontSize: "9px",
    letterSpacing: "0.22em",
    color: "#75162D",
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "28px",
  },

  disciplina: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.18em",
    color: "#75162D",
  },

  backButton: {
    border: "none",
    background: "transparent",
    color: "#560B18",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.16em",
    cursor: "pointer",
    padding: "10px 0",
  },

  hero: {
    minHeight: "330px",
    display: "grid",
    gridTemplateColumns: "1fr 170px",
    alignItems: "center",
    gap: "60px",
    padding: "58px 0 48px",
  },

  overline: {
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.22em",
    color: "#75162D",
    marginBottom: "20px",
  },

  title: {
    fontFamily:
      "Georgia, 'Times New Roman', serif",
    fontSize: "clamp(48px, 7vw, 86px)",
    lineHeight: 0.92,
    fontWeight: 500,
    letterSpacing: "-0.055em",
    margin: 0,
    color: "#3B010B",
  },

  titleAccent: {
    color: "#75162D",
  },

  subtitle: {
    maxWidth: "610px",
    fontSize: "15px",
    lineHeight: 1.75,
    color: "#5B4044",
    margin: "30px 0 0",
  },

  station: {
    width: "150px",
    height: "170px",
    border: "1px solid rgba(86, 11, 24, 0.35)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  stationLabel: {
    fontSize: "9px",
    letterSpacing: "0.24em",
    fontWeight: 700,
    color: "#75162D",
  },

  stationNumber: {
    fontFamily:
      "Georgia, 'Times New Roman', serif",
    fontSize: "64px",
    lineHeight: 1,
    fontWeight: 500,
    color: "#560B18",
    margin: "8px 0",
  },

  stationLine: {
    width: "38px",
    height: "1px",
    background: "#75162D",
    margin: "5px 0 10px",
  },

  stationSmall: {
    fontSize: "8px",
    letterSpacing: "0.24em",
    color: "#75162D",
  },

  mainCard: {
    background: "#FFFDF8",
    border: "1px solid rgba(86, 11, 24, 0.18)",
    boxShadow:
      "0 22px 55px rgba(59, 1, 11, 0.10)",
    padding: "50px 54px 54px",
    marginBottom: "46px",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "30px",
  },

  cardEyebrow: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.22em",
    color: "#75162D",
  },

  cardTitle: {
    fontFamily:
      "Georgia, 'Times New Roman', serif",
    fontSize: "31px",
    fontWeight: 500,
    lineHeight: 1.2,
    margin: "12px 0 0",
    color: "#3B010B",
  },

  testNumber: {
    display: "flex",
    alignItems: "baseline",
    gap: "5px",
    color: "#8C7276",
    fontSize: "9px",
    letterSpacing: "0.12em",
    whiteSpace: "nowrap",
  },

  divider: {
    height: "1px",
    background: "rgba(86, 11, 24, 0.15)",
    margin: "30px 0 38px",
  },

  challengeHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "18px",
    marginBottom: "24px",
  },

  instructionsHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "18px",
    marginBottom: "24px",
  },

  sectionNumber: {
    width: "34px",
    height: "34px",
    minWidth: "34px",
    border: "1px solid #75162D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: 700,
    color: "#75162D",
  },

  sectionLabel: {
    display: "block",
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.2em",
    color: "#75162D",
    marginBottom: "7px",
  },

  sectionTitle: {
    fontFamily:
      "Georgia, 'Times New Roman', serif",
    fontSize: "25px",
    fontWeight: 500,
    margin: 0,
    color: "#3B010B",
  },

  challengeBox: {
    position: "relative",
    background: "#F2E5C6",
    borderLeft: "4px solid #75162D",
    padding: "34px 48px 34px 50px",
    marginBottom: "22px",
  },

  quoteMark: {
    position: "absolute",
    left: "17px",
    top: "17px",
    fontFamily:
      "Georgia, 'Times New Roman', serif",
    fontSize: "42px",
    lineHeight: 1,
    color: "#75162D",
  },

  challengeText: {
    margin: 0,
    fontFamily:
      "Georgia, 'Times New Roman', serif",
    fontSize: "21px",
    lineHeight: 1.55,
    color: "#560B18",
  },

  observation: {
    border: "1px solid rgba(117, 22, 45, 0.2)",
    padding: "18px 22px",
    marginBottom: "35px",
    background: "#FFFAF0",
  },

  observationLabel: {
    display: "block",
    fontSize: "8px",
    fontWeight: 700,
    letterSpacing: "0.2em",
    color: "#75162D",
    marginBottom: "8px",
  },

  actionArea: {
    borderTop: "1px solid rgba(86, 11, 24, 0.15)",
    paddingTop: "28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
  },

  actionLabel: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.2em",
    color: "#75162D",
  },

  actionDescription: {
    margin: "7px 0 0",
    fontSize: "13px",
    color: "#705A5E",
  },

  primaryButton: {
    border: "none",
    background: "#560B18",
    color: "#FFFDF8",
    minHeight: "52px",
    padding: "0 22px",
    display: "flex",
    alignItems: "center",
    gap: "26px",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.16em",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  buttonArrow: {
    fontSize: "18px",
    lineHeight: 1,
    fontWeight: 400,
  },

  procedureBox: {
    borderTop: "1px solid rgba(86, 11, 24, 0.16)",
    borderBottom: "1px solid rgba(86, 11, 24, 0.16)",
    marginBottom: "38px",
  },

  procedureItem: {
    display: "grid",
    gridTemplateColumns: "50px 1fr",
    alignItems: "center",
    gap: "18px",
    minHeight: "60px",
    borderBottom: "1px solid rgba(86, 11, 24, 0.10)",
  },

  procedureNumber: {
    fontFamily:
      "Georgia, 'Times New Roman', serif",
    fontSize: "13px",
    color: "#75162D",
    textAlign: "center",
  },

  procedureItemText: {
    fontSize: "14px",
    lineHeight: 1.55,
    color: "#4D393D",
  },

  quizDivider: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    gap: "18px",
    margin: "42px 0 34px",
  },

  quizHeader: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "30px",
    marginBottom: "20px",
  },

  questionCounter: {
    fontFamily:
      "Georgia, 'Times New Roman', serif",
    fontSize: "38px",
    fontWeight: 500,
    lineHeight: 1,
    color: "#560B18",
    margin: 0,
  },

  progressContainer: {
    width: "260px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  progressTrack: {
    height: "4px",
    background: "#E2D9A0",
    flex: 1,
  },

  progressFill: {
    height: "100%",
    background: "#75162D",
    transition: "width 0.25s ease",
  },

  progressText: {
    fontSize: "9px",
    fontWeight: 700,
    color: "#75162D",
    letterSpacing: "0.08em",
  },

  questionCard: {
    background: "#FFFAF0",
    border: "1px solid rgba(86, 11, 24, 0.16)",
    padding: "34px",
  },

  question: {
    fontFamily:
      "Georgia, 'Times New Roman', serif",
    fontSize: "22px",
    lineHeight: 1.45,
    color: "#3B010B",
    margin: "0 0 28px",
  },

  options: {
    display: "flex",
    flexDirection: "column",
    gap: "9px",
  },

  option: {
    width: "100%",
    minHeight: "58px",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    gap: "15px",
    padding: "9px 14px",
    background: "#FFFDF8",
    border: "1px solid rgba(86, 11, 24, 0.16)",
    color: "#3B010B",
    cursor: "pointer",
  },

  optionSelected: {
    border: "1px solid #75162D",
    background: "#F2E5C6",
  },

  optionCorrect: {
    border: "1px solid #315B42",
    background: "#EEF5EF",
  },

  optionWrong: {
    border: "1px solid #8A2735",
    background: "#FAEEEE",
  },

  optionLetter: {
    width: "34px",
    height: "34px",
    minWidth: "34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(86, 11, 24, 0.25)",
    fontFamily:
      "Georgia, 'Times New Roman', serif",
    fontSize: "13px",
    color: "#75162D",
  },

  optionText: {
    fontSize: "14px",
    lineHeight: 1.4,
    flex: 1,
  },

  optionStatus: {
    fontSize: "8px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "#315B42",
  },

  optionStatusWrong: {
    fontSize: "8px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "#8A2735",
  },

  feedbackCorrect: {
    marginTop: "20px",
    padding: "20px 22px",
    background: "#EEF5EF",
    borderLeft: "4px solid #315B42",
  },

  feedbackWrong: {
    marginTop: "20px",
    padding: "20px 22px",
    background: "#FAEEEE",
    borderLeft: "4px solid #8A2735",
  },

  feedbackTitle: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    marginBottom: "7px",
  },

  nextButton: {
    marginTop: "24px",
    marginLeft: "auto",
    border: "none",
    background: "#560B18",
    color: "#FFFDF8",
    minHeight: "48px",
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    gap: "22px",
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.15em",
    cursor: "pointer",
  },

  final: {
    padding: "15px 0 5px",
  },

  finalHeader: {
    maxWidth: "700px",
  },

  finalLine: {
    width: "70px",
    height: "2px",
    background: "#75162D",
    margin: "20px 0",
  },

  finalTitle: {
    fontFamily:
      "Georgia, 'Times New Roman', serif",
    fontSize: "56px",
    lineHeight: 0.95,
    fontWeight: 500,
    color: "#3B010B",
    margin: 0,
  },

  scoreBox: {
    marginTop: "42px",
    padding: "28px",
    border: "1px solid rgba(86, 11, 24, 0.18)",
    background: "#F2E5C6",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
  },

  scoreLabel: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.2em",
    color: "#75162D",
  },

  scoreDescription: {
    fontSize: "13px",
    color: "#665155",
    margin: "7px 0 0",
  },

  score: {
    display: "flex",
    alignItems: "baseline",
    color: "#560B18",
  },

  finalMessage: {
    marginTop: "26px",
    maxWidth: "700px",
    borderLeft: "3px solid #75162D",
    paddingLeft: "22px",
  },

  finalActions: {
    marginTop: "34px",
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },

  secondaryButton: {
    minHeight: "52px",
    padding: "0 22px",
    background: "transparent",
    color: "#560B18",
    border: "1px solid rgba(86, 11, 24, 0.3)",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.14em",
    cursor: "pointer",
  },

  footer: {
    minHeight: "75px",
    borderTop: "1px solid rgba(86, 11, 24, 0.2)",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    gap: "20px",
    color: "#80686C",
    fontSize: "8px",
    letterSpacing: "0.16em",
  },

  footerCenter: {
    textAlign: "center",
  },

  loading: {
    minHeight: "100vh",
    background: "#F2E5C6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#560B18",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  loadingBox: {
    width: "260px",
    textAlign: "center",
  },

  loadingLine: {
    width: "100%",
    height: "2px",
    background: "#75162D",
    marginBottom: "18px",
  },

  loadingText: {
    fontSize: "9px",
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
  },
};