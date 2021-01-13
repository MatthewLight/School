import { Router } from 'express';
import { getTeachers, getTeacherById, createTeacher,
  updateTeacher, deleteTeacher, deleteAllTeachers, getTargetMathTeachers } from './db';

const router = Router();

router.get('/teachersByParam/:age/:sex', getTeachers);
router.get('/teachers/:id', getTeacherById);
router.post('/teachers', createTeacher);
router.put('/teachers/:id', updateTeacher);
router.delete('/teachers/:id', deleteTeacher);
router.delete('/teachers', deleteAllTeachers);
router.get('/teachersTarget', getTargetMathTeachers);

export default router;
