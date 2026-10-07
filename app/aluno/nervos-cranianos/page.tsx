"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Alternative = {
  text: string;
  correct: boolean;
};

type ClinicalCase = {
  id: number;
  title: string;
  caseText: string;
  alternatives: Alternative[];
  testName: string;
  nerve: string;
  procedure: string;
  group: string;
};

type Question = {
  id: number;
  group: string;
  question: string;
  alternatives: string[];
  correct: number;
  explanation: string;
};

const clinicalCases: ClinicalCase[] = [
  {
    id: 1,
    title: "CASO CLÍNICO",
    caseText:
      "Um paciente relata que, há algumas semanas, percebeu dificuldade para sentir cheiros. Ele consegue perceber que há alguma substância próxima, mas tem dificuldade para reconhecer o que está sentindo. A alteração parece ser mais evidente de um lado.",
    alternatives: [
      {
        text: "Apresentaria substâncias com odores conhecidos, avaliando cada narina separadamente.",
        correct: true,
      },
      {
        text: "Solicitaria leitura de optótipos, avaliando cada olho separadamente.",
        correct: false,
      },
      {
        text: "Solicitaria movimentos voluntários da face, comparando os dois lados.",
        correct: false,
      },
      {
        text: "Solicitaria protrusão da língua e avaliaria seus movimentos.",
        correct: false,
      },
    ],
    testName: "Teste de identificação de odores",
    nerve: "I — Olfatório",
    procedure:
      "Com os olhos fechados, o paciente deve ter uma narina ocluída enquanto a outra é examinada. Apresente uma substância com odor conhecido e pergunte se ele percebe o cheiro, se o considera agradável ou desagradável e se consegue identificá-lo. Depois, repita no lado oposto.",
    group: "I",
  },

  {
    id: 2,
    title: "CASO CLÍNICO",
    caseText:
      "Uma paciente relata que passou a ter dificuldade para enxergar objetos que anteriormente conseguia visualizar com facilidade. A queixa parece ser mais evidente quando utiliza um dos olhos.",
    alternatives: [
      {
        text: "Avaliar a visão de cada olho separadamente, utilizando optótipos ou texto em distância adequada.",
        correct: true,
      },
      {
        text: "Testar a elevação do palato enquanto a paciente pronuncia uma vogal.",
        correct: false,
      },
      {
        text: "Solicitar que a paciente faça movimentos da língua para todos os lados.",
        correct: false,
      },
      {
        text: "Testar a contração do trapézio contra resistência.",
        correct: false,
      },
    ],
    testName: "Avaliação da acuidade visual",
    nerve: "II — Óptico",
    procedure:
      "Avalie cada olho separadamente. Pode-se utilizar uma tabela de Snellen ou, conforme o contexto, observar a capacidade de leitura de texto em distância aproximada de 35–40 cm.",
    group: "II",
  },

  {
    id: 3,
    title: "CASO CLÍNICO",
    caseText:
      "Um paciente relata que, apesar de enxergar objetos quando olha diretamente para eles, frequentemente não percebe pessoas ou objetos que se aproximam pelas laterais. Ele não apresenta queixa principal relacionada à nitidez da imagem.",
    alternatives: [
      {
        text: "Compararia os campos visuais por confrontação, examinando os quatro quadrantes.",
        correct: true,
      },
      {
        text: "Apresentaria diferentes odores em cada narina e pediria sua identificação.",
        correct: false,
      },
      {
        text: "Solicitaria movimentos da face e observaria a simetria durante o sorriso.",
        correct: false,
      },
      {
        text: "Solicitaria rotação da cabeça contra resistência.",
        correct: false,
      },
    ],
    testName: "Campo visual por confrontação",
    nerve: "II — Óptico",
    procedure:
      "Paciente e examinador ficam aproximadamente a 60 cm de distância. Cada um oclui um olho e o paciente fixa o nariz do examinador. O examinador movimenta o dedo na periferia do campo visual, testando os quatro quadrantes e comparando a percepção do paciente com a própria percepção.",
    group: "II",
  },

  {
    id: 4,
    title: "CASO CLÍNICO",
    caseText:
      "Um paciente relata visão dupla, principalmente quando tenta olhar para um dos lados. Durante a avaliação, a queixa desaparece quando um dos olhos é ocluído.",
    alternatives: [
      {
        text: "Solicitaria movimentos oculares horizontais e verticais, mantendo a cabeça imóvel.",
        correct: true,
      },
      {
        text: "Testaria a sensibilidade facial e a força dos músculos da mastigação.",
        correct: false,
      },
      {
        text: "Solicitaria protrusão da língua e avaliaria sua direção.",
        correct: false,
      },
      {
        text: "Solicitaria elevação dos ombros contra resistência.",
        correct: false,
      },
    ],
    testName: "Avaliação da motilidade ocular extrínseca",
    nerve: "III, IV e VI — Oculomotor, Troclear e Abducente",
    procedure:
      "Com a cabeça imóvel, solicite que o paciente acompanhe o dedo ou objeto com os olhos em diferentes direções, avaliando os movimentos horizontais e verticais. Também pode ser avaliada a convergência aproximando o objeto do paciente.",
    group: "IIIIVVI",
  },

  {
    id: 5,
    title: "CASO CLÍNICO",
    caseText:
      "Durante uma consulta, observa-se diferença no tamanho das pupilas. O paciente também relata dificuldade de adaptação visual ao mudar rapidamente o foco de um objeto distante para um objeto próximo.",
    alternatives: [
      {
        text: "Avaliar a resposta pupilar à luz e a resposta durante a acomodação.",
        correct: true,
      },
      {
        text: "Testar a sensibilidade da face e a força da mastigação.",
        correct: false,
      },
      {
        text: "Solicitar movimentos da língua contra a resistência da bochecha.",
        correct: false,
      },
      {
        text: "Solicitar rotação da cabeça para ambos os lados contra resistência.",
        correct: false,
      },
    ],
    testName: "Reflexos pupilares e acomodação",
    nerve: "III — Oculomotor",
    procedure:
      "Observe as pupilas e avalie a resposta direta à luz, verificando a constrição da pupila iluminada. Observe também a resposta consensual no olho contralateral. A acomodação pode ser avaliada solicitando mudança do olhar de um objeto distante para um objeto próximo.",
    group: "IIIIVVI",
  },

  {
    id: 6,
    title: "CASO CLÍNICO",
    caseText:
      "Um paciente apresenta alteração da sensibilidade em parte da face e relata dificuldade para mastigar alimentos mais resistentes. Durante a conversa, ele refere que a alteração parece mais intensa de um lado.",
    alternatives: [
      {
        text: "Avaliar a sensibilidade facial e a contração dos músculos envolvidos na mastigação.",
        correct: true,
      },
      {
        text: "Solicitar elevação do palato durante a emissão de uma vogal.",
        correct: false,
      },
      {
        text: "Solicitar protrusão da língua e observar sua direção.",
        correct: false,
      },
      {
        text: "Solicitar elevação dos ombros contra resistência.",
        correct: false,
      },
    ],
    testName: "Sensibilidade facial e musculatura da mastigação",
    nerve: "V — Trigêmeo",
    procedure:
      "Avalie a sensibilidade da face e compare os lados. Para a parte motora, peça ao paciente que feche a boca com força e palpe os músculos masseter e temporal, procurando assimetrias. Também pode ser observada a abertura da boca.",
    group: "V",
  },

  {
    id: 7,
    title: "CASO CLÍNICO",
    caseText:
      "Durante o exame físico, um paciente apresenta redução da percepção de estímulos na região da córnea de um dos lados. É necessário avaliar também a resposta reflexa desencadeada pelo estímulo.",
    alternatives: [
      {
        text: "Estimular delicadamente a córnea com algodão e observar o fechamento palpebral.",
        correct: true,
      },
      {
        text: "Solicitar que o paciente sorria e observe a elevação dos ombros.",
        correct: false,
      },
      {
        text: "Solicitar que o paciente diga “Ah!” e observe a movimentação do palato.",
        correct: false,
      },
      {
        text: "Solicitar rotação da cabeça contra resistência.",
        correct: false,
      },
    ],
    testName: "Reflexo córneo-palpebral",
    nerve: "V — Trigêmeo",
    procedure:
      "Peça ao paciente que olhe para o lado. Com um pequeno pedaço de algodão, toque delicadamente a córnea e observe o fechamento dos olhos. Em lesão unilateral do trigêmeo, a resposta pode estar ausente quando o lado afetado é estimulado.",
    group: "V",
  },

  {
    id: 8,
    title: "CASO CLÍNICO",
    caseText:
      "Um paciente apresenta assimetria facial percebida durante a conversa e refere dificuldade para realizar alguns movimentos voluntários de um lado da face.",
    alternatives: [
      {
        text: "Solicitaria movimentos voluntários da face e compararia os dois lados.",
        correct: true,
      },
      {
        text: "Apresentaria substâncias odoríferas em cada narina.",
        correct: false,
      },
      {
        text: "Solicitaria elevação dos ombros contra resistência.",
        correct: false,
      },
      {
        text: "Solicitaria protrusão da língua e avaliaria sua movimentação.",
        correct: false,
      },
    ],
    testName: "Avaliação dos movimentos da face",
    nerve: "VII — Facial",
    procedure:
      "Observe a face espontaneamente e durante movimentos voluntários. Peça ao paciente para sorrir ou fazer uma expressão facial e compare os dois lados. Observe especialmente a simetria das pregas nasolabiais e das fissuras palpebrais.",
    group: "VII",
  },

  {
    id: 9,
    title: "CASO CLÍNICO",
    caseText:
      "Uma paciente relata que alimentos que antes reconhecia facilmente passaram a apresentar alterações na percepção do sabor. A queixa está principalmente relacionada à parte anterior da língua.",
    alternatives: [
      {
        text: "Avaliar a percepção gustativa utilizando soluções de diferentes sabores nos dois lados.",
        correct: true,
      },
      {
        text: "Testar a elevação do palato durante a emissão de “Ah!”.",
        correct: false,
      },
      {
        text: "Avaliar a contração do masseter durante o fechamento da boca.",
        correct: false,
      },
      {
        text: "Solicitar rotação da cabeça contra resistência.",
        correct: false,
      },
    ],
    testName: "Avaliação da gustação",
    nerve: "VII — Facial",
    procedure:
      "A avaliação pode utilizar soluções com sabores doce, azedo, salgado e amargo, comparando os dois lados da região anterior da língua.",
    group: "VII",
  },

  {
    id: 10,
    title: "CASO CLÍNICO",
    caseText:
      "Um paciente relata que precisa pedir que as pessoas repitam o que falaram, principalmente quando o som vem de apenas um dos lados. Não há queixa principal de tontura.",
    alternatives: [
      {
        text: "Avaliar a percepção de sons de baixa intensidade separadamente em cada ouvido.",
        correct: true,
      },
      {
        text: "Solicitar movimentos oculares em todas as direções.",
        correct: false,
      },
      {
        text: "Avaliar a sensibilidade da face em diferentes regiões.",
        correct: false,
      },
      {
        text: "Solicitar movimentos voluntários da língua.",
        correct: false,
      },
    ],
    testName: "Avaliação auditiva",
    nerve: "VIII — Vestibulococlear",
    procedure:
      "Produza sons baixos próximos a cada ouvido alternadamente e compare a percepção do paciente. Pode-se utilizar, por exemplo, um relógio ou diapasão, conforme disponibilidade.",
    group: "VIII",
  },

  {
    id: 11,
    title: "CASO CLÍNICO",
    caseText:
      "Um paciente relata episódios de vertigem desencadeados ou agravados por movimentos rápidos da cabeça. Durante a avaliação, ele consegue fixar o olhar em um ponto enquanto permanece sentado.",
    alternatives: [
      {
        text: "Manter a cabeça do paciente estabilizada e realizar movimentos rápidos de aproximadamente 20° para cada lado.",
        correct: true,
      },
      {
        text: "Solicitar fechamento forte dos olhos e avaliar a força do sorriso.",
        correct: false,
      },
      {
        text: "Solicitar protrusão da língua e observar sua direção.",
        correct: false,
      },
      {
        text: "Avaliar a resposta pupilar direta e consensual.",
        correct: false,
      },
    ],
    testName: "Manobra de impulso/compressão da cabeça",
    nerve: "VIII — Vestibulococlear",
    procedure:
      "Com o paciente sentado e olhando para um ponto fixo, segure a cabeça e realize movimentos rápidos para a direita e para a esquerda, aproximadamente 20°, observando a resposta.",
    group: "VIII",
  },

  {
    id: 12,
    title: "CASO CLÍNICO",
    caseText:
      "Uma paciente apresenta episódios breves de vertigem relacionados à mudança de posição da cabeça. A avaliação precisa verificar se determinada posição desencadeia vertigem e nistagmo.",
    alternatives: [
      {
        text: "Realizar a manobra de Dix-Hallpike, observando a presença, direção e duração do nistagmo.",
        correct: true,
      },
      {
        text: "Testar a força do trapézio contra resistência.",
        correct: false,
      },
      {
        text: "Avaliar a gustação nos dois lados da língua.",
        correct: false,
      },
      {
        text: "Solicitar movimentos voluntários da face.",
        correct: false,
      },
    ],
    testName: "Manobra de Dix-Hallpike",
    nerve: "VIII — Vestibulococlear",
    procedure:
      "Com o paciente sentado, coloque-o rapidamente em decúbito dorsal, mantendo a cabeça estendida aproximadamente 45° abaixo da horizontal e rodada 45° para um lado. Observe vertigem e nistagmo, considerando direção e duração. Repita para o lado oposto.",
    group: "VIII",
  },

  {
    id: 13,
    title: "CASO CLÍNICO",
    caseText:
      "Um paciente apresenta dificuldade para engolir líquidos e refere que, algumas vezes, eles parecem retornar pela região nasal. Também percebeu alteração na qualidade da voz.",
    alternatives: [
      {
        text: "Solicitar que o paciente diga “Ah!” ou “Eh!” e observar a movimentação do palato.",
        correct: true,
      },
      {
        text: "Solicitar protrusão da língua e observar sua direção.",
        correct: false,
      },
      {
        text: "Solicitar elevação dos ombros contra resistência.",
        correct: false,
      },
      {
        text: "Testar a sensibilidade facial e os músculos da mastigação.",
        correct: false,
      },
    ],
    testName: "Avaliação da motricidade do palato",
    nerve: "IX e X — Glossofaríngeo e Vago",
    procedure:
      "Peça ao paciente para abrir a boca e emitir “Ah!” ou “Eh!” de forma sustentada. Observe a contração e a movimentação do palato e da úvula.",
    group: "IXX",
  },

  {
    id: 14,
    title: "CASO CLÍNICO",
    caseText:
      "Um paciente apresenta sensação de dificuldade durante a deglutição e refere que determinados estímulos na região da garganta parecem não ser percebidos adequadamente.",
    alternatives: [
      {
        text: "Avaliar a sensibilidade da região dos pilares das tonsilas com um abaixador de língua.",
        correct: true,
      },
      {
        text: "Solicitar movimentos oculares horizontais e verticais.",
        correct: false,
      },
      {
        text: "Solicitar contração do trapézio contra resistência.",
        correct: false,
      },
      {
        text: "Apresentar diferentes substâncias para avaliação do olfato.",
        correct: false,
      },
    ],
    testName: "Sensibilidade da faringe",
    nerve: "IX e X — Glossofaríngeo e Vago",
    procedure:
      "Com um abaixador de língua, toque os pilares das tonsilas de cada lado e pergunte ao paciente se percebe o estímulo. O reflexo faríngeo pode ser utilizado como confirmação.",
    group: "IXX",
  },

  {
    id: 15,
    title: "CASO CLÍNICO",
    caseText:
      "Um paciente apresenta queda de um dos ombros e refere dificuldade para realizar movimentos que exigem elevação do ombro. Ao exame, observa-se possível assimetria na região do trapézio.",
    alternatives: [
      {
        text: "Solicitar elevação dos ombros contra resistência e comparar os dois lados.",
        correct: true,
      },
      {
        text: "Solicitar protrusão da língua e observar seu desvio.",
        correct: false,
      },
      {
        text: "Avaliar a resposta pupilar à luz.",
        correct: false,
      },
      {
        text: "Solicitar que o paciente sorria e faça movimentos da face.",
        correct: false,
      },
    ],
    testName: "Avaliação do trapézio",
    nerve: "XI — Acessório",
    procedure:
      "Peça ao paciente para elevar os ombros enquanto você exerce resistência para baixo. Compare a força dos dois lados e observe eventual queda ou atrofia do ombro.",
    group: "XI",
  },

  {
    id: 16,
    title: "CASO CLÍNICO",
    caseText:
      "Durante a avaliação de um paciente, observa-se dificuldade para realizar movimentos de rotação da cabeça contra resistência. A alteração parece ser mais evidente para um dos lados.",
    alternatives: [
      {
        text: "Solicitar rotação da cabeça para ambos os lados contra resistência, comparando a força.",
        correct: true,
      },
      {
        text: "Solicitar elevação do palato durante a emissão de uma vogal.",
        correct: false,
      },
      {
        text: "Solicitar protrusão da língua e avaliar sua movimentação.",
        correct: false,
      },
      {
        text: "Testar a percepção de odores em cada narina.",
        correct: false,
      },
    ],
    testName: "Avaliação do esternocleidomastóideo",
    nerve: "XI — Acessório",
    procedure:
      "Peça ao paciente para girar a cabeça contra resistência. A rotação para um lado testa o músculo esternocleidomastóideo do lado oposto. Compare os dois lados.",
    group: "XI",
  },

  {
    id: 17,
    title: "CASO CLÍNICO",
    caseText:
      "Um paciente percebe alteração na movimentação da língua. Ao colocá-la para fora, observa-se que ela não permanece centralizada.",
    alternatives: [
      {
        text: "Solicitar protrusão da língua e avaliar seus movimentos para cima, para baixo e para os lados.",
        correct: true,
      },
      {
        text: "Solicitar que diga “Ah!” e observar a elevação do palato.",
        correct: false,
      },
      {
        text: "Avaliar o fechamento palpebral após estímulo corneano.",
        correct: false,
      },
      {
        text: "Solicitar rotação da cabeça contra resistência.",
        correct: false,
      },
    ],
    testName: "Avaliação da movimentação da língua",
    nerve: "XII — Hipoglosso",
    procedure:
      "Inspecione a língua e solicite que o paciente a movimente em diferentes direções, para fora, para cima, para baixo e para os lados. Pode-se solicitar também que pressione a língua contra a bochecha. Observe trofismo, consistência e desvios.",
    group: "XII",
  },
];

