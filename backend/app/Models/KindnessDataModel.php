<?php 
namespace App\Models;
use CodeIgniter\Model;

class KindnessDataModel extends Model
{
    protected $table = 'hs_kindness_articles';

    protected $primaryKey = 'kindness_article_id';
    
    protected $allowedFields = ['kindness_article_name','kindness_article_url', 'kindness_article_image'];
}
