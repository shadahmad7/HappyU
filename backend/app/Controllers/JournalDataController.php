<?php 
namespace App\Controllers;
use App\Models\JournalDataModel;
use App\Models\JournalBookModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class JournalDataController extends Controller
{
    use ResponseTrait;
    


        public function getJournalArticles(){
            $journalDataModel = new JournalDataModel();
            $data = $journalDataModel->orderBy('journal_article_id', 'ASC')->findAll();
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




        public function getJournalBooks(){
            $journalBookModel = new JournalBookModel();
            $data = $journalBookModel->orderBy('journal_book_id', 'ASC')->findAll();
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
           
           
             public function addJournalArticle(){
             
            $journalDataModel = new JournalDataModel();
              $data = [
                'journal_article_name' => $this->request->getVar('name'),
                'journal_article_url' => $this->request->getVar('url'),
                'journal_article_image' => $this->request->getVar('image'),
               
            ];
           
         $rs = $journalDataModel->insert($data);
          
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
           
           
            public function deleteJournalArticle(){
             $journalDataModel = new JournalDataModel();
             $id = $this->request->getVar('id');
             $rs = $journalDataModel->where('journal_article_id', $id)->delete($id);
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

           
           
           
            public function addJournalBook(){
             
            $journalBookModel = new JournalBookModel();
              $data = [
                'journal_book_name' => $this->request->getVar('name'),
                'journal_book_url' => $this->request->getVar('url'),
                'journal_book_image' => $this->request->getVar('image'),
            ];
           
         $rs = $journalBookModel->insert($data);
          
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
           
           
           
           
            public function deleteJournalBook(){
             $journalBookModel = new JournalBookModel();
             $id = $this->request->getVar('id');
             $rs = $journalBookModel->where('journal_book_id', $id)->delete($id);
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









    