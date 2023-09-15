<?php 
namespace App\Models;
use CodeIgniter\Model;

class FinanceDataModel extends Model
{
    protected $table = 'hs_finance_videos';

    protected $primaryKey = 'finance_video_id';
    
    protected $allowedFields = ['finance_video_name','finance_video_url', 'finance_video_image'];
}
