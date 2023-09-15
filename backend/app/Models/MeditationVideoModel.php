<?php 
namespace App\Models;
use CodeIgniter\Model;

class MeditationVideoModel extends Model
{
    protected $table = 'hs_meditation_videos';

    protected $primaryKey = 'meditation_video_id';
    
    protected $allowedFields = ['meditation_video_url','meditation_video_duration'];
}
