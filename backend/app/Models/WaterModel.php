<?php 
namespace App\Models;
use CodeIgniter\Model;

class WaterModel extends Model
{
    protected $table = 'hs_habits';

    protected $primaryKey = 'habit_id';
    
protected $fields=true;

    protected $allowedFields = ['habit_workout',
    'habit_meditation','habit_social',
    'habit_reading','habit_movement','habit_water',
    'habit_screen','habit_kindness',
    'habit_journal','user_id', 'habit_created_date'];
}
