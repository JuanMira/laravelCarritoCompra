<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use Illuminate\Foundation\Application;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

# rutas producto
Route::get("/productos", function() {
    return Inertia::render('Productos/Productos');
})->middleware(['auth', 'verified'])->name('productos');

Route::get("/crear-productos", function() {
    return Inertia::render('Productos/CrearProductos');
})->middleware(['auth', 'verified'])->name('crear-productos');

Route::get("/editar-productos", function() {
    return Inertia::render('Productos/EditarProductos');
})->middleware(['auth', 'verified'])->name('editar-productos');

Route::get("/products", [ProductController::class, 'index']);

Route::get("/products/{id}", [ProductController::class, 'get']);

Route::middleware(['auth:sanctum'])->group(function() {
    Route::post("/products", [ProductController::class, 'store']);
    Route::put("/products/{id}", [ProductController::class, 'update']);
    Route::delete("/products/{id}", [ProductController::class, 'destroy']);
});

# rutas ventas
Route::middleware(['auth:sanctum'])->group(function() {
    Route::post("/sales", [SaleController::class, 'store']);
    Route::get("/sales", [SaleController::class, 'index']);
});

Route::get("/ver-compras", function(){
    return Inertia::render('VerCompras');
})->middleware(['auth', 'verified'])->name('ver-compras');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/usuarios', function() {
    return Inertia::render('Usuarios');
})->middleware(['auth', 'verified'])->name('usuarios');

Route::get('/crear-usuarios', function() {
    return Inertia::render('CrearUsuario');
})->middleware(['auth', 'verified'])->name('crear-usuarios');

Route::get('/editar-usuarios', function() {
    return Inertia::render("EditarUsuario");
})->middleware(['auth', 'verified'])->name('editar-usuarios');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth:sanctum'])->group(function() {
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get("/users/{id}" ,[UserController::class, 'get']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});

require __DIR__.'/auth.php';
