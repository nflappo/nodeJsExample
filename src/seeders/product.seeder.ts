import { dbContext } from "../database/typeorm-config";
import { faker } from "@faker-js/faker";
import { randomInt } from "crypto";
import { Product } from "../entities/product.entity";

dbContext.initialize().then(async () => {
  const prodRepo = dbContext.getRepository(Product);


  for (let index = 0; index < 30; index++){
    await prodRepo.save({
        title: faker.lorem.words(2),
        description: faker.lorem.words(10),
        image: faker.image.urlPicsumPhotos({width: 200, height: 200}),
        price: randomInt(10,100)
    });
  };

  dbContext.destroy();
  process.exit(0);
  
}).catch((err) =>  {
    console.log(`Database connection failed: ${err}`);
});
