<?php 
namespace App\Models;
use CodeIgniter\Model;

class JournalBookModel extends Model
{
    protected $table = 'hs_journal_books';

    protected $primaryKey = 'journal_book_id';
    
    protected $allowedFields = ['journal_book_name','journal_book_url', 'journal_book_image'];
}
