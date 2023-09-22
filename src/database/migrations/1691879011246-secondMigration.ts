import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1691879011246 implements MigrationInterface {
    name = 'SecondMigration1691879011246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Link\` ADD UNIQUE INDEX \`IDX_17e2736710e36a820c72492301\` (\`code\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Link\` DROP INDEX \`IDX_17e2736710e36a820c72492301\``);
    }

}
