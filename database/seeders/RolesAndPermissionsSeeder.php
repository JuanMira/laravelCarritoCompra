<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'crear usuarios']);
        Permission::create(['name' => 'asignar rol proveedor']);
        Permission::create(['name' => 'crear productos']);
        Permission::create(['name' => 'ver productos']);
        Permission::create(['name' => 'editar productos']);
        Permission::create(['name' => 'borrar productos']);
        Permission::create(['name' => 'ver tienda']);
        Permission::create(['name' => 'comprar']);
        Permission::create(['name' => 'ver compras']);

        $admin = Role::create(['name' => 'admin']);
        $proveedor = Role::create(['name' => 'proveedor']);
        $cliente = Role::create(['name' => 'cliente']);

        $admin->givePermissionTo([
            'crear usuarios',
            'asignar rol proveedor',
            'crear productos',
            'ver productos',
            'editar productos',
            'borrar productos',
        ]);

        $proveedor->givePermissionTo([
            'crear productos',
            'ver productos',
            'editar productos',
            'borrar productos',
        ]);

        $cliente->givePermissionTo([
            'ver tienda',
            'comprar',
            'ver compras',
        ]);        
    }
}
