<?php 
namespace App\Models;
use CodeIgniter\Model;

class EatingModel extends Model
{
    protected $table = 'hs_eating';

    protected $primaryKey = 'eating_id';
    
// protected $fields=true;

    protected $allowedFields = ['eating_breakfast','eating_lunch','eating_dinner','user_id', 'eating_created_date'];
}
