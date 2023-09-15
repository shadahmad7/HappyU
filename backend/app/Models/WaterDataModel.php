<?php 
namespace App\Models;
use CodeIgniter\Model;

class WaterDataModel extends Model
{
    protected $table = 'hs_water_articles';

    protected $primaryKey = 'water_article_id';
    
    protected $allowedFields = ['water_article_name','water_article_url', 'movement_article_image'];
}
