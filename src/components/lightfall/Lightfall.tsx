import { Mesh, Program, Renderer, Triangle, Vec3 } from 'ogl'
import { useEffect, useRef } from 'react'
import './lightfall.css'

const vertex = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`

// Adapted for this portfolio from React Bits' Lightfall background. The shader is
// intentionally capped to a low-cost single pass so it remains smooth on laptops.
const fragment = /* glsl */ `
  precision mediump float;
  uniform vec3 iResolution;
  uniform float iTime;
  varying vec2 vUv;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    vec2 uv = (vUv * iResolution.xy - 0.5 * iResolution.xy) / iResolution.x;
    vec3 color = vec3(0.018, 0.027, 0.075);
    color += vec3(0.035, 0.06, 0.15) / (1.0 + 3.0 * dot(uv, uv));

    for (int i = 0; i < 8; i++) {
      float seed = float(i) * 17.13;
      float lane = hash(seed) * 2.1 - 1.05;
      float speed = mix(0.16, 0.42, hash(seed + 2.0));
      float y = fract(hash(seed + 5.0) + iTime * speed) * 2.0 - 1.0;
      vec2 p = uv - vec2(lane, y);
      float width = mix(0.0014, 0.0036, hash(seed + 9.0));
      float beam = smoothstep(width * 5.0, width, abs(p.x));
      float tail = smoothstep(-0.34, 0.015, -p.y) * smoothstep(0.08, -0.008, -p.y);
      vec3 tint = mix(vec3(0.20, 0.36, 1.0), vec3(0.77, 0.31, 1.0), hash(seed + 11.0));
      color += tint * beam * tail * 1.65;
    }

    gl_FragColor = vec4(color, 1.0);
  }
`

function Lightfall() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio || 1, 1),
      alpha: false,
      antialias: false,
    })
    const gl = renderer.gl
    const canvas = gl.canvas
    canvas.setAttribute('aria-hidden', 'true')
    container.appendChild(canvas)

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iResolution: { value: new Vec3(1, 1, 1) },
        iTime: { value: 0 },
      },
    })
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program })
    let frameId = 0
    let isVisible = true
    let lastRender = 0

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      renderer.setSize(Math.max(1, width), Math.max(1, height))
      program.uniforms.iResolution.value.set(gl.drawingBufferWidth, gl.drawingBufferHeight, 1)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(container)
    resize()

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
    intersectionObserver.observe(container)

    const render = (time: number) => {
      frameId = window.requestAnimationFrame(render)
      if (!isVisible || document.hidden || time - lastRender < 33) return
      lastRender = time
      program.uniforms.iTime.value = time * 0.001
      renderer.render({ scene: mesh })
    }
    frameId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frameId)
      observer.disconnect()
      intersectionObserver.disconnect()
      canvas.remove()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return <div ref={containerRef} className="lightfall" />
}

export default Lightfall
