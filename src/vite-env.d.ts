/**
 * Module Declaration File
 *
 * Declares types for imports that TypeScript doesn't understand by default
 * (like images, PDFs, CSS modules, etc.)
 */

// PDF files
declare module '*.pdf' {
  const content: string;
  export default content;
}

// Image files
declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

// CSS files
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

// CSS module files
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}
