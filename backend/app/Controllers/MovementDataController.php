<?php 
namespace App\Controllers;
use App\Models\MovementDataModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class MovementDataController extends Controller
{
    use ResponseTrait;
    


        public function getMovementArticles($id = null){
            $movementDataModel = new MovementDataModel();
            $data = $movementDataModel->orderBy('movement_article_id', 'ASC')->findAll();
             $rs=$this->respond($data);
             if($rs)
        {
               $response = [
              'status'   => 200,
              'messages' => $data
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
           
               public function addMovementArticle(){
             
            $movementDataModel = new MovementDataModel();
              $data = [
                'movement_article_name' => $this->request->getVar('name'),
                'movement_article_url' => $this->request->getVar('url'),
                'movement_article_image' => $this->request->getVar('image'),
               
            ];
           
         $rs = $movementDataModel->insert($data);
          
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
           
           
           
           
            public function deleteMovementArticle(){
             $movementDataModel = new MovementDataModel();
             $id = $this->request->getVar('id');
             $rs = $movementDataModel->where('movement_article_id', $id)->delete($id);
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









    