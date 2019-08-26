import { JsonController, OnUndefined, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { Response } from 'express';
import "reflect-metadata";

import Merchant, { IMerchant } from '../models/merchant';
import { logger } from "utils/logger";

@JsonController()
export class MerchantsController {

    @Post("/merchants")
    public createMerchant(@Body() merchant: IMerchant, res: Response) {
        let merchantToAdd: IMerchant = new Merchant(merchant);

        merchant.save((err, merchantToAdd) => {
            if (err) {
                res.send(err);
            }
            res.json(merchantToAdd);
        });
    }
    @Get("/merchants")
    public getMercants(res: Response) {
        logger.log('info','Inside the get Merchants request');
        Merchant.find({}, (err, merchant) => {
            if (err) {
                res.send(err);
            }
            res.json(merchant);
        });
    }

    @Get("/merchants/:id")
    @OnUndefined(404)
    public getMerchantWithID(@Param("merchantId") id: string, res: Response) {
        Merchant.findById(id, (err, merchant) => {
            if (err) {
                res.send(err);
            }
            res.json(merchant);
        });
    }
    @Put("/merchants/:id")
    public updateMerchant(@Param("merchantId") id: string, @Body() merchant: IMerchant, res: Response) {
        Merchant.findOneAndUpdate({ _id: id }, merchant, { new: true }, (err, merchant) => {
            if (err) {
                res.send(err);
            }
            res.json(merchant);
        });
    }

    @Delete("/merchants/:id")
    public deleteMerchant(@Param("merchantId") id: string, res: Response) {
        Merchant.remove({ _id: id }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted merchant!' });
        });
    }

}