import bcryptjs from "bcryptjs";
import { dbContext } from "../database/typeorm-config";
import { User } from "../entities/user.entity";
import { faker } from "@faker-js/faker";

dbContext.initialize().then(async () => {
  const userRepo = dbContext.getRepository(User);

  const password = await bcryptjs.hash("1234", 10);

  for (let index = 0; index < 30; index++){
    await userRepo.save({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password,
        isAmbassador: true
    });
  };

  dbContext.destroy();
  process.exit(0);

}).catch((err) =>  {
    console.log(`Database connection failed: ${err}`);
});
