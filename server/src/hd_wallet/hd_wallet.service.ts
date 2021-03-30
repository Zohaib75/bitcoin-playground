import { AddressDTO, AddressOptionsDTO } from "./hd_wallet.interfaces";
import * as bitcoin from 'bitcoinjs-lib';
import * as bip39 from 'bip39';

export const generate = (options: AddressOptionsDTO, limit: number, page: number, network: number): AddressDTO[] => {

    const mnemonic: string = options.mnemonic;

    if (!bip39.validateMnemonic(mnemonic)) {
        throw new Error('Invalid mnemonic words');
    }

    const passphrase: string | undefined = options.passphrase;
    let seed: Buffer;
    if (passphrase) {
        seed = bip39.mnemonicToSeedSync(mnemonic, passphrase);
    } else {
        seed = bip39.mnemonicToSeedSync(mnemonic);
    }

    const root = bitcoin.bip32.fromSeed(seed);
    // const path = "m/84'/1'/0'/0/0";

    let listAddress: AddressDTO[] = [];
    let path: string = options.path;
    let count: number = page * limit;
    let pathSplit: string[] = path.split("/");
    let lastIndex: number = pathSplit.length - 1;
    let index: number = Number(pathSplit[lastIndex]);

    for (let i = 0; i < limit; i++) {

        pathSplit[lastIndex] = (index + count + i).toString();
        path = pathSplit.join('/');
        let derivedResult = root.derivePath(path);

        const { address, pubkey } = bitcoin.payments.p2wpkh({
            pubkey: derivedResult.publicKey,
            network: network === 0 ? bitcoin.networks.bitcoin : bitcoin.networks.testnet,
        });

        let derivedAddress: AddressDTO = {
            path,
            address,
            pubkey: pubkey === undefined ? undefined : pubkey.toString('hex')
        };
        listAddress.push(derivedAddress);
    }

    return listAddress;
};
