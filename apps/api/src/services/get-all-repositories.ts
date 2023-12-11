import { AccountsRepository } from '@/repositories/accounts.repository'
import { Repositories } from '@/types/accounts'
import { sanitizeText } from '@/utils/format-text'
import { InvalidUsername } from './errors/invalid-username.error'

type GetAllRepositoriesServiceRequest = {
  username: string
}

type GetAllRepositoriesServiceResponse = {
  username: string
  repos: Repositories
}

export class GetAllRepositoriesService {
	constructor(readonly accountsRepository: AccountsRepository) {}

	async execute({ username }: GetAllRepositoriesServiceRequest): Promise<GetAllRepositoriesServiceResponse> {
		const formattedUsername = sanitizeText(username)
		const repositories = await this.accountsRepository.getRepositories(formattedUsername)

		if(!repositories) {
			throw new InvalidUsername()
		}

		return {
			username: formattedUsername,
			repos: repositories
		}
	}
}