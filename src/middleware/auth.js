import jwt from "jsonwebtoken";
import { config } from "../config/env.js";


export function auth(required=true)
{
    return (req,res,next)=>{
        const header=req.headers['authorization'] || '';
        const token=header.startsWith('Bearer') ? header.slice(7) : null;

        if(!token)
        {
            if(required) return res.status(401).json({error:'unauthorized'});
            req.user=null;
           return next();
        }

        try {
            const payload = jwt.verify(token,config.jwtSecret);
            req.user=payload;
            return next();
        } catch (error) {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }
}
export function requireRole(roles=[])
{
    return (req,res,next)=>{
        if(!req.user) return res.status(401).json({error:'Unauthorized'});
        if(!roles.includes(req.user.role)){
            return res.status(403).json({error:'Forbidden'});
        }
        next();
    };
}