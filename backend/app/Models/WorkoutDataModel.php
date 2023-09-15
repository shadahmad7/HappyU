<?php 
namespace App\Models;
use CodeIgniter\Model;

class WorkoutDataModel extends Model
{
    protected $table = 'hs_workout_articles';

    protected $primaryKey = 'workout_article_id';
    
    protected $allowedFields = ['workout_article_name','workout_article_url', 'workout_article_image'];
}
