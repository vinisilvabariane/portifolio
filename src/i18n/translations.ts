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
      eyebrow: 'sobre',
      title: 'Construo interfaces com foco em clareza, ritmo e identidade.',
      description:
        'Meu trabalho combina desenvolvimento front-end com direção visual. Gosto de criar experiências que parecem precisas, leves e com personalidade, sem perder legibilidade ou estrutura.',
      productTitle: 'Como eu penso produto',
      productDescription:
        'Interface boa não é só estética. Ela precisa orientar leitura, hierarquia, ação e percepção de valor. Meu foco está em transformar isso em layout, interação e implementação consistente.',
      stackTitle: 'Stack e repertório',
      stackDescription:
        'Trabalho melhor quando design e código evoluem juntos. Isso significa pensar a interface tanto como experiência quanto como sistema.',
    },
    contact: {
      eyebrow: 'contato',
      title: 'Vamos conversar sobre produto, interface e novas ideias.',
      description:
        'Se você tem um projeto, uma landing page para estruturar ou quer trocar ideia sobre front-end e direção visual, esta é a melhor página para me encontrar.',
      openContact: 'Abrir contato',
    },
    projects: {
      eyebrow: 'projetos',
      title: 'Página de projetos',
      description:
        'Os projetos ficam organizados em páginas de quatro cards. Conforme você adicionar novos itens, eles entram na próxima página lateral.',
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
      title: 'I build interfaces with clarity, rhythm, and identity in mind.',
      description:
        'My work combines front-end development with visual direction. I like creating experiences that feel precise, light, and distinctive without losing legibility or structure.',
      productTitle: 'How I think about product',
      productDescription:
        'A good interface is not only aesthetics. It needs to guide reading, hierarchy, action, and perceived value. My focus is turning that into layout, interaction, and consistent implementation.',
      stackTitle: 'Stack and range',
      stackDescription:
        'I work best when design and code evolve together. That means treating the interface as both an experience and a system.',
    },
    contact: {
      eyebrow: 'contact',
      title: 'Let us talk about product, interface, and new ideas.',
      description:
        'If you have a project, need a landing page structured, or want to talk about front-end and visual direction, this is the best page to reach me.',
      openContact: 'Open contact',
    },
    projects: {
      eyebrow: 'projects',
      title: 'Projects page',
      description:
        'Projects are organized in pages of four cards. As you add new items, they move into the next side page.',
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
      about: 'Sobre mi',
      contact: 'Contacto',
    },
    languageSwitcherLabel: 'Idioma',
    home: {
      eyebrow: 'Vinicius Bariane',
      title: 'Bienvenido!',
      subtitle: '<Coder>',
      description:
        'Desarrollo full stack con experiencia en PHP, JavaScript, React, .NET y otras tecnologias relacionadas.',
    },
    about: {
      eyebrow: 'sobre mi',
      title: 'Construyo interfaces con foco en claridad, ritmo e identidad.',
      description:
        'Mi trabajo combina desarrollo front-end con direccion visual. Me gusta crear experiencias precisas, ligeras y con personalidad, sin perder legibilidad ni estructura.',
      productTitle: 'Como pienso el producto',
      productDescription:
        'Una buena interfaz no es solo estetica. Debe orientar la lectura, la jerarquia, la accion y la percepcion de valor. Mi foco es convertir eso en layout, interaccion e implementacion consistente.',
      stackTitle: 'Stack y repertorio',
      stackDescription:
        'Trabajo mejor cuando diseno y codigo evolucionan juntos. Eso significa pensar la interfaz tanto como experiencia como sistema.',
    },
    contact: {
      eyebrow: 'contacto',
      title: 'Hablemos sobre producto, interfaz e ideas nuevas.',
      description:
        'Si tienes un proyecto, una landing page para estructurar o quieres conversar sobre front-end y direccion visual, esta es la mejor pagina para encontrarme.',
      openContact: 'Abrir contacto',
    },
    projects: {
      eyebrow: 'proyectos',
      title: 'Pagina de proyectos',
      description:
        'Los proyectos estan organizados en paginas de cuatro tarjetas. A medida que agregas nuevos elementos, pasan a la siguiente pagina lateral.',
      viewDetails: 'Ver detalles',
      items: {
        landingPages:
          'Coleccion de interfaces enfocadas en conversion, ritmo visual e identidad.',
        uiExperiments:
          'Exploraciones con shaders, fondos interactivos y composiciones editoriales.',
        designSystems:
          'Bases reutilizables para componentes, temas y navegacion de producto.',
        creativePortfoliosA:
          'Estructuras editoriales enfocadas en narrativa visual, impacto y lectura.',
        creativePortfoliosB:
          'Estructuras editoriales enfocadas en narrativa visual, impacto y lectura.',
      },
    },
  },
}
