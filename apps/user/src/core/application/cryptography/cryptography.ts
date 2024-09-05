export interface Cryptography {
  encrypt(data: any): Promise<string>;
}
