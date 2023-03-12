import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPayloadDto } from './dto/user_payload.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
export declare class AuthService {
    private readonly authRepo;
    private jwtService;
    constructor(authRepo: Repository<AuthEntity>, jwtService: JwtService);
    register(body: RegisterUserDto): Promise<{
        token: string;
        id: number;
        name: string;
        role: string;
        email: string;
        password: string;
        userFavs: import("../favorites/favorites.entity").Favorites;
    }>;
    login(body: LoginUserDto): Promise<{
        token: string;
        id: number;
        name: string;
        role: string;
        email: string;
        password: string;
        userFavs: import("../favorites/favorites.entity").Favorites;
    }>;
    updateUser(body: UpdateUserDto, user: UserPayloadDto): Promise<{
        token: string;
        id: number;
        name: string;
        role: string;
        email: string;
        password: string;
        userFavs: import("../favorites/favorites.entity").Favorites;
    }>;
    updatePassword(body: UpdatePasswordDto, user: UserPayloadDto): Promise<{
        token: string;
        id: number;
        name: string;
        role: string;
        email: string;
        password: string;
        userFavs: import("../favorites/favorites.entity").Favorites;
    }>;
    getUser(userId: any): Promise<AuthEntity>;
}
