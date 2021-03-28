import express from "express";
import cors from "cors";
import helmet from "helmet";
import { HdWalletRouter } from "./hd_wallet/hd_wallet.router";
import { MultiSigRouter } from "./multi_sig/multi_sig.router";

const PORT: number = 7000;

const app: express.Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/generate/wallet", HdWalletRouter);
app.use("/api/generate/multisig", MultiSigRouter);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});