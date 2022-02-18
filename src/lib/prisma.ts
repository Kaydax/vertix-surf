import pkg, { PrismaClient } from '@prisma/client';
import { dev } from '$app/env';

declare global {
    var _prisma: PrismaClient; // eslint-disable-line
}

let prisma;
if (dev) {
    if (!global._prisma) {
        global._prisma = new PrismaClient();
    }
    prisma = global._prisma;
} else {
    const { PrismaClient: PrismaClientProd } = pkg;
    prisma = new PrismaClientProd();
}

export default prisma as PrismaClient; // type assertion for shim