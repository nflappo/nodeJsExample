import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderOrderItem1691936634895 implements MigrationInterface {
    name = 'OrderOrderItem1691936634895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`OrderItem\` (\`id\` varchar(36) NOT NULL, \`price\` int NOT NULL, \`product_title\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`ambassador_revenue\` int NOT NULL, \`admin_revenue\` int NOT NULL, \`order_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Order\` (\`id\` varchar(36) NOT NULL, \`code\` varchar(255) NOT NULL, \`user_id\` varchar(255) NOT NULL, \`transaction_id\` varchar(255) NULL, \`ambassador_email\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`country\` varchar(255) NULL, \`city\` varchar(255) NULL, \`zipCode\` varchar(255) NULL, \`complete\` tinyint NOT NULL DEFAULT 0, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`OrderItem\` ADD CONSTRAINT \`FK_b0086d1f140f22895ad51f586b1\` FOREIGN KEY (\`order_id\`) REFERENCES \`Order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`OrderItem\` DROP FOREIGN KEY \`FK_b0086d1f140f22895ad51f586b1\``);
        await queryRunner.query(`DROP TABLE \`Order\``);
        await queryRunner.query(`DROP TABLE \`OrderItem\``);
    }

}
