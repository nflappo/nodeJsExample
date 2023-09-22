import { faker } from "@faker-js/faker";
import { dbContext } from "../database/typeorm-config";
import { Link } from "../entities/link.entity";
import { User } from "../entities/user.entity";
import { Product } from "../entities/product.entity";

dbContext.initialize().then(async () => {
    const linkRepo = dbContext.getRepository(Link);
    const userRepo = dbContext.getRepository(User);
    const productRepo = dbContext.getRepository(Product);

    const users = await userRepo.find();
    const products = await productRepo.find();

//need to get the products and users 

    for (let index = 0; index < 30; index++){
        const product = new Product();
        product.id = faker.string.uuid();

        await linkRepo.save({
            code: faker.string.alphanumeric(6),
            user: users[index],
            products: [products[index]]
        });
    };

    dbContext.destroy();
    process.exit(0);
  
}).catch((err) =>  {
    console.log(`Database connection failed: ${err}`);
});
