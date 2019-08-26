import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';
import {Request,Response } from 'express';

import Inquiry, { IInquiry } from '../models/inquiry';

@Controller('api/inquiries')
export class InquiriesController {

    @Post("/create")
    public createInquiry(req: Request, res: Response) {
        let inquiry = new Inquiry(req.body);

        inquiry.save((err, inquiry) => {
            if (err) {
                res.send(err);
            }
            res.json(inquiry);
        });
    }

    @Get("")
    public getInquiries(res: Response) {
        Inquiry.find({}, (err, inquiry) => {
            if (err) {
                res.send(err);
            }
            res.json(inquiry);
        });
    }

    @Get(":id")
    public getInquiryWithID(req: Request, res: Response) {
        Inquiry.findById(req.params.inquiryId, (err, inquiry) => {
            if (err) {
                res.send(err);
            }
            res.json(inquiry);
        });
    }

    @Put(":id")
    public updateInquiry(req: Request, res: Response) {
        Inquiry.findOneAndUpdate({ _id: req.params.inquiryId }, req.body, { new: true }, (err, inquiry) => {
            if (err) {
                res.send(err);
            }
            res.json(inquiry);
        });
    }

    @Delete(":id")
    public deleteInquiry(req: Request, res: Response) {
        Inquiry.remove({ _id: req.params.inquiryId }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted Inquiry!' });
        });
    }

}