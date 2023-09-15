<?php 
namespace App\Controllers;
use App\Models\FinanceModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class FinanceController extends Controller
{
    use ResponseTrait;
    
    

public function putFinance($id = null){

        $financeModel = new FinanceModel();
        date_default_timezone_set('Asia/Kolkata');
        $date = date('Y/m/d');
        $id = $this->request->getVar('id');
        $data = [
            'finance_q1' => $this->request->getVar('q1'),
            'finance_q2' => $this->request->getVar('q2'),
            'finance_q3' => $this->request->getVar('q3'),
            'finance_q4' => $this->request->getVar('q4'),
            'finance_q5' => $this->request->getVar('q5'),
            'finance_q6' => $this->request->getVar('q6'),
            
        ];

        $rs = $financeModel->set($data)->where('finance_created_date', $date)->where('user_id', $id)->update();
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



        public function getFinance($id = null){
            $financeModel = new FinanceModel();
            date_default_timezone_set('Asia/Kolkata');
            $date = date('Y/m/d');
            $data = $financeModel->where('user_id', $id)->where('finance_created_date', $date)->find();
            if($data){
                {
                    $response = [
                   'status'   => 200,
                   'messages' => $data
               ];
             } 
            } else {

                $data = [
                    'finance_q1' => false,
                    'finance_q2' => false,
                    'finance_q3' => false,
                    'finance_q4' => false,
                    'finance_q5' => false,
                    'finance_q6' => false,
                    'user_id' => $id
                ];
                $financeModel->save($data);
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









    