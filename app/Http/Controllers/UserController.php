<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function index() 
    {
        $users = User::role('proveedor')->get()->makeHidden(['password']);
        return response()->json($users);
    }

    public function get($id){
        $user = User::findOrFail($id);
        return $user;
    }

    public function store(Request $request)
    {        
        $validated = $request->validate([
            'name'=>'required|string',
            'email'=>'required|email|unique:users',
            'password'=>'required|string',            
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $user->assignRole('proveedor');

        return $user;
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $validated = $request->validate([
            'name' => 'string',
            'email' => 'email|unique:users,email,'.$id,
            'password' => 'nullable|string',            
        ]);

        $user->update([
            'name' => $validated['name'] ?? $user->name,
            'email' => $validated['email'] ?? $user->email,
            'password' => isset($validated['password']) ? Hash::make($validated['password']) : $user->password,
        ]);

        if(isset($validated['password'])){
            $user->syncRoles([$validated['role']]);
        }

        return $user;
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted']);
    }
}
