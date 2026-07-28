import Url from "../models/urlModel.js";
import { isValidUrl } from "../utils/validateUrl.js";
import crypto from "crypto";


export const createShortUrl = async(req,res)=>{
    try{
        const {url} = req.body;
        if(!url){
            return res.status(400).json({
                success:false,
                message:"URL is required"
            });
        }
        if(!isValidUrl(url)){
            return res.status(400).json({
                success:false,
                message:"Invalid URL"
            });
        }
        const normalizedUrl = url.trim().toLowerCase();

        const existingUrl = await Url.findOne({
            originalUrl:normalizedUrl
        });
        if(existingUrl){
            return res.status(200).json({
                success:true,
                data:{
                    ...existingUrl.toObject(),
                    shortUrl:`${req.protocol}://${req.get("host")}/${existingUrl.shortCode}`
                }
            });
        }

        let shortCode;
        do{
            shortCode = crypto
                .randomBytes(4)
                .toString("hex");

        }while(
            await Url.exists({shortCode})
        );

        const newUrl = await Url.create({
            originalUrl:normalizedUrl,
            shortCode
        });
        return res.status(201).json({

            success:true,
            message:"Short URL created successfully",

            data:{
                ...newUrl.toObject(),
                shortUrl:`${req.protocol}://${req.get("host")}/${shortCode}`
            }

        });
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });

    }

};
export const redirectToOriginalUrl = async(req,res)=>{
    try{
        const {shortCode}=req.params;
        const url = await Url.findOne({
            shortCode
        });
        if(!url){

            return res.status(404).json({
                success:false,
                message:"Short URL not found"
            });

        }
        await Url.findOneAndUpdate(
            {shortCode},
            {
                $inc:{
                    clicks:1
                }
            }
        );
        return res.redirect(url.originalUrl);
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
};