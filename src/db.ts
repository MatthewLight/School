import { Request, Response } from 'express';
import { QueryResult } from 'pg';

import { pool } from './db.scheme';

export const getTeachers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query('SELECT * FROM teachers');
    return res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal Server Error(500)' });
  }
};
