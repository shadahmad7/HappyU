<?php 
namespace App\Controllers;
use App\Models\ScreenDataModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class ScreenDataController extends Controller
{
    use ResponseTrait;
    


        public function getScreenArticles($id = null){
            $screenDataModel = new ScreenDataModel();
            $data = $screenDataModel->orderBy('screen_article_id', 'ASC')->findAll();
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
           
             public function addScreenArticle(){
             
            $screenDataModel = new ScreenDataModel();
              $data = [
                'screen_article_name' => $this->request->getVar('name'),
                'screen_article_url' => $this->request->getVar('url'),
                'screen_article_image' => $this->request->getVar('image'),
               
            ];
           
         $rs = $screenDataModel->insert($data);
          
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
           
           
            public function deleteScreenArticle(){
             $screenDataModel = new ScreenDataModel();
             $id = $this->request->getVar('id');
             $rs = $screenDataModel->where('screen_article_id', $id)->delete($id);
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









    