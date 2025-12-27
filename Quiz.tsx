import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuestionOption {
  profile: 'A' | 'B' | 'C';
  text: string;
}

interface Question {
  id: number;
  situation: string;
  options: QuestionOption[];
}

const questionsData: Question[] = [
  {
    id: 1,
    situation: "Um colega de trabalho/igreja recebe um elogio por uma ideia que era sua.",
    options: [
      { profile: 'A', text: "Fico irritado e comento com outros colegas sobre a injustiça. Tento sutilmente desmerecer o trabalho da pessoa que levou o crédito." },
      { profile: 'B', text: "Fico um pouco frustrado, mas entendo que o mais importante é o sucesso do projeto. Confio que meu trabalho será reconhecido no tempo certo." },
      { profile: 'C', text: "Parabenizo a pessoa em público, mas depois a chamo em particular e digo: 'Fico feliz por você, mas todos sabem que a ideia era minha. Da próxima vez, seja mais justo.'" }
    ]
  },
  {
    id: 2,
    situation: "Você está liderando um projeto e um membro da equipe comete um erro grave que compromete o resultado.",
    options: [
      { profile: 'B', text: "Chamo a pessoa para conversar em particular, entendo o que aconteceu e focamos em encontrar uma solução juntos. Assumo a responsabilidade como líder." },
      { profile: 'C', text: "Digo para a pessoa: 'Não se preocupe, eu vou resolver isso.' Depois, comento com os outros membros da equipe sobre a 'incompetência' daquele colega, me posicionando como o 'salvador' do projeto." },
      { profile: 'A', text: "Chamo a atenção da pessoa na frente de todos, enfatizando como o erro dela prejudicou o grupo. Faço questão de mostrar minha autoridade." }
    ]
  },
  {
    id: 3,
    situation: "Você discorda fortemente de uma decisão do seu líder (pastor, chefe, etc.).",
    options: [
      { profile: 'C', text: "Começo a me reunir com os 'insatisfeitos', dizendo que eu faria diferente e que entendo a frustração deles, ganhando sua confiança para, no futuro, tomar a liderança." },
      { profile: 'A', text: "Começo a questionar a competência do líder para outras pessoas, criando um grupo de 'resistência' e minando sua autoridade." },
      { profile: 'B', text: "Procuro o líder em particular para expressar minha preocupação com respeito, oferecendo uma perspectiva diferente, mas deixando claro que respeitarei a decisão final." }
    ]
  },
  {
    id: 4,
    situation: "Um projeto que você liderou é um grande sucesso e todos estão te elogiando.",
    options: [
      { profile: 'A', text: "Aproveito o momento para reforçar minha imagem, mencionando sutilmente como minha visão foi crucial e como superei os 'obstáculos' (outras pessoas)." },
      { profile: 'C', text: "Digo publicamente que 'somos uma equipe', mas em conversas particulares, dou a entender que o resultado só foi possível por minha causa, e que a equipe ainda precisa de muito desenvolvimento." },
      { profile: 'B', text: "Agradeço os elogios, mas faço questão de dividir o crédito com toda a equipe, destacando a contribuição de cada um para o sucesso." }
    ]
  },
  {
    id: 5,
    situation: "Você percebe que um membro da sua comunidade (igreja, bairro) está passando por uma dificuldade que ninguém mais notou.",
    options: [
      { profile: 'B', text: "Aproximo-me discretamente da pessoa para oferecer ajuda, ouvir e entender como posso servir, sem a necessidade de alarde ou reconhecimento." },
      { profile: 'C', text: "Ajudo a pessoa de forma visível e depois comento com outros sobre minha 'boa ação', usando a situação para construir uma imagem de líder sensível e atencioso." },
      { profile: 'A', text: "Penso que essa pessoa deveria procurar a liderança oficial. Se eu me envolver, posso me complicar ou ter que assumir uma responsabilidade que não é minha." }
    ]
  },
  {
    id: 6,
    situation: "Durante uma reunião, sua opinião é ignorada e outra, que você considera inferior, é escolhida.",
    options: [
      { profile: 'C', text: "Concordo publicamente com a decisão, mas depois, em conversas informais, planto sementes de dúvida sobre a sabedoria daquela escolha, preparando o terreno para uma futura crise." },
      { profile: 'B', text: "Mesmo discordando, apoio a decisão do grupo e me empenho para que ela dê certo, pois entendo que a unidade é mais importante que minha opinião." },
      { profile: 'A', text: "Fico visivelmente contrariado, cruzo os braços e me recuso a colaborar com a decisão tomada, esperando que ela falhe para que eu possa dizer 'eu avisei'." }
    ]
  },
  {
    id: 7,
    situation: "Você tem a oportunidade de assumir uma posição de maior destaque, mas para isso, precisaria 'puxar o tapete' de um amigo.",
    options: [
      { profile: 'B', text: "Recuso a oportunidade. Minha integridade e lealdade ao meu amigo são mais importantes do que qualquer cargo ou posição de destaque." },
      { profile: 'A', text: "Penso que, se a oportunidade apareceu, é um sinal. Afinal, em ambientes competitivos, é cada um por si. A amizade pode ser reconstruída depois." },
      { profile: 'C', text: "Crio uma situação onde meu amigo pareça incompetente ou inadequado para a posição, para que a liderança 'naturalmente' me escolha, sem que pareça que eu o traí diretamente." }
    ]
  }
];

