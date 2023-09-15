<?php 
namespace App\Controllers;
use App\Models\ReadingDataModel;
use App\Models\ReadingBookModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class ReadingDataController extends Controller
{
    use ResponseTrait;
    


        public function getReadingArticles(){
            $readingDataModel = new ReadingDataModel();
            $data = $readingDataModel->orderBy('reading_article_id', 'ASC')->findAll();
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




        public function getReadingBooks(){
            $readingBookModel = new ReadingBookModel();
            $data = $readingBookModel->orderBy('reading_book_id', 'ASC')->findAll();
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
           
           
           public function addReadingArticle(){
             
            $readingDataModel = new ReadingDataModel();
              $data = [
                'reading_article_name' => $this->request->getVar('name'),
                'reading_article_url' => $this->request->getVar('url'),
                'reading_article_image' => $this->request->getVar('image'),
               
            ];
           
         $rs = $readingDataModel->insert($data);
          
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
           
           
           
           
            public function deleteReadingArticle(){
             $readingDataModel = new ReadingDataModel();
             $id = $this->request->getVar('id');
             $rs = $readingDataModel->where('reading_article_id', $id)->delete($id);
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

           
           
           public function addReadingBook(){
             
            $readingBookModel = new ReadingBookModel();
            
              $data = [
                'reading_book_name' => $this->request->getVar('name'),
                'reading_book_url' => $this->request->getVar('url'),
                'reading_book_image' => $this->request->getVar('image'),
               
            ];
           
         $rs = $readingBookModel->insert($data);
          
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
           
           
            public function deleteReadingBook(){
             $readingBookModel = new ReadingBookModel();
             $id = $this->request->getVar('id');
             $rs = $readingBookModel->where('reading_book_id', $id)->delete($id);
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









    