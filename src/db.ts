import { Request, Response } from 'express';
import { QueryResult } from 'pg';
import { Teacher, Lesson, Classroom, Subject, Lessons } from './models';
import { studentGroup } from './const';
import { pool } from './db.scheme';

const teacher: Teacher = {
  firstName: 'value',
  lastName: 'value',
  fathersName: 'value',
  age: 0,
  sex: 'value',
  address: 'value',
  experience: 10,
  subjects: Subject.math,
};

const lessons: Lesson = {
  firstName: 'value',
  lastName: 'value',
  fathersName: 'value',
  lesson: Lessons.biology,
  day: 'Thursday',
  teacher: 'value',
  time: new Date(),
};

const classroom: Classroom = {
  classroom: 100,
  firstName: 'value',
  lastName: 'value',
  fathersName: 'value',
};

export const getTeachers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const age = parseInt(req.params.age, 10);
    const { sex } = req.params;
    const response: QueryResult<Teacher> = await pool.query('SELECT * FROM teachers WHERE age = $1 AND sex = $2', [age, sex]);
    console.log(response.rows);
    return res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal Server Error(500)' });
  }
};

export const getTargetMathTeachers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response: QueryResult<Teacher> = await pool.query(`SELECT teachers.firstName, teachers.lastName, teachers.fathersName FROM teachers  INNER JOIN classroom ON teachers.firstName=classroom.firstName
      INNER JOIN lesson ON teachers.firstName=lesson.firstName WHERE subjects LIKE '%${teacher.subjects}%' AND experience > ${teacher.experience} AND classroom = ${classroom.classroom} AND day = '${lessons.day}' AND time BETWEEN '08:30' and '14:30'`);
    console.log(studentGroup);
    console.log(response.rows);
    return res.status(200).json(response.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal server error(500)' });
  }
};

export const getTeacherById = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id, 10);
  const response: QueryResult<Teacher> = await pool.query('SELECT * FROM teachers WHERE id = $1', [id]);
  return res.json(response.rows);
};

export const createTeacher = async (req: Request, res: Response): Promise<Response> => {
  teacher.firstName = req.body.firstName;
  teacher.lastName = req.body.lastName;
  teacher.age = req.body.age;
  teacher.experience = req.body.experience;
  const response: QueryResult<Teacher> = await pool.query('INSERT INTO teachers (firstName, lastName, age, experience) VALUES ($1, $2, $3, $4)', [teacher.firstName, teacher.lastName, teacher.age, teacher.experience]);
  return res.json({
    teacher: {
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      age: teacher.age,
      experience: teacher.experience,
    },
  });
};

export const updateTeacher = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id, 10);
  teacher.firstName = req.body.firstName;
  teacher.lastName = req.body.lastName;
  teacher.fathersName = req.body.fathersName;
  teacher.age = req.body.age;
  teacher.experience = req.body.experience;
  teacher.sex = req.body.sex;
  teacher.address = req.body.address;
  teacher.subjects = req.body.subjects;
  const response: QueryResult<Teacher> = await pool.query('UPDATE teachers SET firstName = $1, lastName = $2, fathersName = $3, age = $4, experience = $5, address = $6, subjects = $7, sex = $8 WHERE id = $9',
                                                          [teacher.firstName, teacher.lastName, teacher.fathersName, teacher.age, teacher.experience,
                                                            teacher.address, teacher.subjects, teacher.sex, id]);
  return res.json({ msg: `Teacher ${id} has been updated successfully` });
};

export const deleteTeacher = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id, 10);
    const response: QueryResult<Teacher> = await pool.query('DELETE FROM teachers WHERE id = $1', [id]);
    return res.json({ msg: `Teacher ${id} has been deleted successfully` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Internal Server Error(500)' });
  }
};

export const deleteAllTeachers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response: QueryResult<Teacher> = await pool.query('DELETE FROM teachers');
    return res.json({ msg: 'All teachers have been deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json('Internal Server Error');
  }
};
