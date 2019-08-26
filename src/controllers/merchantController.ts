import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';
import {Request,Response } from 'express';

import Merchant, { IMerchant } from '../models/merchant';
import { logger } from "utils/logger";

@Controller('api/merchants')
export class MerchantsController {

    @Post("/add-merchant")
    public createMerchant(req: Request, res: Response) {
        let merchantToAdd: IMerchant = new Merchant(req.body);

        merchantToAdd.save((err, merchantToAdd) => {
            if (err) {
                res.send(err);
            }
            res.json(merchantToAdd);
        });
    }
    @Get("")
    public getMercants(res: Response) {
        logger.log('info','Inside the get Merchants request');
        Merchant.find({}, (err, merchant) => {
            if (err) {
                res.send(err);
            }
            res.json(merchant);
        });
    }

    @Get(":id")
    public getMerchantWithID(req: Request, res: Response) {
        Merchant.findById(req.params.merchantId, (err, merchant) => {
            if (err) {
                res.send(err);
            }
            res.json(merchant);
        });
    }
    @Put(":id")
    public updateMerchant(req: Request, res: Response) {
        Merchant.findOneAndUpdate({ _id: req.params.merchantId }, req.body, { new: true }, (err, merchant) => {
            if (err) {
                res.send(err);
            }
            res.json(merchant);
        });
    }

    @Delete(":id")
    public deleteMerchant(req: Request, res: Response) {
        Merchant.remove({ _id: req.params.merchantId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted merchant!' });
        });
    }

}