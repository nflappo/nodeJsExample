import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderAddressNullable1691942057026 implements MigrationInterface {
    name = 'OrderAddressNullable1691942057026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`address\` \`address\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Order\` CHANGE \`address\` \`address\` varchar(255) NOT NULL`);
    }

}
