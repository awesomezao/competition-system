import { get, post } from './methods';
import * as URL from './config';

export const login = ()=>get('/login')