import { PrismaClient, User } from "@prisma/client";
import { faker } from "@faker-js/faker";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany({}); // use with caution.

    const amountOfUsers = 50;

    const users: User[] = [];

    for (let i = 1; i < amountOfUsers; i++) {
        const firstName = faker.name.firstName()
        const lastName = faker.name.lastName()

        const user: User = {
            id: i,
            email: faker.internet.email(firstName, lastName),
            password: await bcrypt.hash('password', 10),
            name: firstName + ' ' + lastName,
            createdAt: faker.date.past(),
        };

        users.push(user);
        console.log(user);

    }

    const addUsers = async () => await prisma.user.createMany({ data: users });

    addUsers();
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });