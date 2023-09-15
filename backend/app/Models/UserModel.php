<?php 
namespace App\Models;
use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'hs_users';

    protected $primaryKey = 'user_id';
    
    protected $allowedFields = ['user_name', 'user_email', 'user_password','is_passwordchange','user_active', 'user_created_at', 'user_updated_at'];
}
