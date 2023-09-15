<?php 
namespace App\Controllers;
use App\Models\VehicleModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;

class VehicleCrud extends Controller
{
    use ResponseTrait;
    
    // show vehicles list
    public function index(){
        $vehicleModel = new VehicleModel();
        $data['vehicles'] = $vehicleModel->orderBy('id', 'DESC')->findAll();
        return view('vehicle_view', $data);
    }

    // add vehicle form
    public function create(){
        return view('add_vehicle');
    }
 
    // insert data
    public function store() {
        $vehicleModel = new VehicleModel();
        $data = [
            'vehicle_brand' => $this->request->getVar('brand'),
            'vehicle_model'  => $this->request->getVar('model'),
            'vehicle_number'  => $this->request->getVar('number'),
            'vehicle_ownername'  => $this->request->getVar('ownername'),
           
            'vehicle_created_at'  => $this->request->getVar('createdat'),
            'vehicle_updated_at'  => $this->request->getVar('updatedat'),
        ];
        $vehicleModel->insert($data);
        return $this->response->redirect(site_url('/vehicles-list'));
    }

    // show single vehicle
    public function singlevehicle($id = null){
        $vehicleModel = new VehicleModel();
        $data['vehicle_obj'] = $vehicleModel->where('id', $id)->first();
        return view('edit_view', $data);
    }

    // update vehicle data
    public function update($id = null){
        $vehicleModel = new VehicleModel();
        $id = $this->request->getVar('vehicle_id');
        $data = [
            'vehicle_brand' => $this->request->getVar('brand'),
            'vehicle_model'  => $this->request->getVar('model'),
            'vehicle_number'  => $this->request->getVar('number'),
            'vehicle_ownername'  => $this->request->getVar('ownername'),
           
            'vehicle_created_at'  => $this->request->getVar('createdat'),
            'vehicle_updated_at'  => $this->request->getVar('updatedat'),
        ];
        $vehicleModel->update($id, $data);
        return $this->response->redirect(site_url('/vehicles-list'));
    }
 
    // delete vehicle
    public function delete($id = null){
        $vehicleModel = new VehicleModel();
        $data['vehicle'] = $vehicleModel->where('id', $id)->delete($id);
        return $this->response->redirect(site_url('/vehicles-list'));
    }
    
     public function getalldata(){
     $vehicleModel = new VehicleModel();
      $data['bj_vehicles'] = $vehicleModel->orderBy('vehicle_id', 'DESC')->findAll();
      return $this->respond($data);
    }


    public function getone($id = null){
     $vehicleModel = new VehicleModel();
      $data['bj_vehicles'] = $vehicleModel->where('vehicle_id', $id)->find($id);
       // $data['users'] = $userModel->orderBy('id', 'DESC')->findAll();
      if($data){
            return $this->respond($data);
        }else{
            return $this->failNotFound('No Data Found with id '.$id);
        }
    }
    
    public function insertdata(){
    $vehicleModel = new VehicleModel();
        $data = [
            'vehicle_brand' => $this->request->getVar('brand'),
            'vehicle_model'  => $this->request->getVar('model'),
            'vehicle_number'  => $this->request->getVar('number'),
            'vehicle_ownername'  => $this->request->getVar('ownername'),
           
            'vehicle_created_at'  => $this->request->getVar('createdat'),
            'vehicle_updated_at'  => $this->request->getVar('updatedat'),
        ];
        $rs=$vehicleModel->insert($data);
        
    if($rs)
    {
           $response = [
          'status'   => 201,
          'error'    => null,
          'messages' => [
              'success' => 'vehicle created successfully'
          ]
      ];
    }else{
         $response = [
          'status'   => 202,
          'error'    => null,
          'messages' => [
              'success' => 'vehicle NOT CREATED successfully'
          ]
      ];
    }
        
  
      return $this->respondCreated($response);
    }
    
}