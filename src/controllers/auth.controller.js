import { db } from '../db/knex.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { config } from '../config/env.js';

export async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;
    const user = await db('users').where({ username, active: true }).first();
    if (!user) return res.status(401).json({ error: 'Invalid credentials user not found' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials Password is wrong' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.jwtSecret,
      { expiresIn: '8h' }
    );

    res.json({ token, role: user.role });
  } catch (e) {
    next(e);
  }
}

export async function createUser(req,res,next){
try{
    const {username,password,role='HR',active=true}=req.body;
    if(!username || !password || !role)
    {
        return res.status(400).json({error:'username , password , role required'});
    }
    if(!['Manager','HR'].includes(role))
    {
        return res.status(400).json({error:'Invalid role'});
    }
    const exists =await db('users').where({username}).first();
    if(exists) return res.status(409).json({error:'Username already exists'});
    const hash=await bcrypt.hash(password,10);
    const [id]=await db('users').insert({username,password:hash,role,active});
    res.status(201).json({id,username,role,active});
}
catch(e)
{
    next(e);
}
}
