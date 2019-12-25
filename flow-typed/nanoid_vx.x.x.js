declare module 'nanoid' {
  declare function nanoid(size?: number): string;

  declare module.exports: typeof nanoid;
}
