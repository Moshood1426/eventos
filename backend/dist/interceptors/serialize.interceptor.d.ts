import { ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
interface ClassConstructor {
    new (...args: any[]): {};
}
export declare const SerializeRes: (dto: ClassConstructor) => MethodDecorator & ClassDecorator;
export declare class SerializeInterceptor implements NestInterceptor {
    private readonly dto;
    constructor(dto: any);
    intercept(ctx: ExecutionContext, handler: CallHandler): Observable<any>;
}
export {};
