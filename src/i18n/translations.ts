export const languages = ['pt', 'en', 'es'] as const

export type Language = (typeof languages)[number]

type TranslationTree = {
  nav: {
    home: string
    projects: string
    about: string
    contact: string
  }
  languageSwitcherLabel: string
  home: {
    eyebrow: string
    title: string
    subtitle: string
    description: string
  }
  about: {
    eyebrow: string
    title: string
    description: string
    productTitle: string
    productDescription: string
    stackTitle: string
    stackDescription: string
  }
  contact: {
    eyebrow: string
    title: string
    description: string
    openContact: string
  }
  projects: {
    eyebrow: string
    title: string
    description: string
    filterLabel: string
    allStacks: string
    emptyState: string
    viewDetails: string
    items: {
      landingPages: string
      uiExperiments: string
      designSystems: string
      creativePortfoliosA: string
      creativePortfoliosB: string
    }
  }
}

export const translations: Record<Language, TranslationTree> = {
  pt: {
    nav: {
      home: 'Home',
      projects: 'Projetos',
      about: 'Sobre',
      contact: 'Contato',
    },
    languageSwitcherLabel: 'Idioma',
    home: {
      eyebrow: 'Vinicius Bariane',
      title: 'Bem-vindo!',
      subtitle: '<Coder>',
      description:
        'Programação fullstack com experiência em desenvolvimento em PHP, JavaScript, React, .NET e outras tecnologias.',
    },
    about: {
      eyebrow: 'sobre mim',
      title: 'Construo soluções práticas, com ferramentas fullstack.',
      description:
        'Meu trabalho combina desenvolvimento fullstack com soluções práticas. Gosto de criar experiências precisas, leves e com personalidade, sem perder legibilidade ou estrutura.',
      productTitle: 'Formação acadêmica',
      productDescription:
        'Engenharia de Computação pela Universidade São Francisco. Técnico em Desenvolvimento de Sistemas pelo SENAC. Cursos de especialização em desenvolvimento web pela Udemy e Rocketseat. Certificação em sistemas embarcados pelo Instituto Federal do Ceará (IFCE).',
      stackTitle: 'Stack e repertório',
      stackDescription:
        'Trabalho melhor quando design e código evoluem juntos. Isso significa pensar a interface tanto como experiência quanto como sistema.',
    },
    contact: {
      eyebrow: 'contato',
      title: 'Vamos conversar! Fale comigo por estes meios.',
      description:
        'Se você tem um projeto, uma landing page para estruturar ou quer trocar ideia sobre programação, entre em contato por um desses canais. Aberto a propostas, colaborações ou só um papo sobre tecnologia e design.',
      openContact: 'Abrir contato',
    },
    projects: {
      eyebrow: 'projetos',
      title: 'Página de projetos',
      description:
        'Os projetos ficam organizados em páginas de quatro cards. Conforme você adicionar novos itens, eles entram na próxima página lateral.',
      filterLabel: 'Filtrar por stack',
      allStacks: 'Todas',
      emptyState: 'Nenhum projeto encontrado para essa stack.',
      viewDetails: 'Ver detalhes',
      items: {
        landingPages:
          'Coleção de interfaces focadas em conversão, ritmo visual e identidade.',
        uiExperiments:
          'Explorações com shaders, backgrounds interativos e composições editoriais.',
        designSystems:
          'Bases reutilizáveis para componentes, temas e navegação de produto.',
        creativePortfoliosA:
          'Estruturas editoriais com foco em narrativa visual, impacto e leitura.',
        creativePortfoliosB:
          'Estruturas editoriais com foco em narrativa visual, impacto e leitura.',
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
    },
    languageSwitcherLabel: 'Language',
    home: {
      eyebrow: 'Vinicius Bariane',
      title: 'Welcome!',
      subtitle: '<Coder>',
      description:
        'Full-stack development with experience building in PHP, JavaScript, React, .NET, and related technologies.',
    },
    about: {
      eyebrow: 'about',
      title: 'I build practical solutions with full-stack tools.',
      description:
        'My work combines full-stack development with practical solutions. I like creating experiences that feel precise, light, and distinctive without losing legibility or structure.',
      productTitle: 'Education',
      productDescription:
        'Computer Engineering at Universidade São Francisco. Systems Development Technician at SENAC. Web development specialization courses through Udemy and Rocketseat. Embedded systems certification through Instituto Federal do Ceará (IFCE).',
      stackTitle: 'Stack and range',
      stackDescription:
        'I work best when design and code evolve together. That means treating the interface as both an experience and a system.',
    },
    contact: {
      eyebrow: 'contact',
      title: 'Let us talk. Reach me through these channels.',
      description:
        'If you have a project, need a landing page structured, or want to talk about development, this is the best place to reach me. I am open to proposals, collaborations, or just a good conversation about technology and design.',
      openContact: 'Open contact',
    },
    projects: {
      eyebrow: 'projects',
      title: 'Projects page',
      description:
        'Projects are organized in pages of four cards. As you add new items, they move into the next side page.',
      filterLabel: 'Filter by stack',
      allStacks: 'All',
      emptyState: 'No projects found for this stack.',
      viewDetails: 'View details',
      items: {
        landingPages:
          'A collection of interfaces focused on conversion, visual rhythm, and identity.',
        uiExperiments:
          'Explorations with shaders, interactive backgrounds, and editorial compositions.',
        designSystems:
          'Reusable foundations for components, themes, and product navigation.',
        creativePortfoliosA:
          'Editorial structures focused on visual storytelling, impact, and readability.',
        creativePortfoliosB:
          'Editorial structures focused on visual storytelling, impact, and readability.',
      },
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      projects: 'Proyectos',
      about: 'Sobre mí',
      contact: 'Contacto',
    },
    languageSwitcherLabel: 'Idioma',
    home: {
      eyebrow: 'Vinicius Bariane',
      title: 'Bienvenido!',
      subtitle: '<Coder>',
      description:
        'Desarrollo full stack con experiencia en PHP, JavaScript, React, .NET y otras tecnologías relacionadas.',
    },
    about: {
      eyebrow: 'sobre mí',
      title: 'Construyo soluciones prácticas con herramientas full stack.',
      description:
        'Mi trabajo combina desarrollo full stack con soluciones prácticas. Me gusta crear experiencias precisas, ligeras y con personalidad, sin perder legibilidad ni estructura.',
      productTitle: 'Formación académica',
      productDescription:
        'Ingeniería de Computación en la Universidade São Francisco. Técnico en Desarrollo de Sistemas por SENAC. Cursos de especialización en desarrollo web por Udemy y Rocketseat. Certificación en sistemas embebidos por el Instituto Federal do Ceará (IFCE).',
      stackTitle: 'Stack y repertorio',
      stackDescription:
        'Trabajo mejor cuando diseño y código evolucionan juntos. Eso significa pensar la interfaz tanto como experiencia como sistema.',
    },
    contact: {
      eyebrow: 'contacto',
      title: 'Hablemos. Contáctame por estos medios.',
      description:
        'Si tienes un proyecto, una landing page para estructurar o quieres conversar sobre desarrollo, ponte en contacto por uno de estos canales. Estoy abierto a propuestas, colaboraciones o simplemente una charla sobre tecnología y diseño.',
      openContact: 'Abrir contacto',
    },
    projects: {
      eyebrow: 'proyectos',
      title: 'Página de proyectos',
      description:
        'Los proyectos están organizados en páginas de cuatro tarjetas. A medida que agregas nuevos elementos, pasan a la siguiente página lateral.',
      filterLabel: 'Filtrar por stack',
      allStacks: 'Todas',
      emptyState: 'No se encontraron proyectos para esta stack.',
      viewDetails: 'Ver detalles',
      items: {
        landingPages:
          'Colección de interfaces enfocadas en conversión, ritmo visual e identidad.',
        uiExperiments:
          'Exploraciones con shaders, fondos interactivos y composiciones editoriales.',
        designSystems:
          'Bases reutilizables para componentes, temas y navegación de producto.',
        creativePortfoliosA:
          'Estructuras editoriales enfocadas en narrativa visual, impacto y lectura.',
        creativePortfoliosB:
          'Estructuras editoriales enfocadas en narrativa visual, impacto y lectura.',
      },
    },
  },
}
