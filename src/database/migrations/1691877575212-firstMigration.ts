import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1691877575212 implements MigrationInterface {
    name = 'FirstMigration1691877575212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`User\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isAmbassador\` tinyint NOT NULL, UNIQUE INDEX \`IDX_4a257d2c9837248d70640b3e36\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Product\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`price\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Link\` (\`id\` varchar(36) NOT NULL, \`code\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`LinkProduct\` (\`linkId\` varchar(36) NOT NULL, \`productId\` varchar(36) NOT NULL, INDEX \`IDX_8f6c64b94d6acf19b5b8cfa1cc\` (\`linkId\`), INDEX \`IDX_696a8a3967d4281780e3a77c77\` (\`productId\`), PRIMARY KEY (\`linkId\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Link\` ADD CONSTRAINT \`FK_0d31e1ad66ace35c1b3c71959af\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`LinkProduct\` ADD CONSTRAINT \`FK_8f6c64b94d6acf19b5b8cfa1cc2\` FOREIGN KEY (\`linkId\`) REFERENCES \`Link\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`LinkProduct\` ADD CONSTRAINT \`FK_696a8a3967d4281780e3a77c778\` FOREIGN KEY (\`productId\`) REFERENCES \`Product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`LinkProduct\` DROP FOREIGN KEY \`FK_696a8a3967d4281780e3a77c778\``);
        await queryRunner.query(`ALTER TABLE \`LinkProduct\` DROP FOREIGN KEY \`FK_8f6c64b94d6acf19b5b8cfa1cc2\``);
        await queryRunner.query(`ALTER TABLE \`Link\` DROP FOREIGN KEY \`FK_0d31e1ad66ace35c1b3c71959af\``);
        await queryRunner.query(`DROP INDEX \`IDX_696a8a3967d4281780e3a77c77\` ON \`LinkProduct\``);
        await queryRunner.query(`DROP INDEX \`IDX_8f6c64b94d6acf19b5b8cfa1cc\` ON \`LinkProduct\``);
        await queryRunner.query(`DROP TABLE \`LinkProduct\``);
        await queryRunner.query(`DROP TABLE \`Link\``);
        await queryRunner.query(`DROP TABLE \`Product\``);
        await queryRunner.query(`DROP INDEX \`IDX_4a257d2c9837248d70640b3e36\` ON \`User\``);
        await queryRunner.query(`DROP TABLE \`User\``);
    }

}
