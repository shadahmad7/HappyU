<?php 
namespace App\Models;
use CodeIgniter\Model;

class EatingDataModel extends Model
{
    protected $table = 'hs_eating_articles';

    protected $primaryKey = 'eating_article_id';
    
    protected $allowedFields = ['eating_article_name','eating_article_url', 'eating_article_image'];
}
