declare module "*.html" {
  const rawHtmlFile: string;
  export = rawHtmlFile;
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.module.css" {
  const styles: { [key: string]: string };
  export default styles;
}

// declare module "@anf-mfe/pubsub" {
//   // 🔥 We can copy-paste declarations here, or ensure each single-spa utility
//   // has a mock index.js file. In root-config all packages within @anf-mfe org
//   // are marked as external (i.e. won't be bundled)
// }
