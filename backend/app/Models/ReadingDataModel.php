<?php 
namespace App\Models;
use CodeIgniter\Model;

class ReadingDataModel extends Model
{
    protected $table = 'hs_reading_articles';

    protected $primaryKey = 'reading_article_id';
    
    protected $allowedFields = ['reading_article_name','reading_article_url', 'reading_article_image'];
}
