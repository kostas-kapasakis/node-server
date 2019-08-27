import { MerchantNotFoundException } from './../middlewares/exception-logger/not-found.exceptions';
import { HttpException } from './../middlewares/exception-logger/httpException';
import { Controller, Get, Post, Put, Delete } from "@overnightjs/core";
import { Request, Response } from "express";

import Merchant, { IMerchant } from "../models/merchant";
import { logger } from "../utils/logger";

@Controller("api/merchants")
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
  public async getMercants(req: Request , res: Response) {

       var merchants = await Merchant.find({});
       res.json(merchants);
  }

  @Get(":id")
  public async getMerchantWithID(req: Request, res: Response) {
      try{
        logger.log('info', "Inside the getMerchantWithID " );

        
        var merchant = await Merchant.findById(req.params.merchantId);

        logger.log('info', "found the getMerchantWithID ", merchant );
        if(!merchant) res.send(new MerchantNotFoundException(req.params.merchantId));

        res.json(merchant);
      }catch(error)
      {
          logger.log('error', "Failed to get merchant " , error);
          res.json(null);
      }
  }

  @Put(":id")
  public updateMerchant(req: Request, res: Response) {
    Merchant.findOneAndUpdate(
      { _id: req.params.merchantId },
      req.body,
      { new: true },
      (err, merchant) => {
        if (err) {
          res.send(err);
        }
        res.json(merchant);
      }
    );
  }

  @Delete(":id")
  public deleteMerchant(req: Request, res: Response) {
    Merchant.remove({ _id: req.params.merchantId }, err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Successfully deleted merchant!" });
    });
  }
}
