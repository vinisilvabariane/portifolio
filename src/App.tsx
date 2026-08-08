import { useCallback, useEffect, useState } from 'react'
import Sea from './components/nautical/Sea'
import Island from './components/nautical/Island'
import Descent from './components/nautical/Descent'
import Penumbra from './components/nautical/Penumbra'
import SeaFloor from './components/nautical/SeaFloor'
import Reveal from './components/nautical/Reveal'
import CourseRail from './components/nautical/CourseRail'
import CompassRose from './components/nautical/CompassRose'
import Bearing, { type Leg } from './components/nautical/Bearing'
import SwellText from './components/nautical/SwellText'
import ChartMark, { type MarkKind } from './components/nautical/ChartMark'
import Wake from './components/nautical/Wake'
import { useDepthRoot } from './components/nautical/useDepth'
import CountUp from './components/reactbits/CountUp'
import ScrollVelocity from './components/reactbits/ScrollVelocity'
import './App.css'

// Each focus area sits on its own bearing; the rose swings to whichever is showing.
const legs: Leg[] = [
  { deg: 45, point: 'NE', label: 'sistemas em tempo real' },
  { deg: 96, point: 'L', label: 'sensores & internet das coisas' },
  { deg: 158, point: 'SSE', label: 'dados & machine learning' },
  { deg: 292, point: 'ONO', label: 'interfaces com propósito' },
]

const waypoints = [
  { id: 'posicao', label: 'POSIÇÃO', at: 0 },
  { id: 'rumo', label: 'RUMO', at: 0.2 },
  { id: 'diario', label: 'DIÁRIO', at: 0.44 },
  { id: 'frota', label: 'FROTA', at: 0.64 },
  { id: 'radio', label: 'RÁDIO', at: 0.94 },
]

const marks: { kind: MarkKind; title: string; body: string }[] = [
  {
    kind: 'boia',
    title: 'Tempo real',
    body: 'Streaming, MQTT e telemetria. Uma boia não guarda o que viu para depois — informa no instante em que acontece, e é assim que eu construo.',
  },
  {
    kind: 'sonda',
    title: 'Sensores & IoT',
    body: 'Do Arduino ao painel. A sonda desce até onde a coisa realmente está, mede, e volta com um número em que dá para confiar.',
  },
  {
    kind: 'farol',
    title: 'Dados & machine learning',
    body: 'Coleta, classificação e modelos. O farol não elimina o escuro: devolve uma direção que dá para seguir dentro dele.',
  },
  {
    kind: 'agulha',
    title: 'Interfaces',
    body: 'Front-end preciso, com movimento que serve à leitura. Nenhum instrumento vale nada se quem está no leme não conseguir lê-lo de relance.',
  },
]

type Vessel = {
  name: string
  classe: string
  rota: string
  log: string
  href: string
  seed: number
}

const frota: Vessel[] = [
  {
    name: 'Firewatch',
    classe: 'VIGIA',
    rota: 'PHP · Python · Arduino',
    log: 'Monitoramento e prevenção de incêndios. Sensores em campo, classificação por IA e um painel web que mostra o risco subir enquanto ele sobe.',
    href: 'https://github.com/vinisilvabariane/app_firewatch',
    seed: 3,
  },
  {
    name: 'Ping Monitor',
    classe: 'SONDA',
    rota: 'Python · Tkinter',
    log: 'Vigia de hosts por ICMP. Fica de quarto a noite inteira e dispara um e-mail no instante em que alguma máquina cai.',
    href: 'https://github.com/vinisilvabariane/app_ping_monitor',
    seed: 7,
  },
  {
    name: 'Bitstream',
    classe: 'CORRENTE',
    rota: 'PHP · MySQL · MQTT',
    log: 'Catálogo e gerenciamento de vídeos, com o estado de cada sessão trafegando por MQTT entre todos os clientes conectados.',
    href: 'https://github.com/vinisilvabariane/app_bitstream',
    seed: 11,
  },
  {
    name: 'Map My Path',
    classe: 'CARTA',
    rota: 'PHP · JavaScript',
    log: 'Plataforma que monta trilhas de aprendizado a partir de questionários — cada resposta redesenha o caminho até o destino.',
    href: 'https://github.com/vinisilvabariane/app_mmp',
    seed: 5,
  },
  {
    name: 'Estoque Mobile',
    classe: 'CARGA',
    rota: 'React Native · TypeScript',
    log: 'Entrada e saída de produtos por leitura de QR Code, com o estoque sincronizado a cada volume que passa pela escotilha.',
    href: 'https://github.com/vinisilvabariane/app_mobile_estoque',
    seed: 9,
  },
  {
    name: 'Analisador de Sentimentos',
    classe: 'SONAR',
    rota: 'Python · Machine Learning',
    log: 'Classificação de sentimento em português a partir de avaliações de e-commerce. Ouve o ruído das opiniões e devolve o que há embaixo dele.',
    href: 'https://github.com/vinisilvabariane/ia_analisador_de_sentimentos',
    seed: 13,
  },
]

