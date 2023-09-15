<?php 
namespace App\Models;
use CodeIgniter\Model;

class WorkoutVideoModel extends Model
{
    protected $table = 'hs_workout_videos';

    protected $primaryKey = 'workout_video_id';
    
    protected $allowedFields = ['workout_video_url','workout_video_duration'];
}