const questionBank: Question[] = [
  {
    id: 1,
    group: "I",
    question:
      "Ao investigar uma alteração unilateral da percepção de odores, qual é a melhor forma de comparar os dois lados?",
    alternatives: [
      "Testar as duas narinas simultaneamente para evitar influência da oclusão.",
      "Ocluir uma narina e testar a outra, repetindo o procedimento no lado oposto.",
      "Testar somente a narina em que o paciente relata maior dificuldade.",
      "Solicitar que o paciente mantenha os olhos abertos para facilitar a identificação.",
    ],
    correct: 1,
    explanation:
      "A avaliação deve ser feita separadamente em cada narina, com uma delas ocluída durante o teste.",
  },

  {
    id: 2,
    group: "I",
    question:
      "Durante o exame, o paciente percebe o odor apresentado, mas relata que uma substância habitualmente agradável apresenta cheiro desagradável. Como essa alteração é denominada?",
    alternatives: ["Anosmia", "Hiposmia", "Parosmia", "Amaurose"],
    correct: 2,
    explanation:
      "Parosmia corresponde à alteração da percepção do odor.",
  },

  {
    id: 3,
    group: "I",
    question:
      "Um paciente não consegue perceber nenhum dos odores apresentados durante o exame. Qual termo descreve melhor esse achado?",
    alternatives: ["Anosmia", "Hiposmia", "Parosmia", "Diplopia"],
    correct: 0,
    explanation:
      "Anosmia corresponde à perda total do olfato.",
  },

  {
    id: 4,
    group: "II",
    question:
      "Ao avaliar a acuidade visual, por que cada olho deve ser examinado separadamente?",
    alternatives: [
      "Porque a avaliação simultânea impede a análise da resposta pupilar.",
      "Para permitir a identificação de uma redução visual unilateral.",
      "Porque a tabela de Snellen só pode ser utilizada com um olho aberto.",
      "Para avaliar exclusivamente o campo visual periférico.",
    ],
    correct: 1,
    explanation:
      "O exame separado permite comparar os dois olhos e identificar alterações que podem ser unilaterais.",
  },

  {
    id: 5,
    group: "II",
    question:
      "Na avaliação por confrontação, qual posição do olhar do paciente deve ser mantida durante o teste?",
    alternatives: [
      "O paciente deve acompanhar continuamente o dedo do examinador.",
      "O paciente deve olhar diretamente para o nariz do examinador.",
      "O paciente deve olhar para cima durante todo o teste.",
      "O paciente deve fechar os dois olhos entre cada estímulo.",
    ],
    correct: 1,
    explanation:
      "Na confrontação, o paciente fixa o nariz do examinador enquanto o estímulo é apresentado perifericamente.",
  },

  {
    id: 6,
    group: "II",
    question:
      "Ao comparar os campos visuais por confrontação, quais regiões devem ser examinadas?",
    alternatives: [
      "Somente o campo superior.",
      "Somente o campo temporal.",
      "Os quatro quadrantes.",
      "Apenas a região central.",
    ],
    correct: 2,
    explanation:
      "O método descrito utiliza estímulos nos quatro quadrantes do campo visual.",
  },

  {
    id: 7,
    group: "IIIIVVI",
    question:
      "Um paciente apresenta diplopia ao olhar lateralmente. Qual etapa do exame é especialmente importante?",
    alternatives: [
      "Avaliar os movimentos oculares em diferentes direções mantendo a cabeça imóvel.",
      "Testar exclusivamente a gustação da língua.",
      "Avaliar apenas a elevação dos ombros.",
      "Testar somente a sensibilidade facial.",
    ],
    correct: 0,
    explanation:
      "A motilidade ocular extrínseca deve ser examinada com movimentos horizontais e verticais, mantendo a cabeça imóvel.",
  },

  {
    id: 8,
    group: "IIIIVVI",
    question:
      "Qual músculo é responsável pelo movimento de abdução do olho?",
    alternatives: [
      "Reto medial",
      "Reto lateral",
      "Reto superior",
      "Oblíquo superior",
    ],
    correct: 1,
    explanation:
      "O reto lateral realiza a abdução do olho.",
  },

  {
    id: 9,
    group: "IIIIVVI",
    question:
      "Na avaliação da resposta pupilar direta, qual resposta deve ser observada?",
    alternatives: [
      "Dilatação da pupila iluminada.",
      "Constrição da pupila iluminada.",
      "Movimento lateral do globo ocular.",
      "Elevação da pálpebra.",
    ],
    correct: 1,
    explanation:
      "O reflexo fotomotor direto consiste na constrição da pupila após estímulo luminoso na retina.",
  },

  {
    id: 10,
    group: "IIIIVVI",
    question:
      "Qual procedimento permite avaliar também a resposta consensual das pupilas?",
    alternatives: [
      "Iluminar um olho e observar a resposta da pupila do outro.",
      "Solicitar que o paciente feche os dois olhos.",
      "Movimentar o dedo rapidamente diante dos dois olhos.",
      "Solicitar convergência sem estímulo luminoso.",
    ],
    correct: 0,
    explanation:
      "A resposta consensual corresponde à constrição da pupila contralateral quando um olho é iluminado.",
  },

  {
    id: 11,
    group: "V",
    question:
      "Ao avaliar a musculatura da mastigação, quais músculos podem ser palpados para comparação entre os lados?",
    alternatives: [
      "Masseter e temporal.",
      "Trapézio e esternocleidomastóideo.",
      "Reto medial e reto lateral.",
      "Esternocleidomastóideo e masseter.",
    ],
    correct: 0,
    explanation:
      "Masseter e temporal participam da mastigação e podem ser palpados durante o fechamento forte da boca.",
  },

  {
    id: 12,
    group: "V",
    question:
      "Durante a abertura da boca, o que pode ocorrer em uma lesão unilateral relacionada à musculatura examinada?",
    alternatives: [
      "A mandíbula pode desviar para o lado da lesão.",
      "A mandíbula sempre desvia para o lado saudável.",
      "A língua desvia obrigatoriamente para o lado da lesão.",
      "A pupila contralateral sofre constrição.",
    ],
    correct: 0,
    explanation:
      "Na descrição fornecida pela fonte, a abertura da boca pode provocar desvio mandibular em direção ao lado da lesão.",
  },

  {
    id: 13,
    group: "V",
    question:
      "No reflexo córneo-palpebral, o que se espera ao estimular a córnea de um indivíduo sem alteração?",
    alternatives: [
      "Fechamento do olho.",
      "Dilatação pupilar isolada.",
      "Elevação do palato.",
      "Contração do trapézio.",
    ],
    correct: 0,
    explanation:
      "O estímulo corneano normalmente desencadeia fechamento palpebral.",
  },

  {
    id: 14,
    group: "V",
    question:
      "Em uma lesão unilateral periférica relacionada à sensibilidade corneana, qual situação pode ocorrer?",
    alternatives: [
      "O estímulo na córnea afetada não produz a resposta esperada.",
      "O estímulo na córnea afetada sempre produz resposta bilateral normal.",
      "A resposta pupilar desaparece obrigatoriamente.",
      "A língua passa a desviar para o lado afetado.",
    ],
    correct: 0,
    explanation:
      "A fonte descreve ausência da resposta quando a córnea do lado afetado é estimulada.",
  },

  {
    id: 15,
    group: "VII",
    question:
      "Qual achado pode ajudar a diferenciar uma fraqueza facial predominantemente central de uma periférica, segundo o material?",
    alternatives: [
      "Preservação da capacidade de enrugar a testa e fechar os olhos quando a fraqueza está restrita à parte inferior da face.",
      "Ausência completa de movimentos em toda a hemiface.",
      "Alteração obrigatória da gustação posterior da língua.",
      "Queda do ombro ipsilateral.",
    ],
    correct: 0,
    explanation:
      "O material descreve que, quando somente a parte inferior da face está comprometida, a testa e o fechamento palpebral podem permanecer preservados.",
  },

  {
    id: 16,
    group: "VII",
    question:
      "Durante a avaliação da motricidade facial, qual situação tende a tornar a assimetria mais evidente?",
    alternatives: [
      "Durante movimentos voluntários como sorrir ou fazer uma expressão facial.",
      "Somente quando o paciente mantém a face completamente imóvel.",
      "Apenas durante a avaliação do campo visual.",
      "Somente durante a rotação da cabeça.",
    ],
    correct: 0,
    explanation:
      "A assimetria pode ficar mais evidente durante a conversa espontânea, sorriso ou movimentos faciais.",
  },

  {
    id: 17,
    group: "VII",
    question:
      "Para investigar a gustação descrita no material, quais regiões e estímulos podem ser utilizados?",
    alternatives: [
      "Parte anterior da língua com soluções doce, azeda, salgada e amarga.",
      "Pilares da faringe com algodão.",
      "Córnea com algodão.",
      "Pele da face com estímulos dolorosos.",
    ],
    correct: 0,
    explanation:
      "O material descreve avaliação do gosto na região anterior da língua utilizando diferentes sabores.",
  },

  {
    id: 18,
    group: "VIII",
    question:
      "Um paciente apresenta zumbido, vertigem, desequilíbrio, náuseas e redução progressiva da audição durante os episódios. Qual associação é descrita no material?",
    alternatives: [
      "Síndrome de Ménière.",
      "Parosmia.",
      "Amaurose.",
      "Diplopia.",
    ],
    correct: 0,
    explanation:
      "O material associa esse conjunto de manifestações à síndrome de Ménière.",
  },

  {
    id: 19,
    group: "VIII",
    question:
      "Durante a avaliação de uma queixa auditiva, qual conduta faz parte da avaliação inicial descrita?",
    alternatives: [
      "Produzir sons baixos alternadamente próximos a cada ouvido e comparar a percepção.",
      "Solicitar protrusão da língua.",
      "Avaliar a elevação dos ombros.",
      "Testar a resposta do palato.",
    ],
    correct: 0,
    explanation:
      "A avaliação inicial descrita utiliza sons baixos próximos a cada ouvido, alternadamente.",
  },

  {
    id: 20,
    group: "VIII",
    question:
      "Na manobra de impulso da cabeça, qual condição deve ser mantida para avaliar adequadamente a resposta?",
    alternatives: [
      "O paciente deve fixar o olhar em um ponto enquanto o examinador movimenta rapidamente a cabeça.",
      "O paciente deve fechar os olhos durante todo o procedimento.",
      "O paciente deve acompanhar a cabeça do examinador com os olhos.",
      "O paciente deve permanecer em decúbito lateral.",
    ],
    correct: 0,
    explanation:
      "O material descreve o paciente sentado, fixando um objeto ou o nariz do examinador enquanto a cabeça é movimentada rapidamente.",
  },

  {
    id: 21,
    group: "VIII",
    question:
      "Na manobra de Dix-Hallpike descrita, qual combinação está correta?",
    alternatives: [
      "Decúbito dorsal, cabeça estendida e rodada aproximadamente 45° para um lado.",
      "Decúbito ventral, cabeça flexionada e rodada 90°.",
      "Paciente em pé, cabeça neutra e olhos fechados.",
      "Paciente sentado, cabeça flexionada e sem mudança de posição.",
    ],
    correct: 0,
    explanation:
      "A manobra descrita envolve colocar rapidamente o paciente em decúbito dorsal, com extensão e rotação da cabeça.",
  },

  {
    id: 22,
    group: "IXX",
    question:
      "Ao pedir que o paciente diga “Ah!”, qual estrutura deve ser observada principalmente?",
    alternatives: [
      "Movimentação do palato e da úvula.",
      "Contração do masseter.",
      "Movimento da língua.",
      "Movimento do trapézio.",
    ],
    correct: 0,
    explanation:
      "A emissão de “Ah!” ou “Eh!” permite observar a contração e a movimentação do palato.",
  },

  {
    id: 23,
    group: "IXX",
    question:
      "Qual combinação de sintomas está particularmente relacionada ao quadro descrito para alterações envolvendo a deglutição?",
    alternatives: [
      "Disfagia, engasgos, refluxo nasal e alterações da voz.",
      "Anosmia, diplopia e alteração da acuidade visual.",
      "Queda do ombro e dificuldade para elevar o braço.",
      "Alteração do campo visual e amaurose.",
    ],
    correct: 0,
    explanation:
      "O material descreve disfagia, especialmente para líquidos, engasgos, refluxo nasal e alterações da fala/voz.",
  },

  {
    id: 24,
    group: "IXX",
    question:
      "Como pode ser investigada a sensibilidade da região faríngea?",
    alternatives: [
      "Tocando os pilares das tonsilas com um abaixador de língua e perguntando se o estímulo foi percebido.",
      "Iluminando cada pupila alternadamente.",
      "Apresentando odores diferentes em cada narina.",
      "Solicitando elevação dos ombros.",
    ],
    correct: 0,
    explanation:
      "Essa é a técnica descrita no material para avaliar a sensibilidade faríngea.",
  },

  {
    id: 25,
    group: "XI",
    question:
      "Ao avaliar o trapézio, qual comando é adequado?",
    alternatives: [
      "Elevar os ombros contra resistência.",
      "Girar a língua para os lados.",
      "Dizer “Ah!” sustentadamente.",
      "Fechar os olhos contra resistência.",
    ],
    correct: 0,
    explanation:
      "A função do trapézio pode ser avaliada solicitando elevação dos ombros contra resistência.",
  },

  {
    id: 26,
    group: "XI",
    question:
      "Para testar o esternocleidomastóideo direito, qual movimento deve ser solicitado contra resistência?",
    alternatives: [
      "Rotação da cabeça para a esquerda.",
      "Rotação da cabeça para a direita.",
      "Elevação dos ombros.",
      "Flexão da língua.",
    ],
    correct: 0,
    explanation:
      "A rotação para a esquerda testa o esternocleidomastóideo direito.",
  },

  {
    id: 27,
    group: "XI",
    question:
      "Uma deficiência bilateral da função descrita para esse grupo pode causar:",
    alternatives: [
      "Dificuldade para manter a cabeça ereta e para elevá-la ao levantar-se.",
      "Perda completa da percepção de odores.",
      "Amaurose bilateral.",
      "Anisocoria isolada.",
    ],
    correct: 0,
    explanation:
      "O material descreve dificuldade para manter a cabeça ereta e para elevá-la da cama em deficiência bilateral.",
  },

  {
    id: 28,
    group: "XII",
    question:
      "Ao protrair a língua, um paciente apresenta desvio para um dos lados. Qual achado descrito no material deve ser considerado?",
    alternatives: [
      "A língua pode desviar para o lado paralisado.",
      "A língua obrigatoriamente desvia para o lado saudável.",
      "A língua permanece sempre centralizada.",
      "O desvio indica exclusivamente alteração do palato.",
    ],
    correct: 0,
    explanation:
      "O material descreve desvio da língua para o lado paralisado durante a protrusão.",
  },

  {
    id: 29,
    group: "XII",
    question:
      "Além da protrusão, qual conjunto de movimentos deve ser solicitado durante a avaliação?",
    alternatives: [
      "Movimentos para cima, para baixo e para os lados.",
      "Somente movimento para a direita.",
      "Somente movimento para trás.",
      "Somente movimentos durante a deglutição.",
    ],
    correct: 0,
    explanation:
      "A avaliação inclui movimentação da língua em diferentes direções.",
  },

  {
    id: 30,
    group: "XII",
    question:
      "O que pode ser avaliado, além da movimentação, durante a inspeção da língua?",
    alternatives: [
      "Trofismo e consistência.",
      "Campo visual.",
      "Resposta pupilar.",
      "Acuidade auditiva.",
    ],
    correct: 0,
    explanation:
      "O material orienta observar também o trofismo e palpar a consistência da língua.",
  },

  {
    id: 31,
    group: "XII",
    question:
      "Em uma deficiência bilateral, qual padrão motor é esperado na língua?",
    alternatives: [
      "Paresia ou plegia dos movimentos da língua.",
      "Somente dificuldade para movimentar um lado.",
      "Somente alteração da gustação.",
      "Somente alteração da sensibilidade facial.",
    ],
    correct: 0,
    explanation:
      "O material descreve paresia ou plegia de todos os movimentos em deficiência bilateral.",
  },

  {
    id: 32,
    group: "IIIIVVI",
    question:
      "Durante o exame de motilidade ocular, por que é importante manter a cabeça do paciente imóvel?",
    alternatives: [
      "Para que a avaliação dos movimentos seja feita predominantemente pelos olhos.",
      "Para provocar uma resposta vestibular.",
      "Para avaliar a força do pescoço.",
      "Para testar o reflexo de deglutição.",
    ],
    correct: 0,
    explanation:
      "A orientação é manter a cabeça imóvel enquanto o paciente movimenta os olhos acompanhando o estímulo.",
  },

  {
    id: 33,
    group: "V",
    question:
      "Ao solicitar fechamento forte da boca, qual conjunto muscular deve ser observado e palpado?",
    alternatives: [
      "Masseter e temporal.",
      "Trapézio e esternocleidomastóideo.",
      "Reto lateral e oblíquo superior.",
      "Masseter e trapézio.",
    ],
    correct: 0,
    explanation:
      "Masseter e temporal participam da mastigação e podem ser avaliados durante o fechamento forte da boca.",
  },

  {
    id: 34,
    group: "VII",
    question:
      "Durante a observação de uma hemiface com fraqueza, qual achado pode aparecer no lado afetado?",
    alternatives: [
      "Aprofundamento da prega nasolabial e aumento da fissura palpebral.",
      "Elevação do ombro.",
      "Desvio da mandíbula durante a abertura.",
      "Desvio da língua durante a protrusão.",
    ],
    correct: 0,
    explanation:
      "Esses são achados descritos no material para o lado com fraqueza facial.",
  },

  {
    id: 35,
    group: "VIII",
    question:
      "Na manobra de Dix-Hallpike, além da presença de vertigem, o que deve ser observado?",
    alternatives: [
      "Direção e duração do nistagmo.",
      "Força do trapézio.",
      "Movimento da língua.",
      "Resposta gustativa.",
    ],
    correct: 0,
    explanation:
      "A descrição do teste orienta observar direção e duração do nistagmo, além da vertigem.",
  },

  {
    id: 36,
    group: "IXX",
    question:
      "Um paciente apresenta voz nasal e dificuldade para elevar o palato bilateralmente. Qual interpretação está de acordo com o material?",
    alternatives: [
      "Pode haver deficiência bilateral da função examinada.",
      "O achado indica obrigatoriamente alteração visual.",
      "O achado caracteriza exclusivamente lesão do trapézio.",
      "O achado indica somente perda do olfato.",
    ],
    correct: 0,
    explanation:
      "O material relaciona voz nasal e ausência de elevação do palato a deficiência bilateral.",
  },

  {
    id: 37,
    group: "XI",
    question:
      "Ao comparar a força dos trapézios, além da força durante a elevação dos ombros, qual alteração deve ser observada?",
    alternatives: [
      "Queda ou atrofia do ombro.",
      "Desvio da língua.",
      "Anisocoria.",
      "Perda do campo visual.",
    ],
    correct: 0,
    explanation:
      "O material cita queda e atrofia do ombro como possíveis sinais.",
  },

  {
    id: 38,
    group: "XII",
    question:
      "Um paciente apresenta dificuldade para movimentar a língua e você deseja comparar a força entre os lados. Qual manobra pode ser acrescentada?",
    alternatives: [
      "Pedir que pressione a língua contra a bochecha.",
      "Pedir que eleve os ombros.",
      "Pedir que diga “Ah!” e observar o palato.",
      "Pedir que acompanhe um dedo com os olhos.",
    ],
    correct: 0,
    explanation:
      "O material descreve a pressão da língua contra a bochecha como parte da avaliação motora.",
  },

  {
    id: 39,
    group: "IIIIVVI",
    question:
      "Um paciente consegue mover os olhos para os lados, mas apresenta dificuldade quando precisa aproximar o olhar para um objeto próximo. Qual componente da avaliação deve ser acrescentado?",
    alternatives: [
      "Teste de convergência.",
      "Teste do campo visual por confrontação.",
      "Teste da sensibilidade facial.",
      "Teste da gustação.",
    ],
    correct: 0,
    explanation:
      "A convergência pode ser examinada aproximando progressivamente um objeto do paciente.",
  },

  {
    id: 40,
    group: "VIII",
    question:
      "Durante uma investigação de vertigem episódica relacionada à posição, por que a manobra deve ser repetida para o lado oposto?",
    alternatives: [
      "Para comparar a resposta desencadeada pelas diferentes posições da cabeça.",
      "Para avaliar simultaneamente a gustação.",
      "Para medir a acuidade visual.",
      "Para testar a força dos músculos da mastigação.",
    ],
    correct: 0,
    explanation:
      "A manobra descrita é repetida para o lado oposto, permitindo comparação das respostas.",
  },
];

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function NervosCranianosPage() {
  const router = useRouter();

  const [currentCase, setCurrentCase] = useState<ClinicalCase | null>(null);
  const [caseAnswer, setCaseAnswer] = useState<number | null>(null);
  const [testPerformed, setTestPerformed] = useState(false);

  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [station, setStation] = useState(1);

  useEffect(() => {
    const access = sessionStorage.getItem("anatolab_acesso_nervos");

    if (access !== "true") {
      router.replace("/aluno");
      return;
    }

    setCurrentCase(
      clinicalCases[Math.floor(Math.random() * clinicalCases.length)]
    );
  }, [router]);

  const currentQuestion = useMemo(
    () => quizQuestions[quizIndex],
    [quizQuestions, quizIndex]
  );

  function chooseCaseAnswer(index: number) {
    if (caseAnswer !== null || !currentCase) return;

    setCaseAnswer(index);
  }

  function performTest() {
    if (testPerformed || caseAnswer === null || !currentCase) return;

    setTestPerformed(true);

    const possibleQuestions = questionBank.filter(
      (question) => question.group === currentCase.group
    );

    const selectedQuestions = shuffle(possibleQuestions).slice(0, 2);

    setQuizQuestions(selectedQuestions);
    setQuizIndex(0);
    setQuizAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
  }

  function answerQuiz(index: number) {
    if (quizAnswer !== null || !currentQuestion) return;

    setQuizAnswer(index);

    if (index === currentQuestion.correct) {
      setQuizScore((previous) => previous + 1);
    }
  }

  function nextQuestion() {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((previous) => previous + 1);
      setQuizAnswer(null);
      return;
    }

    setQuizFinished(true);
  }

  function newCase() {
    let nextCase =
      clinicalCases[Math.floor(Math.random() * clinicalCases.length)];

    if (clinicalCases.length > 1 && currentCase) {
      while (nextCase.id === currentCase.id) {
        nextCase =
          clinicalCases[Math.floor(Math.random() * clinicalCases.length)];
      }
    }

    setCurrentCase(nextCase);
    setCaseAnswer(null);
    setTestPerformed(false);
    setQuizQuestions([]);
    setQuizIndex(0);
    setQuizAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
    setStation((previous) => previous + 1);
  }

  if (!currentCase) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#F2E5C6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#560B18",
          fontFamily: "Georgia, serif",
        }}
      >
        Carregando estação...
      </main>
    );
  }

  const correctCase = caseAnswer !== null && currentCase.alternatives[caseAnswer]?.correct;

  return (
    <>
      <main className="anatolab-page">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">A</div>

            <div>
              <strong>ANATOLAB</strong>
              <span>LABORATÓRIO DE ANATOMIA</span>
            </div>
          </div>

          <button
            className="back-button"
            onClick={() => router.push("/aluno")}
          >
            VOLTAR
          </button>
        </header>

        <section className="hero">
          <div>
            <span className="eyebrow">ANATOMIA II</span>

            <h1>Exame dos nervos cranianos.</h1>

            <p>
              Leia o caso, raciocine sobre o exame físico e escolha a conduta
              mais adequada.
            </p>
          </div>

          <div className="station-box">
            <span>ESTAÇÃO</span>
            <strong>{String(station).padStart(2, "0")}</strong>
          </div>
        </section>

        <section className="content">
          <div className="case-card">
            <div className="case-header">
              <div>
                <span className="section-label">CASO CLÍNICO</span>
                <h2>O que vocês fariam?</h2>
              </div>

              <div className="case-number">
                {String(currentCase.id).padStart(2, "0")}
              </div>
            </div>

            <div className="case-text">
              {currentCase.caseText}
            </div>

            <div className="question-prompt">
              Diante desse quadro, o que vocês fariam no exame físico?
            </div>

            <div className="alternatives">
              {currentCase.alternatives.map((alternative, index) => {
                const selected = caseAnswer === index;
                const isCorrect = alternative.correct;

                let className = "alternative";

                if (selected && isCorrect) {
                  className += " correct";
                }

                if (selected && !isCorrect) {
                  className += " wrong";
                }

                if (caseAnswer !== null && isCorrect) {
                  className += " reveal-correct";
                }

                return (
                  <button
                    key={index}
                    className={className}
                    onClick={() => chooseCaseAnswer(index)}
                    disabled={caseAnswer !== null}
                  >
                    <span className="alternative-letter">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span>{alternative.text}</span>
                  </button>
                );
              })}
            </div>

            {caseAnswer !== null && (
              <div
                className={`case-feedback ${
                  correctCase ? "feedback-correct" : "feedback-wrong"
                }`}
              >
                <strong>
                  {correctCase
                    ? "Conduta adequada."
                    : "Conduta inadequada."}
                </strong>

                <span>
                  {correctCase
                    ? "Agora realize o teste conforme a técnica descrita."
                    : "Observe a alternativa destacada para identificar a conduta adequada."}
                </span>
              </div>
            )}
          </div>

          {correctCase && (
            <section className="procedure-card">
              <div className="procedure-top">
                <span className="section-label">COMO REALIZAR O TESTE</span>

                <span className="revealed">
                  {currentCase.nerve}
                </span>
              </div>

              <h2>{currentCase.testName}</h2>

              <p>{currentCase.procedure}</p>

              {!testPerformed ? (
                <button className="primary-button" onClick={performTest}>
                  TESTE REALIZADO
                </button>
              ) : (
                <div className="performed">
                  TESTE REALIZADO
                </div>
              )}
            </section>
          )}

          {testPerformed && !quizFinished && currentQuestion && (
            <section className="quiz-card">
              <div className="quiz-header">
                <div>
                  <span className="section-label">
                    QUESTÃO {quizIndex + 1} DE {quizQuestions.length}
                  </span>

                  <h2>Agora pense antes de responder.</h2>
                </div>

                <div className="quiz-counter">
                  {quizIndex + 1}/{quizQuestions.length}
                </div>
              </div>

              <p className="quiz-question">
                {currentQuestion.question}
              </p>

              <div className="quiz-options">
                {currentQuestion.alternatives.map((alternative, index) => {
                  const selected = quizAnswer === index;
                  const correct = currentQuestion.correct === index;

                  let className = "quiz-option";

                  if (quizAnswer !== null && correct) {
                    className += " quiz-correct";
                  }

                  if (selected && !correct) {
                    className += " quiz-wrong";
                  }

                  return (
                    <button
                      key={index}
                      className={className}
                      onClick={() => answerQuiz(index)}
                      disabled={quizAnswer !== null}
                    >
                      <span>{String.fromCharCode(65 + index)}</span>
                      <p>{alternative}</p>
                    </button>
                  );
                })}
              </div>

              {quizAnswer !== null && (
                <div
                  className={`explanation ${
                    quizAnswer === currentQuestion.correct
                      ? "explanation-correct"
                      : "explanation-wrong"
                  }`}
                >
                  <strong>
                    {quizAnswer === currentQuestion.correct
                      ? "Resposta correta."
                      : "Resposta incorreta."}
                  </strong>

                  <p>{currentQuestion.explanation}</p>

                  <button className="secondary-button" onClick={nextQuestion}>
                    {quizIndex < quizQuestions.length - 1
                      ? "PRÓXIMA QUESTÃO"
                      : "VER RESULTADO"}
                  </button>
                </div>
              )}
            </section>
          )}

          {testPerformed && quizFinished && (
            <section className="result-card">
              <span className="section-label">ESTAÇÃO CONCLUÍDA</span>

              <div className="result-score">
                <strong>{quizScore}</strong>
                <span>/ {quizQuestions.length}</span>
              </div>

              <h2>Raciocínio concluído.</h2>

              <p>
                Você concluiu a etapa prática e respondeu às questões de
                aprofundamento desta estação.
              </p>

              <button className="primary-button" onClick={newCase}>
                NOVO CASO
              </button>
            </section>
          )}
        </section>

        <footer className="footer">
          <span>ANATOLAB</span>
          <span>ANATOMIA II · LABORATÓRIO DE HABILIDADES SIMULADAS</span>
        </footer>
      </main>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .anatolab-page {
          min-height: 100vh;
          background: #f2e5c6;
          color: #3b010b;
          font-family: Georgia, "Times New Roman", serif;
          padding: 0 7vw 50px;
        }

        .topbar {
          max-width: 1180px;
          margin: 0 auto;
          min-height: 88px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(86, 11, 24, 0.22);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .brand-mark {
          width: 43px;
          height: 43px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #560b18;
          color: #f2e5c6;
          font-size: 24px;
          font-weight: bold;
          border-radius: 8px;
        }

        .brand strong {
          display: block;
          font-size: 18px;
          letter-spacing: 2px;
        }

        .brand span {
          display: block;
          margin-top: 3px;
          font-size: 9px;
          letter-spacing: 1.5px;
          opacity: 0.65;
        }

        .back-button {
          border: 1px solid #75162d;
          background: transparent;
          color: #75162d;
          padding: 10px 17px;
          font-family: inherit;
          font-size: 10px;
          letter-spacing: 1.5px;
          cursor: pointer;
        }

        .hero {
          max-width: 1180px;
          margin: 0 auto;
          padding: 60px 0 45px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 30px;
        }

        .eyebrow,
        .section-label {
          font-size: 10px;
          letter-spacing: 2px;
          font-weight: bold;
          color: #75162d;
        }

        .hero h1 {
          margin: 12px 0;
          font-size: clamp(35px, 5vw, 65px);
          line-height: 0.98;
          font-weight: 500;
          max-width: 720px;
          letter-spacing: -2px;
        }

        .hero p {
          max-width: 650px;
          font-family: Arial, sans-serif;
          line-height: 1.6;
          font-size: 15px;
          color: #5b3940;
          margin: 0;
        }

        .station-box {
          min-width: 120px;
          height: 120px;
          border: 1px solid #75162d;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(226, 217, 160, 0.42);
        }

        .station-box span {
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 2px;
        }

        .station-box strong {
          font-size: 42px;
          font-weight: 500;
          color: #75162d;
          margin-top: 4px;
        }

        .content {
          max-width: 1180px;
          margin: 0 auto;
        }

        .case-card,
        .procedure-card,
        .quiz-card,
        .result-card {
          background: #f8efd9;
          border: 1px solid rgba(86, 11, 24, 0.18);
          box-shadow: 0 10px 35px rgba(59, 1, 11, 0.06);
        }

        .case-card {
          padding: clamp(25px, 5vw, 55px);
        }

        .case-header,
        .quiz-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 25px;
        }

        .case-header h2,
        .quiz-header h2 {
          margin: 10px 0 0;
          font-size: clamp(25px, 3vw, 38px);
          font-weight: 500;
        }

        .case-number,
        .quiz-counter {
          font-family: Arial, sans-serif;
          color: #75162d;
          font-size: 12px;
          font-weight: bold;
          border: 1px solid #75162d;
          padding: 9px 12px;
        }

        .case-text {
          margin: 35px 0;
          font-size: 20px;
          line-height: 1.7;
          max-width: 920px;
        }

        .question-prompt {
          border-left: 4px solid #75162d;
          padding: 13px 18px;
          background: #e2d9a0;
          font-weight: bold;
          margin-bottom: 22px;
        }

        .alternatives {
          display: grid;
          gap: 11px;
        }

        .alternative {
          width: 100%;
          border: 1px solid rgba(86, 11, 24, 0.22);
          background: #f2e5c6;
          color: #3b010b;
          padding: 17px;
          display: flex;
          align-items: center;
          gap: 15px;
          text-align: left;
          font-family: Arial, sans-serif;
          font-size: 14px;
          line-height: 1.45;
          cursor: pointer;
          transition: 0.18s ease;
        }

        .alternative:hover:not(:disabled) {
          border-color: #75162d;
          transform: translateX(3px);
        }

        .alternative:disabled {
          cursor: default;
        }

        .alternative-letter {
          min-width: 31px;
          height: 31px;
          border: 1px solid #75162d;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #75162d;
          font-weight: bold;
        }

        .alternative.correct,
        .alternative.reveal-correct {
          background: #e2d9a0;
          border-color: #75162d;
        }

        .alternative.wrong {
          opacity: 0.58;
          border-color: #560b18;
        }

        .case-feedback {
          margin-top: 20px;
          padding: 17px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          font-family: Arial, sans-serif;
          font-size: 13px;
        }

        .feedback-correct {
          background: #e2d9a0;
          border-left: 4px solid #75162d;
        }

        .feedback-wrong {
          background: #ead6d6;
          border-left: 4px solid #560b18;
        }

        .procedure-card,
        .quiz-card,
        .result-card {
          margin-top: 24px;
          padding: clamp(25px, 5vw, 45px);
        }

        .procedure-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }

        .revealed {
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 1px;
          color: #75162d;
          border-bottom: 1px solid #75162d;
          padding-bottom: 5px;
        }

        .procedure-card h2 {
          font-size: 30px;
          font-weight: 500;
          margin: 17px 0;
        }

        .procedure-card p,
        .result-card p {
          max-width: 900px;
          font-family: Arial, sans-serif;
          line-height: 1.7;
          font-size: 14px;
          color: #54383d;
        }

        .primary-button,
        .secondary-button {
          margin-top: 25px;
          border: none;
          padding: 15px 22px;
          font-family: Arial, sans-serif;
          font-weight: bold;
          font-size: 10px;
          letter-spacing: 1.5px;
          cursor: pointer;
        }

        .primary-button {
          background: #560b18;
          color: #f2e5c6;
        }

        .primary-button:hover {
          background: #75162d;
        }

        .secondary-button {
          background: #75162d;
          color: #f2e5c6;
        }

        .performed {
          margin-top: 25px;
          display: inline-block;
          padding: 13px 18px;
          border: 1px solid #75162d;
          color: #75162d;
          font-family: Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
          font-weight: bold;
        }

        .quiz-question {
          font-size: 21px;
          line-height: 1.6;
          margin: 30px 0;
          max-width: 950px;
        }

        .quiz-options {
          display: grid;
          gap: 10px;
        }

        .quiz-option {
          width: 100%;
          border: 1px solid rgba(86, 11, 24, 0.22);
          background: #f2e5c6;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 16px;
          text-align: left;
          cursor: pointer;
          font-family: Arial, sans-serif;
        }

        .quiz-option:hover:not(:disabled) {
          border-color: #75162d;
        }

        .quiz-option span {
          min-width: 28px;
          height: 28px;
          border: 1px solid #75162d;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #75162d;
          font-weight: bold;
        }

        .quiz-option p {
          margin: 4px 0;
          line-height: 1.45;
          font-size: 14px;
          color: #3b010b;
        }

        .quiz-option.quiz-correct {
          background: #e2d9a0;
          border-color: #75162d;
        }

        .quiz-option.quiz-wrong {
          background: #ead6d6;
          border-color: #560b18;
        }

        .explanation {
          margin-top: 22px;
          padding: 18px;
          font-family: Arial, sans-serif;
        }

        .explanation-correct {
          background: #e2d9a0;
          border-left: 4px solid #75162d;
        }

        .explanation-wrong {
          background: #ead6d6;
          border-left: 4px solid #560b18;
        }

        .explanation p {
          font-size: 13px;
          line-height: 1.6;
          margin-bottom: 0;
        }

        .result-card {
          text-align: center;
        }

        .result-score {
          margin: 25px 0 10px;
          display: flex;
          justify-content: center;
          align-items: baseline;
          gap: 5px;
          color: #75162d;
        }

        .result-score strong {
          font-size: 75px;
          font-weight: 500;
        }

        .result-score span {
          font-size: 20px;
        }

        .result-card h2 {
          font-size: 30px;
          font-weight: 500;
          margin: 0;
        }

        .result-card p {
          margin: 15px auto 0;
        }

        .footer {
          max-width: 1180px;
          margin: 50px auto 0;
          padding-top: 20px;
          border-top: 1px solid rgba(86, 11, 24, 0.2);
          display: flex;
          justify-content: space-between;
          gap: 20px;
          font-family: Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 1px;
          color: #75162d;
        }

        @media (max-width: 700px) {
          .anatolab-page {
            padding: 0 16px 35px;
          }

          .topbar {
            min-height: 70px;
          }

          .brand-mark {
            width: 36px;
            height: 36px;
            font-size: 20px;
          }

          .brand strong {
            font-size: 15px;
          }

          .brand span {
            font-size: 7px;
          }

          .back-button {
            padding: 8px 10px;
            font-size: 8px;
          }

          .hero {
            padding: 38px 0 28px;
            align-items: flex-start;
          }

          .hero h1 {
            font-size: 36px;
            letter-spacing: -1px;
          }

          .hero p {
            font-size: 13px;
          }

          .station-box {
            display: none;
          }

          .case-card,
          .procedure-card,
          .quiz-card,
          .result-card {
            padding: 23px 18px;
          }

          .case-header h2,
          .quiz-header h2 {
            font-size: 25px;
          }

          .case-number,
          .quiz-counter {
            font-size: 9px;
            padding: 7px 8px;
          }

          .case-text {
            font-size: 17px;
            line-height: 1.6;
            margin: 25px 0;
          }

          .question-prompt {
            font-size: 13px;
            line-height: 1.4;
          }

          .alternative {
            padding: 13px;
            font-size: 13px;
          }

          .procedure-top {
            align-items: flex-start;
            flex-direction: column;
          }

          .procedure-card h2 {
            font-size: 25px;
          }

          .quiz-question {
            font-size: 17px;
          }

          .footer {
            flex-direction: column;
            font-size: 8px;
          }
        }

        @media (max-width: 390px) {
          .anatolab-page {
            padding-left: 11px;
            padding-right: 11px;
          }

          .hero h1 {
            font-size: 31px;
          }

          .brand span {
            display: none;
          }

          .case-header,
          .quiz-header {
            gap: 10px;
          }

          .case-number,
          .quiz-counter {
            display: none;
          }

          .alternative {
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}