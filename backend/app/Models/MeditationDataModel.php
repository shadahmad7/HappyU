<?php 
namespace App\Models;
use CodeIgniter\Model;

class MeditationDataModel extends Model
{
    protected $table = 'hs_meditation_articles';

    protected $primaryKey = 'meditation_article_id';
    
    protected $allowedFields = ['meditation_article_name','meditation_article_url', 'meditation_article_image'];
}
