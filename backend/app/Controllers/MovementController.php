<?php 
namespace App\Controllers;
use App\Models\MovementModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class MovementController extends Controller
{
    use ResponseTrait;
    
    

public function putMovement($id = null){

        $movementModel = new MovementModel();
        date_default_timezone_set('Asia/Kolkata');
        $date = date('Y/m/d');
        $id = $this->request->getVar('id');
        $data = [
            'habit_movement' => $this->request->getVar('movement'),
            
        ];

        $movementModel->set($data)->where('habit_created_date', $date)->where('user_id', $id)->update();
//  print_r($data);
        $rs= $movementModel->update($id,$data);
        // echo $rs;
        if($rs)
        {
               $response = [
              'status'   => 200,
              'messages' => [
                  'success' => 'status updated successfully.'
              ]
          ];
        }else{
             $response = [
              'status'   => 201,
              'messages' => [
                  'success' => 'status not updated'
              ]
          ];
        }
          return $this->respondCreated($response);
        }
    }


      







    