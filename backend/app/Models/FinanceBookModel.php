<?php 
namespace App\Models;
use CodeIgniter\Model;

class FinanceBookModel extends Model
{
    protected $table = 'hs_finance_books';

    protected $primaryKey = 'finance_book_id';
    
    protected $allowedFields = ['finance_book_name','finance_book_url', 'finance_book_image'];
}
