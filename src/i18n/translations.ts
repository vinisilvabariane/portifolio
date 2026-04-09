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
      pingMonitor: string
      bmiCalculator: string
      todoApi: string
      vehicleAgencyApp: string
      sentimentAnalyzer: string
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
        'Veja os meus projetos e soluções.',
      filterLabel: 'Filtrar por stack',
      allStacks: 'Todas',
      emptyState: 'Nenhum projeto encontrado para essa stack.',
      viewDetails: 'Ver detalhes',
      items: {
        landingPages:
          'App mobile em React Native para leitura de QR Codes e organização de estoque.',
        uiExperiments:
          'Projeto de iniciação científica com IA para traçar trilhas de estudo a partir de questionário e dataset.',
        designSystems:
          'Sistema de monitoramento de incêndio com IA em Python, sensores Arduino e painel web em PHP.',
        creativePortfoliosA:
          'Aplicação em PHP e JavaScript para gerenciar diferentes bases de usuários em um único app.',
        creativePortfoliosB:
          'Aplicação web em PHP para login, catálogo e gerenciamento de vídeos com MySQL e MQTT.',
        pingMonitor:
          'Aplicativo desktop em Python para monitorar hosts por ping com alertas por e-mail.',
        bmiCalculator:
          'Aplicação em Java para cálculo de IMC com resultado instantâneo e interpretação da faixa.',
        todoApi:
          'API REST em Java com Spring Boot para tarefas diárias, autenticação por UUID e validações.',
        vehicleAgencyApp:
          'Aplicação console em C# para gerenciamento de uma agência de veículos.',
        sentimentAnalyzer:
          'Protótipo de IA em Python para análise de sentimentos em português.',
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
        'See my projects and solutions.',
      filterLabel: 'Filter by stack',
      allStacks: 'All',
      emptyState: 'No projects found for this stack.',
      viewDetails: 'View details',
      items: {
        landingPages:
          'React Native mobile app for QR code scanning and stock organization.',
        uiExperiments:
          'Scientific initiation project using AI to generate study paths from a questionnaire and dataset.',
        designSystems:
          'Fire monitoring system with Python AI, Arduino sensors, and a PHP web dashboard.',
        creativePortfoliosA:
          'PHP and JavaScript application to manage different user databases in a single app.',
        creativePortfoliosB:
          'PHP web application for login, video catalog, and management with MySQL and MQTT.',
        pingMonitor:
          'Python desktop app for ping-based host monitoring with email alerts.',
        bmiCalculator:
          'Java application for BMI calculation with instant results and range interpretation.',
        todoApi:
          'Java Spring Boot REST API for daily tasks with UUID authentication and validations.',
        vehicleAgencyApp:
          'C# console application for vehicle agency management.',
        sentimentAnalyzer:
          'Python AI prototype for sentiment analysis in Portuguese.',
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
        'Vea mis proyectos y soluciones.',
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
          'App móvil en React Native para lectura de códigos QR y organización de stock.',
        uiExperiments:
          'Proyecto de iniciación científica con IA para generar rutas de estudio a partir de cuestionario y dataset.',
        designSystems:
          'Sistema de monitoreo de incendios con IA en Python, sensores Arduino y panel web en PHP.',
        creativePortfoliosA:
          'Aplicación en PHP y JavaScript para gestionar diferentes bases de usuarios en una sola app.',
        creativePortfoliosB:
          'Aplicación web en PHP para login, catálogo y gestión de videos con MySQL y MQTT.',
        pingMonitor:
          'Aplicación de escritorio en Python para monitorear hosts por ping con alertas por correo.',
        bmiCalculator:
          'Aplicación en Java para cálculo de IMC con resultado instantáneo e interpretación del rango.',
        todoApi:
          'API REST en Java con Spring Boot para tareas diarias, autenticación por UUID y validaciones.',
        vehicleAgencyApp:
          'Aplicación de consola en C# para gestión de una agencia de vehículos.',
        sentimentAnalyzer:
          'Prototipo de IA en Python para análisis de sentimientos en portugués.',
      },
    },
  },
}
