<?php 
namespace App\Models;
use CodeIgniter\Model;

class MeditationModel extends Model
{
    protected $table = 'hs_habits';

    protected $primaryKey = 'habit_id';
    
protected $fields=true;

    protected $allowedFields = ['habit_meditation','user_id', 'habit_created_date'];
}
