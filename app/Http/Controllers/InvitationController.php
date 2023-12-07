<?php

namespace App\Http\Controllers;

use App\DTO\CreateTokenDTO;
use App\Http\Requests\ResetPasswordRequest;
use App\Models\User;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;

class InvitationController extends Controller
{
    private TokenService $tokenService;

    public function __construct()
    {
        $this->tokenService = new TokenService();
    }

    public function validateInvitation(Request $request)
    {
        $token = $request->get("token");

        $data = $this->tokenService->validateJWT($token);

       if(!$data)
       {
           return Inertia::render("InviteNotValid");
       }

       return Inertia::render("Invitation", [
           "user" => $data
       ]);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $data = $request->validationData();

        $userId = $data["id"];

        $user = User::find($userId);

        if(!$user) {
            return response()->json([
                'success'    => false,
                'message'   => "User not found"
            ], 400);
        }

        $user->password = bcrypt($data["password"]);
        $user->is_password_changed = 1;
        $user->save();

        $newPayload = new CreateTokenDTO();
        $newPayload->id     = $user->id;
        $newPayload->email  = $user->email;
        $newPayload->name   = $user->name;

        $token = $this->tokenService->generate($newPayload);
        Cookie::queue("vistoken", $token, 1440);

        return response()->json([
            'status' => true,
            'message' => 'successfully change password',
        ], 200);
    }
}
