import { MultiSigOptionsDTO } from "./multi_sig.interfaces";
import * as bitcoin from 'bitcoinjs-lib';

export const generate = (options: MultiSigOptionsDTO, network: number): string => {

    const pubkeys: Buffer[] = options.pubkeys.map(hex => Buffer.from(hex, 'hex'));
    const m: number = options.m;

    const { address } = bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2ms({
            m,
            pubkeys,
            network: network === 0 ? bitcoin.networks.bitcoin : bitcoin.networks.testnet,
        }),
        network: network === 0 ? bitcoin.networks.bitcoin : bitcoin.networks.testnet,
    });

    if (address === undefined)
        throw new Error('Invalid address generated');

    return address;
};