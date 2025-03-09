import { AccountRepository } from '../../../../data/protocols';
import { AccountEntity } from '../../../../domain/entity';
import { AccountModel } from '../../../../domain/models/indext';
import { UserAccount } from '../typeorm/entities/UserAccount';
import { TypeORMHelper } from '../typeorm/configs/helper';

export class AccountPostgresRepository implements AccountRepository {
    public async create(accountData: AccountModel): Promise<AccountEntity> {
        const repository = await TypeORMHelper.getRepository(UserAccount);

        const user = await repository.findOne({
            where: { email: accountData.email },
        });

        if (user) {
            return;
        }
    }
}
