import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../admin/models/admin.model';


@Injectable()
export class AuthService {
    constructor(private readonly adminsService: AdminService,
        private readonly jwtService: JwtService,
    ) {}

    private async generateToken(admin:Admin) {
        const payload = { id: admin.id, email: admin.email, };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    async signUp(createAdminDto: CreateAdminDto) {
        const candidate = await this.adminsService.findByEmail(createAdminDto.email);
        if (candidate) {
            throw new ConflictException("Admin with this email already exists");
        }
        const hashPassword = await bcrypt.hash(createAdminDto.password, 7);
        createAdminDto.password = hashPassword;
        const newAdmin = await this.adminsService.create(createAdminDto);
        return newAdmin;
    }

    async signIn(signinAdminDto: { email: string; password: string }) {
        const admin = await this.adminsService.findByEmail(signinAdminDto.email);
        if (!admin) {
            throw new UnauthorizedException("Invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(signinAdminDto.password, admin.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid email or password");
        }
        return this.generateToken(admin);
    }
}
