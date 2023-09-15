<?php 
namespace App\Models;
use CodeIgniter\Model;

class MeditationAppModel extends Model
{
    protected $table = 'hs_meditation_apps';

    protected $primaryKey = 'meditation_app_id';
    
    protected $allowedFields = ['meditation_app_name','meditation_app_url', 'meditation_app_image'];
}
