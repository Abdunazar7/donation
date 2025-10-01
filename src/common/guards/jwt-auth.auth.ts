import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {

    constructor( private readonly jwtService: JwtService){}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request);

    const authHeader = request.headers["authorization"];
    if (!authHeader) {
      throw new UnauthorizedException("Authorization header not found");
    }

    // logika: tokenni tekshirish, verify qilish va hokazo
    
    const token = authHeader.split(" ")[1];
    if (!token) {
        throw new UnauthorizedException("Token not found")
    }
    let decodedToken: any;
    try{
        decodedToken = this.jwtService.verify(token)
    }catch(error){
        throw new UnauthorizedException({
            message: "User unauthorized.",
            error,
        })
    }
    request.user = decodedToken; // role, self
    return true;
  }
}
