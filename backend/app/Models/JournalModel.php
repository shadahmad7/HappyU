<?php 
namespace App\Models;
use CodeIgniter\Model;

class JournalModel extends Model
{
    protected $table = 'hs_journal';

    protected $primaryKey = 'journal_id';
    
// protected $fields=true;

    protected $allowedFields = ['journal_q1','journal_q2','journal_q3','journal_q4','journal_q5','user_id', 'journal_created_date'];
}
