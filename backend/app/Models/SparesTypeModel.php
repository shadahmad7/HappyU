<?php 
namespace App\Models;
use CodeIgniter\Model;




class SparesTypeModel extends Model
{
    protected $table = 'bj_spares_type';

    protected $primaryKey = 'spare_id';
    
    protected $allowedFields = [ 'spare_name', 'spare_created_at', 'spare_updated_at'];
}