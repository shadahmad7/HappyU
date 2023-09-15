<?php 
namespace App\Controllers;
use App\Models\MeditationModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class MeditationController extends Controller

{
    use ResponseTrait;
    
    

    public function putMeditation($id = null){

        $meditationModel = new MeditationModel();
        date_default_timezone_set('Asia/Kolkata');
        $date = date('Y/m/d');
        $id = $this->request->getVar('id');
        $data = [
            'habit_meditation' => $this->request->getVar('meditation'),
        ];

        $meditationModel->set($data)->where('habit_created_date', $date)->where('user_id', $id)->update();
        $rs= $meditationModel->update($id,$data);
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




     









    