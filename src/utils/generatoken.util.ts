import * as jwt from 'jsonwebtoken';
import User from 'src/entities/user.entity';

export function generateToken(user: User): string{
    const payload = {id: user.id, username: user.username, email: user.email, is_admin: user.is_admin};
    const key = process.env.JWT_SECRET;
    return jwt.sign(payload, key as string, {expiresIn: '1d'});
}