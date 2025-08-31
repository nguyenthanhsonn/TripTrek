import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy token từ header Authorization: Bearer <token>
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // nhớ define trong .env
    });
  }

  async validate(payload: any) {
    // payload được lấy từ lúc bạn sign token
    // ví dụ: { id, username, email, is_admin }
    return { id: payload.id, username: payload.username, is_admin: payload.is_admin };
  }
}
