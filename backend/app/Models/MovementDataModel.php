<?php 
namespace App\Models;
use CodeIgniter\Model;

class MovementDataModel extends Model
{
    protected $table = 'hs_movement_articles';

    protected $primaryKey = 'movement_article_id';
    
    protected $allowedFields = ['movement_article_name','movement_article_url', 'movement_article_image'];
}
