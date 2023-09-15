<?php 
namespace App\Models;
use CodeIgniter\Model;

class TodoModel extends Model
{
    protected $table = 'hs_todo';

    protected $primaryKey = 'todo_id';
    
    protected $allowedFields = ['todo_name','todo_status', 'user_id','todo_created_date'];
}
