import { Router } from 'express';
import authController from '../controllers/auth.controller';
import articleController from '../controllers/article.controller';

const router = Router();

router.use('/auth', authController);
router.use('/articles', articleController);

export default router;
