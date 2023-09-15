<?php 
namespace App\Controllers;
use App\Models\SocialDataModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class SocialDataController extends Controller
{
    use ResponseTrait;
    


        public function getSocialArticles($id = null){
            $socialDataModel = new SocialDataModel();
            $data = $socialDataModel->orderBy('social_article_id', 'ASC')->findAll();
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
           
           public function addSocialArticle(){
             
            $socialDataModel = new SocialDataModel();
              $data = [
                'social_article_name' => $this->request->getVar('name'),
                'social_article_url' => $this->request->getVar('url'),
                'social_article_image' => $this->request->getVar('image'),
               
            ];
           
         $rs = $socialDataModel->insert($data);
          
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



 public function deleteSocialArticle(){
             $socialDataModel = new SocialDataModel();
             $id = $this->request->getVar('id');
             $rs = $socialDataModel->where('social_article_id', $id)->delete($id);
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









    