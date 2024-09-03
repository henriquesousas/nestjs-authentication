export interface Hash {
  create(value: string): Promise<string>;
  compare(value: string, hash: string): Promise<boolean>;
}
