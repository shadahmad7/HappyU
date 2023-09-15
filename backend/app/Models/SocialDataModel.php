<?php 
namespace App\Models;
use CodeIgniter\Model;

class SocialDataModel extends Model
{
    protected $table = 'hs_social_articles';

    protected $primaryKey = 'social_article_id';
    
    protected $allowedFields = ['social_article_name','social_article_url', 'social_article_image'];
}
