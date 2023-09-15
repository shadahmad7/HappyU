<?php 
namespace App\Controllers;
use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;

class UserCrud extends Controller
{
    use ResponseTrait;
    
    // show users list
    public function index(){
        $userModel = new UserModel();
        $data['users'] = $userModel->orderBy('id', 'DESC')->findAll();
         return view('user_view', $data);
        return $this->respond($data);
    }


    // add user form
    public function create(){
      return view('add_user'); 
    }
 
    // insert data
    public function store() {
        $userModel = new UserModel();
        $data = [
            'name' => $this->request->getVar('name'),
            'email'  => $this->request->getVar('email'),
        ];
        $userModel->insert($data);
        return $this->response->redirect(site_url('/users-list'));
    }

    // show single user
    public function singleUser($id = null){
        $userModel = new UserModel();
        $data['user_obj'] = $userModel->where('id', $id)->first();
        return view('edit_view', $data);
    }

    // update user data
    public function update(){
        $userModel = new UserModel();
        $id = $this->request->getVar('id');
        $data = [
            'name' => $this->request->getVar('name'),
            'email'  => $this->request->getVar('email'),
        ];
        $userModel->update($id, $data);
        return $this->response->redirect(site_url('/users-list'));
    }

     public function updateone($id = null){
        $userModel = new UserModel();
        $data['user'] = [
            'name' => $this->request->getVar('name'),
            'email'  => $this->request->getVar('email'),
        ];
        $userModel->updateone($id, $data);
        return $this->respond($data);
    }
 
    // delete user
    public function delete($id = null){
        $userModel = new UserModel();
        $data['user'] = $userModel->where('id', $id)->delete($id);
        return $this->response->redirect(site_url('/users-list'));
    }
    
     public function getalldata(){
     $userModel = new UserModel();
     // $data['users'] = $usermodel->where('id', $id)->find();
       $data['users'] = $userModel->orderBy('id', 'DESC')->findAll();
      return $this->respond($data);
    }

    public function getone($id = null){
     $userModel = new UserModel();
      $data['user'] = $userModel->where('id', $id)->find($id);
       // $data['users'] = $userModel->orderBy('id', 'DESC')->findAll();
      if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Data Found with id '.$id);
        }
    }
    
    public function insertdata(){
    $userModel = new UserModel();
        $data = [
            'name' => $this->request->getVar('name'),
            'email'  => $this->request->getVar('email'),
        ];
        $rs=$userModel->insert($data);
        
    if($rs)
    {
           $response = [
          'status'   => 201,
          'error'    => null,
          'messages' => [
              'success' => 'Employee created successfully'
          ]
      ];
    }else{
         $response = [
          'status'   => 202,
          'error'    => null,
          'messages' => [
              'success' => 'Employee NOT CREATED successfully'
          ]
      ];
    }
        
  
      return $this->respondCreated($response);
    }
    
}