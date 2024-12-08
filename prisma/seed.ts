import { fa, faker } from '@faker-js/faker'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient

const materials = ["wood", "metal", "plastic", "other"]

async function main() {
    for (let i = 0; i < 15; i++) {
        await prisma.child.create({
            data: {
                name: faker.person.fullName(),
                address: faker.location.country() + " " + faker.location.streetAddress(),
                goodness: faker.datatype.boolean()
            }
        })
    }

    for (let i = 0; i < 20; i++) {
        await prisma.toy.create({
            data: {
                name: faker.internet.displayName(),
                material: materials[faker.number.int({min: 0, max: 3})],
                weight: faker.number.float({min: 1, max: 500})
            }
        })
    }
}
main()
    .then(async ()=> {
        await prisma.$disconnect();
    })
    .catch(async (e)=>{
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })