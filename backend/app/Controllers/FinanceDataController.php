<?php 
namespace App\Controllers;
use App\Models\FinanceDataModel;
use App\Models\FinanceBookModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class FinanceDataController extends Controller
{
    use ResponseTrait;
    


        public function getFinanceVideos(){
            $financeDataModel = new FinanceDataModel();
            $data = $financeDataModel->orderBy('finance_video_id', 'ASC')->findAll();
             $rs=$this->respond($data);
             if($rs)
        {
               $response = [
              'status'   => 200,
              'data' => $data
          ];
        } 
        else
        {
             $response = [
              'status'   => 201,
              'messages' => "Data not found with ".$id
          ];
        }
        return $this->respondCreated($response);


           }




        public function getFinanceBooks(){
            $financeBookModel = new FinanceBookModel();
            $data = $financeBookModel->orderBy('finance_book_id', 'ASC')->findAll();
             $rs=$this->respond($data);
             if($rs)
        {
               $response = [
              'status'   => 200,
              'data' => $data
          ];
        } 
        else
        {
             $response = [
              'status'   => 201,
              'messages' => "Data not found with ".$id
          ];
        }
        return $this->respondCreated($response);


           }
           
           
            public function addFinanceBook(){
             
            $financeBookModel = new FinanceBookModel();
              $data = [
                'finance_book_name' => $this->request->getVar('name'),
                'finance_book_url' => $this->request->getVar('url'),
                'finance_book_image' => $this->request->getVar('image'),
               
            ];
           
         $rs = $financeBookModel->insert($data);
          
                    if($rs)
                    {
                      
                            $response = [
                            'status'   => 200,
                            'data' => [
                                'res' => $rs,
                                'success' => 'Data Added Successfully.'
                            ]
                        ];
                       
                        
                    } else {
                        $response = [
                            'status'   => 201,
                            'data' => [
                                'success' => 'Data not Added'
                            ]
                        ];
                    }
                   
             
               return $this->respondCreated($response);


           }
           
           
            public function deleteFinanceBook(){
             $financeBookModel = new FinanceBookModel();
             $id = $this->request->getVar('id');
             $rs = $financeBookModel->where('finance_book_id', $id)->delete($id);
             if($rs)
                    {
                      
                            $response = [
                            'status'   => 200,
                            'data' => [
                                'res' => $rs,
                                'success' => 'Data deleted Successfully.'
                            ]
                        ];
                       
                        
                    } else {
                        $response = [
                            'status'   => 201,
                            'data' => [
                                'success' => 'Data not deleted'
                            ]
                        ];
                    }
                   
             
               return $this->respondCreated($response);
    }



           
           
            public function addFinanceVideo(){
             
            $financeDataModel = new FinanceDataModel();
              $data = [
                'finance_video_name' => $this->request->getVar('name'),
                'finance_video_url' => $this->request->getVar('url'),
                'finance_video_image' => $this->request->getVar('image'),
               
            ];
           
         $rs = $financeDataModel->insert($data);
          
                    if($rs)
                    {
                      
                            $response = [
                            'status'   => 200,
                            'data' => [
                                'res' => $rs,
                                'success' => 'Data Added Successfully.'
                            ]
                        ];
                       
                        
                    } else {
                        $response = [
                            'status'   => 201,
                            'data' => [
                                'success' => 'Data not Added'
                            ]
                        ];
                    }
                   
             
               return $this->respondCreated($response);


           }
           
           
           
            public function deleteFinanceVideo(){
             $financeDataModel = new FinanceDataModel();
             $id = $this->request->getVar('id');
             $rs = $financeDataModel->where('finance_video_id', $id)->delete($id);
             if($rs)
                    {
                      
                            $response = [
                            'status'   => 200,
                            'data' => [
                                'res' => $rs,
                                'success' => 'Data deleted Successfully.'
                            ]
                        ];
                       
                        
                    } else {
                        $response = [
                            'status'   => 201,
                            'data' => [
                                'success' => 'Data not deleted'
                            ]
                        ];
                    }
                   
             
               return $this->respondCreated($response);
    }



    }









    