interface ProfileResult {
  profile: 'Saul' | 'Davi' | 'Absalão';
  description: string;
  characteristics: string[];
}

const profileResults: Record<string, ProfileResult> = {
  'Saul': {
    profile: 'Saul',
    description: 'Você tende a liderar pela insegurança, medo e controle. Reage com agressividade e autoritarismo quando se sente ameaçado.',
    characteristics: [
      'Liderança baseada em poder e autoridade',
      'Reação defensiva a ameaças percebidas',
      'Dificuldade em reconhecer erros',
      'Tendência a culpar outros',
      'Necessidade de validação constante'
    ]
  },
  'Davi': {
    profile: 'Davi',
    description: 'Você tende a liderar pelo quebrantamento, humildade e confiança. Sabe lidar com injustiças e erros sem perder o caráter.',
    characteristics: [
      'Liderança baseada em integridade',
      'Capacidade de servir sem buscar reconhecimento',
      'Abertura para aprender com dificuldades',
      'Respeito pela autoridade legítima',
      'Foco no bem comum'
    ]
  },
  'Absalão': {
    profile: 'Absalão',
    description: 'Você tende a liderar pela ambição, manipulação e rebelião. Usa o carisma para conquistar poder e criar divisões.',
    characteristics: [
      'Liderança baseada em manipulação',
      'Uso do carisma para ganhar influência',
      'Criação de divisões para conquistar poder',
      'Crítica velada da autoridade',
      'Construção de imagem pública'
    ]
  }
};

// Função para embaralhar array
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C'>>({});
  const [showResult, setShowResult] = useState(false);

  // Embaralhar as opções para cada pergunta (mantém consistência durante a sessão)
  const shuffledQuestions = useMemo(() => {
    return questionsData.map(question => ({
      ...question,
      options: shuffleArray(question.options)
    }));
  }, []);

  const handleAnswer = (profileValue: 'A' | 'B' | 'C') => {
    setAnswers({
      ...answers,
      [currentQuestion]: profileValue
    });
  };

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = (): ProfileResult => {
    const counts = { A: 0, B: 0, C: 0 };
    Object.values(answers).forEach(answer => {
      counts[answer]++;
    });

    if (counts.A >= counts.B && counts.A >= counts.C) {
      return profileResults['Saul'];
    } else if (counts.B >= counts.A && counts.B >= counts.C) {
      return profileResults['Davi'];
    } else {
      return profileResults['Absalão'];
    }
  };

  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100;
  const question = shuffledQuestions[currentQuestion];

  if (showResult) {
    const result = calculateResult();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-900 mb-4">
              Seu Perfil de Liderança
            </h1>
            <div className="text-6xl font-bold text-indigo-600 mb-4">
              {result.profile}
            </div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-6 mb-8">
            <p className="text-lg text-gray-800 mb-6">
              {result.description}
            </p>

            <div>
              <h3 className="text-xl font-semibold text-indigo-900 mb-4">
                Características Principais:
              </h3>
              <ul className="space-y-3">
                {result.characteristics.map((char, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-indigo-600 font-bold mr-3">•</span>
                    <span className="text-gray-700">{char}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8 border-l-4 border-blue-500">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-blue-900">Lembrete importante:</span> Todos nós temos um pouco de cada um desses reis. O importante é reconhecer nossas tendências e escolher conscientemente cultivar um coração de Davi.
            </p>
          </div>

          <Button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setShowResult(false);
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
          >
            Fazer o Quiz Novamente
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            Que Tipo de Líder Eu Sou?
          </h1>
          <p className="text-gray-600">
            Descubra seu perfil de liderança respondendo a 7 situações
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Pergunta {currentQuestion + 1} de {shuffledQuestions.length}
            </span>
            <span className="text-sm font-semibold text-indigo-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-8 leading-relaxed">
            {question.situation}
          </h2>

          <RadioGroup
            value={answers[currentQuestion] || ''}
            onValueChange={handleAnswer}
          >
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <RadioGroupItem
                    value={option.profile}
                    id={`option-${index}`}
                    className="mt-1"
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer text-gray-700 leading-relaxed"
                  >
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="flex-1 py-3"
          >
            Anterior
          </Button>
          <Button
            onClick={handleNext}
            disabled={!answers[currentQuestion]}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3"
          >
            {currentQuestion === shuffledQuestions.length - 1 ? 'Ver Resultado' : 'Próxima'}
          </Button>
        </div>
      </div>
    </div>
  );
}
