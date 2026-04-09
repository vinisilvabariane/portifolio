import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded'
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { useTheme } from '@mui/material'
import TiltedCard from '../components/tilted_card/TiltedCard'
import PageFrame from '../components/layout/PageFrame'
import SplitText from '../components/split_text/SplitText'
import { useI18n } from '../i18n/useI18n'
import type { Language } from '../i18n/translations'

type ProjectItem = {
  title: string
  description: string
  tags: string[]
  repoUrl?: string
}

type ProjectImage = {
  src: string
  alt: string
  caption?: string
}

type ProjectDetailContent = {
  heading: string
  goalLabel: string
  goal: string
  scopeLabel: string
  scope: string
  highlightsLabel: string
  highlights: string[]
  images?: ProjectImage[]
}

const projects: ProjectItem[] = [
  {
    title: 'App Mobile Estoque',
    description: 'landingPages',
    tags: ['React Native', 'JavaScript'],
    repoUrl: 'https://github.com/vinisilvabariane/app_mobile_estoque.git',
  },
  {
    title: 'Map My Path',
    description: 'uiExperiments',
    tags: ['PHP', 'Python', 'JavaScript'],
    repoUrl: 'https://github.com/vinisilvabariane/app_mmp.git',
  },
  {
    title: 'Firewatch',
    description: 'designSystems',
    tags: ['PHP', 'Python', 'JavaScript'],
    repoUrl: 'https://github.com/vinisilvabariane/app_firewatch.git',
  },
  {
    title: 'Lockpick',
    description: 'creativePortfoliosA',
    tags: ['PHP', 'JavaScript'],
    repoUrl: 'https://github.com/vinisilvabariane/app_lockpick.git',
  },
  {
    title: 'Bitstream',
    description: 'creativePortfoliosB',
    tags: ['PHP', 'JavaScript'],
    repoUrl: 'https://github.com/vinisilvabariane/app_bitstream.git',
  },
  {
    title: 'Ping Monitor',
    description: 'pingMonitor',
    tags: ['Python'],
    repoUrl: 'https://github.com/vinisilvabariane/app_ping_monitor.git',
  },
  {
    title: 'Calculadora IMC',
    description: 'bmiCalculator',
    tags: ['Java'],
    repoUrl: 'https://github.com/vinisilvabariane/app_calculadora_imc.git',
  },
  {
    title: 'To-Do API',
    description: 'todoApi',
    tags: ['Java'],
    repoUrl: 'https://github.com/vinisilvabariane/api_todolist_java_spring.git',
  },
  {
    title: 'Agência Veículos Premium',
    description: 'vehicleAgencyApp',
    tags: ['C#'],
    repoUrl: 'https://github.com/vinisilvabariane/app-agencia-veiculos-premium.git',
  },
  {
    title: 'Analisador de Sentimentos',
    description: 'sentimentAnalyzer',
    tags: ['Python'],
    repoUrl: 'https://github.com/vinisilvabariane/IA_analisador_de_sentimentos.git',
  },
]

const PROJECTS_PER_PAGE = 4
const stackFilters = ['PHP', 'Python', 'Java', 'React', 'React Native', 'JavaScript', 'C#'] as const

