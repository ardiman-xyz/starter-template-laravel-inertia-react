<?php

namespace App\Repositories;

use App\Entities\AccountEntity;
use App\Models\Account as Model;

class AccountRepository
{
    public function create(AccountEntity $entity)
    {
        return Model::create([
            "user_id"    => $entity->userId,
            "provider"  => $entity->provider,
            "provider_account_id" => $entity->providerAccountId,
            "refresh_token"     => $entity->refreshToken,
            "access_token"  => $entity->accessToken
        ]);
    }

    public function getByProviderId(string $id)
    {
        return Model::where("provider_account_id", $id)->first();
    }
}
