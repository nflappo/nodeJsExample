import { faker } from "@faker-js/faker";
import {randomInt} from "crypto";
import {User} from "../entities/user.entity";
import {Order} from "../entities/order.entity";
import {OrderItem} from "../entities/orderItem.entity";
import { dbContext } from "../database/typeorm-config";

dbContext.initialize().then(async () => {
    const orderRepo = dbContext.getRepository(Order);
    const orderItemsRepo = dbContext.getRepository(OrderItem);
    const userRepo = dbContext.getRepository(User);
  
    const users = await userRepo.find({take: 30});

    for (let i = 0; i < 30; i++) {
        const order = await orderRepo.save({
            user_id: (users[i]).id,
            code: faker.string.alpha(6),
            ambassador_email: faker.internet.email(),
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            complete: true
        });

        for (let j = 0; j < randomInt(1, 5); j++) {
            await orderItemsRepo.save({
                order,
                product_title: faker.lorem.words(2),
                price: randomInt(10, 100),
                quantity: randomInt(1, 5),
                admin_revenue: randomInt(10, 100),
                ambassador_revenue: randomInt(10, 100)
            });
        }
    }
  
    dbContext.destroy();
    process.exit(0);

}).catch((err) =>  {
      console.log(`Database connection failed: ${err}`);
    });