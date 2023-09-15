<?php 
namespace App\Controllers;
use App\Models\EatingDataModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class EatingDataController extends Controller
{
    use ResponseTrait;
    


        public function getEatingArticles($id = null){
            $eatingDataModel = new EatingDataModel();
            $data = $eatingDataModel->orderBy('eating_article_id', 'ASC')->findAll();
            // return $this->respond($data);
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
           
           
           
           
           
           public function addEatingArticle(){
             
            $eatingDataModel = new EatingDataModel();
              $data = [
                'eating_article_name' => $this->request->getVar('name'),
                'eating_article_url' => $this->request->getVar('url'),
                'eating_article_image' => $this->request->getVar('image'),
               
            ];
           
         $rs = $eatingDataModel->insert($data);
          
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
           
             public function deleteEatingArticle(){
             $eatingDataModel = new EatingDataModel();
             $id = $this->request->getVar('id');
         
             $rs = $eatingDataModel->where('eating_article_id', $id)->delete($id);
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









    