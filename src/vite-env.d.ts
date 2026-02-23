/// <reference types="vite/client" />

// Declare module types for video files
declare module "*.m4v" {
  const src: string;
  export default src;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.webm" {
  const src: string;
  export default src;
}

// Declare module types for audio files
declare module "*.mpeg" {
  const src: string;
  export default src;
}

declare module "*.ogg" {
  const src: string;
  export default src;
}