const sondagens = [
  { n: 6, unit: 'projetos', k: 'no mar' },
  { n: 10, unit: 'tecnologias', k: 'a bordo' },
  { n: 11, unit: 'certificados', k: 'emitidos' },
  { n: 3, unit: 'formações', k: 'concluídas' },
]

const portos = [
  { org: 'USF', title: 'Engenharia de Computação', note: 'em curso' },
  { org: 'SENAC', title: 'Desenvolvimento de Sistemas', note: 'técnico' },
  { org: 'SENAI', title: 'Redes de Computadores', note: 'técnico' },
  { org: 'ROCKETSEAT · UDEMY · IFCE · ELDORADO', title: 'Certificações', note: '11 emitidos' },
]

const equipamento = [
  'React', 'TypeScript', 'PHP', 'Java', 'Python', 'C#',
  'SQL', 'Node', 'MQTT', 'Arduino', 'React Native', 'Git',
]

function App() {
  const [leg, setLeg] = useState(0)
  const [selected, setSelected] = useState<Vessel | null>(null)
  useDepthRoot()

  const onLegChange = useCallback((next: number) => setLeg(next), [])

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <>
      <Sea />
      <Descent />

      <header className="bar">
        <a className="bar__id" href="#posicao">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="bar__anchor">
            <circle cx="12" cy="4" r="2.4" />
            <path d="M12 6.4V21M6 11h12M4.5 15.5a7.5 7.5 0 0 0 15 0" />
          </svg>
          <b>Vinicius Bariane</b>
          <i>engenheiro full-stack</i>
        </a>
        <nav className="bar__nav" aria-label="Seções">
          {waypoints.slice(1).map((w) => (
            <a key={w.id} href={`#${w.id}`}>{w.label}</a>
          ))}
        </nav>
        <span className="bar__fix">22°54′S&nbsp;&nbsp;47°03′O</span>
      </header>

      <CourseRail waypoints={waypoints} />

      <main>
        <section className="hero" id="posicao">
          <Island />

          <div className="hero__text">
            <p className="eyebrow">
              <span className="eyebrow__lamp" /> Em travessia · portfólio 2026
            </p>

            <h1 className="hero__name">
              <SwellText text="Vinicius" delay={260} />
              <SwellText className="hero__name--em" text="Bariane" delay={520} />
            </h1>

            <p className="hero__lede">
              Levo sistemas do sensor até a ponte de comando: leitura em tempo real,
              dados tratados e uma interface que qualquer pessoa consegue navegar
              sem manual.
            </p>

            <div className="hero__cta">
              <a className="btn btn--solid" href="#frota">Ver a frota</a>
              <a className="btn" href="https://github.com/vinisilvabariane" target="_blank" rel="noreferrer">
                GitHub<span aria-hidden="true"> ↗</span>
              </a>
            </div>
          </div>

          <a className="hero__descend" href="#rumo">
            <span>Mergulhar</span>
            <svg viewBox="0 0 12 34" aria-hidden="true"><path d="M6 0v28M1 23l5 6 5-6" /></svg>
          </a>
        </section>

        <section className="leg leg--rumo" id="rumo">
          <div className="rumo__top">
            <Reveal className="leg__head" as="header">
              <span className="leg__mark">Legenda da carta</span>
              <h2 className="leg__title">
                Quatro marcas que <em>eu sei desenhar</em>
              </h2>
              <p className="leg__note">
                Toda carta traz uma legenda: sem ela, os símbolos são só tinta. Estes
                quatro são os que uso com mais frequência — e o que cada um significa
                na prática.
              </p>
            </Reveal>

            <div className="rumo__instrument">
              <CompassRose bearing={legs[leg].deg} />
              <p className="rumo__bearing">
                <span className="rumo__bearing-k">rumo</span>
                <Bearing legs={legs} index={leg} onChange={onLegChange} />
              </p>
            </div>
          </div>

          <div className="marks">
            {marks.map((m, i) => (
              <Reveal key={m.kind} className="markcard" variant="rise" delay={i * 90}>
                <ChartMark kind={m.kind} />
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Sits here, not under the hero: a band right at the fold would wall
            off the one moment the page has to feel like sinking. */}
        <ScrollVelocity
          className="bulletin"
          text="22°54′S 47°03′O ✦ vento NE 12 nós ✦ mar calmo ✦ visibilidade boa ✦ sistemas em tempo real ✦ sensores e IoT ✦ dados e machine learning ✦ interfaces com propósito ✦ "
        />

        <Penumbra />

        <section className="leg" id="diario">
          <Reveal className="leg__head" as="header">
            <span className="leg__mark">Diário de bordo</span>
            <h2 className="leg__title">
              Aprendi <em>navegando</em>
            </h2>
            <p className="leg__note">
              Software, dados e infraestrutura — medidos construindo, quebrando e
              medindo de novo.
            </p>
          </Reveal>

          <div className="soundings">
            {sondagens.map((s, i) => (
              <Reveal key={s.unit} className="sounding" variant="drift" delay={i * 80}>
                <b className="sounding__n"><CountUp to={s.n} /></b>
                <span className="sounding__u">{s.unit}</span>
                <span className="sounding__k">{s.k}</span>
                <span className="sounding__bar"><i style={{ height: `${(s.n / 11) * 100}%` }} /></span>
              </Reveal>
            ))}
          </div>

          <Reveal className="portos" as="div">
            <h3 className="portos__label">Portos de escala</h3>
            <ol className="portos__list">
              {portos.map((p) => (
                <li key={p.org} className="porto">
                  <span className="porto__pin" aria-hidden="true" />
                  <span className="porto__org">{p.org}</span>
                  <span className="porto__title">{p.title}</span>
                  <span className="porto__note">{p.note}</span>
                </li>
              ))}
            </ol>
            <a
              className="link-arrow"
              href="https://www.linkedin.com/in/viniciusbariane/"
              target="_blank"
              rel="noreferrer"
            >
              Currículo completo no LinkedIn<span aria-hidden="true"> ↗</span>
            </a>
          </Reveal>
        </section>

        <section className="leg" id="frota">
          <Reveal className="leg__head" as="header">
            <span className="leg__mark">A frota</span>
            <h2 className="leg__title">
              Seis embarcações <em>no mar</em>
            </h2>
            <p className="leg__note">
              Cada uma foi construída para uma travessia diferente. Abra a ficha
              para ler o registro completo.
            </p>
          </Reveal>

          <ul className="fleet">
            {frota.map((v, i) => (
              <Reveal key={v.name} as="li" variant="drift" delay={i * 70}>
                <button className="vessel" onClick={() => setSelected(v)}>
                  <span className="vessel__classe">{v.classe}</span>
                  <span className="vessel__name">{v.name}</span>
                  <span className="vessel__track"><Wake seed={v.seed} /></span>
                  <span className="vessel__rota">{v.rota}</span>
                  <span className="vessel__open" aria-hidden="true">ficha ↗</span>
                </button>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="leg leg--kit" id="equipamento">
          <Reveal className="leg__head" as="header">
            <span className="leg__mark">Equipamento a bordo</span>
            <h2 className="leg__title">
              O que vai <em>na caixa de ferramentas</em>
            </h2>
          </Reveal>
          <Reveal className="kit" as="ul">
            {equipamento.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </Reveal>
        </section>

        <footer className="radio" id="radio">
          <SeaFloor />
          <div className="radio__inner">
            <Reveal>
              <span className="leg__mark">Rádio</span>
              <h2 className="radio__cta">
                Chame no <em>canal 16</em>
              </h2>
              <p className="radio__note">
                Canal 16 é a frequência de chamada — onde qualquer embarcação
                consegue falar com qualquer outra. Aqui ele atende por e-mail.
              </p>
            </Reveal>

            <Reveal className="radio__links" as="div">
              <a href="mailto:vinisilvabariane10@gmail.com">
                <span>E-mail</span>vinisilvabariane10@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/viniciusbariane/" target="_blank" rel="noreferrer">
                <span>LinkedIn</span>viniciusbariane<i aria-hidden="true"> ↗</i>
              </a>
              <a href="https://github.com/vinisilvabariane" target="_blank" rel="noreferrer">
                <span>GitHub</span>vinisilvabariane<i aria-hidden="true"> ↗</i>
              </a>
            </Reveal>

            <p className="radio__foot">
              <span>22°54′S 47°03′O</span>
              <span>Vinicius Bariane © 2026</span>
            </p>
          </div>
        </footer>
      </main>

      {selected && (
        <div className="ficha" role="dialog" aria-modal="true" aria-label={`Ficha de ${selected.name}`}>
          <button className="ficha__scrim" aria-label="Fechar ficha" onClick={() => setSelected(null)} />
          <article className="ficha__card">
            <header className="ficha__head">
              <span>Ficha da embarcação</span>
              <button className="ficha__close" onClick={() => setSelected(null)} aria-label="Fechar ficha">×</button>
            </header>
            <div className="ficha__body">
              <span className="ficha__classe">Classe {selected.classe}</span>
              <h2>{selected.name}</h2>
              <p>{selected.log}</p>
              <dl className="ficha__meta">
                <div><dt>Rota</dt><dd>{selected.rota}</dd></div>
                <div><dt>Situação</dt><dd>no mar</dd></div>
              </dl>
              <a className="btn btn--solid" href={selected.href} target="_blank" rel="noreferrer">
                Abrir repositório<span aria-hidden="true"> ↗</span>
              </a>
            </div>
          </article>
        </div>
      )}
    </>
  )
}

export default App
