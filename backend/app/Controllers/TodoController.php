<?php 
namespace App\Controllers;
use App\Models\TodoModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class TodoController extends Controller
{
    use ResponseTrait;
    
    

public function insertTodo(){
        $todoModel = new TodoModel();
         $data = [
            'todo_name' => $this->request->getVar('name'),
            'todo_status' => $this->request->getVar('status'),
            'user_id' => $this->request->getVar('id'),
        ];
        $rs= $todoModel->insert($data);
        if($rs)
        {
               $response = [
              'status'   => 200,
              'messages' => [
                  'success' => 'Task added successfully.'
              ]
          ];
        }else{
             $response = [
              'status'   => 201,
              'messages' => [
                  'success' => 'Task not added'
              ]
          ];
        }
          return $this->respondCreated($response);
        }


  public function deleteTodo($id = null){
        $todoModel = new TodoModel();
         $id = $this->request->getVar('id');
           
        $hid = $this->request->getVar('hid');
         echo $hid;
        $rs = $todoModel->where('user_id', $id)->where("todo_id", $hid)->delete();
     
        
          if($rs)
        {
               $response = [
              'status'   => 200,
              'messages' => [
                  'success' => 'Task deleted successfully.'
              ]
          ];
        } else {
             $response = [
              'status'   => 201,
              'messages' => [
                  'success' => 'Task not deleted'
              ]
          ];
        }
          return $this->respondCreated($response);
    }


public function updateTodo($id = null){
        $todoModel = new TodoModel();
        $id = $this->request->getVar('id');
        $hid = $this->request->getVar('hid');
        date_default_timezone_set('Asia/Kolkata');
        $date = date('Y/m/d');

         $data = [
            'todo_status' => $this->request->getVar('status'),
        ];
        
        $rs= $todoModel->set($data)->where('user_id', $id)->where("todo_id", $hid)->update();
        if($rs)
        {
               $response = [
              'status'   => 200,
              'messages' => [
                  'success' => 'Task updated successfully.'
              ]
          ];
        } else {
             $response = [
              'status'   => 201,
              'messages' => [
                  'success' => 'Task not updated'
              ]
          ];
        }
          return $this->respondCreated($response);
        }



        public function getTodo($id = null){
            $todoModel = new TodoModel();
            $data = $todoModel->where('user_id', $id)->orderBy('todo_created_date', 'DESC')->find();
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

    }









    