const projectDetails: Record<Language, Record<ProjectItem['description'], ProjectDetailContent>> = {
  pt: {
    landingPages: {
      heading: 'Projeto de páginas focadas em conversão e apresentação de produto.',
      goalLabel: 'Objetivo',
      goal: 'Criar landing pages rápidas, claras e com hierarquia visual forte para apresentar serviços, produtos e campanhas.',
      scopeLabel: 'Escopo',
      scope: 'Estruturação de seções, responsividade, componentes reutilizáveis, formulários e animações leves para reforçar leitura e CTA.',
      highlightsLabel: 'Destaques',
      highlights: [
        'Arquitetura pensada para edição rápida de conteúdo.',
        'Blocos visuais orientados a conversão e leitura.',
        'Integração front-end com foco em performance.',
      ],
    },
    uiExperiments: {
      heading: 'Experimentos visuais para interfaces com movimento e identidade.',
      goalLabel: 'Objetivo',
      goal: 'Explorar fundos interativos, microinterações e composições mais autorais para elevar o impacto visual da interface.',
      scopeLabel: 'Escopo',
      scope: 'Estudos com animação, shaders, transições, camadas visuais e interação orientada a cursor e profundidade.',
      highlightsLabel: 'Destaques',
      highlights: [
        'Protótipos com foco em direção de arte digital.',
        'Testes de interação com GPU e motion.',
        'Exploração de composição editorial aplicada ao front-end.',
      ],
    },
    designSystems: {
      heading: 'Base para sistemas de design e bibliotecas de componentes.',
      goalLabel: 'Objetivo',
      goal: 'Organizar padrões visuais e técnicos para acelerar manutenção, consistência e evolução de produto.',
      scopeLabel: 'Escopo',
      scope: 'Tokens, componentes base, documentação de estados, acessibilidade e padronização de comportamento entre telas.',
      highlightsLabel: 'Destaques',
      highlights: [
        'Componentes reutilizáveis com variações previsíveis.',
        'Padronização visual entre páginas e fluxos.',
        'Estrutura preparada para escalar o produto.',
      ],
    },
    creativePortfoliosA: {
      heading: 'Portfólio editorial com foco em narrativa visual.',
      goalLabel: 'Objetivo',
      goal: 'Apresentar trabalhos e identidade profissional com uma navegação mais imersiva e visualmente marcante.',
      scopeLabel: 'Escopo',
      scope: 'Construção de layout modular, páginas de projeto, destaques visuais, grid editorial e ritmo de leitura.',
      highlightsLabel: 'Destaques',
      highlights: [
        'Direção visual voltada para branding pessoal.',
        'Estrutura de conteúdo pensada para storytelling.',
        'Equilíbrio entre estética forte e legibilidade.',
      ],
    },
    creativePortfoliosB: {
      heading: 'Dashboard corporativo para leitura de dados e operações.',
      goalLabel: 'Objetivo',
      goal: 'Concentrar informações de operação em uma interface clara, com filtros, indicadores e navegação objetiva.',
      scopeLabel: 'Escopo',
      scope: 'Telas de monitoramento, tabelas, gráficos, estados de sistema e organização de dados para leitura rápida.',
      highlightsLabel: 'Destaques',
      highlights: [
        'Layout orientado a produtividade e contexto.',
        'Componentes consistentes para dados complexos.',
        'Priorização de clareza em cenários densos.',
      ],
    },
    pingMonitor: {
      heading: 'Aplicativo desktop em Python para monitorar hosts por ICMP com alertas por e-mail.',
      goalLabel: 'Objetivo',
      goal: 'Acompanhar disponibilidade de hosts em uma interface simples e notificar quando houver transição para estado offline.',
      scopeLabel: 'Escopo',
      scope: 'Aplicação em Python com Tkinter, monitoramento por ping com fallback para comando do sistema, configuração por variáveis de ambiente e envio opcional de alertas por e-mail.',
      highlightsLabel: 'Destaques',
      highlights: [
        'Monitoramento ICMP com fallback quando `ping3` não está disponível.',
        'Interface desktop modular com atualização thread-safe.',
        'Alertas enviados apenas na transição para offline.',
      ],
    },
    bmiCalculator: {
      heading: 'Aplicação em Java para cálculo de IMC com interpretação do resultado.',
      goalLabel: 'Objetivo',
      goal: 'Permitir o cálculo rápido do índice de massa corporal com retorno imediato e orientação básica sobre a faixa do resultado.',
      scopeLabel: 'Escopo',
      scope: 'Aplicativo simples com interface amigável para entrada de altura e peso, cálculo automático do IMC e exibição da classificação correspondente.',
      highlightsLabel: 'Destaques',
      highlights: [
        'Cálculo instantâneo de IMC a partir de peso e altura.',
        'Leitura simples com classificação do resultado.',
        'Projeto direto, leve e fácil de usar como utilitário.',
      ],
    },
    todoApi: {
      heading: 'API REST em Java com Spring Boot para gerenciamento de tarefas diárias.',
      goalLabel: 'Objetivo',
      goal: 'Organizar tarefas com autenticação simples por UUID, validações de dados e regras para garantir que apenas o proprietário possa alterar seus itens.',
      scopeLabel: 'Escopo',
      scope: 'Backend com Spring Boot, Spring Web, JPA, validação, H2 em memória e filtro customizado de autorização para proteger rotas de tarefas.',
      highlightsLabel: 'Destaques',
      highlights: [
        'CRUD de tarefas com autenticação baseada em UUID.',
        'Validação de datas e restrição de edição ao dono da tarefa.',
        'Tratamento padronizado de erros e banco H2 para desenvolvimento.',
      ],
    },
    vehicleAgencyApp: {
      heading: 'Aplicação console em C# para gerenciamento de uma agência de veículos.',
      goalLabel: 'Objetivo',
      goal: 'Exercitar conceitos básicos da linguagem C# em um projeto prático voltado à organização de operações de uma agência de carros.',
      scopeLabel: 'Escopo',
      scope: 'Aplicativo de terminal para cadastro e gerenciamento de informações da agência, com foco em estruturação lógica e treinamento de fundamentos.',
      highlightsLabel: 'Destaques',
      highlights: [
        'Projeto de treino focado em fundamentos de C#.',
        'Modelagem simples para rotina de uma agência de veículos.',
        'Estrutura voltada para prática de lógica e organização de código.',
      ],
    },
    sentimentAnalyzer: {
      heading: 'Protótipo de IA para análise de sentimentos em textos em português.',
      goalLabel: 'Objetivo',
      goal: 'Classificar frases como positivas ou negativas com base em um modelo treinado em avaliações de e-commerce brasileiro.',
      scopeLabel: 'Escopo',
      scope: 'Pipeline de PLN com preparação de dados, treinamento do modelo e execução via linha de comando, usando técnicas clássicas de classificação de texto.',
      highlightsLabel: 'Destaques',
      highlights: [
        'Classificação binária de sentimento em português.',
        'Uso de Pandas, NLTK, Scikit-learn e Joblib.',
        'Projeto organizado em etapas de dados, treino e predição.',
      ],
    },
  },
  en: {
    landingPages: {
      heading: 'Landing page project focused on conversion and product presentation.',
      goalLabel: 'Goal',
      goal: 'Build fast, clear landing pages with strong hierarchy for services, products, and campaigns.',
      scopeLabel: 'Scope',
      scope: 'Section structure, responsive behavior, reusable components, forms, and light motion to support reading flow and CTA.',
      highlightsLabel: 'Highlights',
      highlights: [
        'Content structure designed for quick editing.',
        'Visual blocks built around conversion and readability.',
        'Front-end implementation with performance in mind.',
      ],
    },
    uiExperiments: {
      heading: 'Visual experiments for interfaces with motion and identity.',
      goalLabel: 'Goal',
      goal: 'Explore interactive backgrounds, microinteractions, and more distinctive interface directions.',
      scopeLabel: 'Scope',
      scope: 'Motion studies, shaders, transitions, visual layering, and interaction driven by cursor and depth.',
      highlightsLabel: 'Highlights',
      highlights: [
        'Prototypes focused on digital art direction.',
        'GPU and motion-based interaction tests.',
        'Editorial composition applied to front-end.',
      ],
    },
    designSystems: {
      heading: 'Foundation for design systems and component libraries.',
      goalLabel: 'Goal',
      goal: 'Organize visual and technical patterns to improve maintenance, consistency, and product evolution.',
      scopeLabel: 'Scope',
      scope: 'Tokens, base components, state documentation, accessibility, and behavior standards across screens.',
      highlightsLabel: 'Highlights',
      highlights: [
        'Reusable components with predictable variations.',
        'Consistent visual language across flows.',
        'Structure ready to scale with the product.',
      ],
    },
    creativePortfoliosA: {
      heading: 'Editorial portfolio focused on visual storytelling.',
      goalLabel: 'Goal',
      goal: 'Present work and professional identity with a more immersive and distinctive navigation flow.',
      scopeLabel: 'Scope',
      scope: 'Modular layout, project pages, visual highlights, editorial grid, and reading rhythm.',
      highlightsLabel: 'Highlights',
      highlights: [
        'Visual direction aimed at personal branding.',
        'Content structure built for storytelling.',
        'Balance between strong aesthetics and readability.',
      ],
    },
    creativePortfoliosB: {
      heading: 'Corporate dashboard for operational and data visibility.',
      goalLabel: 'Goal',
      goal: 'Bring operational information together in a clear interface with filters, indicators, and direct navigation.',
      scopeLabel: 'Scope',
      scope: 'Monitoring screens, tables, charts, system states, and fast data scanning patterns.',
      highlightsLabel: 'Highlights',
      highlights: [
        'Layout focused on productivity and context.',
        'Consistent components for dense data.',
        'Clarity prioritized for complex scenarios.',
      ],
    },
    pingMonitor: {
      heading: 'Python desktop application for ICMP host monitoring with email alerts.',
      goalLabel: 'Goal',
      goal: 'Track host availability in a simple interface and notify when a monitored target transitions to offline.',
      scopeLabel: 'Scope',
      scope: 'Python application with Tkinter, ping monitoring with system-command fallback, environment-based configuration, and optional email alerts.',
      highlightsLabel: 'Highlights',
      highlights: [
        'ICMP monitoring with fallback when `ping3` is unavailable.',
        'Modular desktop UI with thread-safe updates.',
        'Alerts sent only on transition to offline.',
      ],
    },
    bmiCalculator: {
      heading: 'Java application for BMI calculation with result interpretation.',
      goalLabel: 'Goal',
      goal: 'Provide a quick body mass index calculation with immediate feedback and a basic interpretation of the result range.',
      scopeLabel: 'Scope',
      scope: 'Simple application with a friendly interface for height and weight input, automatic BMI calculation, and display of the corresponding classification.',
      highlightsLabel: 'Highlights',
      highlights: [
        'Instant BMI calculation from weight and height.',
        'Straightforward result reading with classification.',
        'Direct, lightweight utility-style project.',
      ],
    },
    todoApi: {
      heading: 'Java Spring Boot REST API for daily task management.',
      goalLabel: 'Goal',
      goal: 'Organize tasks with simple UUID-based authentication, data validation, and rules ensuring that only the owner can modify their items.',
      scopeLabel: 'Scope',
      scope: 'Backend built with Spring Boot, Spring Web, JPA, validation, in-memory H2, and a custom authorization filter to protect task routes.',
      highlightsLabel: 'Highlights',
      highlights: [
        'Task CRUD with UUID-based authentication.',
        'Date validation and owner-only task updates.',
        'Standardized error handling and H2 database for development.',
      ],
    },
    vehicleAgencyApp: {
      heading: 'C# console application for vehicle agency management.',
      goalLabel: 'Goal',
      goal: 'Practice core C# language concepts through a practical project centered on organizing vehicle agency operations.',
      scopeLabel: 'Scope',
      scope: 'Terminal application for agency information management, focused on logical structure and training fundamental programming concepts.',
      highlightsLabel: 'Highlights',
      highlights: [
        'Training project focused on core C# fundamentals.',
        'Simple modeling for a vehicle agency workflow.',
        'Structure designed for logic practice and code organization.',
      ],
    },
    sentimentAnalyzer: {
      heading: 'AI prototype for sentiment analysis in Portuguese text.',
      goalLabel: 'Goal',
      goal: 'Classify phrases as positive or negative based on a model trained on Brazilian e-commerce reviews.',
      scopeLabel: 'Scope',
      scope: 'NLP pipeline with data preparation, model training, and command-line execution using classic text classification techniques.',
      highlightsLabel: 'Highlights',
      highlights: [
        'Binary sentiment classification for Portuguese text.',
        'Built with Pandas, NLTK, Scikit-learn, and Joblib.',
        'Project organized around data, training, and prediction steps.',
      ],
    },
  },
  es: {
    landingPages: {
      heading: 'Proyecto de landing pages enfocado en conversión y presentación de producto.',
      goalLabel: 'Objetivo',
      goal: 'Crear landing pages rápidas y claras, con jerarquía visual fuerte para servicios, productos y campañas.',
      scopeLabel: 'Alcance',
      scope: 'Estructura de secciones, responsividad, componentes reutilizables, formularios y animaciones ligeras para reforzar lectura y CTA.',
      highlightsLabel: 'Puntos clave',
      highlights: [
        'Arquitectura pensada para edición rápida de contenido.',
        'Bloques visuales orientados a conversión y lectura.',
        'Implementación front-end con foco en rendimiento.',
      ],
    },
    uiExperiments: {
      heading: 'Experimentos visuales para interfaces con movimiento e identidad.',
      goalLabel: 'Objetivo',
      goal: 'Explorar fondos interactivos, microinteracciones y direcciones visuales más autorales para la interfaz.',
      scopeLabel: 'Alcance',
      scope: 'Estudios con animación, shaders, transiciones, capas visuales e interacción guiada por cursor y profundidad.',
      highlightsLabel: 'Puntos clave',
      highlights: [
        'Prototipos con foco en dirección de arte digital.',
        'Pruebas de interacción con GPU y motion.',
        'Composición editorial aplicada al front-end.',
      ],
    },
    designSystems: {
      heading: 'Base para sistemas de diseño y bibliotecas de componentes.',
      goalLabel: 'Objetivo',
      goal: 'Organizar patrones visuales y técnicos para mejorar mantenimiento, consistencia y evolución del producto.',
      scopeLabel: 'Alcance',
      scope: 'Tokens, componentes base, documentación de estados, accesibilidad y estandarización de comportamiento entre pantallas.',
      highlightsLabel: 'Puntos clave',
      highlights: [
        'Componentes reutilizables con variaciones previsibles.',
        'Lenguaje visual consistente entre flujos.',
        'Estructura preparada para escalar.',
      ],
    },
    creativePortfoliosA: {
      heading: 'Portafolio editorial con foco en narrativa visual.',
      goalLabel: 'Objetivo',
      goal: 'Presentar trabajos e identidad profesional con una navegación más inmersiva y visualmente marcada.',
      scopeLabel: 'Alcance',
      scope: 'Layout modular, páginas de proyecto, destaques visuales, grid editorial y ritmo de lectura.',
      highlightsLabel: 'Puntos clave',
      highlights: [
        'Dirección visual orientada a marca personal.',
        'Estructura de contenido pensada para storytelling.',
        'Equilibrio entre estética fuerte y legibilidad.',
      ],
    },
    creativePortfoliosB: {
      heading: 'Dashboard corporativo para lectura de datos y operación.',
      goalLabel: 'Objetivo',
      goal: 'Centralizar información operativa en una interfaz clara, con filtros, indicadores y navegación directa.',
      scopeLabel: 'Alcance',
      scope: 'Pantallas de monitoreo, tablas, gráficos, estados de sistema y organización de datos para lectura rápida.',
      highlightsLabel: 'Puntos clave',
      highlights: [
        'Layout orientado a productividad y contexto.',
        'Componentes consistentes para datos complejos.',
        'Claridad priorizada en escenarios densos.',
      ],
    },
    pingMonitor: {
      heading: 'Aplicación de escritorio en Python para monitorear hosts por ICMP con alertas por correo.',
      goalLabel: 'Objetivo',
      goal: 'Acompañar la disponibilidad de hosts en una interfaz simple y notificar cuando un objetivo monitoreado pasa a offline.',
      scopeLabel: 'Alcance',
      scope: 'Aplicación en Python con Tkinter, monitoreo por ping con fallback al comando del sistema, configuración por variables de entorno y alertas opcionales por correo.',
      highlightsLabel: 'Puntos clave',
      highlights: [
        'Monitoreo ICMP con fallback cuando `ping3` no está disponible.',
        'Interfaz de escritorio modular con actualización thread-safe.',
        'Alertas enviadas solo en la transición a offline.',
      ],
    },
    bmiCalculator: {
      heading: 'Aplicación en Java para cálculo de IMC con interpretación del resultado.',
      goalLabel: 'Objetivo',
      goal: 'Permitir el cálculo rápido del índice de masa corporal con retorno inmediato y orientación básica sobre el rango del resultado.',
      scopeLabel: 'Alcance',
      scope: 'Aplicación simple con interfaz amigable para ingresar altura y peso, cálculo automático del IMC y exhibición de la clasificación correspondiente.',
      highlightsLabel: 'Puntos clave',
      highlights: [
        'Cálculo instantáneo de IMC a partir de peso y altura.',
        'Lectura simple con clasificación del resultado.',
        'Proyecto directo, liviano y fácil de usar como utilidad.',
      ],
    },
    todoApi: {
      heading: 'API REST en Java con Spring Boot para gestión de tareas diarias.',
      goalLabel: 'Objetivo',
      goal: 'Organizar tareas con autenticación simple por UUID, validaciones de datos y reglas para garantizar que solo el propietario pueda modificar sus elementos.',
      scopeLabel: 'Alcance',
      scope: 'Backend con Spring Boot, Spring Web, JPA, validación, H2 en memoria y filtro customizado de autorización para proteger rutas de tareas.',
      highlightsLabel: 'Puntos clave',
      highlights: [
        'CRUD de tareas con autenticación basada en UUID.',
        'Validación de fechas y edición restringida al dueño de la tarea.',
        'Manejo estandarizado de errores y base H2 para desarrollo.',
      ],
    },
    vehicleAgencyApp: {
      heading: 'Aplicación de consola en C# para gestión de una agencia de vehículos.',
      goalLabel: 'Objetivo',
      goal: 'Practicar conceptos básicos del lenguaje C# en un proyecto práctico orientado a organizar operaciones de una agencia de autos.',
      scopeLabel: 'Alcance',
      scope: 'Aplicación de terminal para gestión de información de la agencia, con foco en estructura lógica y entrenamiento de fundamentos de programación.',
      highlightsLabel: 'Puntos clave',
      highlights: [
        'Proyecto de práctica enfocado en fundamentos de C#.',
        'Modelado simple para flujo de una agencia de vehículos.',
        'Estructura orientada a lógica y organización del código.',
      ],
    },
    sentimentAnalyzer: {
      heading: 'Prototipo de IA para análisis de sentimientos en textos en portugués.',
      goalLabel: 'Objetivo',
      goal: 'Clasificar frases como positivas o negativas con base en un modelo entrenado con reseñas de e-commerce brasileño.',
      scopeLabel: 'Alcance',
      scope: 'Pipeline de PLN con preparación de datos, entrenamiento del modelo y ejecución por línea de comando usando técnicas clásicas de clasificación de texto.',
      highlightsLabel: 'Puntos clave',
      highlights: [
        'Clasificación binaria de sentimiento en portugués.',
        'Uso de Pandas, NLTK, Scikit-learn y Joblib.',
        'Proyecto organizado en etapas de datos, entrenamiento y predicción.',
      ],
    },
  },
}

