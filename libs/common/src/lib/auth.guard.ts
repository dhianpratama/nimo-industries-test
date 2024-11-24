import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@nimo/entities';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);

		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			const payload = jwt.verify(token, process.env['JWT_SECRET_KEY'] as string) as any;

			if (!payload) {
				throw new UnauthorizedException();
			}
			
			const user = await this.userRepository.findOne({ where: { id: payload.id } });
			if (!user) {
				throw new UnauthorizedException();
			}

			request['user'] = user;

			return true
		} catch (err) {
			Logger.log(err)
			throw new UnauthorizedException();
		}
	}

	private extractTokenFromHeader = (request: any): string | undefined => {
		const [type, token] = request.headers.authorization?.split(' ') ?? [];
		return type === 'Bearer' ? token : undefined;
	};
}
