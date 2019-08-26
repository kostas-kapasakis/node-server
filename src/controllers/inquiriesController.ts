import { JsonController, OnUndefined, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import {Response } from 'express';
import "reflect-metadata";

import Inquiry, { IInquiry } from '../models/inquiry';

@JsonController()
export class InquiriesController {

    @Post("/inquiry")
    public createInquiry(@Body() newInquiry: IInquiry, res: Response) {
        let inquiry: IInquiry = new Inquiry(newInquiry);

        inquiry.save((err, inquiry) => {
            if (err) {
                res.send(err);
            }
            res.json(inquiry);
        });
    }

    @Get("/inquiries")
    public getInquiries(res: Response) {
        Inquiry.find({}, (err, inquiry) => {
            if (err) {
                res.send(err);
            }
            res.json(inquiry);
        });
    }

    @Get("/inquiries/:id")
    @OnUndefined(404)
    public getInquiryWithID(@Param("inquiryId") id: string, res: Response) {
        Inquiry.findById(id, (err, inquiry) => {
            if (err) {
                res.send(err);
            }
            res.json(inquiry);
        });
    }

    @Put("/inquiries/:id")
    public updateInquiry(@Param("id") id: string, @Body() inquiry: IInquiry, res: Response) {
        Inquiry.findOneAndUpdate({ _id: id }, inquiry, { new: true }, (err, inquiry) => {
            if (err) {
                res.send(err);
            }
            res.json(inquiry);
        });
    }

    @Delete("/inquiries/:id")
    public deleteInquiry(@Param("inquiryId") id: string, res: Response) {
        Inquiry.remove({ _id: id }, (err) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted Inquiry!' });
        });
    }

}