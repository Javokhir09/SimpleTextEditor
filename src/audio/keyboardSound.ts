import soundFile from "./sound.ogg";
import rawConfig from "./config.json";

type SoundConfig = {
  defines: Record<string, number[]>;
};

const config: SoundConfig = rawConfig;

let audioContext: AudioContext;
let audioBuffer: AudioBuffer;

export async function initKeyboardEngine() {
  audioContext = new AudioContext();

  const response = await fetch(soundFile);
  const arrayBuffer = await response.arrayBuffer();
  audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

export function playKeySound(keyCode: string) {
  if (!audioContext || !audioBuffer) return;

  const slice = config.defines[keyCode];
  if (!slice || slice.length < 2) return;

  const [startMs, durationMs] = slice;

  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = 0.4 + Math.random() * 0.1;

  source.connect(gainNode);
  gainNode.connect(audioContext.destination);

  source.start(0, startMs / 1000, durationMs / 1000);
}