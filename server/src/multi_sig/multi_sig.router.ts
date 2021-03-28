import express, { Request, Response } from "express";
import * as MultiSigService from "./multi_sig.service";
import { MultiSigOptionsDTO } from "./multi_sig.interfaces";

export const MultiSigRouter = express.Router();

MultiSigRouter.post("/address", (req: Request, res: Response) => {
    try {
        const options: MultiSigOptionsDTO = req.body;

        const address = MultiSigService.generate(options);

        res.status(201).json({ "p2sh": address });
    } catch (e) {
        res.status(500).send(e.message);
    }
});