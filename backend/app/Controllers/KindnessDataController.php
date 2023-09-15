<?php 
namespace App\Controllers;
use App\Models\KindnessDataModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class KindnessDataController extends Controller
{
    use ResponseTrait;
    


        public function getKindnessArticles($id = null){
            $kindnessDataModel = new KindnessDataModel();
            $data = $kindnessDataModel->orderBy('kindness_article_id', 'ASC')->findAll();
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
           
            public function addKindnessArticle(){
             
            $kindnessDataModel = new KindnessDataModel();
              $data = [
                'kindness_article_name' => $this->request->getVar('name'),
                'kindness_article_url' => $this->request->getVar('url'),
                'kindness_article_image' => $this->request->getVar('image'),
               
            ];
           
         $rs = $kindnessDataModel->insert($data);
          
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

 public function deleteKindnessArticle(){
             $kindnessDataModel = new KindnessDataModel();
             $id = $this->request->getVar('id');
             $rs = $kindnessDataModel->where('kindness_article_id', $id)->delete($id);
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









    