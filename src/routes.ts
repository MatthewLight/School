import { Router } from 'express';
import { getTeachers } from './db';

const router = Router();

router.get('/teachers', getTeachers);

export default router;
