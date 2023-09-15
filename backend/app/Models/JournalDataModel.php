<?php 
namespace App\Models;
use CodeIgniter\Model;

class JournalDataModel extends Model
{
    protected $table = 'hs_journal_articles';

    protected $primaryKey = 'journal_article_id';
    
    protected $allowedFields = ['journal_article_name','journal_article_url', 'journal_article_image'];
}
