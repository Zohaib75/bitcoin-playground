import express, { Request, Response } from "express";
import * as HdWalletService from "./hd_wallet.service";
import { AddressOptionsDTO } from "./hd_wallet.interfaces";

export const HdWalletRouter = express.Router();

HdWalletRouter.post("/addresses/:limit/:page", (req: Request, res: Response) => {
    try {
        const options: AddressOptionsDTO = req.body;
        const limit: number = Number(req.params.limit);
        const page: number = Number(req.params.page);

        const listAddress = HdWalletService.generate(options, limit, page);

        res.status(201).json(listAddress);
    } catch (e) {
        res.status(500).send(e.message);
    }
});