<?php 
namespace App\Controllers;
use App\Models\MeditationDataModel;
use App\Models\MeditationAppModel;
use App\Models\MeditationVideoModel;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class MeditationDataController extends Controller
{
    use ResponseTrait;
    


        public function getMeditationArticles(){
            $meditationDataModel = new MeditationDataModel();
            $data = $meditationDataModel->orderBy('meditation_article_id', 'ASC')->findAll();
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
           
           


 public function getMeditationVideo($duration = null){
            $meditationVideoModel = new MeditationVideoModel();
            $data = $meditationVideoModel->where('meditation_video_duration', $duration)->orderBy('meditation_video_id', 'ASC')->findAll();
            // echo $duration;

             if($data)
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
           
             public function getAllMeditationVideo(){
           
            $meditationVideoModel = new MeditationVideoModel();
            $data = $meditationVideoModel->orderBy('meditation_video_id', 'ASC')->findAll();
            
             if($data)
        {
               $response = [
              'status'   => 200,
              'messages' => $data
          ];
        } 
        else
        {
             $response = [
              'status'   => 404,
              'messages' => "Data not found"
          ];
        }
        return $this->respondCreated($response);


           }
           



        public function getMeditationApps(){
            $meditationAppModel = new MeditationAppModel();
            $data = $meditationAppModel->orderBy('meditation_app_id', 'DESC')->findAll();
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
           
           public function addMeditationArticle(){
             
            $meditationDataModel = new MeditationDataModel();
              $data = [
                'meditation_article_name' => $this->request->getVar('name'),
                'meditation_article_url' => $this->request->getVar('url'),
                'meditation_article_image' => $this->request->getVar('image'),
               
            ];
           
         $rs = $meditationDataModel->insert($data);
          
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
           
           
           
           
           
            public function deleteMeditationArticle(){
             $meditationDataModel = new MeditationDataModel();
             $id = $this->request->getVar('id');
             $rs = $meditationDataModel->where('meditation_article_id', $id)->delete($id);
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

           
           
                 public function addMeditationVideo(){
             
            $meditationVideoModel = new MeditationVideoModel();
              $data = [
                'meditation_video_url' => $this->request->getVar('url'),
                'meditation_video_duration' => $this->request->getVar('length'),
               
            ];
           
         $rs = $meditationVideoModel->insert($data);
          
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
           
             
            public function deleteMeditationVideo(){
             $meditationVideoModel = new MeditationVideoModel();
             $id = $this->request->getVar('id');
             $rs = $meditationVideoModel->where('meditation_video_id', $id)->delete($id);
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









    