"use client";

import React, { useEffect, useRef, useState } from "react";

// ─── SHADERS ──────────────────────────────────────────────────────────────────

const VERTEX_SRC = `#version 300 es
precision highp float;
in vec4 position;
void main(){ gl_Position = position; }`;

const FRAGMENT_SRC = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec3 u_color;

#define FC gl_FragCoord.xy
#define R resolution
#define T (time+660.)

float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+1.),u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;for(int i=0;i<5;i++){t+=a*noise(p);p*=mat2(1,-1.2,.2,1.2)*2.;a*=.5;}return t;}

void main(){
  vec2 uv = (FC - .5 * R) / R.y;
  vec3 col = vec3(1);
  uv.x += .25;
  uv *= vec2(2, 1);

  float n = fbm(uv * .28 - vec2(T * .01, 0));
  n = noise(uv * 3. + n * 2.);

  col.r -= fbm(uv + vec2(0, T * .015) + n);
  col.g -= fbm(uv * 1.003 + vec2(0, T * .015) + n + .003);
  col.b -= fbm(uv * 1.006 + vec2(0, T * .015) + n + .006);

  col = mix(col, u_color, dot(col, vec3(.21, .71, .07)));

  col = mix(vec3(.08), col, min(time * .1, 1.));
  col = clamp(col, .08, 1.);
  O = vec4(col, 1);
}`;

// ─── RENDERER ─────────────────────────────────────────────────────────────────

class Renderer {
  private readonly vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
  private gl: WebGL2RenderingContext;
  private canvas: HTMLCanvasElement;
  private program: WebGLProgram | null = null;
  private vs: WebGLShader | null = null;
  private fs: WebGLShader | null = null;
  private buffer: WebGLBuffer | null = null;
  private color: [number, number, number] = [0.165, 0.353, 0.478]; // #2a5a7a default

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
    this.setup();
    this.init();
  }

  updateColor(newColor: [number, number, number]) {
    this.color = newColor;
  }

  updateScale() {
    const dpr = Math.max(1, window.devicePixelRatio);
    // Always use window dimensions — the canvas fills 100vh via CSS
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  private compile(shader: WebGLShader, source: string) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader error:", gl.getShaderInfoLog(shader));
    }
  }

  reset() {
    const { gl, program, vs, fs } = this;
    if (!program) return;
    if (vs) { gl.detachShader(program, vs); gl.deleteShader(vs); }
    if (fs) { gl.detachShader(program, fs); gl.deleteShader(fs); }
    gl.deleteProgram(program);
    this.program = null;
  }

  private setup() {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER)!;
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    const program = gl.createProgram()!;
    this.compile(this.vs, VERTEX_SRC);
    this.compile(this.fs, FRAGMENT_SRC);
    this.program = program;
    gl.attachShader(program, this.vs);
    gl.attachShader(program, this.fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
    }
  }

  private init() {
    const { gl, program } = this;
    if (!program) return;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    Object.assign(program, {
      resolution: gl.getUniformLocation(program, "resolution"),
      time:       gl.getUniformLocation(program, "time"),
      u_color:    gl.getUniformLocation(program, "u_color"),
    });
  }

  render(now = 0) {
    const { gl, program, buffer, canvas } = this;
    if (!program || !gl.isProgram(program)) return;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.uniform2f((program as any).resolution, canvas.width, canvas.height);
    gl.uniform1f((program as any).time, now * 1e-3);
    gl.uniform3fv((program as any).u_color, this.color);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

// ─── UTILS ────────────────────────────────────────────────────────────────────

const hexToRgb = (hex: string): [number, number, number] | null => {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r
    ? [parseInt(r[1], 16) / 255, parseInt(r[2], 16) / 255, parseInt(r[3], 16) / 255]
    : null;
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

interface SmokeBackgroundProps {
  /** Hex color to tint the smoke highlights. Defaults to ocean mist blue. */
  smokeColor?: string;
}

export const SmokeBackground: React.FC<SmokeBackgroundProps> = ({
  smokeColor = "#2a5a7a",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile — runs only on client, so no hydration mismatch
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Initialise WebGL renderer on desktop only
  useEffect(() => {
    if (isMobile || !canvasRef.current) return;
    const canvas = canvasRef.current;

    // Guard: WebGL2 might not be supported
    if (!canvas.getContext("webgl2")) {
      console.warn("SmokeBackground: WebGL2 not supported, skipping.");
      return;
    }

    const renderer = new Renderer(canvas);
    rendererRef.current = renderer;

    // Set initial color
    const rgb = hexToRgb(smokeColor);
    if (rgb) renderer.updateColor(rgb);

    const handleResize = () => renderer.updateScale();
    // Delay initial scale by one frame to ensure layout has settled
    requestAnimationFrame(() => handleResize());
    window.addEventListener("resize", handleResize);

    let raf: number;
    const loop = (now: number) => {
      renderer.render(now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      renderer.reset();
      rendererRef.current = null;
    };
  }, [isMobile]); // Re-initialise if mobile state flips (e.g. orientation on tablet)

  // Sync color prop changes live
  useEffect(() => {
    const renderer = rendererRef.current;
    if (!renderer) return;
    const rgb = hexToRgb(smokeColor);
    if (rgb) renderer.updateColor(rgb);
  }, [smokeColor]);

  // On mobile: render nothing — the CSS fallback in the section handles it
  if (isMobile) return null;

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />;
};
