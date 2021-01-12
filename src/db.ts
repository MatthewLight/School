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

export const getTeacherById = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id, 10);
  const response: QueryResult = await pool.query('SELECT * FROM teachers WHERE id = $1', [id]);
  return res.json(response.rows);
};

// export const getTeacherByParams = async (req: Request, res: Response): Promise<Response> => {

// };

export const createTeacher = async (req: Request, res: Response): Promise<Response> => {
  const { firstName, lastName, age, experience } = req.body;
  const response: QueryResult = await pool.query('INSERT INTO teachers (firstName, lastName, age, experience) VALUES ($1, $2, $3, $4)', [firstName, lastName, age, experience]);
  return res.json({
    teacher: {
      firstName,
      lastName,
      age,
      experience,
    },
  });
};

export const updateTeacher = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id, 10);
  const { firstName, lastName, age, experience } = req.body;
  const response: QueryResult = await pool.query('UPDATE teachers SET firstName = $1, lastName = $2, age = $3, experience = $4 WHERE id = $5', [firstName, lastName, age, experience, id]);
  return res.json({ msg: `Teacher ${id} has been updated successfully` });
};

export const deleteTeacher = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    const response: QueryResult = await pool.query('DELETE FROM teachers WHERE id = $1', [id]);
    return res.json({ msg: `Teacher ${id} has been deleted successfully` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal Server Error(500)' });
  }
};

export const deleteAllTeachers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query('DELETE FROM teachers');
    return res.json({ msg: 'All teachers have been deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json('Internal Server Error');
  }
};

// export const getTargetMathTeachers = async (req: Request, res: Response): Promise<Response> => {

// };
