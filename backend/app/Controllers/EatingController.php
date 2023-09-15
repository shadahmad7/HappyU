<?php 
namespace App\Controllers;
use App\Models\EatingModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class EatingController extends Controller
{
    use ResponseTrait;
    
    

public function putEating($id = null){

        $eatingModel = new EatingModel();
        date_default_timezone_set('Asia/Kolkata');
        $date = date('Y/m/d');
        $id = $this->request->getVar('id');
        $data = [
            'eating_breakfast' => $this->request->getVar('breakfast'),
            'eating_lunch' => $this->request->getVar('lunch'),
            'eating_dinner' => $this->request->getVar('dinner'),
        ];

        $rs = $eatingModel->set($data)->where('eating_created_date', $date)->where('user_id', $id)->update();
        // $rs= $journalModel->update($id,$data);
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



        public function getEating($id = null){
            $eatingModel = new EatingModel();
            date_default_timezone_set('Asia/Kolkata');
            $date = date('Y/m/d');
            $data = $eatingModel->where('user_id', $id)->where('eating_created_date', $date)->find();
            if($data){
                {
                    $response = [
                   'status'   => 200,
                   'messages' => $data
               ];
             } 
            } else {

                $data = [
                    'eating_breakfast' => "",
                    'eating_lunch' => "",
                    'eating_dinner' => "",
                    'user_id' => $id
                ];
                $eatingModel->save($data);
                {
                    $response = [
                   'status'   => 201,
                   'messages' => "New data inserted"
               ];
             } 
            }
                
        return $this->respondCreated($response);

           }

    }









    