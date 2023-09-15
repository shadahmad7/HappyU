<?php 
namespace App\Models;
use CodeIgniter\Model;

class FinanceModel extends Model
{
    protected $table = 'hs_finance';

    protected $primaryKey = 'finance_id';
    
// protected $fields=true;

    protected $allowedFields = ['finance_q1','finance_q2','finance_q3','finance_q4','finance_q5','finance_q6','user_id', 'finance_created_date'];
}
