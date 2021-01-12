import { Router } from 'express';
import { getTeachers, getTeacherById, createTeacher,
  updateTeacher, deleteTeacher, deleteAllTeachers } from './db';

const router = Router();

router.get('/teachers', getTeachers);
router.get('/teachers/:id', getTeacherById);
router.post('/teachers', createTeacher);
router.put('/teachers/:id', updateTeacher);
router.delete('/teachers/:id', deleteTeacher);
router.delete('/teachers', deleteAllTeachers);
// router.get('/teachers/:age:sex:experience', getTeacherByParams);
// router.get('/teachers', getTargetMathTeachers);

export default router;
