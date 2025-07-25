import { z } from 'zod';


export const AuthSchema = z.object({
  email: z.string().nonempty('Email is required').email(),
  password: z.string().min(6, 'Password must be at least 6 characters')
});