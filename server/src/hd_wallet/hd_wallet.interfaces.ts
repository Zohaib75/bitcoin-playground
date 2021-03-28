export interface AddressOptionsDTO {
    mnemonic: string;
    passphrase?: string;
    path: string;
}

export interface AddressDTO {
    path: string;
    address?: string;
    pubkey?: string;
}