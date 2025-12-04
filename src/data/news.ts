export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  date: string;
  author: string;
}

export const allNews: NewsItem[] = [
  {
    id: 1,
    title: "Prefeitura anuncia novo investimento em infraestrutura para 2025",
    excerpt: "Obras incluem pavimentação de ruas e melhorias no sistema de saneamento básico da cidade.",
    content: `A Prefeitura de Pilar do Sul anunciou nesta semana um pacote de investimentos em infraestrutura para o ano de 2025, com foco na melhoria da qualidade de vida dos moradores.

O plano inclui a pavimentação de diversas ruas nos bairros periféricos, além de melhorias significativas no sistema de saneamento básico da cidade. O investimento total previsto é de aproximadamente R$ 15 milhões.

Segundo o prefeito, as obras devem começar já no primeiro trimestre de 2025 e beneficiarão diretamente mais de 10 mil moradores. "Nosso compromisso é levar infraestrutura de qualidade para todos os cantos da cidade", afirmou.

Entre as principais obras previstas estão:
- Pavimentação de 20 km de vias urbanas
- Ampliação da rede de esgoto em 5 bairros
- Construção de 3 novas praças públicas
- Reforma de pontes e passarelas

A população poderá acompanhar o andamento das obras através do site oficial da prefeitura, onde serão publicados relatórios mensais de progresso.`,
    category: "Política",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=450&fit=crop",
    date: "Há 2 horas",
    author: "Redação Pilar em Foco",
  },
  {
    id: 2,
    title: "Festival cultural movimenta economia local no fim de semana",
    excerpt: "Evento reuniu milhares de visitantes e impulsionou o comércio da região central.",
    content: `O Festival Cultural de Pilar do Sul superou todas as expectativas e movimentou a economia local no último fim de semana. O evento, que aconteceu na praça central, reuniu milhares de visitantes e trouxe um impacto positivo significativo para o comércio da região.

Segundo dados da Associação Comercial, o movimento no comércio local aumentou em 40% durante os três dias de evento. Restaurantes, bares e hotéis registraram ocupação máxima.

O festival contou com apresentações de artistas locais e regionais, exposições de artesanato, gastronomia típica e diversas atividades culturais. "É uma vitrine para nossa cidade e nossa cultura", destacou a secretária de Cultura.

Destaques do evento:
- Mais de 15 mil visitantes ao longo dos 3 dias
- 50 expositores de artesanato local
- 20 apresentações musicais
- Oficinas culturais gratuitas

O sucesso do evento já garantiu a confirmação de uma nova edição para o próximo ano, com previsão de ser ainda maior.`,
    category: "Cultura",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=450&fit=crop",
    date: "Há 5 horas",
    author: "Maria Silva",
  },
  {
    id: 3,
    title: "Time local conquista título regional de futebol amador",
    excerpt: "Vitória histórica coloca Pilar do Sul no mapa do esporte regional.",
    content: `O time de futebol amador de Pilar do Sul conquistou o título regional após uma emocionante final disputada no último domingo. A vitória por 2 a 1 sobre o rival garantiu o troféu inédito para a cidade.

O jogo, realizado no estádio municipal com casa cheia, teve momentos de grande emoção. Os gols da equipe pilarense foram marcados por Rodrigo, no primeiro tempo, e Carlos, nos acréscimos do segundo tempo.

"É uma conquista histórica para nossa cidade. Trabalhamos muito para chegar aqui", declarou o técnico da equipe após a partida.

A torcida local compareceu em peso e fez uma festa memorável nas arquibancadas. Após o jogo, a comemoração se estendeu pelas ruas do centro da cidade.

A equipe será homenageada pela Câmara Municipal na próxima semana, em reconhecimento ao feito histórico que coloca Pilar do Sul no mapa do esporte regional.`,
    category: "Esportes",
    imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=300&fit=crop",
    date: "Há 1 hora",
    author: "João Santos",
  },
  {
    id: 4,
    title: "Nova unidade de saúde será inaugurada no próximo mês",
    excerpt: "UBS vai atender moradores da zona rural com atendimento 24 horas.",
    content: `A nova Unidade Básica de Saúde (UBS) da zona rural de Pilar do Sul será inaugurada no próximo mês, trazendo atendimento médico 24 horas para moradores que antes precisavam se deslocar até o centro da cidade.

A unidade conta com consultórios médicos, sala de vacinação, farmácia básica e estrutura para pequenos procedimentos. A expectativa é atender cerca de 3 mil moradores da região.

"Essa unidade vai transformar a vida dos moradores da zona rural. Agora eles terão acesso a atendimento de qualidade perto de casa", afirmou o secretário de Saúde.

Serviços disponíveis:
- Atendimento médico geral
- Vacinação
- Curativos e pequenos procedimentos
- Distribuição de medicamentos
- Atendimento de urgência 24h

A contratação de profissionais já foi realizada e a equipe está em treinamento para o início das atividades.`,
    category: "Saúde",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    date: "Há 3 horas",
    author: "Ana Oliveira",
  },
  {
    id: 5,
    title: "Produtores rurais comemoram safra recorde de batata",
    excerpt: "Clima favorável e técnicas modernas garantiram aumento de 30% na produção.",
    content: `Os produtores rurais de Pilar do Sul estão comemorando uma safra recorde de batata nesta temporada. O clima favorável aliado a técnicas modernas de cultivo resultou em um aumento de 30% na produção em relação ao ano anterior.

A região, conhecida como um dos principais polos produtores de batata do estado de São Paulo, consolidou sua posição de destaque no setor agrícola.

"Investimos em tecnologia e isso está dando resultado. A qualidade e a produtividade melhoraram muito", comemora um dos produtores locais.

Números da safra:
- Produção total: 50 mil toneladas
- Aumento de 30% em relação a 2023
- Área plantada: 2.500 hectares
- Mais de 200 famílias beneficiadas

A boa safra também reflete positivamente na economia local, gerando empregos e movimentando o comércio da cidade.`,
    category: "Economia",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82ber38a?w=400&h=300&fit=crop",
    date: "Há 6 horas",
    author: "Pedro Costa",
  },
  {
    id: 6,
    title: "Escola municipal conquista prêmio estadual de educação",
    excerpt: "Projeto de alfabetização foi reconhecido como um dos melhores do estado.",
    content: `A Escola Municipal José de Alencar conquistou o prêmio estadual de educação pelo seu inovador projeto de alfabetização. O reconhecimento coloca Pilar do Sul em destaque no cenário educacional paulista.

O projeto, desenvolvido ao longo de dois anos, utiliza metodologias lúdicas e tecnologia para acelerar o processo de alfabetização de crianças do ensino fundamental.

"Nossos alunos estão aprendendo a ler e escrever de forma mais rápida e prazerosa. O segredo está em tornar o aprendizado divertido", explica a coordenadora pedagógica.

Resultados do projeto:
- 95% dos alunos alfabetizados no 1º ano
- Redução de 50% na evasão escolar
- Aumento de 40% no interesse pela leitura
- Envolvimento de toda a comunidade escolar

O prêmio inclui um recurso financeiro que será investido na expansão do projeto para outras escolas da rede municipal.`,
    category: "Educação",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop",
    date: "Há 8 horas",
    author: "Carla Mendes",
  },
  {
    id: 7,
    title: "Operação policial apreende veículos roubados na região",
    excerpt: "Ação integrada recuperou três carros que haviam sido furtados em cidades vizinhas.",
    content: `Uma operação integrada entre as polícias Militar e Civil resultou na apreensão de três veículos roubados na região de Pilar do Sul. A ação aconteceu na madrugada desta quarta-feira.

Os veículos haviam sido furtados em cidades vizinhas nas últimas semanas e estavam sendo utilizados para a prática de outros crimes na região.

"A integração entre as forças de segurança é fundamental para combater a criminalidade", destacou o delegado responsável pela operação.

Balanço da operação:
- 3 veículos recuperados
- 2 suspeitos presos
- Drogas e objetos ilícitos apreendidos
- Investigações continuam para identificar outros envolvidos

A população é incentivada a continuar colaborando com denúncias anônimas através do disque-denúncia.`,
    category: "Segurança",
    imageUrl: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=400&h=300&fit=crop",
    date: "Há 10 horas",
    author: "Redação Pilar em Foco",
  },
  {
    id: 8,
    title: "Câmara aprova projeto de lei para incentivo a pequenos empreendedores",
    excerpt: "Medida reduz impostos e oferece linhas de crédito especiais para microempresas.",
    content: `A Câmara Municipal de Pilar do Sul aprovou por unanimidade um projeto de lei que cria incentivos fiscais para pequenos empreendedores. A medida visa fortalecer a economia local e gerar novos empregos.

O projeto prevê redução de impostos municipais para microempresas e oferece linhas de crédito especiais com juros subsidiados para novos negócios.

"Queremos que Pilar do Sul seja uma cidade empreendedora. Este projeto é um passo importante nessa direção", afirmou o autor da proposta.

Principais benefícios:
- Redução de 50% no IPTU para microempresas no primeiro ano
- Isenção de taxas de alvará por 12 meses
- Linhas de crédito com juros de até 3% ao ano
- Capacitação gratuita em gestão empresarial

A lei entra em vigor a partir de janeiro de 2025 e deve beneficiar cerca de 500 pequenos negócios da cidade.`,
    category: "Política",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop",
    date: "Há 12 horas",
    author: "Lucas Ferreira",
  },
];

export const getNewsById = (id: number): NewsItem | undefined => {
  return allNews.find((news) => news.id === id);
};

export const getNewsByCategory = (category: string): NewsItem[] => {
  if (category === "Todas") return allNews;
  return allNews.filter((news) => news.category === category);
};
