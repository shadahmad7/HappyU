<?php 
namespace App\Models;
use CodeIgniter\Model;




class VehicleModel extends Model
{
    protected $table = 'bj_vehicles';

    protected $primaryKey = 'vehicle_id';
    
    protected $allowedFields = ['vehicle_brand', 'vehicle_model', 'vehicle_number', 'vehicle_ownername', 'vehicle_created_at', 'vehicle_updated_at'];
}