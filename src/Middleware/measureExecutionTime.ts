import { Context, MiddlewareFn } from "telegraf";

export const measureExecutionTime: MiddlewareFn<Context> = async (ctx, next) => {
    ctx.state.startTime = Date.now();
    await next();
};
