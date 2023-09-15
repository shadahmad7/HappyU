<?php 
namespace App\Controllers;
use App\Models\WaterDataModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class WaterDataController extends Controller
{
    use ResponseTrait;
    


        public function getWaterArticles($id = null){
            $waterDataModel = new WaterDataModel();
            $data = $waterDataModel->orderBy('water_article_id', 'ASC')->findAll();
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
           
           public function addWaterArticle(){
             
            $waterDataModel = new WaterDataModel();
              $data = [
                'water_article_name' => $this->request->getVar('name'),
                'water_article_url' => $this->request->getVar('url'),
                'water_article_image' => $this->request->getVar('image'),
               
            ];
           
         $rs = $waterDataModel->insert($data);
          
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
           
           
           
            public function deleteWaterArticle(){
             $waterDataModel = new WaterDataModel();
             $id = $this->request->getVar('id');
             $rs = $waterDataModel->where('water_article_id', $id)->delete($id);
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









    