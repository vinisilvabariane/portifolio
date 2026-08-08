type Props = { text: string; delay?: number }

// React Bits-inspired letter reveal: CSS-only after the initial render.
export default function TextReveal({ text, delay = 0 }: Props) {
  return <span className="text-reveal" aria-label={text}>{[...text].map((letter, index) => <span aria-hidden="true" key={`${letter}-${index}`} style={{ animationDelay: `${delay + index * 42}ms` }}>{letter === ' ' ? '\u00a0' : letter}</span>)}</span>
}
