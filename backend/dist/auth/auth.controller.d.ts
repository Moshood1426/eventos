import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPayloadDto } from './dto/user_payload.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registerUser(body: RegisterUserDto): Promise<{
        token: string;
        id: number;
        name: string;
        role: string;
        email: string;
        password: string;
        userFavs: import("../favorites/favorites.entity").Favorites;
    }>;
    loginUser(body: LoginUserDto): Promise<{
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
}
