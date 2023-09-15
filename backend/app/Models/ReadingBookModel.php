<?php 
namespace App\Models;
use CodeIgniter\Model;

class ReadingBookModel extends Model
{
    protected $table = 'hs_reading_books';

    protected $primaryKey = 'reading_book_id';
    
    protected $allowedFields = ['reading_book_name','reading_book_url', 'reading_book_image'];
}
