<?php 
namespace App\Controllers;
use App\Models\JournalModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class JournalController extends Controller
{
    use ResponseTrait;
    
    

public function putJournal($id = null){

        $journalModel = new JournalModel();
        date_default_timezone_set('Asia/Kolkata');
        $date = date('Y/m/d');
        $id = $this->request->getVar('id');
        $data = [
            'journal_q1' => $this->request->getVar('q1'),
            'journal_q2' => $this->request->getVar('q2'),
            'journal_q3' => $this->request->getVar('q3'),
            'journal_q4' => $this->request->getVar('q4'),
            'journal_q5' => $this->request->getVar('q5'),
            
        ];

        $rs = $journalModel->set($data)->where('journal_created_date', $date)->where('user_id', $id)->update();
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



        public function getJournal($id = null){
            $journalModel = new JournalModel();
            date_default_timezone_set('Asia/Kolkata');
            $date = date('Y/m/d');
            $data = $journalModel->where('user_id', $id)->where('journal_created_date', $date)->find();
            if($data){
                {
                    $response = [
                   'status'   => 200,
                   'messages' => $data
               ];
             } 
            } else {

                $data = [
                    'journal_q1' => false,
                    'journal_q2' => false,
                    'journal_q3' => false,
                    'journal_q4' => false,
                    'journal_q5' => false,
                    'user_id' => $id
                ];
                $journalModel->save($data);
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









    