function chunkProjects<T>(items: T[], size: number) {
  const chunks: T[][] = []

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }

  return chunks
}

function Projects() {
  const { t, language } = useI18n()
  const theme = useTheme()
  const [selectedStack, setSelectedStack] = useState<string>('all')
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const filteredProjects = useMemo(() => {
    if (selectedStack === 'all') return projects

    return projects.filter((project) => project.tags.includes(selectedStack))
  }, [selectedStack])
  const projectPages = useMemo(
    () => chunkProjects(filteredProjects, PROJECTS_PER_PAGE),
    [filteredProjects],
  )
  const [activePage, setActivePage] = useState(0)

  const canGoPrev = activePage > 0
  const canGoNext = activePage < projectPages.length - 1

  useEffect(() => {
    setActivePage(0)
  }, [selectedStack])

  useEffect(() => {
    setActiveImageIndex(0)
  }, [selectedProject])

  function goPrev() {
    if (canGoPrev) setActivePage((current) => current - 1)
  }

  function goNext() {
    if (canGoNext) setActivePage((current) => current + 1)
  }

  function openProjectDetails(project: ProjectItem) {
    setSelectedProject(project)
  }

  function handleProjectActionClick(event: MouseEvent<HTMLButtonElement>, project: ProjectItem) {
    event.stopPropagation()
    setSelectedProject(project)
  }

  const modalLabels = {
    pt: {
      stack: 'Stack',
      close: 'Fechar',
      gallery: 'Galeria',
      emptyGallery: 'Adicione imagens em `projectDetails.images` para exibir a galeria deste projeto.',
      repository: 'Repositório',
      openRepository: 'Abrir repositório',
    },
    en: {
      stack: 'Stack',
      close: 'Close',
      gallery: 'Gallery',
      emptyGallery: 'Add images in `projectDetails.images` to display this project gallery.',
      repository: 'Repository',
      openRepository: 'Open repository',
    },
    es: {
      stack: 'Stack',
      close: 'Cerrar',
      gallery: 'Galería',
      emptyGallery: 'Agrega imágenes en `projectDetails.images` para mostrar la galería de este proyecto.',
      repository: 'Repositorio',
      openRepository: 'Abrir repositorio',
    },
  } satisfies Record<
    Language,
    {
      stack: string
      close: string
      gallery: string
      emptyGallery: string
      repository: string
      openRepository: string
    }
  >

  const selectedProjectDetail = selectedProject
    ? projectDetails[language][selectedProject.description]
    : null
  const selectedProjectImages = selectedProjectDetail?.images ?? []
  const activeImage = selectedProjectImages[activeImageIndex] ?? null

  return (
    <PageFrame>
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          alignSelf: 'stretch',
          px: { xs: 3, md: 5, lg: 6 },
          pt: { xs: 12, md: 14 },
          pb: { xs: 16, md: 18 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 'none', ml: 0, mr: 0 }}>
          <Box
            sx={{
              mb: 3.5,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'flex-end' },
              justifyContent: 'space-between',
              gap: 3,
            }}
          >
            <Stack spacing={2} sx={{ maxWidth: 760, textAlign: 'left' }}>
              <Typography
                component="p"
                sx={{
                  color: 'rgba(244, 245, 250, 0.78)',
                  fontFamily: 'var(--mono)',
                  fontSize: { xs: 12, md: 13 },
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  textShadow: '0 2px 10px rgba(0,0,0,0.42)',
                }}
              >
                {t.projects.eyebrow}
              </Typography>

              <Box
                sx={{
                  width: '100%',
                  pb: '0.14em',
                  color: '#f5f7ff',
                  fontSize: { xs: 'clamp(2.6rem, 10vw, 4.4rem)', md: 'clamp(3.6rem, 7vw, 5.6rem)' },
                  textShadow:
                    '0 8px 28px rgba(0, 0, 0, 0.58), 0 2px 10px rgba(0, 0, 0, 0.32)',
                  '& .split-page-title': {
                    margin: 0,
                    color: 'inherit',
                    fontSize: 'inherit',
                    fontWeight: 600,
                    lineHeight: 1.04,
                    letterSpacing: '-0.06em',
                  },
                }}
              >
                <SplitText
                  text={t.projects.title}
                  tag="h1"
                  textAlign="left"
                  display="block"
                  overflow="visible"
                  splitType="words"
                  delay={100}
                  className="split-page-title"
                />
              </Box>

              <Typography
                variant="body1"
                sx={{
                  maxWidth: 760,
                  color: 'rgba(232, 234, 242, 0.88)',
                  fontSize: { xs: '0.98rem', md: '1.05rem' },
                  textShadow: '0 2px 14px rgba(0,0,0,0.48)',
                }}
              >
                {t.projects.description}
              </Typography>

              <Stack spacing={1.25}>
                <Typography
                  component="p"
                  sx={{
                    color: 'rgba(244, 245, 250, 0.78)',
                    fontFamily: 'var(--mono)',
                    fontSize: 12,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}
                >
                  {t.projects.filterLabel}
                </Typography>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  <Chip
                    label={t.projects.allStacks}
                    clickable
                    onClick={() => setSelectedStack('all')}
                    variant={selectedStack === 'all' ? 'filled' : 'outlined'}
                    sx={{
                      color:
                        selectedStack === 'all'
                          ? theme.palette.background.default
                          : 'primary.light',
                      borderColor: alpha(theme.palette.primary.main, 0.28),
                      backgroundColor:
                        selectedStack === 'all'
                          ? alpha(theme.palette.primary.light, 0.92)
                          : alpha(theme.palette.primary.main, 0.08),
                    }}
                  />

                  {stackFilters.map((stack) => (
                    <Chip
                      key={stack}
                      label={stack}
                      clickable
                      onClick={() => setSelectedStack(stack)}
                      variant={selectedStack === stack ? 'filled' : 'outlined'}
                      sx={{
                        color:
                          selectedStack === stack
                            ? theme.palette.background.default
                            : 'primary.light',
                        borderColor: alpha(theme.palette.primary.main, 0.28),
                        backgroundColor:
                          selectedStack === stack
                            ? alpha(theme.palette.primary.light, 0.92)
                            : alpha(theme.palette.primary.main, 0.08),
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                justifyContent: 'flex-end',
                flexShrink: 0,
                alignSelf: { xs: 'flex-start', md: 'flex-end' },
              }}
            >
              <IconButton
                onClick={goPrev}
                disabled={!canGoPrev}
                sx={{
                  color: 'primary.light',
                  border: '1px solid',
                  borderColor: canGoPrev ? 'divider' : 'rgba(255,255,255,0.08)',
                  backgroundColor: alpha(theme.palette.background.default, 0.48),
                  backdropFilter: 'blur(10px)',
                  opacity: canGoPrev ? 1 : 0.45,
                  '&:hover': {
                    borderColor: canGoPrev ? alpha(theme.palette.primary.main, 0.42) : 'rgba(255,255,255,0.08)',
                    backgroundColor: canGoPrev ? alpha(theme.palette.background.default, 0.84) : alpha(theme.palette.background.default, 0.48),
                  },
                }}
              >
                <ChevronLeftRoundedIcon />
              </IconButton>
              <IconButton
                onClick={goNext}
                disabled={!canGoNext}
                sx={{
                  color: 'primary.light',
                  border: '1px solid',
                  borderColor: canGoNext ? 'divider' : 'rgba(255,255,255,0.08)',
                  backgroundColor: alpha(theme.palette.background.default, 0.48),
                  backdropFilter: 'blur(10px)',
                  opacity: canGoNext ? 1 : 0.45,
                  '&:hover': {
                    borderColor: canGoNext ? alpha(theme.palette.primary.main, 0.42) : 'rgba(255,255,255,0.08)',
                    backgroundColor: canGoNext ? alpha(theme.palette.background.default, 0.84) : alpha(theme.palette.background.default, 0.48),
                  },
                }}
              >
                <ChevronRightRoundedIcon />
              </IconButton>
            </Stack>
          </Box>

          <Box sx={{ position: 'relative', width: '100%', minHeight: { xs: 1280, sm: 760, xl: 380 } }}>
            <AnimatePresence mode="wait">
              {projectPages.length > 0 ? (
                <Box
                  key={`${selectedStack}-${activePage}`}
                  component={motion.div}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, minmax(0, 1fr))',
                      xl: 'repeat(4, minmax(0, 1fr))',
                    },
                    width: '100%',
                    gap: { xs: 2, md: 2.5 },
                  }}
                >
                  {projectPages[activePage].map((project, index) => {
                    const projectNumber = activePage * PROJECTS_PER_PAGE + index + 1

                    return (
                      <TiltedCard
                        key={`${project.title}-${projectNumber}`}
                        minHeight={{ xs: 300, md: 340 }}
                        rotateAmplitude={8}
                        scaleOnHover={1.015}
                      >
                        <Box
                          onClick={() => openProjectDetails(project)}
                          sx={{
                            minWidth: 0,
                            p: { xs: 3, md: 4 },
                            minHeight: { xs: 300, md: 340 },
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.default, 0.62)})`,
                            backdropFilter: 'blur(14px)',
                            transition: 'border-color 180ms ease, box-shadow 180ms ease',
                            cursor: 'pointer',
                            '@media (hover: hover)': {
                              '&:hover': {
                                borderColor: alpha(theme.palette.primary.main, 0.42),
                                boxShadow: `0 16px 30px ${alpha(theme.palette.background.default, 0.24)}`,
                              },
                            },
                          }}
                        >
                          <Stack spacing={3} sx={{ height: '100%', justifyContent: 'space-between' }}>
                            <Stack spacing={2.5}>
                              <Typography
                                variant="overline"
                                sx={{ color: 'primary.light', letterSpacing: '0.18em' }}
                              >
                                {projectNumber.toString().padStart(2, '0')}
                              </Typography>

                              <Typography
                                variant="h4"
                                translate="no"
                                className="notranslate"
                                sx={{
                                  color: 'text.primary',
                                  fontSize: { xs: '1.5rem', md: '1.9rem' },
                                  lineHeight: 1.1,
                                }}
                              >
                                {project.title}
                              </Typography>

                              <Typography
                                variant="body1"
                                sx={{
                                  color: 'text.secondary',
                                  lineHeight: 1.8,
                                }}
                              >
                                {
                                  t.projects.items[
                                    project.description as keyof typeof t.projects.items
                                  ]
                                }
                              </Typography>

                              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                                {project.tags.map((tag) => (
                                  <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    sx={{
                                      color: 'primary.light',
                                      borderColor: alpha(theme.palette.primary.main, 0.28),
                                      backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                    }}
                                    variant="outlined"
                                  />
                                ))}
                              </Stack>
                            </Stack>

                            <Button
                              variant="text"
                              color="secondary"
                              endIcon={<LaunchRoundedIcon />}
                              onClick={(event) => handleProjectActionClick(event, project)}
                              sx={{ alignSelf: 'flex-start', px: 0 }}
                            >
                              {t.projects.viewDetails}
                            </Button>
                          </Stack>
                        </Box>
                      </TiltedCard>
                    )
                  })}
                </Box>
              ) : (
                <Box
                  key={`empty-${selectedStack}`}
                  component={motion.div}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 280,
                    px: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.82)}, ${alpha(theme.palette.background.default, 0.52)})`,
                    backdropFilter: 'blur(14px)',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 520 }}
                  >
                    {t.projects.emptyState}
                  </Typography>
                </Box>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={Boolean(selectedProject && selectedProjectDetail)}
        onClose={() => setSelectedProject(null)}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.2),
            background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.96)}, ${alpha(theme.palette.background.default, 0.9)})`,
            backdropFilter: 'blur(18px)',
            boxShadow: `0 24px 80px ${alpha(theme.palette.background.default, 0.46)}`,
          },
        }}
      >
        {selectedProject && selectedProjectDetail ? (
          <>
            <DialogTitle sx={{ pb: 1.5, pr: 7 }}>
              <Stack spacing={1.25}>
                <Typography
                  variant="overline"
                  sx={{ color: 'primary.light', letterSpacing: '0.18em' }}
                >
                  {modalLabels[language].stack}
                </Typography>
                <Typography variant="h4" sx={{ color: 'text.primary', lineHeight: 1.05 }}>
                  {selectedProject.title}
                </Typography>
              </Stack>

              <IconButton
                onClick={() => setSelectedProject(null)}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: 16,
                  color: 'primary.light',
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: alpha(theme.palette.background.default, 0.36),
                }}
              >
                <CloseRoundedIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 1 }}>
              <Stack spacing={3}>
                <Stack spacing={1.5}>
                  <Typography
                    variant="overline"
                    sx={{ color: 'primary.light', letterSpacing: '0.18em' }}
                  >
                    {modalLabels[language].gallery}
                  </Typography>

                  {activeImage ? (
                    <Stack spacing={1.5}>
                      <Box
                        sx={{
                          position: 'relative',
                          overflow: 'hidden',
                          minHeight: { xs: 240, md: 360 },
                          borderRadius: 3,
                          border: '1px solid',
                          borderColor: alpha(theme.palette.primary.main, 0.22),
                          backgroundColor: alpha(theme.palette.background.default, 0.42),
                          boxShadow: `0 24px 48px ${alpha(theme.palette.background.default, 0.32)}`,
                        }}
                      >
                        <Box
                          component="img"
                          src={activeImage.src}
                          alt={activeImage.alt}
                          sx={{
                            display: 'block',
                            width: '100%',
                            height: { xs: 240, md: 360 },
                            objectFit: 'cover',
                          }}
                        />
                      </Box>

                      {activeImage.caption ? (
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                          {activeImage.caption}
                        </Typography>
                      ) : null}

                      {selectedProjectImages.length > 1 ? (
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(96px, 1fr))',
                            gap: 1,
                          }}
                        >
                          {selectedProjectImages.map((image, index) => {
                            const isActive = index === activeImageIndex

                            return (
                              <Box
                                key={`${image.src}-${index}`}
                                component="button"
                                type="button"
                                onClick={() => setActiveImageIndex(index)}
                                sx={{
                                  p: 0,
                                  border: '1px solid',
                                  borderColor: isActive
                                    ? alpha(theme.palette.primary.light, 0.9)
                                    : alpha(theme.palette.primary.main, 0.18),
                                  borderRadius: 2,
                                  overflow: 'hidden',
                                  cursor: 'pointer',
                                  background: 'transparent',
                                  opacity: isActive ? 1 : 0.72,
                                  transform: isActive ? 'translateY(-2px)' : 'none',
                                  transition: '180ms ease',
                                  boxShadow: isActive
                                    ? `0 12px 24px ${alpha(theme.palette.background.default, 0.28)}`
                                    : 'none',
                                }}
                              >
                                <Box
                                  component="img"
                                  src={image.src}
                                  alt={image.alt}
                                  sx={{
                                    display: 'block',
                                    width: '100%',
                                    height: 82,
                                    objectFit: 'cover',
                                  }}
                                />
                              </Box>
                            )
                          })}
                        </Box>
                      ) : null}
                    </Stack>
                  ) : (
                    <Box
                      sx={{
                        minHeight: { xs: 180, md: 240 },
                        borderRadius: 3,
                        border: '1px dashed',
                        borderColor: alpha(theme.palette.primary.main, 0.28),
                        background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.72)}, ${alpha(theme.palette.background.default, 0.46)})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: 3,
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 360 }}>
                        {modalLabels[language].emptyGallery}
                      </Typography>
                    </Box>
                  )}
                </Stack>

                <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.8 }}>
                  {selectedProjectDetail.heading}
                </Typography>

                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {selectedProject.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        color: 'primary.light',
                        borderColor: alpha(theme.palette.primary.main, 0.28),
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      }}
                      variant="outlined"
                    />
                  ))}
                </Stack>

                <Stack spacing={2.2}>
                  {selectedProject.repoUrl ? (
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{ color: 'primary.light', letterSpacing: '0.18em' }}
                      >
                        {modalLabels[language].repository}
                      </Typography>
                      <Box sx={{ pt: 0.75 }}>
                        <Button
                          component="a"
                          href={selectedProject.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          variant="outlined"
                          color="secondary"
                          endIcon={<LaunchRoundedIcon />}
                        >
                          {modalLabels[language].openRepository}
                        </Button>
                      </Box>
                    </Box>
                  ) : null}

                  <Box>
                    <Typography
                      variant="overline"
                      sx={{ color: 'primary.light', letterSpacing: '0.18em' }}
                    >
                      {selectedProjectDetail.goalLabel}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      {selectedProjectDetail.goal}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="overline"
                      sx={{ color: 'primary.light', letterSpacing: '0.18em' }}
                    >
                      {selectedProjectDetail.scopeLabel}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      {selectedProjectDetail.scope}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="overline"
                      sx={{ color: 'primary.light', letterSpacing: '0.18em' }}
                    >
                      {selectedProjectDetail.highlightsLabel}
                    </Typography>
                    <Stack spacing={1}>
                      {selectedProjectDetail.highlights.map((item) => (
                        <Typography
                          key={item}
                          variant="body1"
                          sx={{ color: 'text.secondary', lineHeight: 1.8 }}
                        >
                          • {item}
                        </Typography>
                      ))}
                    </Stack>
                  </Box>
                </Stack>

                <Button
                  onClick={() => setSelectedProject(null)}
                  variant="outlined"
                  color="secondary"
                  sx={{ alignSelf: 'flex-start' }}
                >
                  {modalLabels[language].close}
                </Button>
              </Stack>
            </DialogContent>
          </>
        ) : null}
      </Dialog>
    </PageFrame>
  )
}

export default Projects
