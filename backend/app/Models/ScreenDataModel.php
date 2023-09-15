<?php 
namespace App\Models;
use CodeIgniter\Model;

class ScreenDataModel extends Model
{
    protected $table = 'hs_screen_articles';

    protected $primaryKey = 'screen_article_id';
    
    protected $allowedFields = ['screen_article_name','screen_article_url', 'movement_article_image'];
}
